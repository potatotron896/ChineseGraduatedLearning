import fs from "node:fs";
import path from "node:path";
import { neon } from "@neondatabase/serverless";

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, "utf8");
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eqIndex = line.indexOf("=");
    if (eqIndex === -1) continue;
    const key = line.slice(0, eqIndex).trim();
    let val = line.slice(eqIndex + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) {
      process.env[key] = val;
    }
  }
}

function splitSqlStatements(sqlText) {
  const withoutLineComments = sqlText
    .split(/\r?\n/)
    .filter((line) => !line.trim().startsWith("--"))
    .join("\n");

  return withoutLineComments
    .split(/;\s*(?:\r?\n|$)/)
    .map((s) => s.trim())
    .filter(Boolean);
}

async function main() {
  loadEnvFile(path.join(process.cwd(), ".env.local"));
  loadEnvFile(path.join(process.cwd(), ".env"));

  const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!databaseUrl) {
    console.error(
      "Erro: DATABASE_URL (ou POSTGRES_URL) não está configurada. Defina no .env.local ou no ambiente."
    );
    process.exit(1);
  }

  const sql = neon(databaseUrl);

  await sql.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  const appliedRows = await sql.query(
    "SELECT version FROM schema_migrations ORDER BY version ASC"
  );
  const applied = new Set(appliedRows.map((r) => String(r.version)));

  const migrationsDir = path.join(process.cwd(), "db", "migrations");
  if (!fs.existsSync(migrationsDir)) {
    console.log("Nenhuma pasta db/migrations encontrada.");
    return;
  }

  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  let count = 0;
  for (const file of files) {
    if (applied.has(file)) {
      console.log(`✓ ${file} (já aplicada)`);
      continue;
    }

    const fullPath = path.join(migrationsDir, file);
    const content = fs.readFileSync(fullPath, "utf8");
    const statements = splitSqlStatements(content);

    console.log(`→ Aplicando ${file} (${statements.length} comandos)...`);
    for (const stmt of statements) {
      await sql.query(stmt);
    }
    await sql.query(
      "INSERT INTO schema_migrations (version) VALUES ($1) ON CONFLICT (version) DO NOTHING",
      [file]
    );
    count++;
    console.log(`✓ ${file} aplicada com sucesso.`);
  }

  console.log(
    count === 0
      ? "Banco de dados já está atualizado."
      : `${count} migration(s) aplicada(s) com sucesso.`
  );
}

main().catch((err) => {
  console.error("Falha ao executar migrations:", err);
  process.exit(1);
});


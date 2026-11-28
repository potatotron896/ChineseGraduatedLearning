import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono, Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { BackgroundMusicProvider } from "@/context/BackgroundMusicContext";
import { Header } from "@/components/Header";
import { BadgeToastContainer } from "@/components/BadgeToast";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const notoSansSc = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-sc",
  display: "swap",
});

const notoSerifSc = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-noto-serif-sc",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "WenDu (文读) — Leitura Graduada de Mandarim HSK 3.0",
  description:
    "Aprenda e fixe Mandarim lendo histórias graduadas por porcentagem de nível HSK 3.0, com áudio neural sincronizado estilo karaokê e decomposição etimológica de caracteres e radicais.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${jakarta.variable} ${jetbrains.variable} ${notoSansSc.variable} ${notoSerifSc.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Load LXGW WenKai (Authentic Chinese School Kaiti Calligraphic Webfont) */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.7.0/style.css"
        />
      </head>
      <body className="min-h-[100dvh] flex flex-col bg-canvas text-ink selection:bg-jade-soft selection:text-jade overflow-x-hidden">
        <UserProvider>
          <BackgroundMusicProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <BadgeToastContainer />
          </BackgroundMusicProvider>
        </UserProvider>
      </body>
    </html>
  );
}


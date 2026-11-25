import storiesData from "./stories-built.json";
import type { Story } from "@/types/story";

export const STORIES: Story[] = storiesData as unknown as Story[];

export function getStoryBySlug(slug: string): Story | undefined {
  return STORIES.find((s) => s.slug === slug);
}


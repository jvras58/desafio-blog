import { Post } from "@/types/post";

const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))"
];

export function processTagsCount(posts: Post[]) {
  const tagCount: Record<string, number> = {};
  
  posts.forEach(post => {
    post.tags.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });

  return Object.entries(tagCount)
    .map(([tag, count], index) => ({
      tag,
      qntd: count,
      fill: CHART_COLORS[index % CHART_COLORS.length]
    }))
    .sort((a, b) => b.qntd - a.qntd)
    .slice(0, 5);
}
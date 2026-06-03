import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

// gray-matter parses unquoted YAML dates (e.g. `date: 2026-05-20`) into JS Date
// objects. The rest of the app treats `date` as a string and renders it directly
// in JSX, which throws "Objects are not valid as a React child (found: [object Date])"
// during prerender. Normalize to a YYYY-MM-DD string here so every consumer is
// safe regardless of whether the frontmatter date is quoted.
function toDateString(value: unknown): string {
  if (!value) return "";
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  author: string;
  content: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  const posts = files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    return {
      slug,
      title: data.title || "",
      excerpt: data.excerpt || "",
      category: data.category || "Guides",
      date: toDateString(data.date),
      image: data.image || "",
      author: data.author || "World Wide Shades",
      content,
    };
  });
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title || "",
    excerpt: data.excerpt || "",
    category: data.category || "Guides",
    date: toDateString(data.date),
    image: data.image || "",
    author: data.author || "World Wide Shades",
    content,
  };
}

import TextViewer from "@/components/TextViewer";
import { universitycubeContent } from "@/lib/utils";
import { notFound } from "next/navigation";
type Post = {
  title: string;
  content: string;
};
interface Posts {
  [slug: string]: Post;
}
const POSTS: Posts = {
  "academic-software": {
    title: "UniversityCube",
    content: universitycubeContent,
  },
  "trading-strategy": {
    title: "My Trading Bot Strategy",
    content: universitycubeContent,
  },
};

export async function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) return notFound();
  return (
    <article className="prose dark:prose-invert max-w-2xl mx-auto space-y-8">
      <h1>{post.title}</h1>
      <TextViewer source={post.content} />
    </article>
  );
}

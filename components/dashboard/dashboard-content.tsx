'use client'
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Post } from '@/types/post';
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchPostsPublic } from "@/services/post/getPublic";

export default function DashboardContent() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const { data: posts = [], isError }: UseQueryResult<Post[], Error> = useQuery({
    queryKey: ["publicPosts"],
    queryFn: fetchPostsPublic,
  });

  if (isError) return <div>Erro ao carregar posts</div>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-foreground">Todas as Postagens</h1>
      <div className="space-y-8">
        {posts.map((post: Post) => (
          <article
            key={post.id}
            className="bg-card text-card-foreground shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow border border-border"
            onClick={() => setSelectedPost(post)}
          >
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2 text-foreground">{post.title}</h2>
              <p className="text-muted-foreground mb-4">{post.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-muted-foreground">Por: {post.author?.name || "Desconhecido"}</span>
                <span className="text-sm text-muted-foreground">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{post.category}</Badge>
                {post.tags?.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
      {selectedPost && (
      <Dialog open={selectedPost !== null} onOpenChange={() => setSelectedPost(null)}>
      <DialogContent className="bg-background text-foreground">
        <DialogHeader>
          <DialogTitle className="text-foreground">{selectedPost?.title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Por {selectedPost?.author?.name || "Desconhecido"} | {selectedPost?.category}
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto mt-4 pr-2">
          <p className="text-foreground mb-4 whitespace-pre-wrap break-words">
            {selectedPost?.content}
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedPost?.tags?.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </DialogContent>
      </Dialog>
    )}
    </div>
  );
}
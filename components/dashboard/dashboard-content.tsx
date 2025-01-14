'use client'
import { useState } from 'react';
import { mockPosts } from '../../mockblog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card";
import { Post } from '@/types/post';

export default function DashboardContent() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  return (
    <Card className="rounded-lg border-none mt-6">
      <CardContent className="p-6">
        <div className="flex justify-center items-center min-h-[calc(100vh-56px-64px-20px-24px-56px-48px)]">
          <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8 text-center text-foreground">Posts</h1>
            <div className="space-y-8">
              {mockPosts.map((post: Post) => (
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
                      <span className="text-sm text-muted-foreground">{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      {post.tags?.map(tag => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <Dialog open={selectedPost !== null} onOpenChange={() => setSelectedPost(null)}>
              <DialogContent className="bg-background text-foreground">
                <DialogHeader>
                  <DialogTitle className="text-foreground">{selectedPost?.title}</DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    Por {selectedPost?.author?.name || "Desconhecido"} | {selectedPost?.category}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <p className="text-foreground mb-4">{selectedPost?.content}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedPost?.tags?.map(tag => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
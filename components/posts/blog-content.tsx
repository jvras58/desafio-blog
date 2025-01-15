"use client";
// TODO: Eu acho que posso pedir para o gpt melhorar esse codigo sei lá ta muito grande talvez por exemplo o dialog possa se tornar um componente separado......

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/types/post";
import { useQuery, UseQueryResult, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPosts } from "@/services/post/get";
import { deletePost } from "@/services/post/delete";
import { updatePost } from "@/services/post/update";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";

interface Props {
  session: Session | null;
}

export default function BlogPosts({ session: serverSession }: Props) {
  const { data: clientSession } = useSession();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<Post>>({});
  const queryClient = useQueryClient();

  const activeSession = clientSession || serverSession;

  const { data: posts = [], isError }: UseQueryResult<Post[], Error> = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(activeSession?.user?.accessToken || "", activeSession?.user?.id),
    enabled: !!activeSession, 
  });

  const deleteMutation = useMutation({
    mutationFn: (postId: string) => deletePost(postId, activeSession?.user?.accessToken || ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ postId, updatedData }: { postId: string, updatedData: Partial<Post> }) => 
      updatePost(postId, updatedData, activeSession?.user?.accessToken || ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setIsEditing(false);
      setSelectedPost(null);
    },
  });

  if (!activeSession) return <div>Você precisa estar logado para ver as postagens.</div>;

  if (isError) return <div>Erro ao carregar posts</div>;

  const handleDelete = (postId: string) => {
    if (confirm("Tem certeza que deseja deletar este post?")) {
      deleteMutation.mutate(postId);
    }
  };

  const handleEdit = (post: Post) => {
    setSelectedPost(post);
    setEditData(post);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (selectedPost) {
      updateMutation.mutate({ postId: selectedPost.id, updatedData: editData });
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-foreground">Suas Postagens</h1>
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
              <Button
                className="mt-4 hover:text-red-800"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(post.id);
                }}
              >
                Deletar
              </Button>
              <Button
                className="mt-4 ml-4 hover:text-blue-800"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(post);
                }}
              >
                Editar
              </Button>
            </div>
          </article>
        ))}
      </div>
      {selectedPost && (
      <Dialog
        open={selectedPost !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedPost(null);
            setIsEditing(false);
          }
        }}
      >
        <DialogContent className="bg-background text-foreground">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {isEditing ? "Editar Post" : selectedPost?.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Por {selectedPost?.author?.name || "Desconhecido"} | {selectedPost?.category}
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto mt-4 pr-2">
            {isEditing ? (
              <div>
                <input
                  type="text"
                  value={editData.title || ""}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  placeholder="Título"
                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                />
                <textarea
                  value={editData.content || ""}
                  onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                  placeholder="Conteúdo"
                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                />
                <Button
                  className="hover:text-blue-800"
                  onClick={handleSave}
                >
                  Salvar
                </Button>
              </div>
            ) : (
              <p className="text-foreground mb-4 whitespace-pre-wrap break-words">
                {selectedPost?.content}
              </p>
            )}
            <div className="flex flex-wrap gap-2 mt-4">
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
"use client";

import { useState } from "react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

import { Post } from "@/types/post";
import { usePosts } from "@/hooks/usePosts";
import { PostCard } from "./_components/post-card";
import EditPostDialog from "./_components/EditPostDialog";
import { DetailPostDialog } from "./_components/ViewPostDialog";


interface Props {
  session: Session | null;
}

export default function BlogPosts({ session: serverSession }: Props) {
  const { data: clientSession } = useSession();
  const activeSession = clientSession || serverSession;

  const { posts, isLoading, isError, deleteMutation, updateMutation } = usePosts(activeSession);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isViewing, setIsViewing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Melhorar a experiência do usuário:
  if (!activeSession) {
    return <div>Você precisa estar logado para ver as postagens.</div>;
  }

  if (isLoading) {
    return <div>Carregando posts...</div>;
  }

  if (isError) {
    return <div>Erro ao carregar posts</div>;
  }

  const handleDelete = (postId: string) => {
    if (confirm("Tem certeza que deseja deletar este post?")) {
      deleteMutation.mutate(postId);
    }
  };

  const handleEdit = (post: Post) => {
    setSelectedPost(post);
    setIsEditing(true);
  };

  const handleSelect = (post: Post) => {
    setSelectedPost(post);
    setIsViewing(true);
  };

  const handleCloseDialog = () => {
    setIsEditing(false);
    setSelectedPost(null);
  };

  const handleSave = (updatedData: Partial<Post>) => {
    if (selectedPost) {
      updateMutation.mutate({ postId: selectedPost.id, updatedData });
      handleCloseDialog();
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-foreground">Suas Postagens</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onSelect={handleSelect} 
          />
        ))}
      </div>
      <EditPostDialog
        post={selectedPost}
        isOpen={isEditing}
        onClose={handleCloseDialog}
        onSave={handleSave}
      />
    <DetailPostDialog
      isOpen={isViewing}
      post={selectedPost}
      onClose={() => setIsViewing(false)}
    />
    </div>
  );
}

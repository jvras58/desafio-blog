import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Post } from "@/types/post";

import { Session } from "next-auth";
import { fetchPosts } from "@/services/post/get";
import { deletePost } from "@/services/post/delete";
import { updatePost } from "@/services/post/update";


export function usePosts(session: Session | null) {
  const queryClient = useQueryClient();


  const userId = session?.user?.id ?? "";
  const token = session?.user?.accessToken ?? "";

  const queryKey = ["posts", userId];

  const {
    data: posts = [],
    isLoading,
    isError,
    error,
  } = useQuery<Post[], Error>({
    queryKey,
    // Só executa se `userId` não for vazio
    // TODO: remove esse enabled para que busque mesmo sem userId
    enabled: !!session && !!userId,
    queryFn: () => fetchPosts(token, userId),
  });

  const deleteMutation = useMutation<void, Error, string, unknown>({
    mutationFn: (postId) => deletePost(postId, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const updateMutation = useMutation<Post, Error, { postId: string; updatedData: Partial<Post> }, unknown>({
    mutationFn: ({ postId, updatedData }) => updatePost(postId, updatedData, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    posts,
    isLoading,
    isError,
    error,
    deleteMutation,
    updateMutation,
  };
}

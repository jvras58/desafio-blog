"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/types/post";

interface DetailPostDialogProps {
  isOpen: boolean;
  post: Post | null;
  onClose: () => void;
}

export function DetailPostDialog({ isOpen, post, onClose }: DetailPostDialogProps) {
  if (!post) return null;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onClose();
        }
      }}
    >
      <DialogContent className="bg-background text-foreground">
        <DialogHeader>
          <DialogTitle className="text-foreground">{post.title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Por {post.author?.name || "Desconhecido"} | {post.category} |{" "}
            {new Date(post.createdAt).toLocaleDateString()}
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto mt-4 pr-2">
          {post.description && (
            <p className="text-foreground mb-4">{post.description}</p>
          )}
          <p className="text-foreground mb-4 whitespace-pre-wrap break-words">
            {post.content}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags?.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

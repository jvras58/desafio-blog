import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Post } from "@/types/post";

interface EditPostDialogProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedData: Partial<Post>) => void;
}

export default function EditPostDialog({ post, isOpen, onClose, onSave }: EditPostDialogProps) {
  const [localEditData, setLocalEditData] = useState<Partial<Post>>({});

  useEffect(() => {
    if (post) {
      setLocalEditData(post);
    }
  }, [post]);

  const handleSave = () => {
    onSave(localEditData);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent className="bg-background text-foreground">
        <DialogHeader>
          <DialogTitle className="text-foreground">Editar Post</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Por {post?.author?.name || "Desconhecido"} | {post?.category}
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto mt-4 pr-2">
          <input
            type="text"
            value={localEditData.title || ""}
            onChange={(e) => setLocalEditData({ ...localEditData, title: e.target.value })}
            placeholder="Título"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <textarea
            value={localEditData.content || ""}
            onChange={(e) => setLocalEditData({ ...localEditData, content: e.target.value })}
            placeholder="Conteúdo"
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <Button className="hover:text-blue-800" onClick={handleSave}>
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

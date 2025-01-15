import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
  onDelete: (postId: string) => void;
  onEdit: (post: Post) => void;
  onSelect?: (post: Post) => void; // para abrir detalhes
}

export function PostCard({
  post,
  onDelete,
  onEdit,
  onSelect,
}: PostCardProps) {
  return (
    <article
      className="bg-card text-card-foreground shadow-md rounded-lg overflow-hidden
                 cursor-pointer hover:shadow-lg transition-shadow border border-border"
      onClick={() => {
        if (onSelect) {
          onSelect(post);
        }
      }}
    >
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-2 text-foreground">
          {post.title}
        </h2>
        <p className="text-muted-foreground mb-4">{post.description}</p>

        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-muted-foreground">
            Por: {post.author?.name || "Desconhecido"}
          </span>
          <span className="text-sm text-muted-foreground">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{post.category}</Badge>
          {post.tags?.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        <Button
          className="mt-4 hover:text-red-800"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(post.id);
          }}
        >
          Deletar
        </Button>

        <Button
          className="mt-4 ml-4 hover:text-blue-800"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(post);
          }}
        >
          Editar
        </Button>
      </div>
    </article>
  );
}

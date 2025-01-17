import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { StepProps } from "@/types/post"

export function BasicInfoStep({ data, onUpdate, onNext }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          placeholder="Título do Post"
          value={data.basicInfo.title}
          onChange={(e) =>
            onUpdate({ basicInfo: { ...data.basicInfo, title: e.target.value } })
          }
          className="bg-background border-input"
        />
        <p className="text-sm text-muted-foreground">
          Título que aparecerá no seu post.
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          placeholder="Descrição do Post"
          value={data.basicInfo.description}
          onChange={(e) =>
            onUpdate({
              basicInfo: { ...data.basicInfo, description: e.target.value },
            })
          }
          className="min-h-[100px] bg-background border-input"
        />
        <p className="text-sm text-muted-foreground">
          Descrição do conteúdo do post.
        </p>
      </div>
      <div className="flex justify-end">
        <Button onClick={onNext} className="bg-green-500 hover:bg-green-600">
          Próximo
        </Button>
      </div>
    </div>
  )
}


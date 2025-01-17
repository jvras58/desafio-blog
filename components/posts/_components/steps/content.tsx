import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { StepProps } from "@/types/post"

export function ContentStep({ data, onUpdate, onNext, onBack }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="content">Conteúdo</Label>
        <Textarea
          id="content"
          placeholder="Conteúdo do post"
          value={data.content.body}
          onChange={(e) =>
            onUpdate({ content: { body: e.target.value } })
          }
          className="min-h-[200px] bg-background border-input"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          onClick={onBack}
          className="border-green-500 text-green-500 hover:bg-green-500/10"
        >
          Voltar
        </Button>
        <Button onClick={onNext} className="bg-green-500 hover:bg-green-600">
          Próximo
        </Button>
      </div>
    </div>
  )
}


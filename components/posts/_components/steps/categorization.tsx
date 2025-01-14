import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { StepProps } from "../../types/form"

export function CategorizationStep({ data, onUpdate, onBack }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="category">Categoria</Label>
        <Select
          value={data.categorization.categories[0]}
          onValueChange={(value) =>
            onUpdate({ categorization: { categories: [value] } })
          }
        >
          <SelectTrigger className="bg-background border-input">
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tech">Tecnologia</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="business">Negócios</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end space-x-2">
        <Button
          variant="outline"
          onClick={onBack}
          className="border-green-500 text-green-500 hover:bg-green-500/10"
        >
          Voltar
        </Button>
        <Button className="bg-green-500 hover:bg-green-600">
          Finalizar
        </Button>
      </div>
    </div>
  )
}


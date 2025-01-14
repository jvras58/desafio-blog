'use client'

import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"

interface EditorProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function Editor({ value, onChange, className }: EditorProps) {
  return (
    <Textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "font-mono",
        className
      )}
    />
  )
}


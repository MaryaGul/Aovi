"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { TextStyle, EditorPosition } from "@/types/product"

interface TextEditorProps {
  onStyleChange: (property: keyof TextStyle, value: string) => void
  onTextChange?: (newText: string) => void
  position: EditorPosition
  currentStyles: TextStyle
  initialText?: string
}

const fontFamilies = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Georgia",
  "Courier New",
  "Verdana",
  "Tahoma",
  "Trebuchet MS",
  "Impact",
  "var(--font-geist-sans)",
  "var(--font-geist-mono)",
]

const fontWeights = [
  { value: "normal", label: "Обычный" },
  { value: "medium", label: "Средний" },
  { value: "bold", label: "Жирный" },
]

export function TextEditor({
  onStyleChange,
  onTextChange,
  position,
  currentStyles,
  initialText = "",
}: TextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [text, setText] = useState(initialText)

  useEffect(() => {
    setText(initialText)
  }, [initialText])

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
    if (onTextChange) {
      onTextChange(e.target.value)
    }
  }

  return (
    <div
      id="text-editor"
      ref={editorRef}
      className="fixed bg-white rounded-lg shadow-lg border border-gray-200 p-3 min-w-[220px] space-y-2 z-50"
      style={{
        top: position.y,
        left: position.x,
      }}
    >
      {onTextChange && (
        <div className="space-y-2">
          <Label>Текст</Label>
          <Input type="text" value={text} onChange={handleTextChange} className="w-full" />
        </div>
      )}
      <div className="space-y-2">
        <Label>Шрифт</Label>
        <Select onValueChange={(value) => onStyleChange("fontFamily", value)} value={currentStyles.fontFamily}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Выберите шрифт" />
          </SelectTrigger>
          <SelectContent className="z-[10001]">
            {fontFamilies.map((font) => (
              <SelectItem key={font} value={font}>
                {font === "var(--font-geist-sans)"
                  ? "Geist Sans"
                  : font === "var(--font-geist-mono)"
                    ? "Geist Mono"
                    : font}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Размер</Label>
        <Input
          type="number"
          value={Number.parseInt(currentStyles.fontSize)}
          onChange={(e) => onStyleChange("fontSize", `${e.target.value}px`)}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label>Начертание</Label>
        <Select onValueChange={(value) => onStyleChange("fontWeight", value)} value={currentStyles.fontWeight}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Выберите начертание" />
          </SelectTrigger>
          <SelectContent side="top" className="z-[10001]">
            {fontWeights.map((weight) => (
              <SelectItem key={weight.value} value={weight.value}>
                {weight.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Цвет</Label>
        <Input
          type="color"
          value={currentStyles.color}
          onChange={(e) => onStyleChange("color", e.target.value)}
          className="w-full h-8"
        />
      </div>
    </div>
  )
}

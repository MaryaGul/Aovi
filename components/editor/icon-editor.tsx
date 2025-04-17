"use client"
import { Label } from "@/components/ui/label"
import type { EditorPosition } from "@/types/product"
import { useEffect, useState } from "react"

interface IconEditorProps {
  position: EditorPosition
  color: string
  onColorChange: (color: string) => void
}

export function IconEditor({ position, color, onColorChange }: IconEditorProps) {
  const [currentColor, setCurrentColor] = useState(color)

  // Обновляем внутреннее состояние при изменении внешнего цвета
  useEffect(() => {
    setCurrentColor(color)
  }, [color])

  // Обработчик изменения цвета
  const handleColorChange = (newColor: string) => {
    setCurrentColor(newColor)
    onColorChange(newColor)
  }

  return (
    <div
      id="color-picker"
      className="fixed bg-white rounded-lg shadow-lg border border-gray-200 p-3 space-y-2 z-50"
      style={{
        top: position.y,
        left: position.x,
      }}
    >
      <Label>Цвет иконки</Label>
      <div className="mt-2">
        <input
          type="color"
          value={currentColor}
          onChange={(e) => handleColorChange(e.target.value)}
          className="w-full h-8"
        />
      </div>
      <div className="grid grid-cols-5 gap-2 mt-2">
        {[
          "#FF6B6B",
          "#4ECDC4",
          "#45B7D1",
          "#FFA07A",
          "#98D8C8",
          "#F06292",
          "#BA68C8",
          "#FFD54F",
          "#4DB6AC",
          "#7986CB",
        ].map((c) => (
          <button
            key={c}
            className="w-8 h-8 rounded-full border border-gray-300"
            style={{ backgroundColor: c }}
            onClick={() => handleColorChange(c)}
          />
        ))}
      </div>
    </div>
  )
}

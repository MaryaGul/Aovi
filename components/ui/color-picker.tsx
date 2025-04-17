"use client"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
  className?: string
}

const defaultColors = [
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
]

export function ColorPicker({ color, onChange, className = "" }: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState(color)

  // Обновляем внутреннее состояние при изменении внешнего цвета
  useEffect(() => {
    setSelectedColor(color)
  }, [color])

  // Обработчик изменения цвета
  const handleColorChange = (newColor: string) => {
    setSelectedColor(newColor)
    onChange(newColor)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={`w-8 h-8 rounded-full p-0 border border-gray-300 ${className}`}
          style={{ backgroundColor: selectedColor }}
        />
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="grid grid-cols-5 gap-2">
          {defaultColors.map((c) => (
            <Button
              key={c}
              className="w-8 h-8 rounded-full p-0"
              style={{ backgroundColor: c }}
              onClick={() => handleColorChange(c)}
            />
          ))}
        </div>
        <div className="mt-2">
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-full h-8"
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}

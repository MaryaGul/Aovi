"use client"

import type React from "react"
import type { Feature } from "@/types/product"
import type { TextStyle } from "@/types/product"

interface FeatureItemProps {
  feature: Feature
  style: TextStyle
  onTextSelect: (id: string, event: React.MouseEvent) => void
  onIconSelect: (id: string, event: React.MouseEvent) => void
}

export function FeatureItem({ feature, style, onTextSelect, onIconSelect }: FeatureItemProps) {
  const Icon = feature.icon

  return (
    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-[12px] shadow-lg flex items-center justify-center shrink-0 cursor-pointer"
        style={{ backgroundColor: feature.color }}
        onClick={(e) => onIconSelect(feature.id, e)}
      >
        <Icon className="w-5 h-5 text-white" />
      </div>
      <span
        className="text-base font-medium leading-none select-text cursor-text"
        style={style}
        onMouseUp={(e) => onTextSelect(feature.id, e)}
      >
        {feature.name}
      </span>
    </div>
  )
}


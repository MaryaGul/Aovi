"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import * as lucideReact from "lucide-react"
import { generateId } from "@/utils/idGenerator"
import type { ProductCardProps } from "@/types/product"
import { TextEditor } from "@/components/ui/text-editor"
import { IconEditor } from "@/components/editor/icon-editor"
import { useProductEditor } from "@/contexts/ProductEditorContext"

interface GeneratedCardRendererProps {
  code: string
  cardProps: ProductCardProps
}

export function GeneratedCardRenderer({ code, cardProps }: GeneratedCardRendererProps) {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [key, setKey] = useState(0) // Ключ для принудительной перерисовки

  const {
    selectedText,
    selectedIcon,
    editorPosition,
    handleTextSelection,
    handleStyleChange,
    handleIconSelect,
    updateFeatureColor,
    getFeatureColor,
    headlineStyles,
    subheadlineStyles,
    featureStyles,
    features,
  } = useProductEditor()

  // Обработчик изменения цвета иконки
  const handleIconColorChange = (id: string, color: string) => {
    updateFeatureColor(id, color)
    // Увеличиваем ключ для принудительной перерисовки
    setKey((prev) => prev + 1)
  }

  useEffect(() => {
    if (!code) return

    try {
      // Создаем функцию, которая будет выполнять код и возвращать компонент
      const executeCode = new Function(
        "React",
        "Image",
        "lucideReact",
        "generateId",
        `
          ${code}
        `,
      )

      // Выполняем код и получаем функцию компонента
      const GeneratedComponent = executeCode(React, Image, lucideReact, generateId)

      // Создаем обертку для компонента, чтобы передать все необходимые зависимости
      const WrappedComponent = (props: ProductCardProps) => {
        return React.createElement(GeneratedComponent, {
          React,
          Image,
          lucideReact,
          generateId,
          ...props,
          handleTextSelection,
          handleIconSelect,
          headlineStyles,
          subheadlineStyles,
          featureStyles,
          features,
          getFeatureColor, // Передаем функцию получения цвета
          editable: true,
        })
      }

      // Устанавливаем компонент в состояние
      setComponent(() => WrappedComponent)
      setError(null)
    } catch (err) {
      console.error("Error rendering generated component:", err)
      setError(`Ошибка рендеринга компонента: ${err instanceof Error ? err.message : "Неизвестная ошибка"}`)
      setComponent(null)
    }
  }, [
    code,
    handleTextSelection,
    handleIconSelect,
    headlineStyles,
    subheadlineStyles,
    featureStyles,
    features,
    getFeatureColor,
  ])

  // Эффект для принудительной перерисовки при изменении features или iconColors
  useEffect(() => {
    setKey((prev) => prev + 1)
  }, [features, getFeatureColor])

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
        <h3 className="font-bold mb-2">Ошибка рендеринга</h3>
        <p>{error}</p>
      </div>
    )
  }

  if (!Component) {
    return (
      <div className="flex items-center justify-center w-[450px] h-[600px] bg-gray-100 rounded-lg">
        <p className="text-gray-500">Загрузка компонента...</p>
      </div>
    )
  }

  // Оборачиваем компонент в контейнер с фиксированной шириной
  return (
    <div className="w-[450px] mx-auto relative">
      <Component key={key} {...cardProps} />

      {selectedText && (
        <TextEditor
          onStyleChange={handleStyleChange}
          position={editorPosition}
          currentStyles={
            selectedText === "headline"
              ? headlineStyles
              : selectedText === "subheadline"
                ? subheadlineStyles
                : featureStyles
          }
        />
      )}

      {selectedIcon && (
        <IconEditor
          position={editorPosition}
          color={getFeatureColor(selectedIcon)}
          onColorChange={(color) => handleIconColorChange(selectedIcon, color)}
        />
      )}
    </div>
  )
}

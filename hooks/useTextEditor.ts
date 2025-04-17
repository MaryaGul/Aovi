"use client"

import type React from "react"

import { useState, useCallback, useEffect } from "react"
import type { TextStyle, EditorPosition, SelectedTextType } from "@/types/product"

interface UseTextEditorProps {
  initialHeadlineStyles?: TextStyle
  initialSubheadlineStyles?: TextStyle
  initialFeatureStyles?: TextStyle
}

export function useTextEditor({
  initialHeadlineStyles = {
    fontFamily: "Arial",
    fontSize: "32px",
    fontWeight: "bold",
    color: "#000000",
  },
  initialSubheadlineStyles = {
    fontFamily: "Arial",
    fontSize: "18px",
    fontWeight: "medium",
    color: "#666666",
  },
  initialFeatureStyles = {
    fontFamily: "Arial",
    fontSize: "14px",
    fontWeight: "normal",
    color: "#333333",
  },
}: UseTextEditorProps = {}) {
  const [headlineStyles, setHeadlineStyles] = useState<TextStyle>(initialHeadlineStyles)
  const [subheadlineStyles, setSubheadlineStyles] = useState<TextStyle>(initialSubheadlineStyles)
  const [featureStyles, setFeatureStyles] = useState<TextStyle>(initialFeatureStyles)

  const [selectedText, setSelectedText] = useState<SelectedTextType>(null)
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const [editorPosition, setEditorPosition] = useState<EditorPosition>({ x: 0, y: 0 })

  const handleTextSelection = useCallback((type: SelectedTextType, event: React.MouseEvent) => {
    const selection = window.getSelection()
    if (selection && selection.toString().length > 0) {
      setSelectedText(type)
      setSelectedIcon(null)
      const range = selection.getRangeAt(0)
      const rect = range.getBoundingClientRect()
      setEditorPosition({
        x: Math.min(rect.left, window.innerWidth - 220),
        y: rect.bottom + window.scrollY + 10,
      })
    }
  }, [])

  const handleStyleChange = useCallback(
    (property: keyof TextStyle, value: string) => {
      if (selectedText === "headline") {
        setHeadlineStyles((prev) => ({ ...prev, [property]: value }))
      } else if (selectedText === "subheadline") {
        setSubheadlineStyles((prev) => ({ ...prev, [property]: value }))
      } else if (selectedText && selectedText !== "headline" && selectedText !== "subheadline") {
        setFeatureStyles((prev) => ({ ...prev, [property]: value }))
      }
    },
    [selectedText],
  )

  const handleIconSelect = useCallback((id: string, event: React.MouseEvent) => {
    event.stopPropagation()
    setSelectedText(null)
    setSelectedIcon(id)
    const rect = event.currentTarget.getBoundingClientRect()
    setEditorPosition({
      x: rect.left,
      y: rect.bottom + window.scrollY + 10,
    })
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const textEditor = document.getElementById("text-editor")
      const colorPicker = document.getElementById("color-picker")
      const isClickInsideTextEditor = textEditor?.contains(event.target as Node)
      const isClickInsideColorPicker = colorPicker?.contains(event.target as Node)

      if (!isClickInsideTextEditor && !isClickInsideColorPicker) {
        if (!window.getSelection()?.toString()) {
          setSelectedText(null)
        }
        if (!isClickInsideColorPicker) {
          setSelectedIcon(null)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return {
    headlineStyles,
    subheadlineStyles,
    featureStyles,
    selectedText,
    selectedIcon,
    editorPosition,
    handleTextSelection,
    handleStyleChange,
    handleIconSelect,
    setSelectedIcon,
  }
}

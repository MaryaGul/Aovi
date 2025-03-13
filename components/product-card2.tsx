import type React from "react"
import { useState, useEffect } from "react"
import Image from 'next/image'
import { Leaf, FlaskRoundIcon as Flask, Shield, Star, Award } from "lucide-react"
import { TextEditor } from "./TextEditor"
import { ColorPicker } from "./ColorPicker"
import { Label } from "@/components/ui/label"

interface Feature {
  name: string
  icon: React.ElementType
  color: string
}

const initialFeatures: Feature[] = [
  { name: "ЭПК-792", icon: Flask, color: "#FFD700" },
  { name: "ДГК-528", icon: Shield, color: "#FFD700" },
  { name: "Высокая концентрация", icon: Star, color: "#FFD700" },
  { name: "Премиум качество", icon: Award, color: "#FFD700" },
  { name: "Натуральный состав", icon: Leaf, color: "#FFD700" },
]

interface ProductCardProps {
  src: string
  headline: string
  subheadline: string

  alt: string
}

interface TextStyles {
  fontFamily: string
  fontSize: string
  fontWeight: string
  color: string
}

export function ProductCard2({
  src,
  headline: initialHeadline = "ОМЕГА 3",
  subheadline: initialSubheadline = "высокой концентрации",
 
  alt,
}: ProductCardProps) {
  const [headline, setHeadline] = useState(initialHeadline)
  const [subheadline, setSubheadline] = useState(initialSubheadline)
 
  const [features, setFeatures] = useState(initialFeatures)
  const [selectedText, setSelectedText] = useState<"headline" | "subheadline" | "capsuleCount" | number | null>(null)
  const [selectedIcon, setSelectedIcon] = useState<number | null>(null)
  const [editorPosition, setEditorPosition] = useState({ x: 0, y: 0 })

  const [headlineStyles, setHeadlineStyles] = useState<TextStyles>({
    fontFamily: "Arial",
    fontSize: "48px",
    fontWeight: "bold",
    color: "#FFD700",
  })

  const [subheadlineStyles, setSubheadlineStyles] = useState<TextStyles>({
    fontFamily: "Arial",
    fontSize: "24px",
    fontWeight: "medium",
    color: "#FFD700",
  })

  const [capsuleCountStyles, setCapsuleCountStyles] = useState<TextStyles>({
    fontFamily: "Arial",
    fontSize: "64px",
    fontWeight: "bold",
    color: "#1A1A1A",
  })

  const [featureStyles, setFeatureStyles] = useState<TextStyles>({
    fontFamily: "Arial",
    fontSize: "16px",
    fontWeight: "normal",
    color: "#FFD700",
  })

  const handleTextSelection = (type: "headline" | "subheadline" | "capsuleCount" | number, event: React.MouseEvent) => {
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
  }

  const handleStyleChange = (property: keyof TextStyles, value: string) => {
    if (selectedText === "headline") {
      setHeadlineStyles((prev) => ({ ...prev, [property]: value }))
    } else if (selectedText === "subheadline") {
      setSubheadlineStyles((prev) => ({ ...prev, [property]: value }))
    } else if (selectedText === "capsuleCount") {
      setCapsuleCountStyles((prev) => ({ ...prev, [property]: value }))
    } else if (typeof selectedText === "number") {
      setFeatureStyles((prev) => ({ ...prev, [property]: value }))
      setFeatures((prev) => [...prev])
    }
  }

  const handleFeatureTextChange = (index: number, newText: string) => {
    setFeatures((prev) => {
      const newFeatures = [...prev]
      newFeatures[index] = { ...newFeatures[index], name: newText }
      return newFeatures
    })
  }

  const handleIconColorChange = (index: number, color: string) => {
    setFeatures((prev) => {
      const newFeatures = [...prev]
      newFeatures[index] = { ...newFeatures[index], color: color }
      return newFeatures
    })
  }

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

  return (
    <div className="relative w-[450px] h-[600px] overflow-hidden bg-gradient-to-br from-gray-900 to-black">
      
      

      {/* Main Content */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-8">
        {/* Product Title */}
        <div className="text-center space-y-2">
          <h1
            className="select-text cursor-text"
            style={headlineStyles}
            onMouseUp={(e) => handleTextSelection("headline", e)}
          >
            {headline}
          </h1>
          <h2
            className="select-text cursor-text"
            style={subheadlineStyles}
            onMouseUp={(e) => handleTextSelection("subheadline", e)}
          >
            {subheadline}
          </h2>
        </div>

        {/* Features List */}
        <div className="mt-8 space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full shadow-lg flex items-center justify-center shrink-0 cursor-pointer"
                style={{ backgroundColor: feature.color }}
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedText(null)
                  setSelectedIcon(index)
                  const rect = e.currentTarget.getBoundingClientRect()
                  setEditorPosition({
                    x: rect.left,
                    y: rect.bottom + window.scrollY + 10,
                  })
                }}
              >
                <feature.icon className="w-4 h-4 text-gray-900" />
              </div>
              <span
                className="select-text cursor-text"
                style={featureStyles}
                onMouseUp={(e) => handleTextSelection(index, e)}
              >
                {feature.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Product Image */}
      <div className="absolute bottom-0 right-0 w-1/2">
        <Image src={src} alt={alt} width={900} height={1200} />
      </div>

      {selectedText !== null && (
        <TextEditor
          position={editorPosition}
          onStyleChange={handleStyleChange}
          currentStyles={
            selectedText === "headline"
              ? headlineStyles
              : selectedText === "subheadline"
                ? subheadlineStyles
                : selectedText === "capsuleCount"
                  ? capsuleCountStyles
                  : featureStyles
          }
          onTextChange={
            typeof selectedText === "number" ? (newText) => handleFeatureTextChange(selectedText, newText) : undefined
          }
          initialText={typeof selectedText === "number" ? features[selectedText].name : undefined}
        />
      )}
      {selectedIcon !== null && (
        <div
          id="color-picker"
          className="fixed bg-white rounded-lg shadow-lg border border-gray-200 p-3 space-y-2"
          style={{
            top: editorPosition.y,
            left: editorPosition.x,
            zIndex: 10001,
          }}
        >
          <Label>Цвет иконки</Label>
          <ColorPicker
            color={features[selectedIcon].color}
            onChange={(color) => handleIconColorChange(selectedIcon, color)}
          />
        </div>
      )}
    </div>
  )
}


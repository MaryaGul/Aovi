"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"
import type { ProductCardProps, TextStyle, Feature, EditorPosition } from "@/types/product"
import { useTextEditor } from "@/hooks/useTextEditor"
import { useFeatures } from "@/hooks/useFeatures"

interface ProductEditorContextType {
  activeProduct: ProductCardProps | null
  setActiveProduct: (product: ProductCardProps | null) => void
  headlineStyles: TextStyle
  subheadlineStyles: TextStyle
  featureStyles: TextStyle
  features: Feature[]
  selectedText: string | null
  selectedIcon: string | null
  editorPosition: EditorPosition
  handleTextSelection: (type: string, event: React.MouseEvent) => void
  handleStyleChange: (property: keyof TextStyle, value: string) => void
  handleIconSelect: (id: string, event: React.MouseEvent) => void
  updateFeatureText: (id: string, newText: string) => void
  updateFeatureColor: (id: string, color: string) => void
  getFeatureColor: (id: string) => string
  addFeature: (feature: Omit<Feature, "id">) => string
  removeFeature: (id: string) => void
}

const ProductEditorContext = createContext<ProductEditorContextType | undefined>(undefined)

export function ProductEditorProvider({ children }: { children: ReactNode }) {
  const [activeProduct, setActiveProduct] = useState<ProductCardProps | null>(null)

  const {
    headlineStyles,
    subheadlineStyles,
    featureStyles,
    selectedText,
    selectedIcon,
    editorPosition,
    handleTextSelection,
    handleStyleChange,
    handleIconSelect,
  } = useTextEditor()

  const { features, updateFeatureText, updateFeatureColor, getFeatureColor, addFeature, removeFeature } = useFeatures()

  return (
    <ProductEditorContext.Provider
      value={{
        activeProduct,
        setActiveProduct,
        headlineStyles,
        subheadlineStyles,
        featureStyles,
        features,
        selectedText,
        selectedIcon,
        editorPosition,
        handleTextSelection,
        handleStyleChange,
        handleIconSelect,
        updateFeatureText,
        updateFeatureColor,
        getFeatureColor,
        addFeature,
        removeFeature,
      }}
    >
      {children}
    </ProductEditorContext.Provider>
  )
}

export function useProductEditor() {
  const context = useContext(ProductEditorContext)
  if (context === undefined) {
    throw new Error("useProductEditor must be used within a ProductEditorProvider")
  }
  return context
}

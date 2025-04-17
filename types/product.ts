import type React from "react"

export interface Feature {
  id: string
  name: string
  icon: React.ElementType
  color: string
}

export interface TextStyle {
  fontFamily: string
  fontSize: string
  fontWeight: string
  color: string
}

export interface ProductCardProps {
  id?: string
  image: string
  headline: string
  subheadline: string
  alt: string
  features?: Feature[]
  backgroundColor?: string
  editable?: boolean
}

export interface EditorPosition {
  x: number
  y: number
}

export interface ProductFormData {
  headline: string
  subheadline: string
  productDescription: string
  removeBackground: boolean
  referenceImage: File | null
  productImage: File | null
  generatedCode: string
}

export type SelectedTextType = "headline" | "subheadline" | string | null

export interface GeneratedComponent {
  id: string
  name: string
  code: string
  thumbnail?: string
}

export interface CardTemplate {
  id: string
  name: string
  component: React.ComponentType<ProductCardProps>
  thumbnail: string
}


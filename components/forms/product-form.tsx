"use client"

import type React from "react"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import type { ProductFormData } from "@/types/product"
import { encodeImageFileAsURL } from "@/utils/imageUtils"
import { describePicture } from "@/utils/aiService"
import { generateCardCode } from "@/utils/codeGenerator"

interface ProductFormProps {
  onGenerate: (formData: ProductFormData) => void
}

export function ProductForm({ onGenerate }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    headline: "",
    subheadline: "",
    productDescription: "",
    removeBackground: false,
    referenceImage: null,
    productImage: null,
    generatedCode: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [generationStep, setGenerationStep] = useState<string | null>(null)

  const handleInputChange = (field: keyof ProductFormData, value: string | boolean | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleGenerate = async () => {
    if (formData.headline || formData.subheadline || formData.productDescription) {
      setIsLoading(true)
      try {
        setGenerationStep("Генерация кода компонента...")
        const generatedCode = await generateCardCode(formData.productDescription, formData)

        setFormData((prev) => ({
          ...prev,
          generatedCode: generatedCode,
        }))

        setGenerationStep(null)
        onGenerate({
          ...formData,
          generatedCode: generatedCode,
        })
      } catch (error) {
        console.error("Error generating component:", error)
        setGenerationStep("Ошибка генерации")
      } finally {
        setIsLoading(false)
      }
    } else {
      onGenerate(formData)
    }
  }

  const handleReferenceUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    handleInputChange("referenceImage", file)

    if (file) {
      setIsLoading(true)
      try {
        setGenerationStep("Анализ изображения...")
        const imageBase64 = await encodeImageFileAsURL(file)
        const description = await describePicture(imageBase64)

        setFormData((prev) => ({
          ...prev,
          productDescription: description,
        }))

        setGenerationStep("Генерация кода компонента...")
        const generatedCode = await generateCardCode(description, {
          ...formData,
          productDescription: description,
          referenceImage: file,
        })

        setFormData((prev) => ({
          ...prev,
          generatedCode: generatedCode,
        }))

        setGenerationStep(null)
        onGenerate({
          ...formData,
          productDescription: description,
          referenceImage: file,
          generatedCode: generatedCode,
        })
      } catch (error) {
        console.error("Error processing reference image:", error)
        setGenerationStep("Ошибка генерации")
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleProductImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    handleInputChange("productImage", file)
  }

  return (
    <div className="w-full max-w-md space-y-6 p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-2">
        <Label htmlFor="headline">Заголовок</Label>
        <Input
          id="headline"
          value={formData.headline}
          onChange={(e) => handleInputChange("headline", e.target.value)}
          placeholder="Введите заголовок"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subheadline">Подзаголовок</Label>
        <Input
          id="subheadline"
          value={formData.subheadline}
          onChange={(e) => handleInputChange("subheadline", e.target.value)}
          placeholder="Введите подзаголовок"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="product-description">Описание товара</Label>
        <Textarea
          id="product-description"
          value={formData.productDescription}
          onChange={(e) => handleInputChange("productDescription", e.target.value)}
          placeholder="Введите описание товара"
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="reference-image">Загрузить референс карточки</Label>
        <Input
          type="file"
          id="reference-image"
          accept="image/*"
          onChange={handleReferenceUpload}
          disabled={isLoading}
        />
        <p className="text-xs text-gray-500">
          Загрузите изображение карточки продукта, и нейросеть сгенерирует похожий компонент
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="product-image">Загрузить изображение продукта</Label>
        <Input
          type="file"
          id="product-image"
          accept="image/*"
          onChange={handleProductImageUpload}
          disabled={isLoading}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="remove-background"
          checked={formData.removeBackground}
          onCheckedChange={(checked) => handleInputChange("removeBackground", checked === true)}
        />
        <Label htmlFor="remove-background">Удалить фон</Label>
      </div>

      {isLoading && generationStep && (
        <div className="py-2 px-3 bg-blue-50 text-blue-700 rounded-md text-sm">{generationStep}</div>
      )}

      <Button onClick={handleGenerate} className="w-full" disabled={isLoading}>
        {isLoading ? "Генерация..." : "Сгенерировать карточку"}
      </Button>
    </div>
  )
}


"use client"

import { useState, useEffect } from "react"
import { ProductForm } from "@/components/forms/product-form"
import type { ProductCardProps, ProductFormData } from "@/types/product"
import { createObjectURL, revokeObjectURL } from "@/utils/imageUtils"
import { ProductEditorProvider } from "@/contexts/ProductEditorContext"
import { GeneratedCardRenderer } from "@/components/generated-card-renderer"

export default function Home() {
  const [cardData, setCardData] = useState<ProductCardProps>({
    id: "1",
    image: "",
    headline: "",
    subheadline: "",
    alt: "Изображение продукта",
  })

  const [generatedCode, setGeneratedCode] = useState<string>("")

  // Очистка URL объектов при размонтировании компонента
  useEffect(() => {
    return () => {
      if (cardData.image && cardData.image.startsWith("blob:")) {
        revokeObjectURL(cardData.image)
      }
    }
  }, [cardData.image])

  const handleGenerateCard = async (formData: ProductFormData) => {
    let imageSrc = ""
    if (formData.productImage) {
      imageSrc = createObjectURL(formData.productImage)
    }

    setCardData({
      id: "1",
      image: imageSrc || "/placeholder.svg?height=400&width=400",
      headline: formData.headline,
      subheadline: formData.subheadline,
      alt: "Изображение продукта",
    })

    setGeneratedCode(formData.generatedCode)
  }

  return (
    <ProductEditorProvider>
      <main className="flex min-h-screen flex-col items-center p-8 md:p-24">
        <h1 className="text-4xl font-bold mb-8">Генератор дизайн-карточек</h1>

        <div className="flex flex-col md:flex-row w-full max-w-7xl gap-8">
          <ProductForm onGenerate={handleGenerateCard} />

          <div className="flex-1 flex flex-col items-center">
            {generatedCode && (
              <div className="w-full max-w-[450px]">
                <h2 className="text-xl font-bold mb-4">Сгенерированная карточка:</h2>
                <div className="border border-gray-200 rounded-lg overflow-hidden w-[450px]">
                  <GeneratedCardRenderer code={generatedCode} cardProps={cardData} />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Нажмите на текст или иконку, чтобы отредактировать их стиль.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </ProductEditorProvider>
  )
}

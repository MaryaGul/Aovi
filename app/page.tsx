"use client"

import { useState, useEffect } from "react"
import { ProductForm } from "@/components/product-form"
import { ProductCard2 } from "@/components/product-card2"
import { ProductCard } from "@/components/product-card"
import { FutureProductCard } from "@/components/future-product-card"
//import { Future-product-card } from "@/components/NewComponent"

interface CardData {
  src: string
  headline: string
  subheadline: string
  alt: string
  generatedCode: string
}

interface FormData {
  productImage: File | null
  headline: string
  subheadline: string
  generatedCode: string
}

export default function Home() {
  const [cardData, setCardData] = useState<CardData>({
    src: "",
    headline: "",
    subheadline: "",
    alt: "",
    generatedCode: "",
  })

  const [iframeContent, setIframeContent] = useState<string>("")

  useEffect(() => {
    if (cardData.generatedCode) {
      try {
        // Заменяем props на реальные значения
        const jsxWithProps = cardData.generatedCode
          .replace(/props\.src/g, `"${cardData.src || "/placeholder.svg"}"`)
          .replace(/props\.headline/g, `"${cardData.headline}"`)
          .replace(/props\.subheadline/g, `"${cardData.subheadline}"`)
          .replace(/props\.alt/g, `"${cardData.alt}"`)
          .replace(/\{props\.src\}/g, cardData.src || "/placeholder.svg")
          .replace(/\{props\.headline\}/g, cardData.headline)
          .replace(/\{props\.subheadline\}/g, cardData.subheadline)
          .replace(/\{props\.alt\}/g, cardData.alt)

        // Создаем полный HTML документ для iframe с встроенными стилями
     

    
      } catch (error) {
        console.error("Error creating iframe content:", error)
      }
    }
  }, [cardData])

  const handleGenerateCard = async (formData: FormData) => {
    let imageSrc = ""
    if (formData.productImage) {
      imageSrc = URL.createObjectURL(formData.productImage)
    }

    setCardData({
      src: imageSrc || "/placeholder.svg?height=400&width=400",
      headline: formData.headline,
      subheadline: formData.subheadline,
      alt: "Изображение продукта",
      generatedCode: formData.generatedCode,
    })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Генератор дизайн-карточек</h1>
      <div className="flex w-full max-w-5xl gap-8">
        <ProductForm onGenerate={handleGenerateCard} />
        <div className="flex flex-col gap-8">
          {cardData.src && (
            <div>
              <h2 className="text-xl font-bold mb-4">Стандартная карточка:</h2>
              <ProductCard
                src={cardData.src}
                headline={cardData.headline}
                subheadline={cardData.subheadline}
                alt={cardData.alt}
              />
            </div>
          )}

          {iframeContent && (
            <div>
              <h2 className="text-xl font-bold mb-4">Сгенерированная карточка:</h2>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <FutureProductCard
         />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}


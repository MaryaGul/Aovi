"use client"

import { useState, useEffect } from "react"
import { ProductForm } from "@/components/product-form"
import { ProductCard2 } from "@/components/product-card2"

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
        const html = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              /* Базовые стили Tailwind */
              *, ::before, ::after { box-sizing: border-box; border-width: 0; border-style: solid; border-color: #e5e7eb; }
              html { line-height: 1.5; -webkit-text-size-adjust: 100%; tab-size: 4; font-family: ui-sans-serif, system-ui, sans-serif; }
              body { margin: 0; line-height: inherit; }
              
              /* Утилиты Tailwind */
              .container { width: 100%; margin-right: auto; margin-left: auto; padding-right: 1rem; padding-left: 1rem; }
              .flex { display: flex; }
              .items-center { align-items: center; }
              .justify-center { justify-content: center; }
              .rounded-lg { border-radius: 0.5rem; }
              .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
              .p-4 { padding: 1rem; }
              .m-4 { margin: 1rem; }
              .text-center { text-align: center; }
              .font-bold { font-weight: 700; }
              .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
              .text-gray-700 { color: #374151; }
              .bg-white { background-color: #ffffff; }
              
              /* Дополнительные стили */
              .dynamic-card { width: 100%; height: 100%; }
              img { max-width: 100%; height: auto; }
              
              /* Медиа-запросы для адаптивности */
              @media (min-width: 640px) {
                .container { max-width: 640px; }
              }
              @media (min-width: 768px) {
                .container { max-width: 768px; }
              }
            </style>
          </head>
          <body>
            <div class="dynamic-card">
              ${jsxWithProps}
            </div>
            <script>
              // Здесь можно добавить JavaScript для интерактивности
              document.addEventListener('DOMContentLoaded', function() {
                console.log('Card loaded successfully');
              });
            </script>
          </body>
          </html>
        `

        setIframeContent(html)
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
              <ProductCard2
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
                <iframe
                  srcDoc={iframeContent}
                  className="w-full h-[600px] border-0"
                  title="Generated Card"
                  sandbox="allow-scripts"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}


'use client'

import { useState } from 'react'
import { ProductForm } from '@/components/product-form'
import { ProductCard } from '@/components/product-card'

export default function Home() {
  const [cardData, setCardData] = useState({
    publicId: '',
    backgroundId: '',
    headline: '',
    subheadline: '',
    alt: ''
  })

  const handleGenerateCard = async (formData: any) => {
    // TODO: Реализовать логику генерации карточки
    // Здесь должен быть вызов API для генерации изображения и получения publicId
    // Пока используем заглушку
    setCardData({
      publicId: '1чч_t7ztmx',
      backgroundId: '112_mqs5xy',
      headline: formData.headline,
      subheadline: formData.subheadline,
      alt: 'Сгенерированное изображение продукта'
    })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Генератор дизайн-карточек</h1>
      <div className="flex w-full max-w-5xl gap-8">
        <ProductForm onGenerate={handleGenerateCard} />
        {cardData.publicId && (
          <ProductCard
            publicId={cardData.publicId}
            backgroundId={cardData.backgroundId}
            headline={cardData.headline}
            subheadline={cardData.subheadline}
            alt={cardData.alt}
          />
        )}
      </div>
    </main>
  )
}


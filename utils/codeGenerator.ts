"use client"

import type { ProductFormData } from "@/types/product"

export async function generateCardCode(description: string, formData: ProductFormData): Promise<string> {
  try {
    // В реальном приложении здесь был бы запрос к API нейросети для генерации кода
    // Для демонстрации возвращаем шаблонный код, имитирующий ответ нейросети

    // Имитация задержки запроса к API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Важно: не используем импорты в сгенерированном коде, так как он будет выполняться динамически
    return `
function GeneratedProductCard({
  React,
  Image,
  lucideReact,
  generateId,
  image,
  headline,
  subheadline,
  alt,
  editable = true,
  handleTextSelection,
  handleIconSelect,
  headlineStyles,
  subheadlineStyles,
  featureStyles,
  features,
  getFeatureColor
}) {
  const { useState, useEffect } = React;
  const { Phone, Music, Heart, Battery, Wifi } = lucideReact;

  const initialFeatures = [
    { id: generateId(), name: 'Связь', icon: Phone, color: '#9333EA' },
    { id: generateId(), name: 'Музыка', icon: Music, color: '#9333EA' },
    { id: generateId(), name: 'Здоровье и спорт', icon: Heart, color: '#9333EA' },
    { id: generateId(), name: 'Мощная батарея', icon: Battery, color: '#9333EA' },
    { id: generateId(), name: 'Беспроводная зарядка', icon: Wifi, color: '#9333EA' },
  ];

  // Используем внешние features, если они предоставлены
  const displayFeatures = features || initialFeatures;

  return React.createElement(
    'div',
    {
      className: "relative w-[450px] h-[600px] overflow-hidden bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100"
    },
    [
      // Header Section
      React.createElement(
        'div',
        { key: 'header', className: "pt-8 px-4 space-y-4" },
        [
          React.createElement(
            'h1',
            {
              key: 'headline',
              className: "text-center select-text cursor-text",
              style: {
                ...(headlineStyles || {
                  fontFamily: 'var(--font-geist-sans)',
                  fontSize: '45px',
                  fontWeight: 'bold',
                  color: '#EC4899'
                }),
                background: 'linear-gradient(to right, #ec4899, #9333ea)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              },
              onMouseUp: editable && handleTextSelection ? (e) => handleTextSelection('headline', e) : undefined
            },
            headline || '${formData.headline || "Заголовок продукта"}'
          ),
          React.createElement(
            'div',
            { key: 'subheadline-container', className: "flex justify-center" },
            React.createElement(
              'h2',
              {
                className: "px-4 py-2 rounded-xl shadow-lg select-text cursor-text",
                style: {
                  ...(subheadlineStyles || {
                    fontFamily: 'var(--font-geist-sans)',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#000000'
                  }),
                  backgroundColor: 'white',
                },
                onMouseUp: editable && handleTextSelection ? (e) => handleTextSelection('subheadline', e) : undefined
              },
              subheadline || '${formData.subheadline || "Подзаголовок продукта"}'
            )
          )
        ]
      ),
      
      // Main Content
      React.createElement(
        'div',
        { key: 'main-content', className: "relative mt-12 pl-6 flex justify-between items-start" },
        [
          // Features List
          React.createElement(
            'div',
            { key: 'features-list', className: "space-y-5" },
            displayFeatures.map((feature) => 
              React.createElement(
                'div',
                { key: feature.id, className: "flex items-center gap-3" },
                [
                  React.createElement(
                    'div',
                    {
                      key: \`icon-\${feature.id}\`,
                      className: "w-10 h-10 rounded-[12px] shadow-lg flex items-center justify-center shrink-0 cursor-pointer",
                      style: { 
                        backgroundColor: getFeatureColor ? getFeatureColor(feature.id) : feature.color 
                      },
                      onClick: editable && handleIconSelect ? (e) => handleIconSelect(feature.id, e) : undefined
                    },
                    React.createElement(feature.icon, { className: "w-5 h-5 text-white" })
                  ),
                  React.createElement(
                    'span',
                    {
                      key: \`text-\${feature.id}\`,
                      className: "text-base font-medium leading-none select-text cursor-text",
                      style: featureStyles || {
                        fontFamily: 'var(--font-geist-sans)',
                        fontSize: '16px',
                        fontWeight: 'normal',
                        color: '#000000'
                      },
                      onMouseUp: editable && handleTextSelection ? (e) => handleTextSelection(feature.id, e) : undefined
                    },
                    feature.name
                  )
                ]
              )
            )
          ),
          
          // Product Image
          React.createElement(
            'div',
            { key: 'product-image-container', className: "relative -mr-32" },
            [
              React.createElement(
                'div',
                {
                  key: 'image-shadow',
                  className: "absolute -bottom-8 -right-8 w-[200px] h-[200px] bg-black/20 blur-3xl rounded-full"
                }
              ),
              React.createElement(
                Image,
                {
                  key: 'product-image',
                  src: image || "/placeholder.svg?height=400&width=400",
                  width: 300,
                  height: 400,
                  alt: alt || "Изображение продукта"
                }
              )
            ]
          )
        ]
      )
    ]
  );
}

return GeneratedProductCard;
    `
  } catch (error) {
    console.error("Error generating card code:", error)
    return "function() { return null; }"
  }
}

export function cleanGeneratedCode(code: string): string {
  return code
    .replace(/^[\s\S]*?function/i, "function")
    .replace(/<Thinking>[\s\S]*?<\/think>/gi, "")
    .replace(/Generated component code:/gi, "")
    .replace(/Clean component code:/gi, "")
    .replace(/```jsx|```tsx|```html|```|`/g, "")
    .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "")
    .trim()
}

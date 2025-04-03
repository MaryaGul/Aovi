"use client"

import type React from "react"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"

interface ProductFormProps {
  onGenerate: (formData: any) => void
}

export function ProductForm({ onGenerate }: ProductFormProps) {
  const [formData, setFormData] = useState({
    headline: "",
    subheadline: "",
    productDescription: "",
    removeBackground: false,
    referenceImage: null as File | null,
    productImage: null as File | null,
    generatedCode: "",
  })

  const handleInputChange = (field: string, value: string | boolean | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleGenerate = () => {
    onGenerate(formData)
  }

  const encodeImageFileAsURL = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        resolve(reader.result as string)
      }
      reader.readAsDataURL(file)
    })
  }

  const describePicture = async (imageBase64: string): Promise<string> => {
    try {
      let fullResponse = `The design effectively communicates the product's features and appeal while maintaining a clean and contemporary aesthetic. The use of negative space allows each element to breathe and not become too busy or cluttered, ensuring that the watch remains the star of the show. 
product-form.tsx:208 Reference image description:  The image you've provided appears to be a digital advertisement or promotional graphic for a smartwatch. Here is an analysis of the layout and design elements:

1. **Layout**: The layout is centered around the watch itself, with the product occupying the majority of the space. To its left, there are additional items that suggest what might be included in the purchase package or gift set. These include a book (suggesting educational content) and a pair of headphones (indicating an accessory), which flank the watch on both sides, creating a symmetrical effect.

2. **Visual Hierarchy**: The visual hierarchy is clear, with the watch as the central focal point. The text surrounding the watch is arranged in a way that guides the viewer's attention towards it.

3. **Spacing**: There is ample spacing around the watch and the additional items. This spacing helps to isolate the watch from the other elements, making it stand out as the main product.

4. **Colors**: The color scheme is consistent with a modern and tech-oriented brand. The use of cool tones (such as grey, black, and blue) gives the design a sleek and sophisticated feel. The warm colors used for the additional items provide contrast, drawing attention to them.

5. **Typography**: The typography is modern and clean. The choice of fonts appears to be minimalist, which contributes to the tech-savvy appeal. There are two main types of text: one in a sans-serif font for the product details and branding, and another in a script font that seems more casual or decorative.

6. **Special Design Elements**: The watch face is visible, showcasing its design features. The time on the watch face is set to 9:25, which may suggest a specific time of day or be part of the product's marketing strategy. There are icons and text elements that highlight key features or selling points such as battery life, water resistance, and possibly connectivity features.

7. **Interactive Elements**: The advertisement includes an interactive element in the form of a QR code, inviting potential customers to scan for more information or to purchase the product directly from this image.

8. **Cultural Context**: There is text in Cyrillic script, which indicates that the image might be targeted at Russian-speaking users or those familiar with the Cyrillic alphabet, suggesting a marketplace where products are sold in Russian.

9. **Commercial Elements**: The presence of price information (2,195 руб), as well as icons for different payment options and a phone number for customer service, indicates that this is a commercial advertisement designed to convert viewers into buyers.
`

      console.log("Llava full response:", fullResponse)
      return fullResponse || "No description available"
    } catch (error: unknown) {
      console.error("Error describing picture:", error)
      return `Failed to describe the image. Error: ${error instanceof Error ? error.message : "Unknown error"}`
    }
  }

  const generateCardCode = async (referenceDescription: string) => {
    try {
      let fullResponse = `<think>
Alright, I need to create a product card based on the user's requirements using Tailwind CSS. The design should be responsive and include placeholders for images, headline, subheadline, and alt text.

First, I'll structure the HTML with a main container div. To make it responsive, I'll use flexbox classes that adjust for different screen sizes, ensuring it looks good on all devices. The container should have a max width to prevent it from stretching too much on larger screens.

Next, I'll include an image placeholder using the provided {props.src} and set the alt text with {props.alt}. Placing it in a div with fixed dimensions will help maintain consistency across different layouts.

For the content, I'll position the headline above the image. Using flex classes, I can align the subheadline and additional info to the right side. The typography should be clean and modern, so I'll use sans-serif fonts for both the headline and subheadline.

Styling elements like buttons or QR codes would enhance interactivity. Since the example mentioned a QR code, I'll add a styled div with some shadow effect to simulate a scan area, though it's just a placeholder for now.

Color scheme is important. Using Tailwind's gray tones for backgrounds and contrasting colors for text ensures readability and modern appeal. I'll also include a price range in the subheadline to highlight the cost-effectiveness.

I'll ensure proper spacing using padding and margin classes, making sure elements don't look cramped. Hover effects can add interactivity without being too flashy, so I'll include a shadow transition effect on hover for the main container.

Finally, I'll test the structure to make sure it's responsive, adjusting classes as needed for mobile devices. This approach should meet all the user's requirements and create an appealing product card.
</think>

\`\`\`html
<div class="flex flex-col lg:flex-row items-center gap-8 max-w-6xl mx-auto px-4 py-12">
  <div class="relative">
    <img src="{props.src}" alt="{props.alt}" class="rounded-xl shadow-lg" />
  </div>
  
  <div class="flex-1">
    <h2 class="text-4xl font-bold text-gray-900 mb-4">{props.headline}</h2>
    <p class="text-lg text-gray-600 mb-6">{props.subheadline}</p>
    
    <!-- Interactive Elements -->
    <div class="flex items-center gap-6">
      <button class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-shadow duration-300 shadow-sm">Learn More</button>
      <div class="relative">
        <div class="absolute inset-0 bg-red-100 rounded-xl"></div>
        <span class="absolute -bottom-4 -right-6 text-red-600 font-medium">Scan for Details</span>
      </div>
    </div>

    <!-- Pricing -->
    <p class="text-gray-500 text-sm font-medium">Price: 2,195 руб</p>
  </div>
</div>
\`\`\``
    
      console.log(fullResponse)
      let cleanCode = fullResponse
        .replace(/^[\s\S]*?(<\w+)/i, "$1")
        .replace(/<think>[\s\S]*?<\/think>/gi, "")
        .replace(/<think>[\s\S]*?<\/think>/gi, "")
        .replace(/Generated component code:/gi, "")
        .replace(/Clean component code:/gi, "")
        .replace(/```jsx|```tsx|```html|```|`/g, "")
        .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "")
        .replace(/^[^<]*/m, "")
        .replace(/>[^<]*$/, ">")
        .trim()

      if (!cleanCode.startsWith("<")) {
        cleanCode = "<div>Error: Invalid generated code</div>"
      }

      console.log("Clean component code:", cleanCode)

      setFormData((prev) => ({
        ...prev,
        generatedCode: cleanCode,
      }))

      onGenerate({
        ...formData,
        generatedCode: cleanCode,
      })
    } catch (error) {
      console.error("Error generating card code:", error)
      setFormData((prev) => ({
        ...prev,
        generatedCode: "Error generating component code. Please try again.",
      }))
    }
  }

  const handleReferenceUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
    handleInputChange("referenceImage", file)

    if (file) {
      const imageBase64 = await encodeImageFileAsURL(file)
      const description = await describePicture(imageBase64)
      console.log("Reference image description:", description)

      setFormData((prev) => ({
        ...prev,
        productDescription: description,
      }))

      await generateCardCode(description)
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
        <Input type="file" id="reference-image" accept="image/*" onChange={handleReferenceUpload} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="product-image">Загрузить изображение продукта</Label>
        <Input type="file" id="product-image" accept="image/*" onChange={handleProductImageUpload} />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="remove-background"
          checked={formData.removeBackground}
          onCheckedChange={(checked) => handleInputChange("removeBackground", checked === true)}
        />
        <Label htmlFor="remove-background">Удалить фон</Label>
      </div>

      <Button onClick={handleGenerate} className="w-full">
        Применить сгенерированный дизайн
      </Button>
    </div>
  )
}
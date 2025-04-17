export async function describePicture(imageBase64: string): Promise<string> {
  try {
    // В реальном приложении здесь был бы запрос к API для описания изображения
    // Для демонстрации возвращаем шаблонное описание
    return `
    The image appears to be a product advertisement for a smartwatch or wearable device. 
    The layout is clean and modern with the product as the central focus. 
    The design uses a gradient background that transitions from light to dark colors.
    There are feature highlights arranged in a list format with icons next to each feature.
    The typography is modern with a bold headline and a lighter subheadline.
    `
  } catch (error) {
    console.error("Error describing picture:", error)
    return `Failed to describe the image. Error: ${error instanceof Error ? error.message : "Unknown error"}`
  }
}


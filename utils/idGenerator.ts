/**
 * Генерирует простой уникальный идентификатор
 * Заменяет библиотеку uuid, которая недоступна в текущей среде
 */
export function generateId(): string {
  // Создаем уникальный ID на основе времени и случайного числа
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9)
}


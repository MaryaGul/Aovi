"use client"

import { useState, useCallback } from "react"
import type { Feature } from "@/types/product"
import { generateId } from "@/utils/idGenerator"
import { Phone, Music, Heart, Battery, Wifi } from "lucide-react"

const defaultFeatures: Feature[] = [
  { id: generateId(), name: "Связь", icon: Phone, color: "#9333EA" },
  { id: generateId(), name: "Музыка", icon: Music, color: "#9333EA" },
  { id: generateId(), name: "Здоровье и спорт", icon: Heart, color: "#9333EA" },
  { id: generateId(), name: "Мощная батарея", icon: Battery, color: "#9333EA" },
  { id: generateId(), name: "Беспроводная зарядка", icon: Wifi, color: "#9333EA" },
]

export function useFeatures(initialFeatures = defaultFeatures) {
  const [features, setFeatures] = useState<Feature[]>(initialFeatures)
  // Создаем отдельное состояние для цветов иконок
  const [iconColors, setIconColors] = useState<Record<string, string>>(() => {
    const colors: Record<string, string> = {}
    initialFeatures.forEach((feature) => {
      colors[feature.id] = feature.color
    })
    return colors
  })

  const updateFeatureText = useCallback((id: string, newText: string) => {
    setFeatures((prev) => prev.map((feature) => (feature.id === id ? { ...feature, name: newText } : feature)))
  }, [])

  const updateFeatureColor = useCallback((id: string, color: string) => {
    console.log(`Updating color for feature ${id} to ${color}`)
    // Обновляем цвет в отдельном состоянии
    setIconColors((prev) => ({
      ...prev,
      [id]: color,
    }))
    // Также обновляем цвет в features для совместимости
    setFeatures((prev) => {
      return prev.map((feature) => (feature.id === id ? { ...feature, color } : feature))
    })
  }, [])

  const getFeatureColor = useCallback(
    (id: string) => {
      // Получаем цвет из отдельного состояния
      return iconColors[id] || "#9333EA"
    },
    [iconColors],
  )

  const addFeature = useCallback((feature: Omit<Feature, "id">) => {
    const newId = generateId()
    const newFeature = { ...feature, id: newId }
    setFeatures((prev) => [...prev, newFeature])
    // Добавляем цвет в отдельное состояние
    setIconColors((prev) => ({
      ...prev,
      [newId]: feature.color || "#9333EA",
    }))
    return newId
  }, [])

  const removeFeature = useCallback((id: string) => {
    setFeatures((prev) => prev.filter((feature) => feature.id !== id))
    // Удаляем цвет из отдельного состояния
    setIconColors((prev) => {
      const newColors = { ...prev }
      delete newColors[id]
      return newColors
    })
  }, [])

  return {
    features,
    updateFeatureText,
    updateFeatureColor,
    getFeatureColor,
    addFeature,
    removeFeature,
  }
}


import React, { useState, useEffect, useCallback } from 'react'
// import Image from 'next/image'
import { Phone, Music, Heart, Battery, Wifi } from 'lucide-react'
// import { TextEditor } from './TextEditor'
// import { ColorPicker } from './ColorPicker'
// import { Label } from "@/components/ui/label";
interface Feature {
  name: string;
  icon: React.ElementType;
  color: string;
}
const initialFeatures: Feature[] = [
  { name: 'Связь', icon: Phone, color: '#9333EA' },
  { name: 'Музыка', icon: Music, color: '#9333EA' },
  { name: 'Здоровье и спорт', icon: Heart, color: '#9333EA' },
  { name: 'Мощная батарея', icon: Battery, color: '#9333EA' },
  { name: 'Беспроводная зарядка', icon: Wifi, color: '#9333EA' },
]
interface FutureProductCardProps {
  publicId: string;
  backgroundId: string;
  headline: string;
  subheadline: string;
  alt: string;
}
interface TextStyles {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  color: string;
}
export function FutureProductCard({
  publicId,
  backgroundId,
  headline: initialHeadline,
  subheadline: initialSubheadline,
  alt,
}: FutureProductCardProps) {
  const [headline, setHeadline] = useState(initialHeadline);
  const [subheadline, setSubheadline] = useState(initialSubheadline);
  const [features, setFeatures] = useState(initialFeatures);
  const [selectedText, setSelectedText] = useState<'headline' | 'subheadline' | number | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<number | null>(null);
  const [editorPosition, setEditorPosition] = useState({ x: 0, y: 0 });
  const [headlineStyles, setHeadlineStyles] = useState<TextStyles>({
    fontFamily: 'Times New Roman',
    fontSize: '45px',
    fontWeight: 'bold',
    color: '#EC4899'
  });
  const [subheadlineStyles, setSubheadlineStyles] = useState<TextStyles>({
    fontFamily: 'Arial',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#000000'
  });
  const [featureStyles, setFeatureStyles] = useState<TextStyles>({
    fontFamily: 'Arial',
    fontSize: '16px',
    fontWeight: 'normal',
    color: '#000000'
  });
 
  return (
    <div className="relative w-[450px] h-[600px] overflow-hidden bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
    {/* Header Section */}
    <div className="pt-8 px-4 space-y-4">
      <h1
        className="text-center select-text cursor-text"
      
      >
        Новый компонент
      </h1>
      </div></div>
  )
}

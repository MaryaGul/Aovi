
import React, { useState, useEffect, useCallback } from 'react'
import { CldImage } from 'next-cloudinary'
import { Phone, Music, Heart, Battery, Wifi } from 'lucide-react'
import { TextEditor } from './TextEditor'
import { ColorPicker } from './ColorPicker'
import { Label } from "@/components/ui/label";
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
interface ProductCardProps {
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
export function ProductCard({
  publicId,
  backgroundId,
  headline: initialHeadline,
  subheadline: initialSubheadline,
  alt,
}: ProductCardProps) {
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
  const handleTextSelection = (type: 'headline' | 'subheadline' | number, event: React.MouseEvent) => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      setSelectedText(type);
      setSelectedIcon(null);
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setEditorPosition({
        x: Math.min(rect.left, window.innerWidth - 220),
        y: rect.bottom + window.scrollY + 10
      });
    }
  };
  const handleStyleChange = (property: keyof TextStyles, value: string) => {
    if (selectedText === 'headline') {
      setHeadlineStyles(prev => ({ ...prev, [property]: value }));
      setHeadline(prev => prev); // Trigger re-render
    } else if (selectedText === 'subheadline') {
      setSubheadlineStyles(prev => ({ ...prev, [property]: value }));
      setSubheadline(prev => prev); // Trigger re-render
    } else if (typeof selectedText === 'number') {
      setFeatureStyles(prev => ({ ...prev, [property]: value }));
      setFeatures(prev => [...prev]); // Trigger re-render
    }
  };
  const handleFeatureTextChange = (index: number, newText: string) => {
    setFeatures(prev => {
      const newFeatures = [...prev];
      newFeatures[index] = { ...newFeatures[index], name: newText };
      return newFeatures;
    });
  };
  const handleIconColorChange = useCallback((index: number, color: string) => {
    setFeatures(prev => {
      const newFeatures = [...prev];
      newFeatures[index] = { ...newFeatures[index], color: color };
      return newFeatures;
    });
    console.log(`Icon color changed for index ${index} to ${color}`);
  }, []);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const textEditor = document.getElementById('text-editor');
      const colorPicker = document.getElementById('color-picker');
      const isClickInsideTextEditor = textEditor?.contains(event.target as Node);
      const isClickInsideColorPicker = colorPicker?.contains(event.target as Node);
    
      if (!isClickInsideTextEditor && !isClickInsideColorPicker) {
        if (!window.getSelection()?.toString()) {
          setSelectedText(null);
        }
        if (!isClickInsideColorPicker) {
          setSelectedIcon(null);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div className="relative w-[450px] h-[600px] overflow-hidden bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      {/* Header Section */}
      <div className="pt-8 px-4 space-y-4">
        <h1
          className="text-center select-text cursor-text"
          style={{
            ...headlineStyles,
            background: 'linear-gradient(to right, #ec4899, #9333ea)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          onMouseUp={(e) => handleTextSelection('headline', e)}
        >
          {headline}
        </h1>
        <div className="flex justify-center">
          <h2
            className="px-4 py-2 rounded-xl shadow-lg select-text cursor-text"
            style={{
              ...subheadlineStyles,
              backgroundColor: 'white',
            }}
            onMouseUp={(e) => handleTextSelection('subheadline', e)}
          >
            {subheadline}
          </h2>
        </div>
      </div>
      {/* Main Content */}
      <div className="relative mt-12 pl-6 flex justify-between items-start">
        {/* Features List */}
        <div className="space-y-5">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-[12px] shadow-lg flex items-center justify-center shrink-0 cursor-pointer"
                style={{ backgroundColor: feature.color }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedText(null);
                  setSelectedIcon(index);
                  const rect = e.currentTarget.getBoundingClientRect();
                  setEditorPosition({
                    x: rect.left,
                    y: rect.bottom + window.scrollY + 10
                  });
                }}
              >
                <feature.icon className="w-5 h-5 text-white" />
              </div>
              <span 
                className="text-base font-medium leading-none select-text cursor-text"
                style={featureStyles}
                onMouseUp={(e) => handleTextSelection(index, e)}
              >
                {feature.name}
              </span>
            </div>
          ))}
        </div>
        {/* Product Image */}
        <div className="relative -mr-32">
          <div className="absolute -bottom-8 -right-8 w-[200px] h-[200px] bg-black/20 blur-3xl rounded-full"></div>
          <CldImage
            src={publicId}
            alt={alt}
            width={900}
            height={1200}
            angle={12}
            className="max-w-lg z-10"
          />
        </div>
      </div>
      {selectedText !== null && (
        <TextEditor
          position={editorPosition}
          onStyleChange={handleStyleChange}
          currentStyles={
            selectedText === 'headline' 
              ? headlineStyles 
              : selectedText === 'subheadline'
                ? subheadlineStyles
                : featureStyles
          }
          onTextChange={
            typeof selectedText === 'number'
              ? (newText) => handleFeatureTextChange(selectedText, newText)
              : undefined
          }
          initialText={
            typeof selectedText === 'number'
              ? features[selectedText].name
              : undefined
          }
        />
      )}
      {selectedIcon !== null && (
        <div id="color-picker" className="fixed bg-white rounded-lg shadow-lg border border-gray-200 p-3 space-y-2" style={{
          top: editorPosition.y,
          left: editorPosition.x,
          zIndex: 10001,
        }}>
          <Label>Цвет иконки</Label>
          <ColorPicker
            color={features[selectedIcon].color}
            onChange={(color) => handleIconColorChange(selectedIcon, color)}
          />
        </div>
      )}
    </div>
  )
}

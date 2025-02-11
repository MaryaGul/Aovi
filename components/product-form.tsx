'use client';

import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProductFormProps {
  onGenerate: (formData: any) => void;
}

export function ProductForm({ onGenerate }: ProductFormProps) {
  const [formData, setFormData] = useState({
    headline: '',
    subheadline: '',
    productDescription: '',
    removeBackground: false,
    referenceImage: null as File | null,
  });

  const handleInputChange = (field: string, value: string | boolean | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => {
    onGenerate(formData);
  };

  const handleReferenceUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    handleInputChange('referenceImage',  file);
    console.log(file, 2)
    
  };

  const handleProductUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    handleInputChange('productImage',  file);
    console.log(file, 2)
  };


  return (
    <div className="w-full max-w-md space-y-6 p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-2">
        <Label htmlFor="headline">Заголовок</Label>
        <Input
          id="headline"
          value={formData.headline}
          onChange={(e) => handleInputChange('headline', e.target.value)}
          placeholder="Введите заголовок"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subheadline">Подзаголовок</Label>
        <Input
          id="subheadline"
          value={formData.subheadline}
          onChange={(e) => handleInputChange('subheadline', e.target.value)}
          placeholder="Введите подзаголовок"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="product-description">Описание продукта</Label>
        <Textarea
          id="product-description"
          value={formData.productDescription}
          onChange={(e) => handleInputChange('productDescription', e.target.value)}
          placeholder="Введите описание продукта здесь..."
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="reference-image">Загрузить референс</Label>
        <Input
          type="file"
          id="reference-image"
          accept="image/*"
          onChange={handleReferenceUpload}
        />
      </div>

      
      <div className="space-y-2">
        <Label htmlFor="product-image">Загрузить фотографию товара</Label>
        <Input
          type="file"
          id="product-image"
          accept="image/*"
          onChange={handleProductUpload}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox 
          id="remove-background" 
          checked={formData.removeBackground}
          onCheckedChange={(checked) => handleInputChange('removeBackground', checked === true)}
        />
        <Label htmlFor="remove-background">Удалить фон</Label>
      </div>

      <Button onClick={handleGenerate} className="w-full">
        Сгенерировать
      </Button>
    </div>
  );
}


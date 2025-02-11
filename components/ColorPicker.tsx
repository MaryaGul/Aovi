import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const colors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', 
  '#F06292', '#BA68C8', '#FFD54F', '#4DB6AC', '#7986CB'
];

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          className="w-8 h-8 rounded-full p-0 border border-gray-300" 
          style={{ backgroundColor: color }}
        />
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="grid grid-cols-5 gap-2">
          {colors.map((c) => (
            <Button
              key={c}
              className="w-8 h-8 rounded-full p-0"
              style={{ backgroundColor: c }}
              onClick={() => onChange(c)}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
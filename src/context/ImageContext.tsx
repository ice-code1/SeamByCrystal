// src/context/ImageContext.tsx
import React, { createContext, useContext, useState } from 'react';

type Image = {
  id: number;
  src: string;
  title: string;
  category: string;
  uploadDate?: string;
};

type ImageContextType = {
  galleryImages: Image[];
  setGalleryImages: React.Dispatch<React.SetStateAction<Image[]>>;

  shopImages: Image[];
  setShopImages: React.Dispatch<React.SetStateAction<Image[]>>;
};

const ImageContext = createContext<ImageContextType | null>(null);

export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImageContext must be used within an ImageProvider');
  }
  return context;
};

export const ImageProvider = ({ children }: { children: React.ReactNode }) => {
  const [galleryImages, setGalleryImages] = useState<Image[]>(() => {
    try {
      const stored = localStorage.getItem('galleryImages');
      return stored ? (JSON.parse(stored) as Image[]) : [];
    } catch {
      return [];
    }
  });

  const [shopImages, setShopImages] = useState<Image[]>(() => {
    try {
      const stored = localStorage.getItem('shopImages');
      return stored ? (JSON.parse(stored) as Image[]) : [];
    } catch {
      return [];
    }
  });

  return (
    <ImageContext.Provider value={{ galleryImages, setGalleryImages, shopImages, setShopImages }}>
      {children}
    </ImageContext.Provider>
  );
};

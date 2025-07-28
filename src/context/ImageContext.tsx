import React, { createContext, useContext, useEffect, useState } from 'react';

import { supabase } from '../superbaseclient';

type Image = {
  id: number;
  image_url: string;
  title: string;
  category: string;
  price: string;
  upload_date?: string;
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
  const [galleryImages, setGalleryImages] = useState<Image[]>([]);
  const [shopImages, setShopImages] = useState<Image[]>([]);

  // Fetch data from Supabase
  useEffect(() => {
    const fetchGalleryImages = async () => {
      const { data, error } = await supabase.from('gallery').select('*');
      if (error) {
        console.error('Error fetching gallery images:', error);
      } else {
        setGalleryImages(data as Image[]);
      }
    };

    fetchGalleryImages();
  }, []);

  return (
    <ImageContext.Provider value={{ galleryImages, setGalleryImages, shopImages, setShopImages }}>
      {children}
    </ImageContext.Provider>
  );
};

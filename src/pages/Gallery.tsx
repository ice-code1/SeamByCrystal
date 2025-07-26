import React, { useState } from 'react';
import { useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { useImageContext } from '../context/ImageContext';



const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { galleryImages, setGalleryImages } = useImageContext();
  useEffect(() => {
  console.log("Gallery images in Admin:", galleryImages);
}, [galleryImages]);

  

  // const galleryImages = [
  //   {
  //     id: 1,
  //     src: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
  //     title: 'Elegant Evening Gown',
  //     category: 'Evening Wear'
  //   },
  //   {
  //     id: 2,
  //     src: 'https://images.pexels.com/photos/2065195/pexels-photo-2065195.jpeg',
  //     title: 'Professional Business Suit',
  //     category: 'Business Wear'
  //   },
  //   {
  //     id: 3,
  //     src: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg',
  //     title: 'Bohemian Summer Dress',
  //     category: 'Casual Wear'
  //   },
  //   {
  //     id: 4,
  //     src: 'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg',
  //     title: 'Wedding Dress Collection',
  //     category: 'Bridal'
  //   },
  //   {
  //     id: 5,
  //     src: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
  //     title: 'Cocktail Party Dress',
  //     category: 'Party Wear'
  //   },
  //   {
  //     id: 6,
  //     src: 'https://images.pexels.com/photos/2065200/pexels-photo-2065200.jpeg',
  //     title: 'Traditional African Print',
  //     category: 'Cultural Wear'
  //   },
  //   {
  //     id: 7,
  //     src: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg',
  //     title: 'Modern Blazer Design',
  //     category: 'Professional'
  //   },
  //   {
  //     id: 8,
  //     src: 'https://images.pexels.com/photos/1448665/pexels-photo-1448665.jpeg',
  //     title: 'Vintage Inspired Dress',
  //     category: 'Vintage'
  //   },
  //   {
  //     id: 9,
  //     src: 'https://images.pexels.com/photos/1536620/pexels-photo-1536620.jpeg',
  //     title: 'Designer Jacket',
  //     category: 'Outerwear'
  //   }
  // ];

  const categories = ['All', 'Evening Wear', 'Business Wear', 'Casual Wear', 'Bridal', 'Party Wear', 'Cultural Wear'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredImages = activeCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Our
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {' '}Gallery
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our portfolio of stunning creations. Each piece tells a unique story of craftsmanship and creativity.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                    <p className="text-sm opacity-90">{image.category}</p>
                  </div>
                  <div className="absolute top-6 right-6">
                    <ZoomIn className="h-6 w-6 text-white opacity-80" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="w-full h-full object-contain rounded-lg"
            />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
              <p className="text-lg opacity-90">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Love What You See?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Every piece in our gallery can be customized to your preferences. Let's create something beautiful together.
          </p>
          <a
            href="https://wa.me/2349039299059?text=Hi%20Crystal!%20I%20saw%20your%20gallery%20and%20I'm%20interested%20in%20creating%20a%20custom%20piece.%20Could%20we%20discuss%20options?"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 inline-block"
          >
            Start Your Custom Design
          </a>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
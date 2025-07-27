import React, { useState } from 'react';
import { MessageCircle, Heart, Eye } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useImageContext } from '../context/ImageContext';
import ScrollScissor from '../components/ScrollScissor';
import { supabase } from '../superbaseclient';
import { useEffect } from 'react';

const categories = [
  'All',
  'Evening Wear',
  'Business Wear',
  'Casual Wear',
  'Bridal',
  'Party Wear',
  'Cultural Wear',
];

  const Shop = () => {
    const { shopImages, setShopImages } = useImageContext();
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
      const fetchShopImages = async () => {
        try {
          const { data, error } = await supabase.from('shop_items').select('*');
          if (error) throw error;

          const formattedData = data.map((item) => ({
            id: item.id,
            src: item.image_url,
            title: item.name,
            category: item.category,
            uploadDate: item.created_at,
            description: item.description,
            image_url: item.image_url,
            name: item.name,
          }));

          setShopImages(formattedData);
        } catch (error) {
          console.error('Error fetching shop images:', error);
        }
      };

      fetchShopImages();
    }, [setShopImages]);

    const filteredImages =
      activeCategory === 'All'
        ? shopImages
        : shopImages.filter((img) => img.category === activeCategory);

    const handleNegotiate = (product) => {
      const message = `Hi Crystal! I'm interested in negotiating for the "${product.name}" (${product.category}).

  Product Details:
  - Name: ${product.name}
  - Category: ${product.category}
  - Description: ${product.description}
  - Image: ${product.image_url}

  Could we discuss customization options and pricing? Thank you!`;

      const whatsappUrl = `https://wa.me/+2349039299059?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    };

  return (
    <>
      <Navbar />
      <ScrollScissor />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Our <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Collection</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our curated selection of bespoke designs. Each piece can be customized to your exact specifications.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <div className="p-4">
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full border transition-all ${
                  activeCategory === category
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Filtered Products Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredImages.length === 0 ? (
              <p className="text-center text-gray-500">No products found in this category.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredImages.map((product) => (
                  <div
                    key={product.id}
                    className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button className="p-2 bg-white rounded-full shadow-lg hover:bg-purple-50 transition-colors">
                            <Heart className="h-5 w-5 text-purple-600" />
                          </button>
                        </div>
                        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button className="p-2 bg-white rounded-full shadow-lg hover:bg-purple-50 transition-colors">
                            <Eye className="h-5 w-5 text-purple-600" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                          {product.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                      <button
                        onClick={() => handleNegotiate(product)}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-full font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                      >
                        <MessageCircle className="h-5 w-5" />
                        Negotiate on WhatsApp
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Custom Design CTA */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Don't See What You're Looking For?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              We specialize in custom designs! Share your inspiration and we’ll bring it to life.
            </p>
            <a
              href="https://wa.me/2349039299059?text=Hi%20Crystal!%20I'd%20like%20to%20discuss%20a%20custom%20design.%20Could%20we%20schedule%20a%20consultation?"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2"
            >
              <MessageCircle className="h-5 w-5" />
              Request Custom Design
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

export default Shop;

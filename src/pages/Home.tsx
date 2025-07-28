import React from 'react';
import { useState, useEffect } from "react";

import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Award } from 'lucide-react';

const Home = () => {
  const stats = [
    { icon: Star, label: 'Years Experience', value: '10+' },
    { icon: Users, label: 'Happy Clients', value: '500+' },
    { icon: Award, label: 'Awards Won', value: '15+' },
  ];

    const heroImages = [
    "/images/SeamByCrystal.jpg",
    "/images/bg4.jpg",
    "/images/bg5.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000); // change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat">

        {/* Blurred Background Layer */}
        <div
          className="absolute inset-0 bg-cover bg-center filter backdrop-blur   scale-80"
          style={{
            backgroundImage: `url(${heroImages[currentImage]})`,
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/20" />

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-gold-500 bg-clip-text text-transparent">
              Crafting Dreams
            </span>
            <br />
            <span className="text-gray-800">Into Reality</span>
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto leading-relaxed">
            <span className="font-bold">Where fashion meets artistry.</span> Experience bespoke designs that tell your unique story through every stitch.
          </p>


          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Explore Collection <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/training"
              className="border-2 border-purple-600 bg-purple-600 text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-purple-600 transition-all duration-300"
            >
              Schedule Training
            </Link>



          </div>
        </div>

        {/* Floating fabric pieces */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-200 rounded-full opacity-20 animate-pulse animation-delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gold-200 rounded-full opacity-20 animate-pulse animation-delay-2000" />
      </section>


      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-all duration-300">
                <stat.icon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <div className="text-4xl font-bold text-gray-800 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work */}
      {/* Featured Work */}
<section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        Featured Collections
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Discover our latest creations that blend traditional craftsmanship with contemporary design
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        { src: '/images/Bridal.jpg', title: 'Bridal Elegance' },
        { src: '/images/style.jpg', title: 'Style Essence' },
        { src: '/images/Love.jpg', title: 'Timeless Love' },
      ].map((item, index) => (
        <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div
            className="aspect-[4/5] bg-cover bg-center"
            style={{ backgroundImage: `url('${item.src}')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-sm opacity-90">Elegant designs for special occasions</p>
            </div>
          </div>
        </div>
      ))}
    </div>
          <div className="text-center mt-12">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
            >
              View Full Gallery <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
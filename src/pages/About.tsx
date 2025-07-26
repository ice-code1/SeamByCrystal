import React from 'react';
import { Heart, Scissors, Users, Award } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Passion-Driven',
      description: 'Every piece is crafted with love and dedication to perfection'
    },
    {
      icon: Scissors,
      title: 'Expert Craftsmanship',
      description: 'Years of experience in traditional and modern sewing techniques'
    },
    {
      icon: Users,
      title: 'Client-Centered',
      description: 'Your vision and comfort are our top priorities'
    },
    {
      icon: Award,
      title: 'Quality Assured',
      description: 'Premium materials and meticulous attention to detail'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
                About
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {' '}Crystal
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Welcome to Seamsbycrystal, where fashion dreams come to life through the artistry of skilled hands and passionate hearts. Founded with a vision to create timeless pieces that celebrate individuality, we have been crafting bespoke garments that tell unique stories.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our journey began with a simple belief: that everyone deserves to wear something that makes them feel extraordinary. From elegant evening gowns to contemporary casual wear, every piece is a testament to our commitment to excellence.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-purple-200 to-pink-200 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden">
                <img
                  src="/images/Crystal.jpg"
                  alt="Crystal"
                  className="object-cover w-full h-full rounded-2xl"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Scissors className="h-12 w-12 text-purple-600" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide every stitch, every design, and every interaction
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <value.icon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
              Our Story
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                It all started in a small studio, with a vision to transform the way people experience fashion. Crystal, our founder, discovered her passion for sewing at a young age, learning from her grandmother who was a master seamstress in her own right.
              </p>
              <p>
                Over the years, what began as a hobby evolved into a calling. After completing formal training in fashion design and pattern making, Crystal established Seamsbycrystal with a mission to create clothing that not only looks beautiful but also empowers the wearer.
              </p>
              <p>
                Today, we continue to honor traditional craftsmanship while embracing modern techniques and sustainable practices. Every garment that leaves our studio carries with it a piece of our story and a promise of quality that stands the test of time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Ready to Create Something Beautiful?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's bring your fashion dreams to life. Schedule a consultation and discover the possibilities.
          </p>
          <a
            href="https://wa.me/2349039299059?text=Hi%20Crystal,%20I'd%20like%20to%20schedule%20a%20consultation%20for%20a%20custom%20design."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 inline-block"
          >
            Get In Touch
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
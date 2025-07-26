import React from 'react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/shop', label: 'Shop' },
    { path: '/training', label: 'Schedule Training' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/admin', label: '*' }
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-12 border-t dark:border-gray-700">
      <div className="container mx-auto px-4 grid gap-10 md:grid-cols-4 text-sm">

        {/* Brand + Contact Info */}
        <div>
          <h2 className="text-2xl font-bold mb-2">SeamsByCrystal</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4 italic">
            Tailoring Excellence • Fashion Training • Empowerment
          </p>
          <ul className="space-y-1 text-gray-600 dark:text-gray-300">
            <li>📍 Ajetumobi,Agbowo Ibadan</li>
            <li>📞 +234 903 9299 059</li>
            <li>📧 seamsbycrystal@gmail.com</li>
            <li>🕘 Mon - Sat, 9:00 AM - 6:00 PM</li>
          </ul>
        </div>

        {/* Quick Links (mapped) */}
        <div>
        <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            {navItems.map((item) => (
            <li key={item.path}>
                <a href={item.path} className="hover:text-purple-600 dark:hover:text-pink-400 transition">
                {item.label}
                </a>
            </li>
            ))}
        </ul>
        </div>


        {/* Newsletter Signup */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Subscribe to Our Newsletter</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-3">
            Stay updated on fashion tips, training, and offers.
          </p>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 rounded border dark:bg-gray-800 dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              type="submit"
              className="bg-black text-white py-2 rounded hover:bg-gray-800 transition dark:bg-white dark:text-black"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Testimonials Badge / Social */}
        <div>
          <h3 className="font-semibold text-lg mb-3">What Our Clients Say</h3>
          {/* Replace this div with actual embed code or slider later */}
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm italic mb-3">
            “Crystal transformed my look completely! 10/10 recommend.” – Titi A.
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-4 text-xl mt-3">
            <a href="https://www.instagram.com/_seamsbycrystal/" target="_blank" rel="noreferrer" className="hover:text-pink-400 transition">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://wa.me/+2349039299059" target="_blank" rel="noreferrer" className="hover:text-green-500 transition">
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href="https://www.tiktok.com/@_seamsbycrystal" target="_blank" rel="noreferrer" className="hover:text-gray-400 transition">
              <i className="fab fa-tiktok"></i>
            </a>
            <a href="https://web.facebook.com/profile.php?id=100063697011571" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition">
              <i className="fab fa-facebook"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 text-center text-xs text-gray-500 dark:text-gray-400 border-t pt-4 dark:border-gray-700">
        <p>&copy; {new Date().getFullYear()} SeamsByCrystal. All rights reserved.</p>
        <button
          onClick={scrollToTop}
          className="mt-2 text-sm underline hover:text-black dark:hover:text-white transition"
        >
          Back to Top ↑
        </button>
      </div>
    </footer>
  );
};

export default Footer;

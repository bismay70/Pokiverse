import React from 'react';
    

const Footer = () => (
  <footer className="bg-gradient-to-r from-black via-red-950 to-red-800
 text-white mt-auto">
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        
        {/* GitHub Link */}
        <a
          href="https://github.com/bismay70"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors group"
        >
          {/* GitHub icon (SVG) */}
          <svg
            className="w-6 h-6 group-hover:scale-110 transition-transform"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.42 7.9 10.96.58.1.79-.25.79-.56 0-.28-.01-1.01-.01-1.98-3.22.7-3.9-1.55-3.9-1.55-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.74 1.26 3.41.96.1-.75.41-1.26.74-1.55-2.57-.3-5.28-1.28-5.28-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.5.12-3.12 0 0 .98-.31 3.2 1.18.94-.26 1.95-.39 2.95-.39 1 .01 2.01.14 2.95.39 2.22-1.49 3.2-1.18 3.2-1.18.64 1.62.24 2.82.12 3.12.75.81 1.2 1.84 1.2 3.1 0 4.43-2.72 5.39-5.3 5.68.42.36.79 1.1.79 2.22 0 1.6-.01 2.89-.01 3.28 0 .31.2.67.8.55C20.7 21.41 24 17.1 24 12c0-6.35-5.15-11.5-11.5-11.5z"
            />
          </svg>
          <span>GitHub</span>
        </a>

        {/* Developer Info with Image */}
        <div className="bg-black/30 rounded-lg p-4 text-center shadow-md backdrop-blur-sm">
          <img 
            src="/images/bismay.jpg" 
            alt="Developer"
            className="w-24 h-24 rounded-full mx-auto mb-2 object-cover border-2 border-white"
          />
          <h3 className="font-semibold">Meet the Developer</h3>
          <p className="text-gray-300 text-sm">Bismay Samal</p>
        </div>

        {/* LinkedIn Link */}
        <a
          href="https://www.linkedin.com/in/bismay-samal-134b75312?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors group"
        >
          {/* LinkedIn icon (SVG) */}
          <svg
            className="w-6 h-6 group-hover:scale-110 transition-transform"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 
            0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 
            19h-3v-10h3v10zm-1.5-11.25c-.97 
            0-1.75-.78-1.75-1.75s.78-1.75 
            1.75-1.75 1.75.78 1.75 
            1.75-.78 1.75-1.75 
            1.75zm13.5 11.25h-3v-5.5c0-1.1-.9-2-2-2s-2 
            .9-2 2v5.5h-3v-10h3v1.25c.8-1.1 
            2.2-1.75 3.5-1.75 2.49 0 4.5 2.01 
            4.5 4.5v6z"/>
          </svg>
          <span>LinkedIn</span>
        </a>
      </div>

      <div className="border-t border-red-500 mt-8 pt-4 text-center">
        <p className="text-gray-400 text-sm">
          © 2025 Pokiverse. Made with ❤️ by bismay70
        </p>
      </div>
    </div>
  </footer>
);
 export default Footer;

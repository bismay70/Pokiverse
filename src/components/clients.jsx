import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Use public asset via root-served URL (do not import from /public)
const ProfilePhoto = "/images/ball.png";

gsap.registerPlugin(ScrollTrigger);

const ClientPage = ({ setCurrentRoute }) => {
  useGSAP(() => {
    gsap.from("#client", {
      scale: 1.5,
      scrollTrigger: {
        trigger: "#client",
        scrub: true,
      },
    });
  });

  return (
    <section className="w-full min-h-screen py-[200px] max-lg:py-[70px] max-md:py-[60px] max-sm:py-[80px] bg-gradient-to-r from-black via-red-950 to-red-800 flex justify-center items-center flex-col relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-900/20 blur-[120px] rounded-full"></div>

      <div className="w-[1200px] max-lg:w-[90%] max-sm:w-[95%] flex flex-col gap-[80px] max-sm:gap-[40px] items-center relative z-10">
        <div className="w-full overflow-hidden">
          <h1
            id="client"
            className="font-montserrat text-[5vw] max-lg:text-[10vw] font-black leading-[110%] text-center text-white tracking-tighter"
          >
            What our <span className="text-red-500">players</span> say
          </h1>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="w-full flex flex-col gap-12">
          {[
            {
              name: "Bismay Samal",
              role: "Pokiverse Creator",
              text: "Pokiverse is a collection of engaging pokemon games designed to challenge your mind and provide endless entertainment. From classic word games like Hangman to strategic puzzle games, I've got something for everyone.",
              rating: 5
            },
            {
              name: "Alex Rivera",
              role: "Pro Trainer",
              text: "The puzzle mechanics in Pokiverse are genuinely innovative. It's not just another fan game; it's a well-crafted experience that keeps me coming back for more every single day.",
              rating: 5
            },
            {
              name: "Jordan Chen",
              role: "Casual Gamer",
              text: "I love how smooth the animations are. The attention to detail in the UI makes playing these mini-games a premium experience. Highly recommended for any Pokemon fan!",
              rating: 4
            }
          ].map((testimonial, index) => (
            <div
              key={index}
              className="rounded-[40px] sticky top-[120px] bg-white/5 backdrop-blur-xl border border-white/10 p-12 max-sm:p-8 shadow-2xl transition-all duration-500 hover:border-red-500/50 group"
              style={{
                marginTop: `${index * 20}px`,
                zIndex: index + 1
              }}
            >
              <div className="flex flex-col justify-between h-full gap-8">
                <div className="relative">
                  <span className="absolute -top-6 -left-4 text-red-600/20 text-8xl font-serif">"</span>
                  <p className="text-[22px] max-md:text-[18px] font-montserrat leading-[160%] font-medium text-gray-200 relative z-10 italic">
                    {testimonial.text}
                  </p>
                </div>

                <div className="flex max-sm:flex-col justify-between items-end max-sm:items-start gap-6 border-t border-white/10 pt-8">
                  <div className="flex gap-4 items-center">
                    <div className="relative">
                      <img
                        src={ProfilePhoto}
                        alt={testimonial.name}
                        className="w-[70px] h-[70px] rounded-2xl object-cover border-2 border-red-900/50 group-hover:border-red-500 transition-colors"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-red-600 w-6 h-6 rounded-full flex items-center justify-center border-2 border-black">
                        <span className="text-[10px] text-white">✓</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-montserrat font-bold text-xl text-white">
                        {testimonial.name}
                      </h3>
                      <p className="text-red-500 font-medium text-sm uppercase tracking-widest">{testimonial.role}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end max-sm:items-start gap-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-xl ${i < testimonial.rating ? 'text-yellow-500' : 'text-white/20'}`}>★</span>
                      ))}
                    </div>
                    <h1 className="font-montserrat text-2xl font-black text-white/40 tracking-tighter group-hover:text-red-500/60 transition-colors">
                      POKIVERSE
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={() => setCurrentRoute && setCurrentRoute('games')}
          className="group relative px-10 py-5 bg-red-600 text-white font-montserrat font-black text-xl rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] border-2 border-red-500"
        >
          <span className="relative z-10 flex items-center gap-2">
            PLAY NOW <span className="transition-transform group-hover:translate-x-1">→</span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
      </div>
    </section>
  );
};

export default ClientPage;

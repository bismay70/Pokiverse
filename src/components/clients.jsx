import React from "react";
import ProfilePhoto from "/public/images/ball.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ClientPage = () => {
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
    <section className="w-full min-h-screen py-[200px] max-lg:py-[70px] max-md:py-[60px] max-sm:py-[80px] bg-black flex justify-center items-center flex-col">
      <div className="w-[1200px] max-lg:w-[90%] max-sm:w-[95%] flex flex-col gap-[64px] max-sm:gap-[32px] items-center">

        <div className="w-full overflow-hidden">
          <h1
            id="client"
            className="font-montserrat text-[5vw] max-lg:text-[10vw] font-black leading-[100%] text-center text-white"
          >
            What our players say
          </h1>
        </div>


        <div className="w-full flex flex-col gap-10">

          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="rounded-[48px] max-md:rounded-[40px] h-[400px] max-lg:h-[450px] max-md:h-[500px] max-sm:h-[530px] sticky top-[100px] bg-[#892914] p-10 py-20 max-sm:p-6"
            >
              <div className="flex flex-col justify-between h-full">
                <p className="text-[24px] max-md:text-[16px] font-montserrat leading-[120%] font-medium">
                  Pokiverse is a collection of engaging pokemon games designed to challenge your mind and provide endless entertainment.
                  From classic word games like Hangman to strategic puzzle games, I've got something for everyone.
                </p>

                <div className="flex max-sm:flex-col justify-between items-center">
                  <div className="flex gap-6 max-sm:flex-col max-sm:w-full">
                    <img
                      src={ProfilePhoto}
                      alt="Profile"
                      className="w-[80px] h-auto  rounded-2xl"
                    />
                    <h1 className="font-montserrat font-bold text-[24px] max-sm:text-[20px]">
                      Bismay Samal
                    </h1>
                  </div>

                  <h1 className="font-montserrat text-[32px] max-sm:text-[16px]">
                    Pokiverse
                  </h1>
                </div>
              </div>
            </div>
          ))}

        </div>


        <button 
        className="rounded-[48px] bg-white px-[32px] py-[14px] text-[24px] max-sm:text-[20px] text-black hover:bg-[#ab471c] font-montserrat font-bold border-2 border-black transition-all duration-300">
          Play Now
        </button>
      </div>
    </section>
  );
};

export default ClientPage;

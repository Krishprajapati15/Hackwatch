import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import BlogSection from "./ui/Blog";
import ContentSection from "./ui/Content";
import CtaSection from "./ui/CTA";

export default function HeroSection() {
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );

    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 }
    );

    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)", delay: 1 }
    );
  }, []);

  return (
    <>
      <section className="relative min-h-max bg-white text-black">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-1/3 h-40 bg-purple-600 opacity-30 blur-3xl rounded-full animate-pulse"></div>
          <div className="absolute top-10 right-10 w-1/4 h-32 bg-blue-500 opacity-40 blur-2xl rounded-full animate-bounce"></div>
          <div className="absolute bottom-10 left-20 w-1/4 h-32 bg-violet-500 opacity-30 blur-3xl rounded-full animate-pulse"></div>
        </div>

        <div className="relative mx-auto pt-32 pb-24 lg:max-w-7xl w-full px-5 sm:px-10 md:px-12 lg:px-5 text-center space-y-10">
          <h1
            ref={titleRef}
            className="text-black mx-auto max-w-5xl font-bold text-3xl sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            Stay Secure. Stay Vigilant. HackWatch Has You Covered.
          </h1>
          <p ref={textRef} className="text-gray-600 mx-auto max-w-2xl">
            HackWatch provides state-of-the-art cybersecurity solutions,
            ensuring your data and digital infrastructure remain protected
            against evolving threats.
          </p>
          <div
            ref={buttonRef}
            className="flex justify-center items-center flex-wrap mx-auto gap-4"
          >
            <a
              href="#"
              className="flex items-center h-12 px-6 rounded-full bg-pink-700 text-white border border-purple-800 hover:bg-purple-500 transition-all duration-300 ease-in-out"
            >
              Secure Your Data Now
            </a>
            <a
              href="#"
              className="flex items-center h-12 px-6 rounded-full bg-blue-900 text-white border border-gray-800 hover:bg-gray-800 transition-all duration-300 ease-in-out"
            >
              Learn More
            </a>
          </div>

          <div className="text-left grid lg:grid-cols-3 p-6 rounded-2xl bg-gradient-to-tr from-gray-600 to-gray-800 border border-gray-800 max-w-2xl lg:max-w-5xl mx-auto lg:divide-x divide-y lg:divide-y-0 divide-gray-800">
            {[
              {
                title: "Advanced Security",
                text: "Real-time threat detection and AI-driven defense.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5H18V15H4.5v-4.5zM3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z"
                  />
                ),
              },
              {
                title: "24/7 Monitoring",
                text: "Continuous surveillance to prevent breaches before they occur.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                ),
              },
              {
                title: "Data Encryption",
                text: "End-to-end encryption to keep your data private and secure.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5H18V15H4.5v-4.5zM3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z"
                  />
                ),
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-6 lg:px-6 py-6 lg:py-0"
              >
                <div className="w-10">
                  <span className="p-3 rounded-xl bg-gray-800 flex w-max text-gray-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      {item.icon}
                    </svg>
                  </span>
                </div>
                <div className="flex-1 space-y-1">
                  <h2 className="text-white font-semibold text-lg">
                    {item.title}
                  </h2>
                  <p className="text-gray-300 text-sm">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <BlogSection />
      <ContentSection />
      <CtaSection />
    </>
  );
}

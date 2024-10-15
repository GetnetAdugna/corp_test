"use client";

import { Contact } from "@/components/contact/Contact";
import { headerFont } from "@/data/config/fonts";

export default function ContactUsPage() {

  return (
    <div className="w-full flex flex-col items-center fancy-overlay space-y-8 pb-36">
      <div className="lg:w-1/2 flex flex-col justify-center items-center gap-1">
        <div className="flex justify-center items-center">
          <h1
            className={`${headerFont.className} text-6xl sm:text-8xl font-bold tracking-tight text-white text-center inline-flex`}
          >
            Get in touch
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-lg text-center mt-8 max-w-xl mx-auto">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
            maiores molestias itaque enim possimus praesentium alias! Fuga
            repudiandae possimus tempore corrupti, inventore vitae consectetur
            quam.
          </p>
        </div>
      </div>

      <div className="w-full pt-10 px-3 pb-24 sm:max-w-xl">
        <Contact />
      </div>
    </div>
  );
}

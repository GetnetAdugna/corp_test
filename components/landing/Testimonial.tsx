import React from "react";
import { headerFont } from "@/data/config/fonts";
import { TestimonialColumn } from "./TestimonialColumn";
import { testimonials } from "@/data/config/testimonial";

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);


export const Testimonial = () => {
  return (
    <section className="my-48">
      <div className="container mx-auto">
        <div className="">
          <div className="text-center">
            <h2 className={`${headerFont.className} text-5xl font-bold mt-5 sm:text-6xl`}>What Our Clients Say</h2>
            <p className="text-white mt-5 max-w-xl mx-auto">
              From AI services, our app has become an essential tool for users around the world.
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[738px] overflow-hidden">
          <TestimonialColumn testimonials={firstColumn} duration={14} />
          <TestimonialColumn testimonials={secondColumn} duration={19} className="hidden sm:block" />
          <TestimonialColumn testimonials={thirdColumn} duration={16} className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
};

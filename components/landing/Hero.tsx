'use client';

import { headerFont } from '@/data/config/fonts';
import { Button } from '@/components/shared/ui/button';
import WithBackground from '../../assets/images/heroY.jpg';
import WithoutBackground from '../../assets/images/tt.png';
import Link from '@/components/shared/Link';
import Image from '../shared/Image';
import { useState, useRef } from 'react';

export const Hero = () => {
  const [imageRevealFra, setImageRevealFra] = useState(0.5);
  const imageContainer = useRef<HTMLDivElement | null>(null);

  const slide = (xPosition: number): void => {
    if (imageContainer.current) {
      const boundImageContainerRect =
        imageContainer.current.getBoundingClientRect();
      setImageRevealFra(() => {
        if (xPosition < boundImageContainerRect.left) {
          return 0;
        } else if (xPosition > boundImageContainerRect.right) {
          return 1;
        } else {
          return (
            (xPosition - boundImageContainerRect.left) /
            boundImageContainerRect.width
          );
        }
      });
    }
  };

  const handleMouseDown = (): void => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent): void => {
    slide(event.clientX);
  };
  const handleMouseUp = (): void => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="flex justify-between items-center animate-fade-in-down-normal">
      <div className="flex flex-col w-full">
        <div className="flex justify-center items-center">
          <h1
            className={`${headerFont.className} text-6xl sm:text-7xl md:text-7xl font-bold tracking-tight text-white text-center inline-flex`}
          >
            Best in class, affordable AI <br /> built for scale, built for your needs
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-base text-center sm:text-start mt-8 max-w-md">
          Ready to boost your customer experience? Our cutting-edge AI models are here to help you deliver top-notch content.  We bring enterprise-level solutions with enterprise-level and flexible pricing options. Let's chat and explore how AI can take your business to the next level.
          </p>
        </div>
        <div className="flex justify-center items-center mt-8">
          <Button variant={'default'} className="w-40 text-lg py-6 sm:py-7">
            <Link href="/contact_us">Contact Us</Link>
          </Button>
        </div>
      </div>

      <div
        ref={imageContainer}
        className="hidden md:flex w-full shadow-lg rounded-sm relative select-none"
      >
        <Image
          src={WithBackground}
          alt="with background"
          className="w-full h-full rounded-lg pointer-events-none border-2"
        />
        <Image
          style={{
            filter: 'grayscale(100%)',
            clipPath: `polygon(0 0, ${imageRevealFra * 100}% 0, ${imageRevealFra * 100}% 100%, 0 100%)`,
          }}
          src={WithoutBackground}
          alt="without background"
          className="w-full h-full rounded-lg absolute inset-0 pointer-events-none"
        />
        <div
          style={{ left: `${imageRevealFra * 100}%` }}
          className="absolute inset-y-0"
        >
          <div className="relative h-full">
            <div className="absolute inset-y-0 bg-white w-0.5 -ml-px opacity-50">
              <div
                onMouseDown={handleMouseDown}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleMouseDown();
                  }
                }}
                className="rounded-full w-10 h-10 -ml-5 -mt-5 bg-gray-100 flex items-center justify-center absolute top-1/2 shadow-xl hover:bg-gray-400 focus:bg-gray-500 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 text-gray-950 absolute left-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 text-gray-950 absolute right-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

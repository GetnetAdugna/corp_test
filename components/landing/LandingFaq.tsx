"use client"

import { headerFont } from "@/data/config/fonts"
import { Button } from '@/components/shared/ui/button';
import { motion } from "framer-motion";
import Robot from '../../assets/images/robot_1.png';
import Link from '@/components/shared/Link';
import Image from '../shared/Image';
import { useState, useEffect } from "react";

export const Hero = () => {
    const [split, setSplit] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setSplit(prev => !prev); // Toggle between true and false every 3 seconds
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex justify-between items-center animate-fade-in-down-normal relative">
            <div className="flex flex-col">
                <div className="flex justify-center items-center">
                    <h1
                        className={`${headerFont.className} text-6xl sm:text-8xl md:text-7xl font-bold tracking-tight text-white text-center inline-flex`}
                    >
                        Get ready for <br /> the new era of AI
                    </h1>
                </div>
                <div className="flex justify-center items-center">
                    <p className="text-lg text-center sm:text-start mt-8 max-w-md">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
                        et vulputate tortor, in posuere nibh. Praesent sit amet metus
                        porttitor mi consectetur pellentesque in at leo.
                    </p>
                </div>
                <div className="flex justify-center items-center mt-8">
                    <Button variant={"default"} className="w-40 text-lg py-6 sm:py-8">
                        <Link href="/contact_us">Get Start</Link>
                    </Button>
                </div>
            </div>
            <motion.div
                drag
                dragSnapToOrigin
                className="hidden sm:flex relative"
            >
                {/* Container for the split effect */}
                <div className="relative">
                    {/* The full robot image */}
                    <Image src={Robot} alt="" className="w-full h-full" draggable="false" />

                    {/* The overlay that creates the split effect */}
                    <motion.div
                        initial={{ width: "100%" }}
                        animate={{ width: split ? "50%" : "100%" }}
                        transition={{ duration: 1 }}
                        className="absolute top-0 left-0 h-full bg-white"
                    >
                        {/* The same image again to show the 'before' side */}
                        <Image src={Robot} alt="" className="w-full h-full opacity-80" draggable="false" />
                    </motion.div>
                </div>
            </motion.div>
        </div >
    )
}

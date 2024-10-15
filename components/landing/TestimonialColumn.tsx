"use client"
import React from 'react';
import Image from "../shared/Image";
import { Avatar } from "../shared/ui/avatar";
import { Card, CardContent, CardFooter } from "../shared/ui/card";
import { motion } from "framer-motion"
import { testimonials } from '@/data/config/testimonial';


type TestimonialColumnProps = {
    className?: string;
    duration?: number;
    testimonials: typeof testimonials;
};

export const TestimonialColumn: React.FC<TestimonialColumnProps> = ({ testimonials, className, duration }) => {
    return (
        <div className={className}>
            <motion.div
                animate={{
                    translateY: '-50%'
                }}
                transition={{
                    duration: duration || 10,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatType: "loop",
                }}

                className="flex flex-col gap-6 pb-4" >
                {[...new Array(2)].fill(0).map((_, index) => (
                    <React.Fragment key={index}>
                        {testimonials.map(({ text, imageSrc, name, username }, index) => (
                            <Card key={index} className="shadow-lg">
                                <CardContent className="p-4">
                                    <p className="text-white text-sm">{text}</p>
                                </CardContent>
                                <CardFooter className="flex items-center p-4">
                                    <Avatar className="mr-4">
                                        <Image
                                            src={imageSrc}
                                            alt={name}
                                            width={110}
                                            height={110}
                                            className="rounded-full object-cover"
                                        />
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold text-xl">{name}</p>
                                        <p className="text-gray-500 text-sm">{username}</p>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </React.Fragment>
                ))}

            </motion.div>
        </div>
    );
};
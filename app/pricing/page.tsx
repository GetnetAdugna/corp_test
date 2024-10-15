"use client"

import PricingCard from "@/components/pricingCard/PricingCard";
import { headerFont } from "@/data/config/fonts";

export default function PricingPage() {

    return (
        <div className="w-full flex flex-col items-center fancy-overlay space-y-8 pb-36">
            <div className="lg:w-1/2 flex flex-col justify-center items-center gap-1">
                <div className="flex justify-center items-center">
                    <h1
                        className={`${headerFont.className} text-6xl sm:text-8xl font-bold tracking-tight text-white text-center inline-flex`}
                    >
                        Pricing Plans
                    </h1>
                </div>
                <div className="flex justify-center items-center">
                    <p className="text-lg text-center mt-8 max-w-md">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
                    </p>
                </div>
            </div>
            <PricingCard />
        </div>
    );
}

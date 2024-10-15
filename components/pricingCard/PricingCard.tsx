import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/shared/ui/card';
import { pricingInformation } from './pricesData';
import { motion } from 'framer-motion';
import { Button } from '@/components/shared/ui/button';

const PricingCard = () => {
  // Define animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    hover: { scale: 1.05, transition: { duration: 0.3, ease: 'easeInOut' } },
  };

  return (
    <div className="p-6 grid grid-cols-1 gap-6 bg-gradient-to-r sm:grid-cols-2 lg:grid-cols-3">
      {pricingInformation.map((pricing, index) => (
        <motion.div
          key={index}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          viewport={{ once: true }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-display font-bold">
                {index === 1 ? (
                  <motion.span
                    style={{
                      backgroundImage:
                        'linear-gradient(to right, #DD7DDF, #E1CD86, #BBCB92, #71C2EF,#3BFFFF,#DD7DDF, #E1CD86, #BBCB92, #71C2EF,#3BFFFF)',
                      backgroundSize: '300%',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                    }}
                    animate={{
                      backgroundPositionX: '-200%',
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: 'linear',
                      repeatType: 'loop',
                    }}
                  >
                    {pricing.title}
                  </motion.span>
                ) : (
                  <span className="text-gray-300">{pricing.title}</span>
                )}
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                {pricing.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pricing.isFree ? (
                <div className="text-xl font-bold mb-4 text-foreground">$0</div>
              ) : (
                <div className="flex items-center space-x-2 mb-4 text-foreground">
                  <span className="text-xl line-through text-muted-foreground">
                    {pricing.initialPrice}
                  </span>
                  <span className="text-4xl font-bold">
                    {pricing.currentPrice}
                  </span>
                  <span className="text-sm">{pricing.timeFrame}</span>
                </div>
              )}
              <ul className="list-none space-y-2 text-sm text-muted-foreground">
                {pricing.checklist.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full py-3 text-primary">
                {pricing.buttonText}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default PricingCard;

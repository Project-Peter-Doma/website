import React from 'react';
import AnimationContainer from "@/components/global/animation-container";
import { Button } from '@/components/ui/button';

const EnterprisePage = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20 min-h-[60vh]">
            <AnimationContainer delay={0.1} className="w-full flex flex-col items-center">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold font-heading text-center mt-6 !leading-tight">
                    Enterprise
                </h1>
                <p className="text-base md:text-lg mt-6 text-center text-muted-foreground max-w-lg mx-auto">
                    Get in touch with us to learn more about our enterprise solutions and custom integrations.
                </p>
                <div className="mt-8">
                    <Button asChild>
                        <a href="mailto:thatspacebiker@gmail.com">
                            Contact Sales
                        </a>
                    </Button>
                </div>
            </AnimationContainer>
        </div>
    )
};

export default EnterprisePage;
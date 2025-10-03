import { AnimationContainer, MaxWidthWrapper } from "@/components";
import { Button } from "@/components/ui/button";
import { LampContainer } from "@/components/ui/lamp";
import MagicBadge from "@/components/ui/magic-badge";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AnalyticsPage = () => {
    return (
        <>
            <MaxWidthWrapper>
                <AnimationContainer delay={0.1} className="w-full">
                    <div className="flex flex-col items-center justify-center py-10 max-w-lg mx-auto">
                        <MagicBadge title="New" />
                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold font-heading text-center mt-6 !leading-tight">
                            Advanced analytics for your business
                        </h1>
                        <p className="text-base md:text-lg mt-6 text-center text-muted-foreground">
                            Gain deep insights into your link performance with real-time analytics. Track clicks, device usage, and more to optimize your strategy.
                        </p>
                        <div className="flex items-center justify-center gap-x-4 mt-8">
                            <Button size="sm" asChild>
                                <Link href="/dashboard">
                                    Get started
                                </Link>
                            </Button>
                            <Button size="sm" variant="outline" asChild>
                                <Link href="/blog">
                                    Learn more
                                </Link>
                            </Button>
                        </div>
                    </div>
                </AnimationContainer>
                <AnimationContainer delay={0.2} className="w-full">
                    <div className="w-full flex max-w-4xl py-10 mx-auto">
                        <Image
                            src="/assets/analytics.svg"
                            alt="Advanced analytics for your business"
                            width={80}
                            height={80}
                            className="w-full h-auto"
                        />
                    </div>
                </AnimationContainer>
            </MaxWidthWrapper>
            <MaxWidthWrapper className="pt-20">
                <AnimationContainer delay={0.4} className="w-full">
                    <LampContainer className="max-w-2xl mx-auto">
                        <div className="flex flex-col items-center justify-center relative w-full text-center">
                            <h2 className="bg-gradient-to-br from-neutral-300 to-neutral-500 py-4 bg-clip-text text-center text-4xl font-semibold font-heading tracking-tight text-transparent md:text-7xl mt-8">
                                Powerup your link strategy
                            </h2>
                            <p className="text-muted-foreground mt-6 max-w-lg mx-auto text-base md:text-lg">
                                Take control of your links with advanced features and real-time insights. Simplify your workflow and achieve more.
                            </p>
                            <div className="mt-6">
                                <Button asChild>
                                    <Link href="/auth/sign-up" className="flex items-center">
                                        Get started for free
                                        <ArrowRightIcon className="w-4 h-4 ml-2" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </LampContainer>
                </AnimationContainer>
            </MaxWidthWrapper>
        </>
    )
};

export default AnalyticsPage;
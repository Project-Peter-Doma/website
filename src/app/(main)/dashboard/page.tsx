"use client";

import React, { useState } from "react";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Activity, ArrowUpRight, Bell, DollarSign, Eye, Search, Settings, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils";
import UnicornBackground from "@/components/ui/unicorn-background";

// A simple SVG for the Telegram Icon
const TelegramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="m22 2-11 11" />
    </svg>
);

const DashboardPage = () => {
    const { user, signOut } = useClerk();
    const [isSearchOpen, setSearchOpen] = useState(false);

    const mockLiveEvents = [
        { icon: "🚀", text: "sale.ai just sold for <strong>$55,000</strong>" },
        { icon: "🔄", text: "investor.io was transferred on-chain" },
        { icon: "📈", text: "Momentum Score for <strong>.ai TLD</strong> +12 pts" },
        { icon: "💰", text: "New high offer of <strong>$12,000</strong> for <strong>web3.xyz</strong>" },
    ];

    const tldData = [
        { name: ".ai", value: 45, color: "#9A4BFF" },
        { name: ".com", value: 30, color: "#5470C6" },
        { name: ".io", value: 15, color: "#91CC75" },
        { name: "Other", value: 10, color: "#FAC858" },
    ];
    
    const cardClasses = "bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl";

    return (
        <div className="relative min-h-screen w-full">
            {/* WebGL Background */}
            <UnicornBackground projectId="YB3qSj7F2a1hrpljt3Iu" />

            {/* Search Modal - Higher z-index to cover background */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSearchOpen(false)}
                        className="fixed inset-0 bg-black/80 backdrop-blur-3xl z-[100] flex items-start justify-center pt-20"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: -20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: -20, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-xl"
                        >
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                autoFocus
                                placeholder="Analyze any domain..."
                                className="w-full h-14 pl-12 text-lg bg-[#121214] border-[#222] focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className={cn("relative z-10 w-full max-w-7xl mx-auto px-4 py-4 md:px-8 transition-all duration-300", isSearchOpen && "blur-xl opacity-50")}>
                {/* Header */}
                 <header className="flex h-16 items-center gap-4">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <span className="text-2xl">🔮</span>
                        <span className="text-xl font-bold text-white">Peter</span>
                    </Link>
                    <div className="flex-1" />
                    <div 
                        className="relative flex-1 max-w-md cursor-pointer"
                        onClick={() => setSearchOpen(true)}
                    >
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <div className="w-full h-10 flex items-center appearance-none bg-black/50 border-[#222] backdrop-blur-sm pl-9 rounded-md text-sm text-muted-foreground">
                            Analyze a domain... (e.g., crypto.ai)
                        </div>
                    </div>
                    <div className="flex-1 justify-end flex items-center gap-2">
                         <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 text-muted-foreground hover:text-white hover:bg-white/10">
                            <Bell className="h-4 w-4" />
                        </Button>
                         <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 text-muted-foreground hover:text-white hover:bg-white/10">
                            <Settings className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user?.imageUrl} alt={user?.fullName || ""} />
                                        <AvatarFallback className="bg-purple-500/20 text-white">
                                            {user?.firstName?.charAt(0)}
                                            {user?.lastName?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem>Support</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => signOut()}>
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                <main className="flex flex-1 flex-col gap-4 py-4 md:gap-8">
                    {/* KPI Cards */}
                    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                        <Card className={cardClasses}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Total Portfolio Value</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">$1,450,000</div>
                                <p className="text-xs text-[#26da7b] font-semibold">+20.1% from last month</p>
                            </CardContent>
                        </Card>
                        <Card className={cardClasses}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Watched Domains</CardTitle>
                                <Eye className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">235</div>
                                <p className="text-xs text-[#26da7b] font-semibold">+32 since last week</p>
                            </CardContent>
                        </Card>
                         <Card className={cardClasses}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Market Momentum</CardTitle>
                                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">Strong Bullish</div>
                                <p className="text-xs text-muted-foreground">.ai and .xyz TLDs leading</p>
                            </CardContent>
                        </Card>
                        <Card className={cardClasses}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">Active Alerts</CardTitle>
                                <Activity className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">5</div>
                                <p className="text-xs text-[#26da7b] font-semibold">+3 since last hour</p>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                        <Card className={`xl:col-span-2 ${cardClasses}`}>
                             <CardHeader>
                                <CardTitle className="text-white">Portfolio Value Over Time</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <div className="h-[300px] w-full">
                                    <svg width="100%" height="100%" viewBox="0 0 500 200" preserveAspectRatio="none">
                                        <defs>
                                            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#9A4BFF" stopOpacity={0.4} />
                                                <stop offset="100%" stopColor="#9A4BFF" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <path d="M 0 120 C 50 100, 100 80, 150 90 S 250 110, 300 80 S 400 40, 450 50 L 500 40" fill="none" stroke="#9A4BFF" strokeWidth="2.5" />
                                        <path d="M 0 120 C 50 100, 100 80, 150 90 S 250 110, 300 80 S 400 40, 450 50 L 500 40 L 500 200 L 0 200 Z" fill="url(#areaGradient)" />
                                        <g fill="#b0b0b0" fontSize="10" fontFamily="Inter, sans-serif" textAnchor="middle">
                                            <text x="25" y="195">Jan</text>
                                            <text x="95" y="195">Feb</text>
                                            <text x="165" y="195">Mar</text>
                                            <text x="235" y="195">Apr</text>
                                            <text x="305" y="195">May</text>
                                            <text x="375" y="195">Jun</text>
                                            <text x="445" y="195">Jul</text>
                                        </g>
                                    </svg>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className={cardClasses}>
                            <CardHeader>
                                <CardTitle className="text-white">Live Market Events</CardTitle>
                                <CardDescription>Real-time sales, transfers, and market shifts.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2">
                                {mockLiveEvents.map((event, index) => (
                                    <a href="#" key={index} className="group flex items-center gap-4 p-3 rounded-lg transition-colors hover:bg-white/5">
                                        <div className="text-lg">{event.icon}</div>
                                        <div className="grid gap-1 flex-1">
                                            <p className="text-sm font-medium leading-none text-neutral-300" dangerouslySetInnerHTML={{ __html: event.text }} />
                                        </div>
                                        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:text-white group-hover:translate-x-1" />
                                    </a>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className={cardClasses}>
                            <CardHeader>
                                <CardTitle className="text-white">Portfolio by TLD</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center justify-center pt-4">
                                <div className="h-[150px] w-[150px] relative">
                                    <svg viewBox="0 0 36 36" className="transform -rotate-90">
                                        <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#2a2a2a" strokeWidth="3" />
                                        <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke={tldData[0].color} strokeWidth="3" strokeDasharray="45, 100" />
                                        <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke={tldData[1].color} strokeWidth="3" strokeDasharray="30, 100" strokeDashoffset="-45" />
                                        <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke={tldData[2].color} strokeWidth="3" strokeDasharray="15, 100" strokeDashoffset="-75" />
                                        <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke={tldData[3].color} strokeWidth="3" strokeDasharray="10, 100" strokeDashoffset="-90" />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-2xl font-bold text-white">42</span>
                                        <span className="text-xs text-muted-foreground">Domains</span>
                                    </div>
                                </div>
                                <div className="w-full mt-6 flex justify-center gap-4 text-xs">
                                    {tldData.map(item => (
                                        <div key={item.name} className="flex items-center gap-1.5">
                                            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                                            <span className="text-muted-foreground">{item.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card className={`xl:col-span-2 ${cardClasses}`}>
                            <CardHeader>
                                <CardTitle className="text-white">Smart Alerts</CardTitle>
                                <CardDescription>Get notified instantly about sales, transfers, and score changes.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex space-x-2">
                                    <Input placeholder="Enter your Telegram handle" className="bg-[#121214]/50 border-[#222] focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500"/>
                                    <Button className="bg-[#9A4BFF] hover:bg-[#9A4BFF]/80 text-white font-semibold">
                                        <TelegramIcon className="h-4 w-4 mr-2"/>
                                        Connect Telegram
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
"use client";

import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Briefcase, Eye, Home, LineChart, Menu, Search, Settings } from "lucide-react";

const DashboardNavbar = () => {
    const { user, signOut } = useClerk();

    const navLinks = [
        { href: "/dashboard", label: "Dashboard", icon: Home },
        { href: "/dashboard/watchlist", label: "Watchlist", icon: Eye },
        { href: "/dashboard/market-trends", label: "Market Trends", icon: LineChart },
        { href: "/dashboard/portfolio", label: "My Portfolio", icon: Briefcase },
        { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ];

    return (
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col bg-[#121214]">
                    <nav className="grid gap-2 text-lg font-medium">
                        <Link
                            href="#"
                            className="flex items-center gap-2 text-lg font-semibold mb-4"
                        >
                            <span className="text-xl">🔮</span>
                            <span className="text-lg font-bold">Peter</span>
                        </Link>
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                            >
                                <link.icon className="h-5 w-5" />
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>

            <div className="w-full flex-1">
                <form>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Analyze a domain... (e.g., crypto.ai)"
                            className="w-full appearance-none bg-[#2a2a2a] border-neutral-700 pl-9 shadow-none md:w-2/3 lg:w-1/3 transition-all duration-300 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                        />
                    </div>
                </form>
            </div>

            <div className="flex items-center gap-2">
                 <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                    <Bell className="h-4 w-4" />
                    <span className="sr-only">Toggle notifications</span>
                </Button>
                 <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
                    <Settings className="h-4 w-4" />
                    <span className="sr-only">Settings</span>
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user?.imageUrl} alt={user?.fullName || ""} />
                                <AvatarFallback>
                                    {user?.firstName?.charAt(0)}
                                    {user?.lastName?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <span className="sr-only">Toggle user menu</span>
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
    );
};

export default DashboardNavbar;
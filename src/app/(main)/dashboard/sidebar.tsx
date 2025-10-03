"use client";

import {
    Briefcase,
    Eye,
    Home,
    LineChart,
    Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/utils";

const Sidebar = () => {
    const pathname = usePathname();

    const navLinks = [
        { href: "/dashboard", label: "Dashboard", icon: Home },
        { href: "/dashboard/watchlist", label: "Watchlist", icon: Eye },
        { href: "/dashboard/market-trends", label: "Market Trends", icon: LineChart },
        { href: "/dashboard/portfolio", label: "My Portfolio", icon: Briefcase },
    ];

    return (
        <div className="hidden border-r border-[#222] bg-[#121214] md:block">
            <div className="flex h-full max-h-screen flex-col gap-4">
                <div className="flex h-14 items-center border-b border-[#222] px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <span className="text-xl">🔮</span>
                        <span className="text-lg font-bold text-white">Peter</span>
                    </Link>
                </div>
                <div className="flex-1 px-2 lg:px-4 space-y-4 pt-4">
                    <Select defaultValue="watchlist">
                        <SelectTrigger className="w-full bg-[#121214] border-neutral-700 focus:ring-purple-500/50">
                            <SelectValue placeholder="Select a portfolio" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="watchlist">Active Watchlist</SelectItem>
                            <SelectItem value="owned">Owned Assets</SelectItem>
                        </SelectContent>
                    </Select>
                    <nav className="grid items-start text-sm font-medium">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-[#2a2a2a] hover:text-white",
                                    pathname === link.href && "bg-[#9A4BFF] text-white font-semibold"
                                )}
                            >
                                <link.icon className="h-4 w-4" />
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="mt-auto p-4">
                     <Link
                        href="/dashboard/settings"
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-[#2a2a2a] hover:text-white",
                             pathname === "/dashboard/settings" && "bg-[#9A4BFF] text-white font-semibold"
                        )}
                    >
                        <Settings className="h-4 w-4" />
                        Settings
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
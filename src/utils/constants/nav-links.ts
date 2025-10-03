import { Gauge, HelpCircleIcon, LineChartIcon, NewspaperIcon, SearchIcon, WaypointsIcon } from "lucide-react";

export const NAV_LINKS = [
    {
        title: "Features",
        href: "/features",
        menu: [
            {
                title: "Instant Valuations",
                tagline: "Get AI-driven valuations for any domain.",
                href: "/features/instant-valuations",
                icon: Gauge,
            },
            {
                title: "Deep Insights",
                tagline: "On-chain analysis, trend data, and liquidity scores.",
                href: "/features/deep-insights",
                icon: SearchIcon,
            },
            {
                title: "Market Trends",
                tagline: "Monitor TLD popularity, sales velocity, and sentiment.",
                href: "/features/market-trends",
                icon: LineChartIcon,
            },
            {
                title: "API Integration",
                tagline: "Access our data to power your own platforms.",
                href: "/features/api-integration",
                icon: WaypointsIcon,
            },
        ],
    },
    {
        title: "Pricing",
        href: "/pricing",
    },
    {
        title: "Enterprise",
        href: "/enterprise",
    },
];
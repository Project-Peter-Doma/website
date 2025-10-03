export const PLANS = [
    {
        name: "Hobby",
        info: "For Casual Research",
        price: {
            monthly: 0,
            yearly: 0,
        },
        features: [
            { text: "10 Daily Lookups" },
            { text: "Basic Trait Scoring" },
            { text: "TLD Trend Data" },
            { text: "Community Support" },
            { text: "AI-Powered Insights" },
        ],
        btn: {
            text: "Get Started",
            href: "/auth/sign-up?plan=hobby",
            variant: "default",
        }
    },
    {
        name: "Investor",
        info: "For Active Domainers",
        price: {
            monthly: 19,
            yearly: Math.round(19 * 12 * (1 - 0.12)),
        },
        features: [
            { text: "500 Daily Lookups" },
            { text: "Advanced On-Chain Metrics" },
            { text: "Portfolio Tracking & Alerts" },
            { text: "Full Sales History Access" },
            { text: "Export Data to CSV" },
            { text: "Priority Support" },
            { text: "AI-Powered Insights" },
        ],
        btn: {
            text: "Choose Investor",
            href: "/auth/sign-up?plan=investor",
            variant: "purple",
        }
    },
    {
        name: "Platform",
        info: "For Developers & API",
        price: {
            monthly: 99,
            yearly: Math.round(99 * 12 * (1 - 0.12)),
        },
        features: [
            { text: "Unlimited API Access" },
            { text: "Real-Time Data Streams" },
            { text: "Custom Model Integration" },
            { text: "Full Historical Data Access" },
            { text: "Dedicated Integration Support" },
            { text: "AI-Powered Insights" },
        ],
        btn: {
            text: "Contact Sales",
            href: "/auth/sign-up?plan=platform",
            variant: "default",
        }
    }
];

export const PRICING_FEATURES = [
    {
        text: "Daily Lookups",
        tooltip: "Number of domains you can analyze per day.",
    },
    {
        text: "Trait Scoring",
        tooltip: "Access basic and advanced scoring metrics.",
    },
    {
        text: "On-Chain Metrics",
        tooltip: "Analyze on-chain data for deeper insights.",
    },
    {
        text: "Portfolio Tracking",
        tooltip: "Track the value and performance of your domain portfolio.",
    },
    {
        text: "Community support",
        tooltip: "Community support is available for free users.",
    },
    {
        text: "Priority support",
        tooltip: "Get priority support from our team.",
    },
    {
        text: "API Access",
        tooltip: "Integrate Peter's data into your own applications.",
    },
];

export const WORKSPACE_LIMIT = 2;
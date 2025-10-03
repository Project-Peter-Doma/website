import React from "react";

interface Props {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
    return (
        <div className="relative min-h-screen w-full">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="fixed inset-0 w-full h-full object-cover z-[-1]"
            >
                {/* Ensure your video is at public/asset/background.webm */}
                <source src="/asset/background.webm" type="video/webm" />
                Your browser does not support the video tag.
            </video>

            {/* A semi-transparent overlay to darken the video slightly and improve text readability */}
            <div className="fixed inset-0 w-full h-full bg-black/50 z-[-1]" />

            {children}
        </div>
    );
};

export default DashboardLayout;
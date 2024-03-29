import React from "react"
import Navbar from "@/components/global/Navbar"
import Footer from "@/components/global/Footer"
import Hero from "@/components/pages/home/Hero"

const HomePage = () => {
    return (
        <div className="min-h-full relative">
            <Navbar />
            <Hero />
            <div className="max-w-6xl 2xl:max-w-7xl mx-auto py-4 pb-20">
                {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore */}
                {/* magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo */}
                {/* consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla */}
                {/* pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est */}
                {/* laborum */}
            </div>
            <Footer />
        </div>
    )
}

export default HomePage

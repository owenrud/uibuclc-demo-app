const Footer = () => {
    return (
        <footer className="w-full bg-gray-100 border-gray-300 py-3">
            <div className="mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
                
                {/* Left Section */}
                <p className="text-gray-700 text-sm">
                    © {new Date().getFullYear()} Owen Rudiyanto So. All Rights Reserved.
                </p>

                {/* Right Section */}
                <div className="flex gap-6 mt-3 md:mt-0">
                    <a href="#" className="text-gray-600 hover:text-blue-700 text-sm transition">
                        Privacy Policy
                    </a>
                    <a href="#" className="text-gray-600 hover:text-blue-700 text-sm transition">
                        Terms of Service
                    </a>
                    <a href="https://owen-portofolio.vercel.app" target="_blank" className="text-gray-600 hover:text-blue-700 text-sm transition">
                        Contact
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;

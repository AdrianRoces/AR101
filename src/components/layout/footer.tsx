export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/images/logo.png" 
                alt="SentriGas Logo" 
                className="w-8 h-8 object-contain"
              />
              <h3 className="text-xl font-bold text-[#2DD4BF]">
                SENTRI<span className="text-[#F59E0B]">GAS</span>
              </h3>
            </div>
            <p className="text-gray-300 text-sm">
              Smart Gas Safety Monitoring System. Protecting homes and businesses with real-time LPG leak detection and automatic safety responses.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="text-gray-300 hover:text-[#2DD4BF] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#hardware" className="text-gray-300 hover:text-[#2DD4BF] transition-colors">
                  Hardware
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-[#2DD4BF] transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>Email: info@sentrigas.com</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Safety St, Tech City</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} SentriGas. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
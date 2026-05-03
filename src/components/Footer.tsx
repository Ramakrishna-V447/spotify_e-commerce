export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h2 className="font-serif text-3xl tracking-widest uppercase mb-6">Spotify</h2>
            <p className="text-gray-400 text-sm max-w-sm mb-8 leading-relaxed">
              Redefining digital luxury. A curated selection of avant-garde fashion and timeless classics for the modern aesthete.
            </p>
            <div className="flex space-x-4">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-transparent border-b border-gray-600 pb-2 text-sm uppercase tracking-wider focus:outline-none focus:border-white w-64 transition-colors"
              />
              <button className="uppercase text-xs tracking-widest border border-white px-4 py-2 hover:bg-white hover:text-black transition-colors">
                Subscribe
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="uppercase text-xs tracking-widest font-medium mb-6 text-gray-500">Boutique</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-gold transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Designers</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Ready to Wear</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Accessories</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Editorial</a></li>
            </ul>
          </div>

          <div>
            <h3 className="uppercase text-xs tracking-widest font-medium mb-6 text-gray-500">Concierge</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-gold transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 border-t border-gray-800 pt-8">
          <p>&copy; {new Date().getFullYear()} SPOTIFY INC. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Pinterest</a>
            <a href="#" className="hover:text-white transition-colors">Journal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

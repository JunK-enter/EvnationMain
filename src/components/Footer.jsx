import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-navy-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="inline-block mb-4 hover:opacity-90 transition-opacity">
              <Logo size="md" />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Premium home electrification. EV charging, commercial stations, Tesla Powerwall battery, and warranty-backed installs — done right.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/ev-charger" className="hover:text-neon transition-colors">Home EV Charging</Link></li>
              <li><Link to="/commercial-charging" className="hover:text-neon transition-colors">Commercial Charging</Link></li>
              <li><Link to="/battery" className="hover:text-neon transition-colors">Battery · Tesla Powerwall</Link></li>
              <li><Link to="/warranty" className="hover:text-neon transition-colors">Warranty</Link></li>
              <li><Link to="/shop" className="hover:text-neon transition-colors">Shop All Services</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/about" className="hover:text-neon transition-colors">About Us</Link></li>
              <li><Link to="/auto-dealers" className="hover:text-neon transition-colors">Auto Dealer Partners</Link></li>
              <li><Link to="/blog" className="hover:text-neon transition-colors">Blog</Link></li>
              <li><Link to="/quote" className="hover:text-neon transition-colors">Get a Quote</Link></li>
              <li><Link to="/intake" className="hover:text-neon transition-colors">Customer Intake</Link></li>
              <li><Link to="/contact" className="hover:text-neon transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-neon" /> hello@evnation.com</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-neon" /> (888) 384-6287</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-neon" /> Nationwide Service</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col gap-4">
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-slate-400">
            <Link to="/terms" className="hover:text-neon transition-colors">Terms & Conditions</Link>
            <Link to="/racial-equality" className="hover:text-neon transition-colors">Racial Equality</Link>
            <Link to="/privacy" className="hover:text-neon transition-colors">Privacy Policy</Link>
            <Link to="/sitemap" className="hover:text-neon transition-colors">Site Map</Link>
            <Link to="/blog" className="hover:text-neon transition-colors">Blog</Link>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} EVnation. All rights reserved.</p>
            <p>Licensed C10 Electrical Contractor. Permit support included.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

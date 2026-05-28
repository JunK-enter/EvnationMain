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
              Premium home electrification services. EV chargers, panel upgrades, permits, and solar — done right.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/ev-charger" className="hover:text-neon transition-colors">EV Charger Installation</Link></li>
              <li><Link to="/panel-upgrade" className="hover:text-neon transition-colors">Panel Upgrade</Link></li>
              <li><Link to="/solar-energy" className="hover:text-neon transition-colors">Solar & Energy</Link></li>
              <li><Link to="/shop" className="hover:text-neon transition-colors">Shop All Services</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/quote" className="hover:text-neon transition-colors">Get a Quote</Link></li>
              <li><Link to="/calculator" className="hover:text-neon transition-colors">Savings Calculator</Link></li>
              <li><Link to="/contact" className="hover:text-neon transition-colors">Contact Us</Link></li>
              <li><Link to="/employee" className="hover:text-neon transition-colors">Employee Portal</Link></li>
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

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} EVnation. All rights reserved.</p>
          <p>Licensed electricians. Permit support included.</p>
        </div>
      </div>
    </footer>
  )
}

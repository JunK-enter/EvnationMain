'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Link from '@/components/Link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, ShoppingCart, ChevronDown,
  Bolt, Building2, BatteryCharging, ShieldCheck, Calculator, FileText, Mail,
  Users, ArrowRight, Info, Handshake, Newspaper,
} from 'lucide-react'
import { useQuote } from '../context/QuoteContext'
import { useAuth } from '../context/AuthContext'
import Logo from './Logo'

const serviceLinks = [
  { to: '/residential-ev-charging', label: 'Residential EV Charging', desc: 'Level 2 home install', icon: Bolt },
  { to: '/solar', label: 'Solar', desc: 'Roof & battery-ready', icon: BatteryCharging },
  { to: '/panel-upgrades', label: 'Panel Upgrades', desc: '200A service upgrades', icon: ShieldCheck },
  { to: '/commercial', label: 'Commercial', desc: 'Workplace & fleet', icon: Building2 },
  { to: '/battery', label: 'Battery Storage', desc: 'Tesla Powerwall & more', icon: BatteryCharging },
  { to: '/shop', label: 'Shop All Services', desc: 'Browse & build a quote', icon: ShoppingCart },
]

const mainLinks = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/calculator', label: 'Calculator', icon: Calculator },
  { to: '/contact', label: 'Contact', icon: Mail },
]

const companyLinks = [
  { to: '/about', label: 'About', desc: 'Regional install team', icon: Info },
  { to: '/auto-dealer', label: 'Auto Dealer Partners', desc: 'Partner with us', icon: Handshake },
  { to: '/blog', label: 'Blog', desc: 'EV & solar insights', icon: Newspaper },
]

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function NavDropdown({ label, children, align = 'left' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1 px-3 py-2 rounded-full text-[13px] font-medium transition-all duration-200 ${
          open ? 'text-neon bg-neon/10' : 'text-slate-300 hover:text-white hover:bg-white/5'
        }`}
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className={`absolute top-full mt-2 min-w-[220px] rounded-2xl border border-white/10 bg-navy-900/95 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden z-50 ${
              align === 'right' ? 'right-0' : 'left-0'
            }`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function NavLink({ to, label, icon: Icon, scrollTop = false }) {
  const pathname = usePathname()
  const active = pathname === to

  return (
    <Link
      to={to}
      onClick={scrollTop ? scrollToTop : undefined}
      className={`relative flex items-center gap-1.5 px-3 py-2 rounded-full text-[13px] font-medium transition-all duration-200 whitespace-nowrap ${
        active ? 'text-neon' : 'text-slate-300 hover:text-white hover:bg-white/5'
      }`}
    >
      {active && (
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-0 rounded-full bg-neon/10 border border-neon/20"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
      <span className="relative flex items-center gap-1.5">
        {Icon && <Icon className="w-3.5 h-3.5 opacity-70" />}
        {label}
      </span>
    </Link>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const pathname = usePathname()
  const { cart } = useQuote()
  const { user } = useAuth()

  const isPortal = pathname.startsWith('/employee')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setServicesOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  if (isPortal) return null

  const servicesActive = serviceLinks.some((l) => l.to === pathname)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 max-lg:bg-navy-950/92 max-lg:backdrop-blur-xl max-lg:border-b max-lg:border-white/[0.06] ${
          scrolled
            ? 'lg:bg-navy-950/80 lg:backdrop-blur-xl lg:border-b lg:border-white/[0.06] lg:shadow-lg lg:shadow-black/20'
            : 'lg:bg-transparent lg:border-b lg:border-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px] gap-3">

            {/* Logo */}
            <Link to="/" onClick={scrollToTop} className="group min-w-0 shrink">
              <Logo size="md" className="group-hover:opacity-90 transition-opacity max-w-[140px] sm:max-w-none" />
            </Link>

            {/* Desktop center nav — pill container */}
            <nav className="hidden lg:flex items-center">
              <div className="flex items-center gap-0.5 px-1.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
                <NavLink to="/" label="Home" scrollTop />

                <NavDropdown label="Services">
                  <div className="p-2">
                    {serviceLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                          pathname === link.to
                            ? 'bg-neon/10 text-neon'
                            : 'text-slate-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <div className="w-9 h-9 rounded-lg bg-neon/10 flex items-center justify-center shrink-0">
                          <link.icon className="w-4 h-4 text-neon" />
                        </div>
                        <div>
                          <p className="text-sm font-medium leading-tight">{link.label}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">{link.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </NavDropdown>

                {mainLinks.slice(1).map((link) => (
                  <NavLink key={link.to} to={link.to} label={link.label} icon={link.icon} />
                ))}

                <NavDropdown label="Company">
                  <div className="p-2">
                    {companyLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                          pathname === link.to
                            ? 'bg-neon/10 text-neon'
                            : 'text-slate-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <div className="w-9 h-9 rounded-lg bg-neon/10 flex items-center justify-center shrink-0">
                          <link.icon className="w-4 h-4 text-neon" />
                        </div>
                        <div>
                          <p className="text-sm font-medium leading-tight">{link.label}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">{link.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </NavDropdown>

                <div className="w-px h-5 bg-white/10 mx-1" />

                <Link
                  to="/quote"
                  className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 ${
                    pathname === '/quote'
                      ? 'bg-neon text-navy-950 shadow-[0_0_20px_rgba(0,255,136,0.3)]'
                      : 'bg-neon/90 text-navy-950 hover:bg-neon hover:shadow-[0_0_20px_rgba(0,255,136,0.25)]'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  Get a Quote
                </Link>
              </div>
            </nav>

            {/* Desktop right actions */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <Link
                to="/quote"
                className="relative flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] hover:border-neon/30 hover:bg-neon/5 transition-all duration-200"
                aria-label="Quote cart"
              >
                <ShoppingCart className="w-[18px] h-[18px] text-slate-300" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-neon text-navy-950 text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Link>

              <Link
                to="/employee"
                className="ml-1 px-4 py-2 rounded-full text-[13px] font-medium text-slate-300 border border-white/10 hover:border-neon/30 hover:text-white transition-all duration-200"
              >
                Employee Portal
              </Link>

              {user ? (
                <div className="flex items-center gap-2 pl-2 ml-1 border-l border-white/10">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon/30 to-neon/10 border border-neon/30 flex items-center justify-center">
                    <span className="text-xs font-bold text-neon">{user.name?.[0]}</span>
                  </div>
                  <span className="text-sm text-slate-300 max-w-[100px] truncate">{user.name}</span>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="ml-1 px-4 py-2 rounded-full text-[13px] font-medium text-slate-300 border border-white/10 hover:border-neon/30 hover:text-white transition-all duration-200"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <Link to="/quote" className="relative p-2.5 rounded-full border border-white/10 bg-white/[0.03]">
                <ShoppingCart className="w-5 h-5 text-slate-300" />
                {cart.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-neon text-navy-950 text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2.5 rounded-full border border-white/10 bg-white/[0.03] hover:border-neon/30 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-navy-950 border-l border-white/10 lg:hidden overflow-y-auto"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/5">
                <Logo size="sm" />
                <button type="button" onClick={() => setMobileOpen(false)} className="p-2 rounded-full hover:bg-white/5">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 space-y-6">
                <Link
                  to="/quote"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between w-full px-4 py-3.5 rounded-2xl bg-neon text-navy-950 font-semibold"
                >
                  Get a Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div>
                  <p className="text-[11px] uppercase tracking-widest text-slate-500 mb-3 px-1">Navigate</p>
                  <div className="space-y-1">
                    <Link
                      to="/"
                      onClick={() => { scrollToTop(); setMobileOpen(false) }}
                      className={`block px-4 py-3 rounded-xl text-sm font-medium ${
                        pathname === '/' ? 'bg-neon/10 text-neon' : 'text-slate-300'
                      }`}
                    >
                      Home
                    </Link>
                    <Link
                      to="/calculator"
                      onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-sm font-medium ${
                        pathname === '/calculator' ? 'bg-neon/10 text-neon' : 'text-slate-300'
                      }`}
                    >
                      Savings Calculator
                    </Link>
                    <Link
                      to="/contact"
                      onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-sm font-medium ${
                        pathname === '/contact' ? 'bg-neon/10 text-neon' : 'text-slate-300'
                      }`}
                    >
                      Contact
                    </Link>
                  </div>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-widest text-slate-500 mb-3 px-1">Company</p>
                  <div className="space-y-1">
                    {companyLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                          pathname === link.to ? 'bg-neon/10 text-neon' : 'text-slate-300'
                        }`}
                      >
                        <link.icon className="w-4 h-4 opacity-70" />
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium ${
                      servicesActive ? 'bg-neon/10 text-neon' : 'text-slate-300'
                    }`}
                  >
                    Services
                    <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-1 ml-2 pl-3 border-l border-white/10 space-y-1">
                          {serviceLinks.map((link) => (
                            <Link
                              key={link.to}
                              to={link.to}
                              onClick={() => setMobileOpen(false)}
                              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm ${
                                pathname === link.to ? 'text-neon' : 'text-slate-400'
                              }`}
                            >
                              <link.icon className="w-4 h-4" />
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <Link
                    to="/employee"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/5"
                  >
                    <Users className="w-4 h-4" />
                    Employee Portal
                  </Link>
                </div>

                {!user && (
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full text-center py-3 rounded-xl border border-white/10 text-sm font-medium text-slate-300"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

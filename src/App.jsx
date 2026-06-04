import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { QuoteProvider } from './context/QuoteContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AIAssistant from './components/AIAssistant'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import EVChargerPage from './pages/EVChargerPage'
import CommercialChargingPage from './pages/CommercialChargingPage'
import BatteryPage from './pages/BatteryPage'
import WarrantyPage from './pages/WarrantyPage'
import PanelUpgradePage from './pages/PanelUpgradePage'
import CalculatorPage from './pages/CalculatorPage'
import QuotePage from './pages/QuotePage'
import ContactPage from './pages/ContactPage'
import EmployeePortalPage from './pages/EmployeePortalPage'
import ElectricianPortalPage from './pages/ElectricianPortalPage'
import LoginPage from './pages/LoginPage'
import CustomerIntakePage from './pages/CustomerIntakePage'
import AdminIntakePage from './pages/AdminIntakePage'
import AdminIntakeDetailPage from './pages/AdminIntakeDetailPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import AboutPage from './pages/AboutPage'
import AutoDealerPage from './pages/AutoDealerPage'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'
import RacialEqualityPage from './pages/RacialEqualityPage'
import SiteMapPage from './pages/SiteMapPage'

function Layout() {
  const location = useLocation()
  const isPortal = location.pathname.startsWith('/employee') || location.pathname.startsWith('/electrician')
  const isAdmin = location.pathname.startsWith('/admin')
  const isLogin = location.pathname === '/login'
  const chromeless = isPortal || isAdmin || isLogin

  return (
    <div className="min-h-screen bg-navy-950 text-white">
      {!chromeless && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/ev-charger" element={<EVChargerPage />} />
        <Route path="/commercial-charging" element={<CommercialChargingPage />} />
        <Route path="/battery" element={<BatteryPage />} />
        <Route path="/warranty" element={<WarrantyPage />} />
        <Route path="/panel-upgrade" element={<PanelUpgradePage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/quote" element={<QuotePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/intake" element={<CustomerIntakePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/auto-dealers" element={<AutoDealerPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/racial-equality" element={<RacialEqualityPage />} />
        <Route path="/sitemap" element={<SiteMapPage />} />
        <Route path="/employee" element={<EmployeePortalPage />} />
        <Route path="/electrician" element={<ElectricianPortalPage />} />
        <Route path="/admin/intake" element={<AdminIntakePage />} />
        <Route path="/admin/intake/:id" element={<AdminIntakeDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      {!chromeless && <Footer />}
      {!chromeless && <AIAssistant />}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QuoteProvider>
          <Layout />
        </QuoteProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

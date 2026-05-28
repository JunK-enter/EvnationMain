import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { QuoteProvider } from './context/QuoteContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AIAssistant from './components/AIAssistant'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import EVChargerPage from './pages/EVChargerPage'
import PanelUpgradePage from './pages/PanelUpgradePage'
import SolarEnergyPage from './pages/SolarEnergyPage'
import CalculatorPage from './pages/CalculatorPage'
import QuotePage from './pages/QuotePage'
import ContactPage from './pages/ContactPage'
import EmployeePortalPage from './pages/EmployeePortalPage'
import ElectricianPortalPage from './pages/ElectricianPortalPage'
import LoginPage from './pages/LoginPage'

function Layout() {
  const location = useLocation()
  const isPortal = location.pathname.startsWith('/employee') || location.pathname.startsWith('/electrician')
  const isLogin = location.pathname === '/login'

  return (
    <div className="min-h-screen bg-navy-950 text-white">
      {!isPortal && !isLogin && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/ev-charger" element={<EVChargerPage />} />
        <Route path="/panel-upgrade" element={<PanelUpgradePage />} />
        <Route path="/solar-energy" element={<SolarEnergyPage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/quote" element={<QuotePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/employee" element={<EmployeePortalPage />} />
        <Route path="/electrician" element={<ElectricianPortalPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      {!isPortal && !isLogin && <Footer />}
      {!isPortal && !isLogin && <AIAssistant />}
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

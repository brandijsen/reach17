import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'

import Corsi from './pages/Corsi'
import Atenei from './pages/Atenei'
import Associazioni from './pages/Associazioni'
import Tipologie from './pages/Tipologie'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="corsi" element={<Corsi />} />
          <Route path="atenei" element={<Atenei />} />
          <Route path="associazioni" element={<Associazioni />} />
          <Route path="tipologie" element={<Tipologie />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

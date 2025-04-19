import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r p-4">
      <h2 className="text-xl font-bold mb-6">Pannello</h2>
      <nav className="flex flex-col gap-2">
        <NavLink to="/" className="hover:text-blue-600">Dashboard</NavLink>
        <NavLink to="/corsi" className="hover:text-blue-600">Corsi</NavLink>
        <NavLink to="/tipologie" className="hover:text-blue-600">Tipologie</NavLink>
        <NavLink to="/atenei" className="hover:text-blue-600">Atenei</NavLink>
        <NavLink to="/associazioni" className="hover:text-blue-600">Associazioni</NavLink>
      </nav>
    </aside>
  )
}

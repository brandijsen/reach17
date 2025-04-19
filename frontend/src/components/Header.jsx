export default function Header() {
    return (
      <header className="bg-white border-b p-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold">Gestione Dati</h1>
        <div className="text-sm text-gray-600">Admin • <button className="ml-2 underline">Logout</button></div>
      </header>
    )
  }
  
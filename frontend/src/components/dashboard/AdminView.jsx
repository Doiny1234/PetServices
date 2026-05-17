export const AdminView = () => (
  <div className="space-y-6 text-red-700">
    <h2 className="text-2xl font-bold">Panou Administrare Sistem</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-black">
      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
        <p className="text-gray-500 text-sm">Total Utilizatori</p>
        <p className="text-2xl font-bold">124</p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
        <p className="text-gray-500 text-sm">Servicii Active</p>
        <p className="text-2xl font-bold">45</p>
      </div>
      <button className="bg-red-600 text-white font-bold rounded-xl hover:bg-red-800">
        Moderează Review-uri
      </button>
    </div>
  </div>
);
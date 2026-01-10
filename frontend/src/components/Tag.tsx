import { X } from "lucide-react";

// Etiqueta reutilizable con color dinámico
const Tag = ({ children, onClose, color }:any) => {
  const colorMap:any = {
    orange: 'bg-orange-100 text-orange-800',
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    purple: 'bg-purple-100 text-purple-800',
  };

  return (
    <div className={`flex items-center px-3 py-1 rounded-full text-sm ${colorMap[color] || 'bg-gray-200 text-gray-800'}`}>
      <span className="mr-2">{children}</span>
      <button
      title='button'
      onClick={onClose} className="hover:text-red-600">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};


export default Tag
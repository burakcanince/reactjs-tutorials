import React, { useState } from 'react';

const menuItems = [
  { label: 'Option 1' },
  { label: 'Option 2' },
  { label: 'Option 3' },
  { label: 'Option 4' },
];

function App() {
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onClose = () => {
    setIsMenuOpen(false);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();

    setMenuPosition({
      x: e.pageX,
      y: e.pageY
    });

    setIsMenuOpen(true);
  };

  return (
    <>
      <h1 className="font-bold text-3xl mb-4">React Context Menu</h1>
      <div onContextMenu={handleContextMenu} className="cursor-pointer text-gray-600">Right click to open the menu</div>
      {isMenuOpen && (
        <div
          className="absolute bg-white border border-gray-300 rounded-md"
          style={{ top: menuPosition?.y, left: menuPosition?.x }}
          onMouseLeave={onClose}
        >
          {menuItems.map((item, index) => (
            <div
              className="cursor-pointer text-sm text-gray-800 px-8 py-2 hover:bg-gray-100"
              key={index}
              onClick={onClose}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;

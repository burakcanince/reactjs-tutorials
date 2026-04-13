import { createContext, useState, useEffect } from 'react';

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">useContext Hook</h1>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={(e) => {
              setTheme(e.target.checked ? 'dark' : 'light');
            }}
          />
          Dark Mode
        </label>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;

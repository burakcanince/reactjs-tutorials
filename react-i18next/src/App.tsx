import { useTranslation } from 'react-i18next';
import './locales';

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">{t('welcomeMessage')}</h1>
      <div className="flex justify-center gap-4">
        <button onClick={() => changeLanguage('en')} className="bg-gray-800 cursor-pointer rounded-md text-white px-4 py-2">EN</button>
        <button onClick={() => changeLanguage('tr')} className="bg-gray-800 cursor-pointer rounded-md text-white px-4 py-2">TR</button>
      </div>
    </>
  );
}

export default App;

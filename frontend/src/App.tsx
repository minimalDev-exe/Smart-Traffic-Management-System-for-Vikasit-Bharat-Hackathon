import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { CommandCenterPage } from './pages/CommandCenterPage';
import { SupportPage } from './pages/SupportPage';
import { useEffect } from 'react';
import { useSimulationStore } from './store/useSimulationStore';

function DarkModeSync() {
  const isDarkMode = useSimulationStore((s) => s.isDarkMode);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <DarkModeSync />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/command-center/*" element={<CommandCenterPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

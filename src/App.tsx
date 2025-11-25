import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WorkCategories from './pages/WorkCategories';
import WorkGallery from './pages/WorkGallery';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<WorkCategories />} />
          <Route path="/work/:categoryId" element={<WorkGallery />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;

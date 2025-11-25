import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WorkCategories from './pages/WorkCategories';
import WorkGallery from './pages/WorkGallery';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<WorkCategories />} />
        <Route path="/work/:categoryId" element={<WorkGallery />} />
      </Routes>
    </Router>
  );
}

export default App;

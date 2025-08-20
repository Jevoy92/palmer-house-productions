import { Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import ThankYou from './pages/ThankYou';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
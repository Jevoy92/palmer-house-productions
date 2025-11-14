import { useLocation } from 'react-router-dom';
import { EnhancedFooter } from './seo/EnhancedFooter';

export function ConditionalFooter() {
  const location = useLocation();
  
  // Hide footer on dashboard and tool pages
  const hiddenRoutes = ['/dashboard', '/tools/'];
  const shouldHideFooter = hiddenRoutes.some(route => location.pathname.startsWith(route));
  
  if (shouldHideFooter) {
    return null;
  }
  
  return <EnhancedFooter />;
}

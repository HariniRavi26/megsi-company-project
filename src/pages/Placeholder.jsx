import { Link, useParams } from 'react-router-dom';
import { Construction, ArrowLeft } from 'lucide-react';
import { findNavItem } from '../data/navigation.js';

export default function Placeholder() {
  const { slug } = useParams();
  const item = findNavItem(slug);

  return (
    <div className="placeholder">
      <span className="placeholder__icon" aria-hidden="true">
        <Construction size={32} />
      </span>
      <h1>{item ? item.label : 'Page not found'}</h1>
      <p>
        {item
          ? 'This module is a visual placeholder in the demo. Only the Dashboard page is built.'
          : 'The page you are looking for does not exist in this demo.'}
      </p>
      <Link to="/" className="btn-primary">
        <ArrowLeft size={16} aria-hidden="true" /> Back to Dashboard
      </Link>
    </div>
  );
}

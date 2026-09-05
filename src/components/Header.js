import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 backdrop-blur-sm" style={{ zIndex: 2 }}>
      <nav className="flex justify-end space-x-4">
        <Link to="/chroma" className="hover:underline">Chroma</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
        <Link to="/privacy" className="hover:underline">Privacy</Link>
        <Link to="/terms" className="hover:underline">Terms</Link>
      </nav>
    </header>
  );
}

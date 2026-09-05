import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Chroma from './components/Chroma';
import Contact from './components/Contact';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import ThreeBackground from './components/ThreeBackground';

// The Chroma page brings its own background and navigation; every other
// route sits on the particle field under the shared header.
function Shell() {
  const { pathname } = useLocation();
  const standalone = pathname.startsWith('/chroma');
  return (
    <>
      {!standalone && <ThreeBackground />}
      {!standalone && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chroma" element={<Chroma />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Shell />
    </Router>
  );
}

export default App;

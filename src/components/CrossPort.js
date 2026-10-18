import { Link } from 'react-router-dom';
import './CrossPort.css';

const APP_STORE = 'https://apps.apple.com/us/app/crossport/id6761747300';
const CROSSPOINT = 'https://github.com/crosspoint-reader/crosspoint-reader';
const base = process.env.PUBLIC_URL || '';
const img = (name) => `${base}/crossport/${name}`;

const extras = [
  ['Files over WiFi', 'Browse the reader’s storage from your phone. Upload, rename, move, and delete, with progress for big files.'],
  ['Lighter EPUBs', 'Books are optimized on the way over, with images resized for the reader’s screen, and archive filenames cleaned up.'],
  ['Home Screen widget', 'Your current book and how far along you are, one tap from opening it.'],
  ['Siri and Shortcuts', 'Ask to continue reading, check your progress, or send a book to the reader.'],
  ['A demo reader', 'No reader yet? Try CrossPort with a simulated one that comes with a book on it.'],
  ['In your language', 'English, French, German, Spanish, Portuguese, Japanese, Korean, and Chinese.'],
];

// HashRouter owns the URL fragment, so a plain "#listen" link would navigate to
// a /listen route instead of scrolling. Scroll by id and leave the URL alone.
function jump(e) {
  const id = e.currentTarget.getAttribute('href').slice(1);
  const target = document.getElementById(id);
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Phone({ src, alt, className = '' }) {
  return (
    <div className={`phone ${className}`}>
      <img src={img(src)} alt={alt} loading="lazy" />
    </div>
  );
}

// The X4 artwork has a transparent screen; the picture sits behind it.
function Reader({ screen, alt, frame = 'x4-white.webp', className = '' }) {
  return (
    <div className={`reader ${className}`}>
      <img className="screen" src={img(screen)} alt={alt} />
      <img className="frame" src={img(frame)} alt="" aria-hidden="true" />
    </div>
  );
}

function Feature({ id, eyebrow, title, children, art, flip }) {
  return (
    <section id={id} className="feature">
      <div className={`wrap split${flip ? ' flip' : ''}`}>
        <div className="art">{art}</div>
        <div className="copy">
          <div className="eyebrow">{eyebrow}</div>
          <h2>{title}</h2>
          {children}
        </div>
      </div>
    </section>
  );
}

export default function CrossPort() {
  return (
    <div className="crossport">
      <header className="nav">
        <div className="wrap">
          <a href="#top" onClick={jump} className="brand">
            <img src={img('icon-64.png')} alt="" width="32" height="32" />
            <span>CrossPort</span>
          </a>
          <nav className="nav-links">
            <a href="#read" onClick={jump} className="hide-sm">Read</a>
            <a href="#listen" onClick={jump} className="hide-sm">Listen</a>
            <a href="#wallpaper" onClick={jump} className="hide-sm">Wallpaper</a>
            <a href={APP_STORE} className="primary">Download</a>
          </nav>
        </div>
      </header>

      <section id="top" className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">For e-readers running CrossPoint</div>
            <h1>One library.<br />Two screens.</h1>
            <p className="lede">CrossPort is the iPhone companion for your e-reader. Send books and wallpapers to it over WiFi, read on your phone when the reader’s at home, and your place follows you back.</p>
            <div className="cta-row">
              <a href={APP_STORE} className="btn fill">Download on the App Store</a>
              <a href="#read" onClick={jump} className="btn quiet">See how it works</a>
            </div>
            <div className="fine">Free for iPhone. Works with any reader running CrossPoint or one of its community forks.</div>
          </div>
          <div className="hero-art">
            <div className="sky" />
            <Reader screen="reader-hiker.jpg" alt="An e-reader showing CrossPort's hiker carrying a pack of books" className="hero-reader" />
            <Phone src="book.jpg" alt="Dracula's page in CrossPort, with its cover, rating, and a Continue Reading button" className="hero-phone" />
          </div>
        </div>
      </section>

      <section className="strip">
        <div className="wrap strip-row">
          <span>Books</span><i />
          <span>Reading progress</span><i />
          <span>Wallpapers</span><i />
          <span>Files</span><i />
          <span>All over WiFi</span>
        </div>
      </section>

      <Feature
        id="read"
        eyebrow="Read anywhere"
        title="Start on the reader. Keep going on your phone."
        art={<Phone src="curl.jpg" alt="A page of Pride and Prejudice curling over in CrossPort's reader" />}
      >
        <p className="body">CrossPort has its own book reader, with real page turns, a page curl or a slide, and two pages side by side when you turn your phone sideways. Your place syncs both ways: open the reader later and it picks up the page you stopped on.</p>
        <ul className="points">
          <li>Your choice of font, size, and theme</li>
          <li>Opens instantly on the last page you read</li>
          <li>Send a book from your phone to the reader in one tap</li>
        </ul>
      </Feature>

      <Feature
        id="listen"
        flip
        eyebrow="Read Aloud"
        title="Listen when your eyes are busy."
        art={<Phone src="read-aloud.jpg" alt="CrossPort reading a page aloud, with playback controls under the text" />}
      >
        <p className="body">CrossPort reads to you, highlighting each word and turning the pages as it goes. It keeps going with the screen locked, with controls on the Lock Screen.</p>
        <p className="body">On recent iPhones there’s also a neural voice for English books that runs entirely on the phone. Read a passage aloud, and it can read to you in your own voice.</p>
      </Feature>

      <Feature
        id="wallpaper"
        eyebrow="Wallpaper"
        title="Sleep screens, previewed in e-ink."
        art={
          <div className="pair">
            <Phone src="wallpaper.jpg" alt="Wanderer above the Sea of Fog previewed on an Xteink X4 in CrossPort's wallpaper screen" />
          </div>
        }
      >
        <p className="body">Turn any photo or picture into a sleep screen. CrossPort shows how it will look on the reader’s e-ink display before you send it, so there are no surprises when the reader goes to sleep.</p>
      </Feature>

      <Feature
        id="find"
        flip
        eyebrow="Find books"
        title="Your Calibre library, and thousands of classics."
        art={<Phone src="feeds.jpg" alt="Pride and Prejudice from a library feed in CrossPort, with buttons to read on the phone or send to the reader" />}
      >
        <p className="body">Browse your own Calibre content server, Project Gutenberg, or any OPDS catalog right in CrossPort. Search, sign in where a library needs it, and send a book straight to your phone or your reader.</p>
      </Feature>

      <section id="more" className="more">
        <div className="wrap">
          <h2>And the small things.</h2>
          <div className="grid3">
            {extras.map(([title, text]) => (
              <div className="card" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="works">
        <div className="wrap">
          <div className="panel">
            <div className="panel-art">
              <Reader screen="reader-hiker.jpg" alt="" frame="x4-black.webp" className="small" />
            </div>
            <div>
              <h2>Made for CrossPoint.</h2>
              <p className="body"><a href={CROSSPOINT}>CrossPoint</a> is open-source e-reader firmware. It runs on the Xteink X4 and X3 and on other readers, and being open source, it has plenty of community forks. CrossPort works with any of them that keep CrossPoint’s WiFi file transfer: put your reader in File Transfer mode on the same network, and CrossPort finds it.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="closing">
        <div className="wrap">
          <img src={img('icon.png')} alt="CrossPort's app icon" className="closing-icon" width="96" height="96" />
          <h2>Pack your library.</h2>
          <div className="cta-row">
            <a href={APP_STORE} className="btn fill">Download on the App Store</a>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap foot">
          <div className="foot-brand">CrossPort is made by Snacks After Midnight.</div>
          <div className="foot-links">
            <Link to="/">Home</Link>
            <Link to="/news">News</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

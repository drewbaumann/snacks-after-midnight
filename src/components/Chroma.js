import { Link } from 'react-router-dom';
import FoilTicket from './FoilTicket';
import './Chroma.css';

const APP_STORE = 'https://apps.apple.com/us/app/chroma-spatial-cinema/id6478800800';
const base = process.env.PUBLIC_URL || '';

const whatsNew = [
  ['Apple TV', 'Your libraries on the biggest screen in the house, with Top Shelf, Plex Home profiles, and the same Chroma Pass.'],
  ['New environments', 'On Vision Pro, the Nostalgia Machine, a home-video environment with a VCR and an analog TV, and Midnight Woods, a cabin porch in a forest at night under tonight’s real moon.'],
  ['New cinemas', 'A photoreal small cinema, a reworked large one, and projection booths that glow with the film. Or take it into one of Apple’s Environments.'],
  ['Play in Chroma', 'A Safari extension on Vision Pro that opens a web page’s video in Chroma, 4K VR streams included.'],
  ['Wait for Full Quality', 'If you’d rather wait out a slow connection than watch a softer picture, Chroma never lowers the quality on its own.'],
  ['In your language', 'Chroma now speaks French, German, Spanish, Japanese, Korean, Chinese, Arabic, and Hindi.'],
];

// HashRouter owns the URL fragment, so a plain "#pass" link would navigate to
// a /pass route instead of scrolling. Scroll by id and leave the URL alone.
function jump(e) {
  const id = e.currentTarget.getAttribute('href').slice(1);
  const target = document.getElementById(id);
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// The Aperture mark: five rings, opening ±22° about the right-hand side.
function CMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" strokeWidth="1.4" strokeLinecap="butt" aria-hidden="true">
      <path d="M26.05 18.87A13.00 13.00 0 1 1 26.05 9.13" stroke="#32ADE6" />
      <path d="M24.12 18.09A10.92 10.92 0 1 1 24.12 9.91" stroke="#00C7BE" />
      <path d="M22.21 17.32A8.85 8.85 0 1 1 22.21 10.68" stroke="#FFCC00" />
      <path d="M20.27 16.53A6.76 6.76 0 1 1 20.27 11.47" stroke="#FF9500" />
      <path d="M18.34 15.75A4.68 4.68 0 1 1 18.34 12.25" stroke="#FF2D55" />
    </svg>
  );
}

export default function Chroma() {
  return (
    <div className="chroma">
      <header className="nav">
        <div className="wrap">
          <a href="#top" onClick={jump} className="wordmark">Chroma</a>
          <nav className="nav-links">
            <a href="#new" onClick={jump} className="hide-sm">What&rsquo;s new</a>
            <a href="#cinema" onClick={jump} className="hide-sm">Cinema</a>
            <a href="#pass" onClick={jump}>Chroma Pass</a>
            <a href={APP_STORE} className="primary">Download</a>
          </nav>
        </div>
      </header>

      <section id="top" className="hero">
        <div className="starburst" />
        <div className="iris-glow" />
        <div className="wrap hero-shot">
          <div className="frame">
            <img src={`${base}/chroma/hero-room.jpg`} alt="A film with subtitles on the big screen in Chroma's small cinema on Apple Vision Pro" />
          </div>
        </div>
        <div className="wrap">
          <div className="tag">Chroma 2.9 is out now on Apple Vision Pro, iPhone, iPad, and Apple TV</div>
          <h1>Your media, cinema-grade.</h1>
          <p className="lede">Plex, Jellyfin, Emby, and local videos, played in all their glory. 4K, Dolby Vision, and Atmos in a theater that goes wherever you do.</p>
          <div className="cta-row">
            <a href={APP_STORE} className="btn fill">Get Chroma on the App Store</a>
            <Link to="/news/chroma-2-9" className="btn glass">Read what&rsquo;s new</Link>
          </div>
          <div className="fine">Free to try. Chroma Pass unlocks unlimited watching.</div>
        </div>
      </section>

      <section id="new" className="block first">
        <div className="wrap">
          <h2>What&rsquo;s new in Chroma 2.9</h2>
          <div className="grid3">
            {whatsNew.map(([title, text]) => (
              <div className="card" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cinema" className="block">
        <div className="wrap">
          <div className="split">
            <div className="shot">
              <img src={`${base}/chroma/cinema.jpg`} alt="An immersive Chroma theater with a lit stage on screen, subtitles, and the transport bar" />
            </div>
            <div>
              <h2>A theater built around you.</h2>
              <p className="body">Choose an environment: two cinemas, the Nostalgia Machine, Midnight Woods, or one of Apple&rsquo;s Environments. Pick your row, or float up to the balcony and tilt the whole environment back for watching while lying down. Dolby Vision, Dolby Atmos, HDR, and multichannel audio come through as the file was made.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="library" className="block">
        <div className="wrap">
          <div className="split flip">
            <div>
              <h2>The file, untouched.</h2>
              <p className="body">Direct play for the formats servers usually transcode, MKV included. Style your subtitles, choose audio tracks, nudge caption timing, and skip intros and credits. Home Screen widgets and deep links go straight into playback.</p>
              <div className="note">Skipping intros and credits requires Plex Pass on the library owner&rsquo;s server.</div>
            </div>
            <div className="shot">
              <img src={`${base}/chroma/library.jpg`} alt="Chroma's Home view on iPad, with a Continue Watching row and Recently Added shelves" />
            </div>
          </div>
        </div>
      </section>

      <section id="next" className="block">
        <div className="wrap">
          <div className="panel next">
            <div className="split">
              <div>
                <h2>Now on iPhone and iPad.</h2>
                <p className="body">The same libraries and the same Chroma Pass, on the screen in your pocket. Picture in Picture, downloads, Transcribe, and playback that picks up right where your Vision Pro left off.</p>
                <div className="cta-row"><a href={APP_STORE} className="btn fill">Get Chroma for iPhone and iPad</a></div>
              </div>
              <div className="phone-wrap">
                <img className="phone" src={`${base}/chroma/iphone.jpg`} alt="Chroma's Home screen on iPhone" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="duo" className="block">
        <div className="wrap">
          <div className="duo-head">
            <h2>Your pocket cinema.</h2>
            <p className="body">On iPhone Duo, Chroma follows the fold. Start a film on the cover screen, open it up for the full picture, or stand it in laptop pose with the picture on top and the controls below.</p>
          </div>
          <div className="shot film">
            <video controls playsInline preload="none" poster={`${base}/chroma/duo-film-poster.jpg`} src={`${base}/chroma/duo-film.mp4`} aria-label="Chroma on iPhone Duo: playing on the cover screen, unfolding to the full display, and in laptop pose" />
          </div>
          <p className="credit">Big Buck Bunny &copy; 2008 Blender Foundation and Sintel &copy; Blender Foundation, both CC BY 3.0.</p>
        </div>
      </section>

      <section id="tv" className="block">
        <div className="wrap">
          <div className="split flip">
            <div>
              <h2>Now on Apple TV.</h2>
              <p className="body">Your libraries on the biggest screen in the house. Top Shelf shows what you&rsquo;re watching, Who&rsquo;s Watching picks the right Plex Home profile, and subtitles stored as pictures, like those on Blu-rays, are read into text you can restyle. Same Chroma Pass, and it picks up right where you left off.</p>
              <div className="cta-row"><a href={APP_STORE} className="btn fill">Get Chroma for Apple TV</a></div>
            </div>
            <div className="shot">
              <img src={`${base}/chroma/apple-tv.jpg`} alt="A show's detail page in Chroma on Apple TV" />
            </div>
          </div>
        </div>
      </section>

      <section id="pass" className="block">
        <div className="wrap">
          <div className="panel pass">
            <FoilTicket src={`${base}/chroma/pass.png`} alt="The holographic Chroma Pass ticket, with the rainbow Chroma logo" />
            <h2>Chroma Pass</h2>
            <p className="body">Chroma plays five minutes of anything for free. Chroma Pass removes the limit and keeps your playback position in sync with your server.</p>
            <p className="body">Monthly or yearly with a free trial, or a one-time Lifetime purchase. Current pricing is in the app.</p>
          </div>
        </div>
      </section>

      <section className="closing">
        <div className="wrap">
          <h2>Bring your own library.</h2>
          <div className="cta-row">
            <a href={APP_STORE} className="btn fill">Get Chroma on the App Store</a>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap foot">
          <div className="foot-brand">
            <CMark />
            <span>Chroma is made by Snacks After Midnight.</span>
          </div>
          <div className="foot-links">
            <Link to="/">Home</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

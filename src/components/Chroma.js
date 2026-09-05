import { Link } from 'react-router-dom';
import './Chroma.css';

const APP_STORE = 'https://apps.apple.com/us/app/chroma-spatial-cinema/id6478800800';
const base = process.env.PUBLIC_URL || '';

const whatsNew = [
  ['Jellyfin and Emby', 'They join Plex. Multiple servers, all in one sidebar.'],
  ['One library, every server', 'Search across everything you own. Genre chips, trailers, extras and cast on richer detail pages.'],
  ['AI 3D', 'Watch 2D titles with real depth, on device.'],
  ['VR180, VR360 and spatial video', 'Immersive formats play natively, alongside MV-HEVC spatial video.'],
  ['Transcribe', 'On-device live subtitles for videos that have none.'],
  ['Downloads that remember', 'Offline playback resumes where you stopped and reports back to your server when you’re online again.'],
];

function CMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F5F5F7" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M19.5 6.2A10 10 0 1 0 19.5 17.8" />
      <path d="M17.3 8.2A7 7 0 1 0 17.3 15.8" />
      <path d="M15.1 10.2A4 4 0 1 0 15.1 13.8" />
      <path d="M13 12h-1" />
    </svg>
  );
}

export default function Chroma() {
  return (
    <div className="chroma">
      <header className="nav">
        <div className="wrap">
          <a href="#top" className="wordmark">Chroma</a>
          <nav className="nav-links">
            <a href="#new" className="hide-sm">What&rsquo;s new</a>
            <a href="#cinema" className="hide-sm">Cinema</a>
            <a href="#pass">Chroma Pass</a>
            <a href={APP_STORE} className="primary">Download</a>
          </nav>
        </div>
      </header>

      <section id="top" className="hero">
        <div className="starburst" />
        <div className="iris-glow" />
        <div className="wrap">
          <div className="eyebrow beam">CHROMA 2.0 &middot; NOW ON APPLE VISION PRO</div>
          <h1>Your library, projected properly.</h1>
          <p className="lede">Plex, Jellyfin and Emby, played the way they were graded. 4K, Dolby Vision and Atmos in a theater that exists only in your room.</p>
          <div className="cta-row">
            <a href={APP_STORE} className="btn fill">Get Chroma for Vision Pro</a>
            <a href="#next" className="btn glass">iPhone and iPad are next</a>
          </div>
          <div className="fine">Free to try. Chroma Pass unlocks unlimited watching.</div>
        </div>
        <div className="wrap hero-shot">
          <div className="frame">
            <img src={`${base}/chroma/hero-room.jpg`} alt="Chroma playing a film on a wall-sized virtual screen in a living room, seen through Apple Vision Pro" />
          </div>
        </div>
      </section>

      <section id="new" className="block first">
        <div className="wrap">
          <div className="eyebrow">WHAT&rsquo;S NEW IN 2.0</div>
          <h2>The biggest update yet.</h2>
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
              <div className="eyebrow">CINEMA</div>
              <h2>A theater built around you.</h2>
              <p className="body">Pick your row, or float up to the balcony and tilt the whole room back for watching while lying down. Dolby Vision, Dolby Atmos, HDR and multichannel audio come through as the file was made.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="library" className="block">
        <div className="wrap">
          <div className="split flip">
            <div>
              <div className="eyebrow">LIBRARY</div>
              <h2>The file, untouched.</h2>
              <p className="body">Direct play for the formats servers usually transcode, MKV included. Style your subtitles, choose audio tracks, nudge caption timing, and skip intros and credits. Home Screen widgets and deep links go straight into playback.</p>
              <div className="note">Skipping intros and credits requires Plex Pass on the library owner&rsquo;s server.</div>
            </div>
            <div className="shot">
              <img src={`${base}/chroma/library.jpg`} alt="Chroma's Home view floating over a dining table, with a Continue Watching row of posters" />
            </div>
          </div>
        </div>
      </section>

      <section id="next" className="block">
        <div className="wrap">
          <div className="panel next">
            <div className="split">
              <div>
                <div className="eyebrow beam" style={{ marginBottom: 12 }}>COMING SOON</div>
                <h2>Next: iPhone and iPad.</h2>
                <p className="body">The same libraries and the same Chroma Pass, on the screen in your pocket. Picture in Picture, downloads, Transcribe, and playback that picks up right where your Vision Pro left off.</p>
              </div>
              <div className="phone-wrap">
                <img className="phone" src={`${base}/chroma/iphone.jpg`} alt="Chroma's Home screen on iPhone" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pass" className="block">
        <div className="wrap">
          <div className="panel pass">
            <img className="ticket" src={`${base}/chroma/pass.png`} alt="The gold Chroma Pass ticket" />
            <h2>Chroma Pass</h2>
            <p className="body">Chroma plays five minutes of anything for free. Chroma Pass removes the limit and keeps your playback position in sync with your server.</p>
            <div className="tiers">
              <span className="tier">Monthly</span>
              <span className="tier">Yearly</span>
              <span className="tier gold">Lifetime</span>
            </div>
            <div className="note">Subscriptions start with a free trial. Lifetime is a one-time purchase. Current pricing is shown in the app.</div>
          </div>
        </div>
      </section>

      <section className="closing">
        <div className="wrap">
          <h2>Bring your own library.</h2>
          <div className="cta-row">
            <a href={APP_STORE} className="btn fill">Get Chroma for Vision Pro</a>
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

import { Link } from 'react-router-dom';

const CROSSPORT = 'https://apps.apple.com/us/app/crossport/id6761747300';

const card = 'block w-full max-w-[360px] p-7 rounded-[20px] border border-white/15 backdrop-blur-md text-white no-underline transition-transform duration-150 ease-out hover:-translate-y-1.5 hover:rotate-0';

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen gap-12 px-6 pt-24 pb-16 text-white" style={{ zIndex: 1 }}>
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl text-cyan-400 font-marker" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Snacks After Midnight</h1>
        <p className="font-marker text-xl md:text-2xl text-white/70 mt-4 -rotate-1">Small apps, made late.</p>
      </div>

      <div className="flex flex-wrap items-stretch justify-center gap-8 w-full">
        <Link
          to="/chroma"
          className={`${card} -rotate-2`}
          style={{ background: 'rgba(13,13,20,0.82)', boxShadow: '0 24px 60px rgba(138,43,226,0.25)' }}
        >
          <span className="inline-block px-2.5 py-1 rounded-full bg-cyan-400 text-black text-xs font-bold tracking-wider">NEW · 2.0</span>
          <div
            className="mt-3.5 text-[44px] leading-tight"
            style={{ fontFamily: 'Monoton, cursive', background: 'linear-gradient(90deg, #FF2D55, #FF9500, #FFCC00, #00C7BE, #32ADE6)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}
          >
            Chroma
          </div>
          <p className="mt-2.5 text-[17px] leading-snug text-white/75">Your Plex, Jellyfin and Emby libraries in a cinema built around you. Now on Apple Vision Pro. iPhone and iPad next.</p>
          <div className="mt-4 text-[15px] font-semibold text-cyan-400">See what&rsquo;s new →</div>
        </Link>

        <a
          href={CROSSPORT}
          className={`${card} rotate-[1.5deg]`}
          style={{ background: 'rgba(13,13,20,0.82)', boxShadow: '0 24px 60px rgba(75,0,130,0.3)' }}
        >
          <span className="inline-block px-2.5 py-1 rounded-full bg-white/10 text-white text-xs font-bold tracking-wider">iOS</span>
          <div className="mt-3.5 text-[40px] leading-tight font-marker">CrossPort</div>
          <p className="mt-2.5 text-[17px] leading-snug text-white/75">The companion app for e-readers running CrossPoint. Books, wallpapers and files over WiFi.</p>
          <div className="mt-4 text-[15px] font-semibold text-cyan-400">Get it on the App Store →</div>
        </a>
      </div>
    </main>
  );
}

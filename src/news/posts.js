import { Link } from 'react-router-dom';

const base = process.env.PUBLIC_URL || '';
const CHROMA_APP_STORE = 'https://apps.apple.com/us/app/chroma-spatial-cinema/id6478800800';

function Shot({ src, alt, narrow }) {
  return <img src={`${base}/news/${src}`} alt={alt} className={narrow ? 'mx-auto max-w-[300px] rounded-xl' : 'rounded-xl'} />;
}

// Newest first. Each post is an app update; `body` is its full text.
const posts = [
  {
    slug: 'chroma-2',
    app: 'Chroma',
    title: 'Chroma 2: every server, every screen',
    date: '2026-09-24',
    summary: 'Chroma now plays from Plex, Jellyfin and Emby, runs on iPhone and iPad as well as Vision Pro, and picked up a long list of new ways to watch.',
    cover: 'chroma-2/vision-home.jpg',
    body: () => (
      <>
        <p>Chroma first shipped in March 2024 as a Plex client for Apple Vision Pro that put your library on a giant screen in a cinema. Chroma 2 is a different app: it plays from Plex, Jellyfin <em>and</em> Emby, it runs on iPhone and iPad as well as Vision Pro, and it has picked up a long list of new features. Here&rsquo;s everything that&rsquo;s new across the 2.x releases so far.</p>
        <p><a href={CHROMA_APP_STORE}>Get Chroma on the App Store</a> for Apple Vision Pro, iPhone and iPad.</p>
        <Shot src="chroma-2/vision-home.jpg" alt="Chroma's Home on Apple Vision Pro" />

        <h2>Every server, one app</h2>
        <p>Chroma started out as Plex-only. Now <strong>Jellyfin and Emby</strong> sit alongside Plex, and you can connect as many servers as you like. They share one toolbar, so switching between them is a tap, and <strong>search covers every server at once</strong>. You can also search inside a single library, from the top of its grid, and the results come from the server so they cover the whole collection.</p>
        <ul>
          <li><strong>Custom Plex server addresses.</strong> Point Chroma at an address your Plex server doesn&rsquo;t advertise, like a Tailscale or VPN hostname, a reverse proxy, or a LAN IP. Chroma checks that it really is your server before it saves it.</li>
          <li><strong>Plex Home.</strong> Switch between the people sharing one Plex account, each with their own libraries and watch progress.</li>
          <li><strong>A film in two libraries shows up once.</strong> If you have the HD and 4K versions in separate libraries, you get one card with the versions in its menu.</li>
          <li><strong>Steadier connections.</strong> A server that&rsquo;s asleep doesn&rsquo;t slow down the others, and when one can&rsquo;t be reached Chroma says so straight away and reconnects on its own when it comes back.</li>
        </ul>
        <Shot src="chroma-2/iphone-servers.jpg" alt="Libraries from several servers on iPhone" narrow />

        <h2>iPhone and iPad</h2>
        <p>Chroma is on <strong>iPhone and iPad</strong> now. It&rsquo;s the same app, built for the smaller screen: the same Home, the same detail pages, the same downloads, and a native player with your subtitle styles.</p>
        <div className="grid grid-cols-2 gap-4">
          <Shot src="chroma-2/iphone-home.jpg" alt="Chroma's Home on iPhone" narrow />
          <Shot src="chroma-2/iphone-detail.jpg" alt="A movie's detail page on iPhone" narrow />
        </div>
        <Shot src="chroma-2/ipad-home.jpg" alt="Chroma's Home on iPad" />

        <h2>Browsing that feels instant</h2>
        <p>Browsing got rebuilt from the ground up. Detail pages have <strong>trailers, extras and cast</strong> (with the episodes of a show laid out below), and you can browse by <strong>genre</strong>. A show opens on the season you&rsquo;re actually watching. <strong>Pages open instantly</strong>, even right after launching the app: Chroma shows what it last saw, then quietly catches up in the background.</p>
        <Shot src="chroma-2/vision-detail.jpg" alt="A movie's detail page on Vision Pro" />
        <Shot src="chroma-2/vision-episodes-cast.jpg" alt="A show's episodes and cast" />

        <h2>Watching, in the cinema</h2>
        <p>The cinema is still the heart of the Vision Pro app, and it keeps getting better:</p>
        <ul>
          <li><strong>The sound is laid out around you and anchored to the screen</strong>, so dialogue stays where the picture is when you turn your head.</li>
          <li><strong>Up Next</strong> keeps the picture playing while the next episode waits in the corner, and on Plex, <strong>Skip Intro</strong> is right where you&rsquo;d expect it.</li>
          <li>The info card has a <strong>Continue Watching</strong> tab, so you can pick up something else without leaving your seat.</li>
        </ul>
        <Shot src="chroma-2/vision-cinema.jpg" alt="Watching in Chroma's cinema" />
        <Shot src="chroma-2/vision-skip-intro.jpg" alt="Skip Intro in the cinema" />

        <h2>New ways to watch</h2>
        <ul>
          <li><strong>AI 3D</strong> (Vision Pro): watch regular 2D titles with real depth.</li>
          <li><strong>VR180, VR360 and spatial video</strong> playback on Vision Pro.</li>
          <li><strong>Transcribe:</strong> on-device live subtitles for videos that don&rsquo;t have any.</li>
          <li><strong>Subtitles that follow your style.</strong> Image-based subtitles (the PGS tracks common in Blu-ray rips) get converted to text, so they use your font and size like any other subtitle.</li>
        </ul>
        <Shot src="chroma-2/ipad-subtitles.jpg" alt="Subtitle styles on iPad" />

        <h2>The Analog TV</h2>
        <p>This one&rsquo;s just for fun, and it&rsquo;s Vision Pro only. Pick <strong>Analog TV</strong> and a vintage CRT set appears right in your room, next to your other apps. Your movie plays on the tube, with scanlines, phosphor tint and bloom you can tune to taste, and the sound comes from the set. It even lights up your room: the colors on screen spill onto the real floor in front of the TV, the way an old set glows in a dark room.</p>
        <Shot src="chroma-2/vision-analog-tv.jpg" alt="The Analog TV on a shelf in the room" />
        <Shot src="chroma-2/vision-analog-tv-room.jpg" alt="The Analog TV in a living room" />
        <p><small>Playing on the set: <em>Big Buck Bunny</em> © Blender Foundation, CC BY 3.0.</small></p>

        <h2>Downloads</h2>
        <ul>
          <li><strong>Download a whole season</strong> in one go, or just the episodes you haven&rsquo;t watched.</li>
          <li>A show&rsquo;s episodes sit together in one row, with the poster, episode count and storage used.</li>
          <li>Downloads remember where you left off.</li>
        </ul>
        <Shot src="chroma-2/vision-downloads.jpg" alt="Downloads on Vision Pro" />

        <h2>Siri, Shortcuts and widgets</h2>
        <ul>
          <li>Ask Siri to <strong>&ldquo;play Shrek in Chroma&rdquo;</strong>, <strong>&ldquo;continue watching in Chroma&rdquo;</strong> or <strong>&ldquo;play the next episode&rdquo;</strong>. While something&rsquo;s playing, <strong>&ldquo;turn on subtitles&rdquo;</strong> or <strong>&ldquo;change the audio to English&rdquo;</strong> work too.</li>
          <li>Your Continue Watching and Recently Added titles show up in <strong>Spotlight</strong> and Siri&rsquo;s suggestions.</li>
          <li>The <strong>Movie Poster widget</strong> puts a shelf of posters on your Home Screen (or in your room, on Vision Pro), with your progress under each one. You choose, per widget, whether tapping a poster opens the title or starts playing it.</li>
        </ul>

        <h2>Plus a watchlist</h2>
        <p>Heart any title on Plex or Jellyfin and it lands on your <strong>Watchlist</strong>, which gets its own row on Home and a page of its own.</p>

        <h2>Chroma Pass</h2>
        <p>Everything above works in Chroma for free, with a limit on watch time. <strong>Chroma Pass</strong> removes that limit, unlocks the exclusive cinema environments, and syncs your watch progress with your server. It&rsquo;s available <strong>Monthly, Yearly, or as a one-time Lifetime</strong> purchase, and it starts with a free trial.</p>

        <hr />
        <p>Chroma is on the <a href={CHROMA_APP_STORE}>App Store</a> for Apple Vision Pro, iPhone and iPad. See more on the <Link to="/chroma">Chroma page</Link>, and if you try it, <Link to="/contact">tell us what you think</Link>.</p>
      </>
    ),
  },
];

export default posts;

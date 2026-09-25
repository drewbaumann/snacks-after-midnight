import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import posts from '../news/posts';

const base = process.env.PUBLIC_URL || '';

function formatDate(iso) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function NewsList() {
  return (
    <main className="relative flex flex-col items-center min-h-screen px-6 pt-24 pb-16 text-white" style={{ zIndex: 1 }}>
      <h1 className="text-5xl md:text-6xl text-cyan-400 font-marker mb-10" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>News</h1>
      <div className="flex flex-col gap-8 w-full max-w-3xl">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/news/${post.slug}`}
            className="block rounded-[20px] border border-white/15 backdrop-blur-md overflow-hidden no-underline text-white transition-transform duration-150 ease-out hover:-translate-y-1"
            style={{ background: 'rgba(13,13,20,0.82)' }}
          >
            {post.cover && <img src={`${base}/news/${post.cover}`} alt="" className="w-full" />}
            <div className="p-7">
              <div className="text-sm text-white/60">{post.app} · {formatDate(post.date)}</div>
              <h2 className="mt-2 text-2xl font-semibold">{post.title}</h2>
              <p className="mt-2 text-white/75 leading-snug">{post.summary}</p>
              <div className="mt-4 text-[15px] font-semibold text-cyan-400">Read more →</div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export function NewsPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);
  if (!post) {
    return (
      <main className="relative flex flex-col items-center min-h-screen px-6 pt-24 text-white" style={{ zIndex: 1 }}>
        <p>That post doesn&rsquo;t exist. <Link to="/news" className="text-cyan-400">See all news</Link>.</p>
      </main>
    );
  }
  const Body = post.body;
  return (
    <div className="flex flex-col items-center text-black overflow-y-auto p-6 md:p-8 pt-20 md:pt-24" style={{ position: 'relative', zIndex: 1 }}>
      <article className="prose prose-img:my-6 max-w-3xl w-full bg-white p-6 md:p-10 rounded-lg">
        <p className="not-prose text-sm text-gray-500"><Link to="/news" className="hover:underline">News</Link> · {post.app} · {formatDate(post.date)}</p>
        <h1>{post.title}</h1>
        <Body />
      </article>
    </div>
  );
}

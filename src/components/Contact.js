// Same Google Form as drewbaumann.com/contact so every submission lands in the
// one response sheet. The previous mailto: form did nothing for visitors
// without a configured mail client.
const FORM_ID = '1FAIpQLScXc9FICd7ZyKmuVK9GoLHshyjfkgF8GdiGU8f1Bi5sskK17g';
const FORM_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/viewform?embedded=true`;

export default function Contact() {
  return (
    <div className="flex flex-col items-center text-white overflow-y-auto p-8 pt-20">
      <h1 className="text-4xl mb-2">Contact Us</h1>
      <p className="text-gray-300 mb-6 text-center">
        Questions, bug reports, or ideas for Chroma and our other apps. We read everything.
      </p>
      <iframe
        title="Contact form"
        src={FORM_URL}
        className="w-full max-w-2xl rounded bg-white"
        style={{ height: 1142, border: 0 }}
        loading="lazy"
      >
        Loading…
      </iframe>
      <p className="text-gray-400 text-sm mt-6 text-center">
        Prefer email?{' '}
        <a href="mailto:drew@snacksaftermidnight.com" className="underline hover:text-white">
          drew@snacksaftermidnight.com
        </a>
      </p>
    </div>
  );
}

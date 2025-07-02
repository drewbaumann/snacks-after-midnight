import { useState } from 'react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError('All fields are required');
      return;
    }
    setError('');
    window.location.href = `mailto:drew@snacksaftermidnight.com?subject=Contact Form&body=${message}%0D%0A%0D%0A--%0D%0A${name}%0D%0A${email}`;
  };

  return (
    <div className="flex flex-col items-center text-white overflow-y-auto p-8 pt-20">
      <h1 className="text-4xl mb-8">Contact Us</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full px-4 sm:w-2/3 md:w-1/2 lg:w-1/3">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded bg-gray-800"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded bg-gray-800"
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-2 rounded bg-gray-800 h-32"
        />
        <button type="submit" className="p-2 rounded bg-blue-500 hover:bg-blue-700">Submit</button>
      </form>
    </div>
  );
}

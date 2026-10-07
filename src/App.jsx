import React, { useState, useRef, useEffect } from 'react';
import { 
  Instagram, Search, Sparkles, Image as ImageIcon, Copy, Check, Download, 
  Camera, Heart, Star, Compass, Music, ShoppingBag, Coffee, Plane, User, Eye
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('highlights');

  // --- HIGHLIGHT MAKER STATES ---
  const canvasRef = useRef(null);
  const [bgType, setBgType] = useState('solid'); // 'solid' or 'gradient'
  const [bgColor1, setBgColor1] = useState('#0f172a');
  const [bgColor2, setBgColor2] = useState('#3b82f6');
  const [iconColor, setIconColor] = useState('#ffffff');
  const [ringColor, setRingColor] = useState('#e2e8f0');
  const [hasRing, setHasRing] = useState(true);
  const [selectedIcon, setSelectedIcon] = useState('Sparkles');

  const iconsList = [
    { name: 'Sparkles', component: Sparkles },
    { name: 'Heart', component: Heart },
    { name: 'Star', component: Star },
    { name: 'Camera', component: Camera },
    { name: 'Compass', component: Compass },
    { name: 'Music', component: Music },
    { name: 'ShoppingBag', component: ShoppingBag },
    { name: 'Coffee', component: Coffee },
    { name: 'Plane', component: Plane },
    { name: 'User', component: User },
  ];

  // Render Canvas (1080x1920 preview scaled down)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = 1080;
    const height = 1920;
    canvas.width = width;
    canvas.height = height;

    // Background
    if (bgType === 'gradient') {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, bgColor1);
      grad.addColorStop(1, bgColor2);
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = bgColor1;
    }
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;

    // Outer aesthetic ring
    if (hasRing) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, 260, 0, Math.PI * 2);
      ctx.strokeStyle = ringColor;
      ctx.lineWidth = 10;
      ctx.stroke();

      // Soft outer glow ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, 280, 0, Math.PI * 2);
      ctx.strokeStyle = ringColor + '33'; // translucent
      ctx.lineWidth = 4;
      ctx.stroke();
    }

    // Icon draw (Simple SVG path fallback or custom glyph circle)
    ctx.fillStyle = iconColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 180px sans-serif';

    // Simple symbols mapping for canvas rendering
    const symbols = {
      Sparkles: '✦',
      Heart: '♥',
      Star: '★',
      Camera: '📷',
      Compass: '🧭',
      Music: '🎵',
      ShoppingBag: '🛍',
      Coffee: '☕',
      Plane: '✈',
      User: '👤'
    };

    ctx.fillText(symbols[selectedIcon] || '✦', centerX, centerY);
  }, [bgType, bgColor1, bgColor2, iconColor, ringColor, hasRing, selectedIcon]);

  const downloadCover = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `fastgram-highlight-${selectedIcon.toLowerCase()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // --- BIO GENERATOR STATES ---
  const [bioCategory, setBioCategory] = useState('minimal');
  const [copiedBioIndex, setCopiedBioIndex] = useState(null);

  const biosData = {
    minimal: [
      "Simplicity is the keynote of all elegance. 🕊️\n📍 Creating quietly.\n✨ Less is more.",
      "Just observing the chaos. ☕\nDigital creator | Dreamer\nDM for collabs 📩",
      "Making memories across the world. 🌍\nClean aesthetic & good energy only."
    ],
    aesthetic: [
      "𝒱𝒾𝒷𝒾𝓃𝑔 𝒾𝓃 𝓂𝓎 𝑜𝓌𝓃 𝓌𝑜𝓇𝓁𝒹 ✨\n☕ Coffee • Books • Soft sunsets\n🍂 Living life in pastel tones",
      "⋆｡°✩ In my healing era ✩°｡⋆\n🎨 Art, music, and quiet mornings\n🌙 Manifesting pure happiness",
      "🌸 𝒞𝓇𝑒𝒶𝓉𝒾𝓃𝑔 𝓂𝓎 𝑜𝓌𝓃 𝓈𝓊𝓃𝓈𝒽𝒾𝓃𝑒\n📷 Visual diary & subtle moments\n💌 Contact via email"
    ],
    business: [
      "🚀 Helping brands scale effortlessly\n📈 E-commerce & growth marketing\n👇 Tap below to work with us!",
      "Building products that people love. 💡\nFounder & Creator\n💼 Inquiries: contact@brand.com",
      "Turn your vision into reality. ⚡\nExclusive collections & drops\nShop the latest feed link below 👇"
    ],
    savage: [
      "Not your average story. 🕶️\nBorn to express, not to impress.\nKeep scrolling.",
      "Silence says it all. ♠️\nToo busy focusing on my own lane.",
      "Catch flights, not feelings. ✈️\nLiving on my own terms 100%."
    ]
  };

  const copyToClipboard = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedBioIndex(idx);
    setTimeout(() => setCopiedBioIndex(null), 2000);
  };

  // --- VIEWER STATES ---
  const [searchUsername, setSearchUsername] = useState('');
  const [searchedUser, setSearchedUser] = useState(null);
  const [viewerLoading, setViewerLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchUsername.trim()) return;
    setViewerLoading(true);

    // Mock response demonstration (yahan RapidAPI plug hogi)
    setTimeout(() => {
      setSearchedUser({
        username: searchUsername.replace('@', ''),
        fullName: 'Demo Public Profile',
        bio: 'Just another creator exploring possibilities ✨\nLiving the best moments.',
        followers: '124K',
        following: '412',
        posts: '89',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        hasStories: true
      });
      setViewerLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 rounded-xl text-white shadow-lg shadow-rose-500/20">
              <Instagram size={22} />
            </div>
            <div className="leading-tight">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">Fastgram</span>
              <span className="text-[10px] block font-semibold text-rose-400 uppercase tracking-widest">Creator Suite</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex bg-slate-900 p-1 border border-slate-800 rounded-xl text-xs sm:text-sm font-medium">
            <button
              onClick={() => setActiveTab('viewer')}
              className={`px-3 sm:px-4 py-1.5 rounded-lg transition ${activeTab === 'viewer' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              Profile Viewer
            </button>
            <button
              onClick={() => setActiveTab('highlights')}
              className={`px-3 sm:px-4 py-1.5 rounded-lg transition ${activeTab === 'highlights' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              Highlight Maker
            </button>
            <button
              onClick={() => setActiveTab('bio')}
              className={`px-3 sm:px-4 py-1.5 rounded-lg transition ${activeTab === 'bio' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              Bio Generator
            </button>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 py-8 flex-1 w-full">
        {/* ===================== TAB 1: HIGHLIGHT ICON MAKER ===================== */}
        {activeTab === 'highlights' && (
          <div className="space-y-6">
            <div className="text-center max-w-lg mx-auto">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Create Aesthetic Highlight Covers</h1>
              <p className="text-slate-400 text-sm mt-1">Design minimalist, high-resolution 1080×1920 covers ready to save and upload.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-4">
              {/* Controls Column */}
              <div className="md:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-5">
                {/* Background Selector */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">Background Style</label>
                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={() => setBgType('solid')}
                      className={`flex-1 py-1.5 text-xs font-medium rounded-lg border transition ${bgType === 'solid' ? 'bg-slate-800 border-rose-500 text-white' : 'border-slate-800 text-slate-400'}`}
                    >
                      Solid Color
                    </button>
                    <button
                      onClick={() => setBgType('gradient')}
                      className={`flex-1 py-1.5 text-xs font-medium rounded-lg border transition ${bgType === 'gradient' ? 'bg-slate-800 border-rose-500 text-white' : 'border-slate-800 text-slate-400'}`}
                    >
                      Gradient
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={bgColor1}
                      onChange={(e) => setBgColor1(e.target.value)}
                      className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-slate-700"
                    />
                    {bgType === 'gradient' && (
                      <input
                        type="color"
                        value={bgColor2}
                        onChange={(e) => setBgColor2(e.target.value)}
                        className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-slate-700"
                      />
                    )}
                    <span className="text-xs text-slate-400">Choose your background palette</span>
                  </div>
                </div>

                {/* Ring & Icon Colors */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">Icon Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={iconColor}
                        onChange={(e) => setIconColor(e.target.value)}
                        className="w-9 h-9 rounded-lg cursor-pointer bg-transparent border border-slate-700"
                      />
                      <span className="text-xs text-slate-400">{iconColor}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">Circle Border</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={ringColor}
                        onChange={(e) => setRingColor(e.target.value)}
                        disabled={!hasRing}
                        className="w-9 h-9 rounded-lg cursor-pointer bg-transparent border border-slate-700 disabled:opacity-30"
                      />
                      <input 
                        type="checkbox" 
                        checked={hasRing} 
                        onChange={(e) => setHasRing(e.target.checked)} 
                        id="ringToggle"
                        className="accent-rose-500 cursor-pointer"
                      />
                      <label htmlFor="ringToggle" className="text-xs text-slate-400 cursor-pointer">Enable</label>
                    </div>
                  </div>
                </div>

                {/* Icons Grid */}
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">Select Aesthetic Icon</label>
                  <div className="grid grid-cols-5 gap-2">
                    {iconsList.map((item) => {
                      const IconComp = item.component;
                      const isSelected = selectedIcon === item.name;
                      return (
                        <button
                          key={item.name}
                          onClick={() => setSelectedIcon(item.name)}
                          className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 transition ${isSelected ? 'border-rose-500 bg-rose-500/10 text-rose-400' : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:text-white'}`}
                        >
                          <IconComp size={20} />
                          <span className="text-[10px] font-medium truncate w-full text-center">{item.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={downloadCover}
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-rose-600/20 transition active:scale-[0.99]"
                >
                  <Download size={18} /> Download High-Res PNG (1080×1920)
                </button>
              </div>

              {/* Preview Column */}
              <div className="md:col-span-5 flex flex-col items-center justify-center">
                <span className="text-xs text-slate-400 font-medium mb-3">Live Story Preview</span>
                <div className="relative border-4 border-slate-800 rounded-3xl overflow-hidden shadow-2xl bg-black aspect-[9/16] w-[260px]">
                  <canvas ref={canvasRef} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 2: SMART BIO GENERATOR ===================== */}
        {activeTab === 'bio' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Smart Instagram Bio Generator</h1>
              <p className="text-slate-400 text-sm mt-1">Ready-made aesthetic, brand, and minimalist bios with 1-click copy.</p>
            </div>

            {/* Category Pills */}
            <div className="flex justify-center flex-wrap gap-2 pt-2">
              {['minimal', 'aesthetic', 'business', 'savage'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setBioCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold border transition ${bioCategory === cat ? 'bg-rose-600 border-rose-500 text-white shadow' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Bios List */}
            <div className="space-y-4 pt-2">
              {biosData[bioCategory]?.map((bio, index) => (
                <div key={index} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-start justify-between gap-4">
                  <pre className="font-sans text-sm text-slate-200 whitespace-pre-line leading-relaxed">{bio}</pre>
                  <button
                    onClick={() => copyToClipboard(bio, index)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition flex items-center justify-center flex-shrink-0"
                    title="Copy Bio"
                  >
                    {copiedBioIndex === index ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB 3: PUBLIC PROFILE & MEDIA VIEWER ===================== */}
        {activeTab === 'viewer' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Public Profile & Story Viewer</h1>
              <p className="text-slate-400 text-sm mt-1">Search any public handle to inspect DP, follower count and stories.</p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3.5 top-3 text-slate-500 font-bold">@</span>
                <input
                  type="text"
                  placeholder="instagram username"
                  value={searchUsername}
                  onChange={(e) => setSearchUsername(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-rose-500 transition"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={viewerLoading}
                className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition disabled:opacity-50"
              >
                <Search size={16} /> {viewerLoading ? 'Searching...' : 'Search'}
              </button>
            </form>

            {/* Profile Result Card */}
            {searchedUser && (
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                  <div className="relative">
                    <img
                      src={searchedUser.avatarUrl}
                      alt={searchedUser.username}
                      className="w-24 h-24 rounded-full object-cover border-2 border-rose-500 p-0.5"
                    />
                    {searchedUser.hasStories && (
                      <span className="absolute bottom-0 right-0 bg-rose-600 text-[10px] font-bold px-2 py-0.5 rounded-full text-white uppercase tracking-wider">
                        Story
                      </span>
                    )}
                  </div>

                  <div className="flex-1 text-center sm:text-left space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h2 className="text-xl font-bold text-white">@{searchedUser.username}</h2>
                      <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md font-medium self-center sm:self-auto">
                        Public
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium">{searchedUser.fullName}</p>
                    <pre className="font-sans text-xs text-slate-300 whitespace-pre-line">{searchedUser.bio}</pre>

                    {/* Stats */}
                    <div className="flex justify-center sm:justify-start gap-6 pt-2 text-center">
                      <div>
                        <span className="font-bold text-sm text-white block">{searchedUser.posts}</span>
                        <span className="text-[11px] text-slate-400">Posts</span>
                      </div>
                      <div>
                        <span className="font-bold text-sm text-white block">{searchedUser.followers}</span>
                        <span className="text-[11px] text-slate-400">Followers</span>
                      </div>
                      <div>
                        <span className="font-bold text-sm text-white block">{searchedUser.following}</span>
                        <span className="text-[11px] text-slate-400">Following</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-800/80 pt-4 flex gap-3">
                  <a
                    href={searchedUser.avatarUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold py-2.5 rounded-xl text-center flex items-center justify-center gap-2 transition"
                  >
                    <Eye size={15} /> View Full HD Avatar
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        © 2026 Fastgram • Fast, Free & Anonymous Tools for Instagram
      </footer>
    </div>
  );
}

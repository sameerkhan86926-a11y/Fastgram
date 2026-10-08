import React, { useState, useRef, useEffect } from 'react';
import { 
  Instagram, Sparkles, Copy, Check, Download, 
  Camera, Heart, Star, Compass, Music, ShoppingBag, Coffee, 
  Plane, User, Eye, Film, Layers, History, Upload, Image as ImageIcon
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('templates');

  // ==================== 1. HIGHLIGHT COVER MAKER ====================
  const canvasRef = useRef(null);
  const [bgType, setBgType] = useState('gradient');
  const [bgColor1, setBgColor1] = useState('#833ab4');
  const [bgColor2, setBgColor2] = useState('#fd1d1d');
  const [iconColor, setIconColor] = useState('#ffffff');
  const [ringColor, setRingColor] = useState('#fcb045');
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = 1080;
    const height = 1920;
    canvas.width = width;
    canvas.height = height;

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

    if (hasRing) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, 260, 0, Math.PI * 2);
      ctx.strokeStyle = ringColor;
      ctx.lineWidth = 12;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 285, 0, Math.PI * 2);
      ctx.strokeStyle = ringColor + '44';
      ctx.lineWidth = 4;
      ctx.stroke();
    }

    ctx.fillStyle = iconColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 180px sans-serif';

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

  // ==================== 2. CURATED USEFUL ASSETS & TEMPLATES ====================
  const assetCategories = [
    {
      title: 'Aesthetic Story & Reel Backgrounds',
      description: 'Clean vertical assets for direct story posts and backdrop editing.',
      items: [
        { id: 1, title: 'Minimalist Studio Tone', tag: 'Aesthetic', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' },
        { id: 2, title: 'Golden Hour Sky', tag: 'Vibes', url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=800&q=80' },
        { id: 3, title: 'Dark Luxe Texture', tag: 'Moody', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80' },
        { id: 4, title: 'Coffee & Books Setup', tag: 'Lifestyle', url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80' },
      ]
    },
    {
      title: 'Editorial Portrait Assets',
      description: 'High-contrast portrait references for feed curation and mockups.',
      items: [
        { id: 5, title: 'Urban Street Neon', tag: 'Portrait', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80' },
        { id: 6, title: 'Sunlit Monochrome', tag: 'Editorial', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80' },
        { id: 7, title: 'Cyberpunk Pastel Glow', tag: 'Trendy', url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80' },
        { id: 8, title: 'Warm Cinematic Film', tag: 'Retro', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80' },
      ]
    }
  ];

  // ==================== 3. LOCAL IMAGE PREVIEWER & INSPECTOR ====================
  const [previewFiles, setPreviewFiles] = useState([]);
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const mapped = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
    }));
    setPreviewFiles((prev) => [...mapped, ...prev]);
  };

  // ==================== 4. BIO GENERATOR ====================
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 rounded-xl text-white shadow-lg shadow-rose-500/20">
              <Instagram size={22} />
            </div>
            <div className="leading-tight">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">Fastgram</span>
              <span className="text-[10px] block font-semibold text-rose-400 uppercase tracking-widest">Creator Studio</span>
            </div>
          </div>

          <nav className="flex bg-slate-900 p-1 border border-slate-800 rounded-xl text-xs sm:text-sm font-medium">
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-3.5 py-1.5 rounded-lg transition ${activeTab === 'templates' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              Assets & Pictures
            </button>
            <button
              onClick={() => setActiveTab('covers')}
              className={`px-3.5 py-1.5 rounded-lg transition ${activeTab === 'covers' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              Cover Maker
            </button>
            <button
              onClick={() => setActiveTab('previewer')}
              className={`px-3.5 py-1.5 rounded-lg transition ${activeTab === 'previewer' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              Feed Previewer
            </button>
            <button
              onClick={() => setActiveTab('bio')}
              className={`px-3.5 py-1.5 rounded-lg transition ${activeTab === 'bio' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              Bio Studio
            </button>
          </nav>
        </div>
      </header>

      {/* Main Area */}
      <main className="max-w-5xl mx-auto px-4 py-8 flex-1 w-full">
        {/* ==================== TAB 1: CURATED PICTURES & ASSETS ==================== */}
        {activeTab === 'templates' && (
          <div className="space-y-8">
            <div className="text-center max-w-xl mx-auto">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Curated Creator Assets & Templates</h1>
              <p className="text-slate-400 text-sm mt-1">High-resolution curated pictures for story backgrounds, aesthetic reels aur feed planning.</p>
            </div>

            {assetCategories.map((cat, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-slate-800/80 pb-2">
                  <h2 className="text-lg font-bold text-white">{cat.title}</h2>
                  <span className="text-xs text-slate-400">{cat.description}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
                  {cat.items.map((item) => (
                    <div key={item.id} className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
                      <img 
                        src={item.url} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                      />
                      <span className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur text-[10px] text-white px-2 py-0.5 rounded-md font-semibold">
                        {item.tag}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition p-3 flex flex-col justify-end">
                        <span className="text-xs font-semibold text-white block mb-2">{item.title}</span>
                        <a 
                          href={item.url} 
                          target="_blank" 
                          rel="noreferrer" 
                          download={`fastgram-${item.id}.jpg`}
                          className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition shadow"
                        >
                          <Download size={13} /> Save Asset
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ==================== TAB 2: COVER MAKER ==================== */}
        {activeTab === 'covers' && (
          <div className="space-y-6">
            <div className="text-center max-w-lg mx-auto">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Create Aesthetic Highlight Covers</h1>
              <p className="text-slate-400 text-sm mt-1">Design minimalist, high-resolution 1080×1920 covers ready to save and upload.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-4">
              <div className="md:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-5">
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
                    <span className="text-xs text-slate-400">Choose your palette</span>
                  </div>
                </div>

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

                <button
                  onClick={downloadCover}
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-rose-600/20 transition active:scale-[0.99]"
                >
                  <Download size={18} /> Download High-Res PNG (1080×1920)
                </button>
              </div>

              <div className="md:col-span-5 flex flex-col items-center justify-center">
                <span className="text-xs text-slate-400 font-medium mb-3">Live Story Preview</span>
                <div className="relative border-4 border-slate-800 rounded-3xl overflow-hidden shadow-2xl bg-black aspect-[9/16] w-[260px]">
                  <canvas ref={canvasRef} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 3: FEED & IMAGE PREVIEWER ==================== */}
        {activeTab === 'previewer' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Feed Grid & Story Layout Previewer</h1>
              <p className="text-slate-400 text-sm mt-1">Apni pictures bina kisi API ke drag/upload karein aur feed harmony check karein.</p>
            </div>

            <div className="border-2 border-dashed border-slate-800 hover:border-rose-500/60 rounded-2xl p-8 text-center bg-slate-900/40 transition">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                id="fileUpload"
                className="hidden"
              />
              <label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center gap-2">
                <div className="p-3 bg-slate-800 rounded-full text-rose-400">
                  <Upload size={22} />
                </div>
                <span className="text-sm font-semibold text-white">Select Images to Arrange Grid</span>
                <span className="text-xs text-slate-500">Upload multiple photos from your device</span>
              </label>
            </div>

            {previewFiles.length > 0 && (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Preview 3×3 Grid ({previewFiles.length} photos)</h3>
                  <button onClick={() => setPreviewFiles([])} className="text-xs text-rose-400 hover:underline">Clear all</button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {previewFiles.map((file, idx) => (
                    <div key={idx} className="aspect-square bg-slate-900 rounded-xl overflow-hidden border border-slate-800 relative group">
                      <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition p-2 flex flex-col justify-end text-[10px] text-white">
                        <span className="truncate">{file.name}</span>
                        <span className="text-slate-400">{file.size}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB 4: BIO STUDIO ==================== */}
        {activeTab === 'bio' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Smart Instagram Bio Studio</h1>
              <p className="text-slate-400 text-sm mt-1">Ready-made aesthetic, brand, and minimalist bios with 1-click copy.</p>
            </div>

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
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        © 2026 Fastgram • Instant Creator Assets & Design Studio
      </footer>
    </div>
  );
}

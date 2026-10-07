  import React, { useState, useRef, useEffect } from 'react';
import { 
  Instagram, Search, Sparkles, Copy, Check, Download, 
  Camera, Heart, Star, Compass, Music, ShoppingBag, Coffee, Plane, User, Eye, AlertCircle, Film, Layers, History, Volume2
} from 'lucide-react';

const API_KEY = '30468bbd66msh09095694867a49bp1bfa9djsn432e9272dd57';
const API_HOST = 'instagram-public-bulk-scraper.p.rapidapi.com';

export default function App() {
  const [activeTab, setActiveTab] = useState('viewer');

  // ==================== 1. HIGHLIGHT COVER MAKER ====================
  const canvasRef = useRef(null);
  const [bgType, setBgType] = useState('solid');
  const [bgColor1, setBgColor1] = useState('#0f172a');
  const [bgColor2, setBgColor2] = useState('#e11d48');
  const [iconColor, setIconColor] = useState('#ffffff');
  const [ringColor, setRingColor] = useState('#fda4af');
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
      ctx.lineWidth = 10;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 280, 0, Math.PI * 2);
      ctx.strokeStyle = ringColor + '33';
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

  // ==================== 2. SMART BIO GENERATOR ====================
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

  // ==================== 3. VIEWER & RAPIDAPI LOGIC ====================
  const [searchUsername, setSearchUsername] = useState('');
  const [searchedUser, setSearchedUser] = useState(null);
  const [viewerLoading, setViewerLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [viewerTab, setViewerTab] = useState('posts');

  // Audio Extractor State
  const [audioUrlInput, setAudioUrlInput] = useState('');
  const [audioLoading, setAudioLoading] = useState(false);
  const [extractedAudio, setExtractedAudio] = useState(null);
  const [audioError, setAudioError] = useState('');

  const headers = {
    'x-rapidapi-host': API_HOST,
    'x-rapidapi-key': API_KEY,
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const cleanUser = searchUsername.trim().replace('@', '');
    if (!cleanUser) return;

    setViewerLoading(true);
    setErrorMessage('');
    setSearchedUser(null);

    try {
      // 1. Fetch User Info Web (profile info + timeline posts)
      const userRes = await fetch(
        `https://${API_HOST}/v1/user_info_web?username=${cleanUser}`,
        { method: 'GET', headers }
      );

      if (!userRes.ok) throw new Error('Account nahi mila ya API issue hai.');
      const userRaw = await userRes.json();
      const userDataObj = userRaw?.data?.user || userRaw?.user || userRaw?.data;

      if (!userDataObj) throw new Error('Profile details fetch nahi ho saki.');

      const userId = userDataObj.id || userDataObj.pk;

      // Extract Timeline Posts
      const timelineEdges = userDataObj.edge_owner_to_timeline_media?.edges || [];
      const parsedPosts = timelineEdges.map((edge, i) => {
        const node = edge.node || edge;
        return {
          id: node.id || `post_${i}`,
          url: node.display_url || node.thumbnail_src || '',
          likes: (node.edge_liked_by?.count || node.like_count || 0).toLocaleString(),
          comments: (node.edge_media_to_comment?.count || node.comment_count || 0).toLocaleString(),
        };
      });

      // 2. Fetch Reels (v1/user_reels)
      let parsedReels = [];
      try {
        const reelsRes = await fetch(
          `https://${API_HOST}/v1/user_reels?username_or_id=${userId || cleanUser}`,
          { method: 'GET', headers }
        );
        if (reelsRes.ok) {
          const reelsRaw = await reelsRes.json();
          const items = reelsRaw?.data?.items || reelsRaw?.items || [];
          parsedReels = items.map((r, i) => ({
            id: r.id || `reel_${i}`,
            thumbnail: r.image_versions2?.candidates?.[0]?.url || r.display_url || '',
            videoUrl: r.video_versions?.[0]?.url || '',
            views: (r.play_count || r.view_count || 'View').toLocaleString(),
          }));
        }
      } catch (err) {
        console.warn('Reels fetch skipped:', err);
      }

      // 3. Fetch Active Stories (v1/download_story)
      let parsedStories = [];
      try {
        const storyRes = await fetch(
          `https://${API_HOST}/v1/download_story?username=${cleanUser}`,
          { method: 'GET', headers }
        );
        if (storyRes.ok) {
          const storyRaw = await storyRes.json();
          const storyItems = storyRaw?.data || storyRaw?.items || [];
          if (Array.isArray(storyItems)) {
            parsedStories = storyItems.map((s, i) => ({
              id: s.id || `story_${i}`,
              mediaUrl: s.video_url || s.image_url || s.url || '',
              type: s.video_url ? 'video' : 'image',
            }));
          }
        }
      } catch (err) {
        console.warn('Story fetch skipped:', err);
      }

      setSearchedUser({
        username: userDataObj.username || cleanUser,
        fullName: userDataObj.full_name || cleanUser,
        bio: userDataObj.biography || 'No bio available',
        followers: Number(userDataObj.edge_followed_by?.count || userDataObj.follower_count || 0).toLocaleString(),
        following: Number(userDataObj.edge_follow?.count || userDataObj.following_count || 0).toLocaleString(),
        posts: Number(userDataObj.edge_owner_to_timeline_media?.count || userDataObj.media_count || 0).toLocaleString(),
        avatarUrl: userDataObj.profile_pic_url_hd || userDataObj.profile_pic_url || '',
        isPrivate: Boolean(userDataObj.is_private),
        postsList: parsedPosts,
        reelsList: parsedReels,
        storiesList: parsedStories,
      });

    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'Data fetch fail ho gaya.');
    } finally {
      setViewerLoading(false);
    }
  };

  // 4. Handle Reel Audio Extraction (v1/extract_audio)
  const handleExtractAudio = async (e) => {
    e.preventDefault();
    if (!audioUrlInput.trim()) return;

    setAudioLoading(true);
    setAudioError('');
    setExtractedAudio(null);

    try {
      const res = await fetch(
        `https://${API_HOST}/v1/extract_audio?code_or_id_or_url=${encodeURIComponent(audioUrlInput.trim())}`,
        { method: 'GET', headers }
      );
      if (!res.ok) throw new Error('Audio extract nahi ho saki.');
      const data = await res.json();
      const audioData = data?.data || data;

      if (!audioData?.audio_url && !audioData?.download_url) {
        throw new Error('Audio file link nahi mila.');
      }

      setExtractedAudio({
        title: audioData.title || 'Instagram Reel Audio',
        artist: audioData.artist || 'Original Audio',
        audioUrl: audioData.audio_url || audioData.download_url,
      });
    } catch (err) {
      setAudioError(err.message || 'Extracting failed.');
    } finally {
      setAudioLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
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

          <nav className="flex bg-slate-900 p-1 border border-slate-800 rounded-xl text-xs sm:text-sm font-medium">
            <button
              onClick={() => setActiveTab('viewer')}
              className={`px-3 sm:px-4 py-1.5 rounded-lg transition ${activeTab === 'viewer' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              Profile Viewer
            </button>
            <button
              onClick={() => setActiveTab('audio')}
              className={`px-3 sm:px-4 py-1.5 rounded-lg transition ${activeTab === 'audio' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              Audio Extractor
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

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 flex-1 w-full">
        {/* ==================== TAB 1: VIEWER ==================== */}
        {activeTab === 'viewer' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Full Instagram Anonymous Viewer</h1>
              <p className="text-slate-400 text-sm mt-1">Live DP, follower count, posts, reels aur stories bina login ke inspect karein.</p>
            </div>

            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3.5 top-3 text-slate-500 font-bold">@</span>
                <input
                  type="text"
                  placeholder="enter username (e.g. sooyaaa__)"
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

            {errorMessage && (
              <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl flex items-center justify-center gap-2">
                <AlertCircle size={15} /> {errorMessage}
              </div>
            )}

            {searchedUser && (
              <div className="space-y-6">
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full border-4 border-rose-500 p-0.5 overflow-hidden">
                        <img
                          src={searchedUser.avatarUrl}
                          alt={searchedUser.username}
                          referrerPolicy="no-referrer"
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <span className="absolute bottom-0 right-0 bg-gradient-to-r from-amber-500 to-rose-600 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full text-white uppercase tracking-wider">
                        Live
                      </span>
                    </div>

                    <div className="flex-1 text-center sm:text-left space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <h2 className="text-xl font-extrabold text-white">@{searchedUser.username}</h2>
                        <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md font-medium self-center sm:self-auto">
                          {searchedUser.isPrivate ? 'Private' : 'Public'}
                        </span>
                      </div>
                      <p className="text-xs text-rose-400 font-semibold">{searchedUser.fullName}</p>
                      <pre className="font-sans text-xs text-slate-300 whitespace-pre-line font-medium leading-relaxed">{searchedUser.bio}</pre>

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
                      <Eye size={14} /> Open Full HD Avatar
                    </a>
                  </div>
                </div>

                {/* Sub-Tabs */}
                <div className="flex border-b border-slate-800 bg-slate-900/40 p-1.5 rounded-xl justify-between">
                  {[
                    { id: 'posts', label: `Posts (${searchedUser.postsList.length})`, icon: Layers },
                    { id: 'reels', label: `Reels (${searchedUser.reelsList.length})`, icon: Film },
                    { id: 'stories', label: `Stories (${searchedUser.storiesList.length})`, icon: History },
                  ].map((tab) => {
                    const TabIcon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setViewerTab(tab.id)}
                        className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition ${viewerTab === tab.id ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                      >
                        <TabIcon size={14} /> {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Posts View */}
                {viewerTab === 'posts' && (
                  <div>
                    {searchedUser.postsList.length === 0 ? (
                      <p className="text-center text-xs text-slate-500 py-8">Koi recent posts nahi mili.</p>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {searchedUser.postsList.map((post) => (
                          <div key={post.id} className="group relative aspect-square rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                            <img src={post.url} alt="Post" referrerPolicy="no-referrer" className="w-full h-full object-cover transition duration-300 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-between p-3 text-white">
                              <div className="flex justify-between text-xs font-medium">
                                <span>❤️ {post.likes}</span>
                                <span>💬 {post.comments}</span>
                              </div>
                              <a href={post.url} target="_blank" rel="noreferrer" className="bg-rose-600 hover:bg-rose-700 text-[11px] py-1.5 font-bold rounded-lg text-center flex items-center justify-center gap-1">
                                <Eye size={12} /> View Full
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Reels View */}
                {viewerTab === 'reels' && (
                  <div>
                    {searchedUser.reelsList.length === 0 ? (
                      <p className="text-center text-xs text-slate-500 py-8">Reels data available nahi hai.</p>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {searchedUser.reelsList.map((reel) => (
                          <div key={reel.id} className="group relative aspect-[9/16] rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                            <img src={reel.thumbnail} alt="Reel" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                            <span className="absolute bottom-2 left-2 text-[10px] bg-black/60 px-1.5 py-0.5 rounded font-bold text-white">
                              ▶ {reel.views}
                            </span>
                            {reel.videoUrl && (
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-3 text-white">
                                <a href={reel.videoUrl} target="_blank" rel="noreferrer" className="bg-rose-600 hover:bg-rose-750 text-[11px] py-1.5 font-bold rounded-lg text-center flex items-center justify-center gap-1.5">
                                  <Download size={13} /> Save Reel
                                </a>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Stories View */}
                {viewerTab === 'stories' && (
                  <div>
                    {searchedUser.storiesList.length === 0 ? (
                      <p className="text-center text-xs text-slate-500 py-8">Filhal koi active stories nahi hain.</p>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {searchedUser.storiesList.map((story) => (
                          <div key={story.id} className="relative aspect-[9/16] rounded-xl overflow-hidden border border-slate-800 bg-slate-900 group">
                            {story.type === 'video' ? (
                              <video src={story.mediaUrl} className="w-full h-full object-cover" controls />
                            ) : (
                              <img src={story.mediaUrl} alt="Story" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                            )}
                            <a href={story.mediaUrl} target="_blank" rel="noreferrer" className="absolute bottom-2 right-2 bg-rose-600 hover:bg-rose-700 text-[11px] px-2 py-1 font-bold rounded-lg text-white flex items-center gap-1">
                              <Download size={12} /> Save
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB 2: AUDIO EXTRACTOR ==================== */}
        {activeTab === 'audio' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Extract Reel Background Audio</h1>
              <p className="text-slate-400 text-sm mt-1">Kisi bhi Instagram Reel ka link paste karein aur audio download karein.</p>
            </div>

            <form onSubmit={handleExtractAudio} className="flex gap-2">
              <input
                type="url"
                placeholder="https://www.instagram.com/reel/..."
                value={audioUrlInput}
                onChange={(e) => setAudioUrlInput(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-rose-500 transition"
                required
              />
              <button
                type="submit"
                disabled={audioLoading}
                className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition disabled:opacity-50"
              >
                <Volume2 size={16} /> {audioLoading ? 'Extracting...' : 'Extract'}
              </button>
            </form>

            {audioError && (
              <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl flex items-center justify-center gap-2">
                <AlertCircle size={15} /> {audioError}
              </div>
            )}

            {extractedAudio && (
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div>
                  <h3 className="font-bold text-white text-base">{extractedAudio.title}</h3>
                  <p className="text-xs text-slate-400">{extractedAudio.artist}</p>
                </div>
                <audio controls src={extractedAudio.audioUrl} className="w-full" />
                <a
                  href={extractedAudio.audioUrl}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition"
                >
                  <Download size={14} /> Download Audio MP3
                </a>
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB 3: HIGHLIGHT MAKER ==================== */}
        {activeTab === 'highlights' && (
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

        {/* ==================== TAB 4: BIO GENERATOR ==================== */}
        {activeTab === 'bio' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Smart Instagram Bio Generator</h1>
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

      <footer className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        © 2026 Fastgram • Fast, Free & Anonymous Tools for Instagram
      </footer>
    </div>
  );
}

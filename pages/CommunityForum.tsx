
import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, Heart, Share2, MapPin, Image as ImageIcon, 
  Send, Plus, X, Search, Filter, ThumbsUp, User, Users
} from 'lucide-react';
import { ForumPost } from '../types';

const INITIAL_POSTS: ForumPost[] = [
  {
    id: '1',
    author: 'Bashir Ahmed',
    location: 'Sopore',
    content: 'Has anyone started the Dormant Oil spray yet? The weather seems clear for the next 3 days.',
    category: 'General',
    likes: 12,
    comments: [
      { id: 'c1', author: 'Altaf Bhat', text: 'Yes, I started yesterday. Make sure to mix it properly.', timestamp: new Date().toISOString() }
    ],
    timestamp: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: '2',
    author: 'Gulzar Dar',
    location: 'Shopian',
    content: 'Found these spots on my Gala leaves. Is this Alternaria or Scab? Please help.',
    image: 'https://images.unsplash.com/photo-1628260412197-76296302213a?q=80&w=400',
    category: 'Disease',
    likes: 8,
    comments: [],
    timestamp: new Date(Date.now() - 172800000).toISOString()
  }
];

const CommunityForum: React.FC = () => {
  const [posts, setPosts] = useState<ForumPost[]>(() => {
    const saved = localStorage.getItem('fck_forum_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState<string | null>(null);
  const [newPostCategory, setNewPostCategory] = useState<ForumPost['category']>('General');
  const [filterCategory, setFilterCategory] = useState('All');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('fck_forum_posts', JSON.stringify(posts));
  }, [posts]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNewPostImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const createPost = () => {
    if (!newPostContent.trim()) return;
    
    const post: ForumPost = {
      id: Date.now().toString(),
      author: 'You (Farmer)',
      location: 'Srinagar', // Defaults to current user location in real app
      content: newPostContent,
      image: newPostImage || undefined,
      category: newPostCategory,
      likes: 0,
      comments: [],
      timestamp: new Date().toISOString()
    };

    setPosts([post, ...posts]);
    setIsModalOpen(false);
    setNewPostContent('');
    setNewPostImage(null);
  };

  const likePost = (id: string) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const filteredPosts = filterCategory === 'All' 
    ? posts 
    : posts.filter(p => p.category === filterCategory);

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-700 pb-20 no-scrollbar">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-emerald-900 text-white rounded-[2rem] flex items-center justify-center shadow-2xl">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-heading font-bold text-slate-900">Kisan Baithak</h2>
            <p className="text-slate-500 font-medium">The Valley's Digital Village Square.</p>
          </div>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl hover:bg-emerald-700 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" /> New Discussion
        </button>
      </header>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {['All', 'General', 'Disease', 'Market', 'Machinery'].map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
              filterCategory === cat 
                ? 'bg-slate-900 text-white shadow-lg' 
                : 'bg-white text-slate-400 border border-slate-100 hover:border-slate-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Feed */}
      <div className="space-y-6">
        {filteredPosts.map(post => (
          <div key={post.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold">
                  {post.author[0]}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 leading-tight">{post.author}</h4>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {post.location}</span>
                    <span>• {new Date(post.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full ${
                post.category === 'Disease' ? 'bg-rose-50 text-rose-600' :
                post.category === 'Market' ? 'bg-amber-50 text-amber-600' :
                'bg-slate-100 text-slate-500'
              }`}>
                {post.category}
              </span>
            </div>

            <p className="text-slate-700 font-medium leading-relaxed mb-4">{post.content}</p>

            {post.image && (
              <div className="mb-4 rounded-3xl overflow-hidden border border-slate-100">
                <img src={post.image} alt="Post attachment" className="w-full h-auto max-h-80 object-cover" />
              </div>
            )}

            <div className="flex items-center gap-6 pt-4 border-t border-slate-50">
              <button 
                onClick={() => likePost(post.id)}
                className="flex items-center gap-2 text-slate-400 hover:text-rose-500 transition-colors font-bold text-xs uppercase tracking-widest group"
              >
                <Heart className="w-5 h-5 group-hover:fill-current" /> {post.likes} Likes
              </button>
              <button className="flex items-center gap-2 text-slate-400 hover:text-blue-500 transition-colors font-bold text-xs uppercase tracking-widest">
                <MessageCircle className="w-5 h-5" /> {post.comments.length} Comments
              </button>
              <button className="ml-auto text-slate-400 hover:text-emerald-600">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Post Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md">
          <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl p-8 space-y-6 animate-in zoom-in-95">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-slate-900">Create New Post</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full"><X className="w-6 h-6" /></button>
            </div>
            
            <textarea
              placeholder="What's happening on your farm?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-emerald-500/10 font-medium resize-none"
            />

            {newPostImage && (
              <div className="relative rounded-2xl overflow-hidden h-32 w-full">
                <img src={newPostImage} alt="Preview" className="w-full h-full object-cover" />
                <button onClick={() => setNewPostImage(null)} className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full"><X className="w-4 h-4" /></button>
              </div>
            )}

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Category</label>
                <select 
                  value={newPostCategory}
                  onChange={(e) => setNewPostCategory(e.target.value as any)}
                  className="w-full mt-2 p-3 bg-slate-50 border rounded-xl font-bold text-sm outline-none"
                >
                  <option>General</option>
                  <option>Disease</option>
                  <option>Market</option>
                  <option>Machinery</option>
                </select>
              </div>
              <div className="flex items-end">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-colors"
                >
                  <ImageIcon className="w-6 h-6" />
                </button>
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
              </div>
            </div>

            <button 
              onClick={createPost}
              disabled={!newPostContent.trim()}
              className="w-full bg-emerald-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl hover:bg-black transition-all disabled:opacity-50"
            >
              <Send className="w-5 h-5" /> Post to Community
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityForum;

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coffee, 
  UtensilsCrossed, 
  Leaf, 
  Wine, 
  Cake, 
  Plus, 
  Minus, 
  ShoppingBasket,
  ChevronRight,
  Bean,
  Search,
  Sparkles,
  Clock,
  User,
  ChefHat,
  Flame,
  LogOut,
  History,
  X
} from 'lucide-react';
import { MENU_ITEMS, CATEGORIES, MenuItem, Category } from './constants';
import { getMealRecommendation } from './services/geminiService';
import { auth, signInWithPopup, googleProvider, signOut, onAuthStateChanged, User as FirebaseUser } from './lib/firebase';
import { createUserProfile, placeOrder, getUserOrders } from './services/firestoreService';

interface CartItem extends MenuItem {
  quantity: number;
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>(CATEGORIES[1]); // Main Dishes
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiRecommendation, setAiRecommendation] = useState<any>(null);
  const [isAIThinking, setIsAIThinking] = useState(false);
  
  // Auth & Profile State
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [orderHistory, setOrderHistory] = useState<any[]>([]);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        createUserProfile(currentUser);
        fetchOrders(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchOrders = async (userId: string) => {
    const orders = await getUserOrders(userId);
    setOrderHistory(orders || []);
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      if (error.code !== 'auth/popup-closed-by-user') {
        console.error("Login Error:", error);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      handleLogin();
      return;
    }
    
    setIsPlacingOrder(true);
    const subtotalCalc = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const total = subtotalCalc * 1.1;
    
    try {
      await placeOrder(user.uid, cart, subtotalCalc, total);
      setCart([]);
      fetchOrders(user.uid);
      alert("Order placed successfully! Gursha is on the way.");
    } catch (error) {
      console.error("Order Error:", error);
      alert("There was an error placing your order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high' | 'calories'>('default');

  const filteredItems = useMemo(() => {
    let items = MENU_ITEMS.filter(item => {
      const matchesCategory = activeCategory === item.category;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'price-low') items = [...items].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') items = [...items].sort((a, b) => b.price - a.price);
    if (sortBy === 'calories') items = [...items].sort((a, b) => a.calories - b.calories);

    return items;
  }, [activeCategory, searchQuery, sortBy]);

  const addToCart = (item: MenuItem) => {
    setIsCartOpen(true);
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing?.quantity === 1) {
        return prev.filter(i => i.id !== id);
      }
      return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
    });
  };

  const handleAIRequest = async () => {
    if (!aiPrompt.trim()) return;
    setIsAIThinking(true);
    const result = await getMealRecommendation(aiPrompt, MENU_ITEMS);
    setAiRecommendation(result);
    setIsAIThinking(false);
  };

  const subtotal = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cart]);

  return (
    <div className="relative h-screen w-screen flex flex-col md:flex-row overflow-hidden select-none font-sans text-espresso">
      {/* Liquid Glass Background Layer */}
      <div className="liquid-bg-animate">
        <div className="absolute inset-0 mesob-texture opacity-[0.03]" />
        {/* Floating Liquid Blobs */}
        <div className="absolute top-[10%] left-[20%] w-64 h-64 bg-gold/10 rounded-full blur-[80px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-amber/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[60%] left-[40%] w-48 h-48 bg-gold/5 rounded-full blur-[60px] animate-pulse" style={{ animationDelay: '4s' }} />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
      </div>

      <main className="relative flex-1 flex flex-col overflow-hidden max-w-full z-10">
        {/* Modern Platform Header */}
        <header className="sticky top-0 z-40 bg-white/40 backdrop-blur-2xl border-b border-black/5 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center text-gold border border-gold/20">
                <ChefHat size={20} />
              </div>
              <div>
                <h1 className="text-xl font-serif text-espresso font-black tracking-tight leading-none mb-0.5 italic">GURSHA</h1>
                <p className="text-[8px] tracking-[0.4em] text-gold/60 uppercase font-bold">Heritage Platform</p>
              </div>
            </div>

            {/* Smart Search */}
            <div className="hidden md:flex items-center gap-3 bg-slate-100/50 rounded-2xl px-4 py-2 border border-black/5 w-64 focus-within:border-gold/50 transition-all">
              <Search size={16} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Search flavors..." 
                className="bg-transparent border-none outline-none text-xs text-espresso w-full placeholder:text-slate-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsAIModalOpen(true)}
              className="flex items-center gap-2 bg-linear-to-r from-gold to-amber text-espresso px-4 py-2 rounded-xl text-xs font-black shadow-lg shadow-gold/20 hover:scale-105 active:scale-95 transition-all"
            >
              <Sparkles size={14} />
              <span className="hidden sm:inline">AI CONCIERGE</span>
              <span className="sm:hidden inline">AI</span>
            </button>
            
            {user ? (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsOrderHistoryOpen(true)}
                  className="w-10 h-10 rounded-xl border border-black/5 flex items-center justify-center text-slate-400 bg-slate-100/50 hover:text-gold transition-colors"
                >
                  <History size={18} />
                </button>
                <div className="relative group">
                  <button className="w-10 h-10 rounded-full border border-black/5 overflow-hidden bg-slate-50 ring-2 ring-transparent group-hover:ring-gold/30 transition-all">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="User" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    ) : (
                      <User size={20} className="text-slate-400 mx-auto" />
                    )}
                  </button>
                  <div className="absolute top-full right-0 mt-2 w-48 glass-panel rounded-2xl p-2 border-black/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <div className="px-3 py-2 border-b border-black/5 mb-2">
                      <p className="text-[10px] text-espresso font-black truncate">{user.displayName || 'Authentic Guest'}</p>
                      <p className="text-[8px] text-slate-400 truncate">{user.email}</p>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-[10px] font-black text-slate-500 hover:text-gold hover:bg-slate-50 rounded-xl transition-all"
                    >
                      <LogOut size={14} /> SIGN OUT
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button 
                onClick={handleLogin}
                className="flex items-center gap-2 bg-slate-100 text-espresso px-4 py-2 rounded-xl text-xs font-black border border-black/5 hover:bg-slate-200 transition-all"
              >
                <User size={14} /> SIGN IN
              </button>
            )}
          </div>
        </header>

        {/* Category Navigation - Dense Tabs */}
        <nav className="flex items-center justify-between p-3 overflow-x-auto no-scrollbar border-b border-black/5 bg-white/30 backdrop-blur-md">
          <div className="flex items-center gap-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`
                  px-5 py-2.5 rounded-xl whitespace-nowrap transition-all duration-300 text-[10px] font-black uppercase tracking-widest
                  ${activeCategory === cat 
                    ? 'bg-gold text-black border border-gold shadow-lg shadow-gold/20' 
                    : 'text-black/60 hover:text-black hover:bg-black/5'}
                `}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 px-4 border-l border-black/5">
            <span className="text-[8px] text-black/80 font-black uppercase tracking-widest hidden sm:inline">Sort By</span>
            <select 
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-black/5 border border-black/5 rounded-lg px-2 py-1.5 text-[10px] text-black font-bold outline-none focus:border-gold/50 cursor-pointer"
            >
              <option value="default">Traditional</option>
              <option value="price-low">Price: Low-High</option>
              <option value="price-high">Price: High-Low</option>
              <option value="calories">Lightest First</option>
            </select>
          </div>
        </nav>

        {/* Dense Grid - 8-12 items target */}
        <div className="flex-1 overflow-y-auto px-4 py-6 no-scrollbar pb-32">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-3 md:gap-4">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div 
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="glass-panel group rounded-3xl p-3 flex flex-col relative border-black/5 hover:bg-white transition-all shadow-sm hover:shadow-xl"
                >
                  <div className={`w-full aspect-square rounded-2xl border border-black/5 overflow-hidden mb-3 ${item.accent} relative`}>
                    <div className="absolute inset-0 bg-linear-to-tr from-black/5 via-transparent to-white/10" />
                    {item.popular && (
                      <div className="absolute top-2 left-2 bg-gold text-white text-[8px] font-black uppercase px-2 py-1 rounded-md flex items-center gap-1 shadow-lg">
                        <Flame size={10} /> Popular
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h3 className="text-espresso text-sm font-black font-serif truncate">{item.name}</h3>
                      <span className="text-gold font-bold text-xs tracking-tight">${item.price.toFixed(0)}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-light line-clamp-2 min-h-[30px] mb-2 italic">
                      {item.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4 h-[14px] overflow-hidden">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-[7px] font-black uppercase tracking-tighter text-slate-400 border border-black/5 px-1 rounded bg-slate-50">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <button 
                      onClick={() => addToCart(item)}
                      className="mt-auto w-full py-2 bg-slate-50 hover:bg-gold hover:text-white border border-black/5 rounded-xl flex items-center justify-center gap-2 transition-all text-[10px] font-black uppercase tracking-widest shadow-sm"
                    >
                      <Plus size={14} /> Add
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Floating Cart Button for Mobile */}
      {!isCartOpen && cart.length > 0 && (
        <button 
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 md:hidden z-[60] bg-gold p-5 rounded-full shadow-2xl text-espresso shadow-gold/40 border-4 border-espresso"
        >
          <ShoppingBasket size={24} />
          <span className="absolute -top-1 -right-1 bg-white text-espresso w-6 h-6 rounded-full flex items-center justify-center font-black text-xs">
            {cart.length}
          </span>
        </button>
      )}

      {/* Persistent Platform Sidebar (Desktop) / Slide-over (Mobile) */}
      <AnimatePresence>
        {(isCartOpen || (cart.length > 0)) && (
          <motion.aside 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`
              fixed md:relative z-[100] inset-y-4 right-4 w-[calc(100%-2rem)] md:w-[320px] lg:w-[350px]
              ${(!isCartOpen && cart.length > 0) ? 'hidden md:flex' : 'flex'}
            `}
          >
            <div className="glass-panel h-full rounded-[2rem] flex flex-col border-white/20 shadow-2xl overflow-hidden bg-white/40">
              <div className="p-6 border-b border-black/5 flex items-center justify-between">
                <h2 className="text-espresso uppercase tracking-[0.4em] font-black text-sm">Mesob Selection</h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="md:hidden w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-espresso"
                >
                  <X size={16} />
                </button>
              </div>
              
              <div className="px-6 py-2">
                <div className="bg-slate-50 rounded-2xl p-4 border border-black/5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Ritual Wait Time</p>
                    <p className="text-sm font-black text-espresso">25 - 35 mins</p>
                  </div>
                </div>
              </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col no-scrollbar">
            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center opacity-20">
                <ShoppingBasket size={48} className="mb-4 text-slate-300" />
                <p className="text-xs uppercase tracking-widest leading-relaxed text-slate-400">Your table is empty.<br/>Select dishes to begin.</p>
              </div>
            ) : (
              <AnimatePresence>
                {cart.map(item => (
                  <motion.div 
                    layout 
                    key={item.id} 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center justify-between gap-4 group"
                  >
                    <div className="flex flex-col min-w-0 pr-2">
                      <span className="text-sm text-espresso font-bold truncate group-hover:text-gold transition-colors">{item.name}</span>
                      <span className="text-[10px] text-slate-400 font-black tracking-widest">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-3 bg-slate-100 p-1 rounded-full border border-black/5">
                       <button onClick={() => removeFromCart(item.id)} className="w-6 h-6 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-600"><Minus size={10}/></button>
                       <span className="text-xs font-black text-espresso w-4 text-center">{item.quantity}</span>
                       <button onClick={() => addToCart(item)} className="w-6 h-6 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-600"><Plus size={10}/></button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          <div className="p-6 bg-slate-50 border-t border-black/5 space-y-4">
             <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black mb-1">Total Valuation</p>
                  <div className="flex items-center gap-2">
                     <span className="text-espresso text-3xl font-black tracking-tighter">${(subtotal * 1.1).toFixed(2)}</span>
                  </div>
                </div>
             </div>
             <button 
               onClick={handlePlaceOrder}
               disabled={cart.length === 0 || isPlacingOrder}
               className="w-full bg-linear-to-r from-gold to-amber text-white py-4 rounded-2xl font-black uppercase tracking-[0.3em] text-xs shadow-2xl shadow-gold/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-20 flex items-center justify-center gap-2"
             >
               {isPlacingOrder ? (
                 <>
                   <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full" />
                   Processing...
                 </>
               ) : (
                 'Start Ceremonial Order'
               )}
             </button>
          </div>
        </div>
      </motion.aside>
      )}
      </AnimatePresence>

      {/* AI Recommendation Modal */}
      <AnimatePresence>
        {isAIModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAIModalOpen(false)}
              className="absolute inset-0 bg-espresso/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg glass-panel rounded-[2rem] p-8 border-gold/20 shadow-2xl overflow-hidden bg-white"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gold/20 overflow-hidden">
                {isAIThinking && <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1/3 h-full bg-gold" />}
              </div>

              <h2 className="text-gold text-2xl font-serif font-black mb-2 flex items-center gap-3">
                <Sparkles size={24} className="animate-pulse" /> AI Concierge
              </h2>
              <p className="text-[10px] text-slate-400 mb-6 font-bold uppercase tracking-widest">Help me curate your perfect ritual feast.</p>
              
              <div className="space-y-4 mb-8">
                <textarea 
                  placeholder="e.g. I want something traditional, spicy, and high in protein..."
                  className="w-full bg-slate-50 border border-black/5 rounded-2xl p-4 text-espresso text-[13px] outline-none focus:border-gold/30 h-32 resize-none placeholder:text-slate-300"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                />
                <button 
                  onClick={handleAIRequest}
                  disabled={isAIThinking || !aiPrompt.trim()}
                  className="w-full py-4 bg-linear-to-r from-gold to-amber text-white rounded-xl font-black text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-gold/20"
                >
                  {isAIThinking ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full" />
                      Consulting Ancestral Recipes...
                    </>
                  ) : "Curate Selection"}
                </button>
              </div>

              {aiRecommendation && !isAIThinking && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-50 rounded-2xl p-6 border border-gold/20 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-[9px] text-gold font-black uppercase tracking-widest mb-1">Our Curation</p>
                      <h4 className="text-xl font-serif text-espresso font-black italic">{aiRecommendation.itemName}</h4>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4 border-l-2 border-slate-200 pl-4 italic">{aiRecommendation.reasoning}</p>
                  <div className="bg-gold/5 p-3 rounded-lg border border-gold/10 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                       <Bean size={14} className="text-gold" />
                    </div>
                    <p className="text-[10px] text-gold italic leading-relaxed">{aiRecommendation.funFact}</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Order History Modal */}
      <AnimatePresence>
        {isOrderHistoryOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOrderHistoryOpen(false)}
              className="absolute inset-0 bg-espresso/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl glass-panel rounded-[2rem] p-8 border-gold/20 shadow-2xl overflow-hidden flex flex-col max-h-[80vh] bg-white"
            >
              <h2 className="text-espresso text-2xl font-serif font-black mb-6 flex items-center gap-3">
                <History size={24} className="text-gold" /> Ceremonial History
              </h2>

              <div className="flex-1 overflow-y-auto no-scrollbar space-y-4">
                {orderHistory.length === 0 ? (
                  <div className="py-20 text-center opacity-20">
                    <History size={48} className="mx-auto mb-4" />
                    <p className="text-xs uppercase tracking-widest">No rituals recorded yet.</p>
                  </div>
                ) : (
                  orderHistory.map((order) => (
                    <div key={order.id} className="bg-slate-50 rounded-2xl p-5 border border-black/5 shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-[10px] text-gold font-black uppercase tracking-widest mb-1">Ritual #{order.orderId.slice(-6)}</p>
                          <p className="text-[10px] text-slate-400">{new Date(order.createdAt?.seconds * 1000).toLocaleDateString()} • {new Date(order.createdAt?.seconds * 1000).toLocaleTimeString()}</p>
                        </div>
                        <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-md ${
                          order.status === 'completed' ? 'bg-green-100 text-green-600' : 
                          order.status === 'cancelled' ? 'bg-red-100 text-red-600' : 'bg-gold/10 text-gold'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="space-y-2 mb-4">
                        {order.items.map((item: any) => (
                          <div key={item.id} className="flex justify-between text-[11px]">
                            <span className="text-slate-600">{item.quantity}x {item.name}</span>
                            <span className="text-slate-400">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-3 border-t border-black/5 flex justify-between items-center">
                        <span className="text-[10px] text-espresso font-black uppercase tracking-widest">Total Valuation</span>
                        <span className="text-gold font-bold text-base">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}


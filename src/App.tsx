/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
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
  Bean
} from 'lucide-react';
import { MENU_ITEMS, CATEGORIES, MenuItem } from './constants';

interface CartItem extends MenuItem {
  quantity: number;
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[1]); // Main Dishes
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredItems = useMemo(() => 
    MENU_ITEMS.filter(item => item.category === activeCategory),
    [activeCategory]
  );

  const addToCart = (item: MenuItem) => {
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

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="relative h-screen w-screen flex flex-col md:flex-row overflow-hidden select-none bg-espresso">
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 mesob-texture opacity-[0.03]" />
        
        {/* Soft Volumetric Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-amber/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-sienna/5 blur-[150px] rounded-full" />
        
        {/* Smoke Particles */}
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="smoke-particle"
            style={{ 
              left: `${10 + Math.random() * 80}%`, 
              bottom: '-5%', 
              width: '150px', 
              height: '150px',
              animationDelay: `${i * 2}s`,
              opacity: 0
            }}
          />
        ))}
      </div>

      <main className="relative flex-1 flex flex-col overflow-hidden max-w-full z-10">
        {/* Sticky Header & Nav Container */}
        <div className="sticky top-0 z-40 glass-panel rounded-b-3xl mx-2 md:mx-4 mt-2 md:mt-4 shadow-2xl">
          <header className="px-6 py-4 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold border border-gold/20">
                <Coffee size={20} />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-serif text-gold font-black tracking-tight leading-none mb-0.5">
                  GURSHA <span className="text-cream/90 font-medium font-sans text-xs md:text-sm">HERITAGE</span>
                </h1>
                <p className="text-[9px] tracking-[0.3em] text-gold/40 uppercase font-bold">Traditional Curation</p>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-6">
               <div className="text-right">
                  <p className="text-gold text-lg font-serif">እንኳን ደህና መጡ</p>
                  <p className="text-[8px] uppercase tracking-widest text-cream/30">Traditional Welcome</p>
               </div>
            </div>
          </header>

          <nav className="flex items-center gap-1 p-2 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`
                  px-5 py-2 rounded-full whitespace-nowrap transition-all duration-300 text-[10px] md:text-xs font-bold uppercase tracking-wider
                  ${activeCategory === cat 
                    ? 'bg-gold text-espresso border border-gold shadow-lg shadow-gold/20 scale-105' 
                    : 'text-cream/60 hover:text-white hover:bg-white/5'}
                `}
              >
                {cat}
              </button>
            ))}
          </nav>
        </div>

        {/* Dense Menu Grid */}
        <div className="flex-1 overflow-y-auto px-2 md:px-4 pt-6 pb-24 no-scrollbar">
          <motion.div 
            layout
            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileTap={{ scale: 1.02 }}
                  className="glass-panel rounded-3xl p-3 flex flex-col group relative border-white/5 active:bg-white/5"
                >
                  <div className={`w-full aspect-square rounded-2xl border border-white/10 overflow-hidden mb-3 ${item.accent} relative`}>
                    <div className="absolute inset-0 bg-linear-to-tr from-black/20 via-transparent to-white/5" />
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <div className="w-full h-full border-2 border-white/10 rounded-full opacity-20" />
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col min-w-0">
                    <h3 className="text-gold text-sm font-black font-serif truncate mb-0.5">{item.name}</h3>
                    <p className="text-[10px] text-cream/40 font-light truncate mb-4">
                      {item.description}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-gold font-bold text-sm tracking-tight">${item.price.toFixed(2)}</span>
                      <button 
                        onClick={() => addToCart(item)}
                        className="bg-white/5 hover:bg-gold hover:text-espresso border border-white/10 text-white w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {activeCategory === 'Drinks' && (
             <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 glass-panel rounded-3xl p-8 border-gold/20 flex flex-col md:flex-row items-center gap-8 overflow-hidden relative"
             >
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <Bean size={100} className="rotate-45" />
                </div>
                <div className="flex-1">
                   <span className="text-[9px] text-gold font-bold uppercase tracking-[0.4em] block mb-2">Ceremonial Highlight</span>
                   <h3 className="text-gold text-2xl font-serif font-black mb-2 italic">Coffee Ceremony</h3>
                   <p className="text-xs text-cream/50 leading-relaxed max-w-lg">Abol, Tona, Baraka. Hand-roasted and poured in three rounds of tradition. Experience the heartbeat of our culture.</p>
                </div>
                <button className="px-10 py-4 bg-gold text-espresso text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-gold/20 hover:scale-105 active:scale-95 transition-all">
                  Request Ceremony
                </button>
             </motion.div>
          )}
        </div>
      </main>

      {/* Floating Cart Button */}
      {!isCartOpen && cart.length > 0 && (
        <button 
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-[60] glass-panel p-5 rounded-full shadow-2xl text-gold border-gold/50 shadow-gold/30"
        >
          <ShoppingBasket size={28} />
          <span className="absolute -top-2 -right-2 bg-amber text-espresso w-7 h-7 rounded-full flex items-center justify-center font-black text-xs border-2 border-espresso">
            {cart.length}
          </span>
        </button>
      )}

      {/* Sidebar Cart */}
      <aside className={`
        fixed md:relative z-[100] inset-y-4 right-4 w-[calc(100%-2rem)] md:w-[280px] lg:w-[320px]
        transition-transform duration-700 ease-in-out
        ${isCartOpen ? 'translate-x-0' : 'translate-x-[120%] md:translate-x-0 md:relative'}
      `}>
        <div className="glass-panel h-full rounded-[2rem] flex flex-col border-white/5 shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-gold uppercase tracking-[0.3em] font-black text-base mb-0.5">Your Mesob</h2>
                <span className="text-[8px] text-cream/40 font-bold uppercase tracking-widest">Hand-picked</span>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="md:hidden glass-pill p-1.5 text-cream/50">
                 <Minus size={16} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar pr-2">
            {cart.length === 0 ? (
               <div className="h-full flex flex-col items-center justify-center text-center opacity-20 py-10">
                 <div className="mb-4 p-4 border border-dashed border-gold/30 rounded-full">
                    <ShoppingBasket size={32} />
                 </div>
                 <p className="text-[10px] uppercase tracking-widest leading-loose text-center">The table awaits... <br/>Select a dish.</p>
               </div>
            ) : (
              cart.map((item) => (
                <motion.div layout key={item.id} className="flex items-center justify-between group gap-2">
                  <div className="flex flex-col min-w-0 pr-2">
                    <span className="text-sm text-cream font-bold truncate group-hover:text-gold transition-colors">{item.name}</span>
                    <span className="text-[9px] text-gold/50 font-black tracking-widest">${item.price.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-2.5 glass-pill p-1">
                    <button onClick={() => removeFromCart(item.id)} className="w-6 h-6 flex items-center justify-center text-cream/40 hover:text-white hover:bg-white/5 rounded-full transition-colors">
                      <Minus size={10} />
                    </button>
                    <span className="text-xs font-black text-gold w-3 text-center">{item.quantity}</span>
                    <button onClick={() => addToCart(item)} className="w-6 h-6 flex items-center justify-center text-cream/40 hover:text-white hover:bg-white/5 rounded-full transition-colors">
                      <Plus size={10} />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          <div className="p-6 bg-white/[0.02] border-t border-white/5 space-y-4">
            <div className="space-y-1.5">
               <div className="flex justify-between text-[9px] text-cream/40 uppercase tracking-widest font-bold">
                  <span>Subtotal</span>
                  <span className="text-cream font-mono">${subtotal.toFixed(2)}</span>
               </div>
               <div className="flex justify-between text-[9px] text-cream/40 uppercase tracking-widest font-bold">
                  <span>Service (10%)</span>
                  <span className="text-cream font-mono">${(subtotal * 0.1).toFixed(2)}</span>
               </div>
               <div className="flex justify-between text-gold font-black text-2xl tracking-tighter pt-1">
                  <span>Total</span>
                  <span>${(subtotal * 1.1).toFixed(2)}</span>
               </div>
            </div>
            <button 
              className={`
                w-full py-4 rounded-xl font-black uppercase tracking-[0.3em] text-[10px] transition-all shadow-2xl relative overflow-hidden group
                ${cart.length > 0 ? 'bg-gold text-espresso hover:scale-[1.02] active:scale-95 shadow-gold/20' : 'bg-white/5 text-cream/20 cursor-not-allowed'}
              `}
            >
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              Complete Ceremony
            </button>
          </div>
        </div>
      </aside>

      {/* Decorative Traditional Element */}
      <footer className="fixed bottom-0 left-0 p-8 z-50 pointer-events-none hidden lg:block">
        <div className="flex items-center gap-4 text-gold/30">
          <p className="text-4xl font-serif">❖</p>
          <div className="h-[1px] w-24 bg-gold/10" />
          <p className="text-[10px] uppercase tracking-[0.5em] font-bold">Poured with Heritage</p>
        </div>
      </footer>
    </div>
  );
}

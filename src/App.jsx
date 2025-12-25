import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MyceliumBackground from './components/MyceliumBackground';
import FungiCard from './components/FungiCard';
import { X, Microscope, Sparkles, ThermometerSun, AlertTriangle, Tag } from 'lucide-react';
import { fungiData } from './fungiData'; // <--- 關鍵：引入新資料

function App() {
  const [selectedFungi, setSelectedFungi] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredData = fungiData.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'edible') return item.isEdible;
    if (filter === 'toxic') return item.isToxic;
    return true;
  });

  return (
    <div className="min-h-screen text-gray-100 relative selection:bg-spore selection:text-black">
      <MyceliumBackground />

      {/* 頂部裝飾光 */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-spore/10 blur-[120px] rounded-full pointer-events-none -z-10 mix-blend-screen" />

      <header className="pt-24 pb-12 px-6 text-center z-10 relative">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-spore/30 bg-spore/5 text-spore text-sm font-bold mb-6 tracking-widest uppercase shadow-[0_0_15px_rgba(136,204,0,0.2)]">
            <Sparkles size={14} /> The Hidden Kingdom
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight leading-tight drop-shadow-2xl">
            認識<span className="text-transparent bg-clip-text bg-gradient-to-r from-spore-light to-spore">真菌</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
            目前收錄 <span className="text-spore font-bold">{fungiData.length}</span> 種珍稀樣本。從微觀菌絲到宏觀生態的完整紀錄。
          </p>
        </motion.div>
      </header>

      {/* 導航過濾器 */}
      <div className="sticky top-6 z-40 flex justify-center pb-12">
        <div className="glass-panel p-1.5 rounded-full flex gap-1 shadow-2xl backdrop-blur-xl border border-white/10">
          {['all', 'edible', 'toxic'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-2 rounded-full transition-all duration-300 font-medium text-sm ${
                filter === type 
                  ? 'bg-spore text-black font-bold shadow-[0_0_20px_rgba(136,204,0,0.4)] scale-105' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {type === 'all' ? '全域探索' : type === 'edible' ? '可食用' : '危險警示'}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 pb-32 z-10 relative">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredData.map((fungi) => <FungiCard key={fungi.id} fungi={fungi} onClick={setSelectedFungi} />)}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* 詳細視窗 (Modal) - 內容升級版 */}
      <AnimatePresence>
        {selectedFungi && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-md" onClick={() => setSelectedFungi(null)}>
            <motion.div layoutId={`card-${selectedFungi.id}`} className="glass-panel w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
              
              <button onClick={() => setSelectedFungi(null)} className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-white text-white hover:text-black transition-colors z-30 border border-white/10">
                <X size={24} />
              </button>

              {/* 左側圖片區 */}
              <div className="md:w-1/2 h-64 md:h-auto relative group">
                 <img src={selectedFungi.image} alt={selectedFungi.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"/>
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent md:bg-gradient-to-r" />
              </div>
              
              {/* 右側資訊區 */}
              <div className="md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto custom-scrollbar bg-[#111]">
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedFungi.tags?.map(tag => (
                      <span key={tag} className="text-xs font-bold px-2 py-1 rounded bg-white/10 text-spore border border-spore/20 flex items-center gap-1">
                        <Tag size={10} /> {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 font-serif">{selectedFungi.name}</h2>
                  <p className="text-gray-400 text-lg italic tracking-wider font-mono">{selectedFungi.scientificName}</p>
                </div>
                
                {/* 數據儀表板 */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <p className="text-gray-500 text-xs uppercase tracking-widest mb-1 flex items-center gap-1"><AlertTriangle size={12}/> 危險指數</p>
                    <p className="text-xl text-spore font-mono">{selectedFungi.danger || "Unknown"}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <p className="text-gray-500 text-xs uppercase tracking-widest mb-1 flex items-center gap-1"><ThermometerSun size={12}/> 生長季節</p>
                    <p className="text-white font-medium">{selectedFungi.season || "全年"}</p>
                  </div>
                </div>

                <div className="space-y-6 text-gray-300 leading-relaxed font-light text-lg">
                  <p className="border-l-2 border-spore pl-4">{selectedFungi.description}</p>
                  
                  <div className="p-6 bg-spore/5 rounded-xl border border-spore/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-spore/20 blur-3xl rounded-full -mr-10 -mt-10"></div>
                    <h4 className="text-sm font-bold text-spore uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Microscope size={16} /> 深度解析
                    </h4>
                    <p className="text-gray-200 text-base">{selectedFungi.details}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
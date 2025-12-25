import React from 'react';
import { motion } from 'framer-motion';
import { Skull, Utensils, Zap, ChevronRight } from 'lucide-react';

const FungiCard = ({ fungi, onClick }) => {
  return (
    <motion.div
      layoutId={`card-${fungi.id}`}
      onClick={() => onClick(fungi)}
      whileHover={{ y: -12, scale: 1.02 }}
      className="glass-panel rounded-2xl overflow-hidden cursor-pointer group relative transition-all duration-500 hover:shadow-[0_0_30px_rgba(136,204,0,0.15)] hover:border-spore/50 flex flex-col h-full bg-[#1a1814]"
    >
      {/* 圖片區域：固定高度，避免排版亂掉
          isolate: 強制建立獨立 compositing layer，解 Safari 把圖片當 mask 吃掉的 bug
      */}
      <div className="h-64 overflow-hidden relative shrink-0 isolate">
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />

        {/* 圖片（關鍵修正） */}
        <img
          src={fungi.image}
          alt={fungi.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{
            WebkitMaskImage: 'none',
            maskImage: 'none',
            filter: 'none',
            mixBlendMode: 'normal',
            opacity: 1,
            transform: 'translateZ(0)', // 再補一刀：逼 Safari 用正確 GPU layer
          }}
          onError={(e) => {
            console.log('❌ failed:', fungi.image);
            console.log('👉 requested:', e.currentTarget.src);
          }}
          onLoad={() => console.log('✅ loaded:', fungi.image)}
        />

        {/* 標籤徽章 */}
        <div className="absolute top-3 right-3 flex gap-2 z-20">
          {fungi.isToxic && (
            <span className="bg-red-500/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1 shadow-lg border border-red-400/30">
              <Skull size={12} /> 有毒
            </span>
          )}
          {fungi.isEdible && (
            <span className="bg-green-600/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1 shadow-lg border border-green-400/30">
              <Utensils size={12} /> 食用
            </span>
          )}
          {fungi.bioluminescent && (
            <span className="bg-blue-500/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1 shadow-lg border border-blue-400/30">
              <Zap size={12} /> 發光
            </span>
          )}
        </div>

        {/* 卡片標題 */}
        <div className="absolute bottom-4 left-4 z-20 pr-4">
          <h3 className="text-2xl font-bold text-white group-hover:text-spore transition-colors drop-shadow-md">
            {fungi.name}
          </h3>
          <p className="text-gray-300 text-sm italic font-sans tracking-wide opacity-80">
            {fungi.scientificName}
          </p>
        </div>
      </div>

      {/* 下方內容區 */}
      <div className="p-5 relative flex-grow flex flex-col justify-between border-t border-white/5 bg-[#1a1814]">
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 border-l-2 border-gray-700 pl-3 group-hover:border-spore transition-colors">
          {fungi.description}
        </p>

        <div className="mt-4 flex justify-between items-center text-xs text-gray-500 uppercase tracking-widest font-bold">
          <span>Entry #{fungi.id.toString().padStart(3, '0')}</span>
          <div className="flex items-center gap-1 text-spore opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
            EXPLORE <ChevronRight size={14} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FungiCard;

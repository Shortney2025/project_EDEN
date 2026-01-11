
import React from 'react';
import { UserStats, Tree } from '../types';
import HaidaLogo from './HaidaLogo';

interface HubProps {
  stats: UserStats;
  trees: Tree[];
  onRefer: () => void;
}

const Hub: React.FC<HubProps> = ({ stats, trees, onRefer }) => {
  const thirstyTrees = trees.filter(t => t.status !== 'healthy');

  return (
    <div className="py-8 space-y-8 pb-20 relative">
      <header className="flex justify-between items-center px-2 relative z-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white">Guardian Hub</h1>
          <p className="text-sm text-teal-400 font-medium italic">Biosphere Node: {trees.length} Protected</p>
        </div>
        <div className="bg-red-700 px-4 py-1.5 rounded-full text-white font-black text-xs shadow-lg shadow-red-900/20">
          LVL {Math.floor(stats.xp / 1000) + 1}
        </div>
      </header>

      {/* Hero Hydration Section - Haida Style */}
      <div className="glass-card rounded-[3rem] p-8 text-center border-t-2 border-red-700 relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-700/5 rounded-full blur-3xl group-hover:bg-red-700/10 transition-colors"></div>
        <HaidaLogo className="absolute -left-10 -bottom-10 w-40 h-40 opacity-[0.03] rotate-12 pointer-events-none" />
        <div className="flex justify-center mb-6">
           <div className="relative">
              <i className="fa-solid fa-droplet text-6xl text-teal-400 animate-pulse"></i>
              <div className="absolute inset-0 bg-teal-400 rounded-full blur-3xl opacity-20"></div>
           </div>
        </div>
        <h2 className="text-4xl font-black text-white">{stats.streak} DAY STREAK</h2>
        <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-white/40 mt-2">Ancestral Hydration Flow</p>
        <div className="mt-6 flex justify-center gap-1.5">
          {[...Array(7)].map((_, i) => (
            <div 
              key={i} 
              className={`w-10 h-1.5 rounded-full transition-all duration-700 ${i < stats.streak % 7 ? 'bg-red-700' : 'bg-white/5'}`}
            ></div>
          ))}
        </div>
      </div>

      {/* Beautiful Tree Visual Grid */}
      <div className="grid grid-cols-2 gap-4 px-2">
         <div className="glass-card p-6 rounded-[2.5rem] flex flex-col items-center justify-center border border-white/5 group hover:border-teal-500/30 transition-all">
            <i className="fa-solid fa-tree text-3xl text-teal-600 mb-3 group-hover:scale-110 transition-transform"></i>
            <span className="text-[10px] uppercase font-black tracking-widest text-white/60">Cedar Node</span>
         </div>
         <div className="glass-card p-6 rounded-[2.5rem] flex flex-col items-center justify-center border border-white/5 group hover:border-red-500/30 transition-all">
            <i className="fa-solid fa-cloud-sun text-3xl text-red-700 mb-3 group-hover:scale-110 transition-transform"></i>
            <span className="text-[10px] uppercase font-black tracking-widest text-white/60">Sky Guardian</span>
         </div>
      </div>

      {/* System Alerts */}
      {thirstyTrees.length > 0 && (
        <div className="space-y-4 px-2">
          <div className="flex justify-between items-end px-2">
            <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-red-600 flex items-center gap-2">
              <i className="fa-solid fa-shield-virus animate-pulse"></i>
              Ecosystem Stress: {thirstyTrees.length}
            </h3>
          </div>
          <div className="space-y-3">
            {thirstyTrees.slice(0, 3).map(tree => (
              <div key={tree.id} className="glass-card rounded-3xl p-5 border-l-8 border-red-700 flex items-center justify-between group hover:bg-white/5 transition-all">
                <div>
                  <h4 className="font-black text-white text-base">{tree.name}</h4>
                  <p className="text-[10px] text-teal-400 font-bold uppercase tracking-wider">Desiccation Risk: {tree.status}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-red-700/10 flex items-center justify-center border border-red-700/20">
                   <i className="fa-solid fa-water-ladder text-red-600"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Daily Quest - Haida Eagle Integration */}
      <div className="glass-card rounded-[3rem] p-8 relative overflow-hidden border border-red-900/30 bg-black/40">
        <HaidaLogo className="absolute -right-12 -bottom-12 w-48 h-48 opacity-[0.05] -rotate-12 pointer-events-none" />
        <div className="relative z-10">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-red-600">Ancestral Mission</span>
          <h2 className="text-2xl font-black mt-2 text-white">Canopy Expansion</h2>
          <p className="text-xs text-teal-100/60 mt-3 italic leading-relaxed">
            "Plant your roots where the sky meets the soil. Each node brings us closer to the great biosphere harmony."
          </p>
          <div className="mt-6 flex items-center justify-between">
            <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{trees.length}/10 Nodes Linked</div>
            <div className="w-32 h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
              <div className="h-full bg-gradient-to-r from-red-700 to-teal-600" style={{ width: `${Math.min((trees.length / 10) * 100, 100)}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hub;

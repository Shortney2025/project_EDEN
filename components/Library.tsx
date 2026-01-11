
import React, { useState, useEffect } from 'react';
import { getPlantingGuides, getLocalResources } from '../services/geminiService';

const Library: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [guideData, setGuideData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [localData, setLocalData] = useState<{ text: string; chunks: any[] } | null>(null);
  const [loadingLocal, setLoadingLocal] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      fetchLocalInfo(latitude, longitude);
    });
  }, []);

  const fetchLocalInfo = async (lat: number, lng: number) => {
    setLoadingLocal(true);
    try {
      const data = await getLocalResources(lat, lng);
      setLocalData(data);
    } catch (e) {
      console.error("Nexus synchronization failed", e);
    } finally {
      setLoadingLocal(false);
    }
  };

  const learningModules = [
    { 
      id: 'planting', 
      name: 'Native Reforestation', 
      icon: 'fa-tree-city', 
      color: '#A7D129',
      desc: 'Planting trees and native vegetation to repair the biosphere.'
    },
    { 
      id: 'recycling', 
      name: 'Circular Waste Sync', 
      icon: 'fa-recycle', 
      color: '#4ade80',
      desc: 'Local recycling protocols and circular economy practices.'
    },
    { 
      id: 'invasives', 
      name: 'Invasive Mitigation (PPE)', 
      icon: 'fa-shield-heart', 
      color: '#fb923c',
      desc: 'Safe removal techniques and mandatory protective gear.'
    },
    {
      id: 'biosphere',
      name: 'Harmony & Awareness',
      icon: 'fa-mountain-sun',
      color: '#60a5fa',
      desc: 'Deep ecology and self-awareness within Earth\'s systems.'
    }
  ];

  const fetchGuide = async (topicName: string) => {
    setLoading(true);
    setSelectedTopic(topicName);
    try {
      const data = await getPlantingGuides(topicName);
      setGuideData(data.text);
    } catch (e) {
      setGuideData("Data retrieval failed. Local mesh connection unstable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 space-y-10 animate-fadeIn">
      <header className="px-2">
        <h2 className="text-3xl font-bold tracking-tight">Guardian Knowledge Base</h2>
        <p className="text-sm text-white/50 mt-1 italic leading-relaxed">
          Aligning human action with planetary health.
        </p>
      </header>

      {/* Primary Learning Grid */}
      <section className="space-y-4 px-2">
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#A7D129] mb-4">Training Modules</h3>
        <div className="grid grid-cols-1 gap-4">
          {learningModules.map(module => (
            <button 
              key={module.id}
              onClick={() => fetchGuide(module.name)}
              className="glass-card p-6 rounded-[2.5rem] flex items-center gap-5 hover:bg-white/10 transition-all border border-transparent shadow-xl group text-left"
            >
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center bg-white/5 group-hover:scale-110 transition-transform shadow-inner"
                style={{ color: module.color }}
              >
                <i className={`fa-solid ${module.icon} text-2xl`}></i>
              </div>
              <div className="flex-1">
                <span className="text-lg font-bold block leading-tight">{module.name}</span>
                <p className="text-[10px] text-white/40 mt-1 uppercase font-bold tracking-widest">
                  {module.desc}
                </p>
              </div>
              <i className="fa-solid fa-chevron-right opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all"></i>
            </button>
          ))}
        </div>
      </section>

      {/* PPE Spotlight (Direct Educational Value) */}
      <section className="px-2">
        <div className="glass-card rounded-[2rem] p-6 bg-orange-500/5 border border-orange-500/20 overflow-hidden relative">
           <i className="fa-solid fa-hard-hat absolute -right-4 -top-4 text-7xl opacity-5 rotate-12"></i>
           <h4 className="text-xs font-black uppercase tracking-widest text-orange-400 mb-3">Guardian PPE Checklist</h4>
           <div className="grid grid-cols-2 gap-3 text-[10px] font-bold">
              <div className="flex items-center gap-2"><i className="fa-solid fa-square-check text-orange-500"></i> Puncture-proof Gloves</div>
              <div className="flex items-center gap-2"><i className="fa-solid fa-square-check text-orange-500"></i> Eye Protection</div>
              <div className="flex items-center gap-2"><i className="fa-solid fa-square-check text-orange-500"></i> Long Canvas Sleeves</div>
              <div className="flex items-center gap-2"><i className="fa-solid fa-square-check text-orange-500"></i> Soil-safe Respirator</div>
           </div>
        </div>
      </section>

      {/* Community Nexus (Localized City Resources) */}
      <section className="space-y-4 px-2 pb-10">
        <div className="flex justify-between items-end px-1">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">City Nexus & Events</h3>
          <span className="text-[9px] font-bold text-white/30 uppercase">Synchronized with GPS</span>
        </div>

        <div className="glass-card rounded-[3rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden bg-blue-500/5">
          {loadingLocal ? (
            <div className="space-y-4 py-6 animate-pulse">
               <div className="h-4 bg-white/10 rounded w-3/4"></div>
               <div className="h-20 bg-white/10 rounded w-full"></div>
            </div>
          ) : localData ? (
            <div className="space-y-8">
              <div className="text-sm leading-relaxed text-white/80 whitespace-pre-line prose prose-invert opacity-90">
                {localData.text}
              </div>
              
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#A7D129] block mb-2">Verified Local Links & meetups</span>
                <div className="grid grid-cols-1 gap-3">
                  {localData.chunks && localData.chunks.map((chunk: any, i: number) => (
                    chunk.web && (
                      <a 
                        key={i} 
                        href={chunk.web.uri} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl hover:bg-[#A7D129]/10 transition-all border border-white/5 group shadow-sm"
                      >
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20">
                          <i className="fa-solid fa-users-rays text-sm text-blue-400"></i>
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <span className="text-xs font-bold truncate block">{chunk.web.title}</span>
                          <span className="text-[8px] opacity-40 uppercase font-black">Community Node</span>
                        </div>
                        <i className="fa-solid fa-external-link text-[10px] opacity-20 group-hover:opacity-100 group-hover:text-[#A7D129]"></i>
                      </a>
                    )
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 opacity-40">
              <i className="fa-solid fa-earth-africa text-5xl mb-4 animate-pulse"></i>
              <p className="text-xs italic">Awaiting local signal to find events and resources...</p>
            </div>
          )}
        </div>
      </section>

      {/* Learning Modal */}
      {selectedTopic && (
        <div className="fixed inset-0 bg-[#1a2e18]/98 backdrop-blur-2xl z-[100] p-6 flex items-center justify-center animate-fadeIn">
          <div className="glass-card w-full max-w-sm rounded-[3.5rem] p-10 max-h-[85vh] flex flex-col overflow-hidden border border-white/10 shadow-3xl relative">
            <button 
              onClick={() => setSelectedTopic(null)}
              className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 active:scale-90 transition-transform shadow-lg"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-[#A7D129]">
              <i className="fa-solid fa-book-sparkles"></i>
              {selectedTopic}
            </h3>
            
            <div className="flex-1 overflow-y-auto text-sm leading-relaxed text-white/80 pr-3 custom-scrollbar">
              {loading ? (
                <div className="space-y-6 animate-pulse">
                  <div className="h-4 bg-white/10 rounded w-3/4"></div>
                  <div className="h-40 bg-white/10 rounded w-full"></div>
                </div>
              ) : (
                <div className="whitespace-pre-wrap prose prose-invert opacity-90 text-justify leading-loose pb-10">
                  {guideData}
                </div>
              )}
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/10">
               <button 
                 onClick={() => setSelectedTopic(null)}
                 className="w-full bg-[#A7D129] text-[#1a2e18] py-5 rounded-3xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all"
               >
                 Acknowledge & Sync
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;

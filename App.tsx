
import React, { useState, useEffect, useMemo } from 'react';
import { AppScreen, UserStats, Tree } from './types';
import { MISSION_STATEMENT, FOUNDER_MESSAGE } from './constants';
import Layout from './components/Layout';
import Hub from './components/Hub';
import MapScreen from './components/Map';
import Scanner from './components/Scanner';
import Library from './components/Library';
import Support from './components/Support';
import ChatBot from './components/ChatBot';
import HaidaLogo from './components/HaidaLogo';

const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>(AppScreen.SPLASH);
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('eden_stats');
    return saved ? JSON.parse(saved) : {
      xp: 2450,
      seedCoins: 125,
      streak: 0,
      lastWatered: null
    };
  });

  const [trees, setTrees] = useState<Tree[]>(() => {
    const saved = localStorage.getItem('eden_trees');
    return saved ? JSON.parse(saved) : [];
  });

  const thirstyCount = useMemo(() => trees.filter(t => t.status !== 'healthy').length, [trees]);

  useEffect(() => {
    localStorage.setItem('eden_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('eden_trees', JSON.stringify(trees));
  }, [trees]);

  useEffect(() => {
    const updateEcosystem = () => {
      const now = Date.now();
      setTrees(prev => prev.map(tree => {
        const hoursSinceWater = (now - tree.lastWateredAt) / (1000 * 60 * 60);
        let status: Tree['status'] = 'healthy';
        if (hoursSinceWater > 48) status = 'critical';
        else if (hoursSinceWater > 24) status = 'thirsty';
        return { ...tree, status };
      }));
      if (stats.lastWatered) {
        const hoursSinceLastAction = (now - stats.lastWatered) / (1000 * 60 * 60);
        if (hoursSinceLastAction > 36) {
          setStats(prev => ({ ...prev, streak: 0 }));
        }
      }
    };
    updateEcosystem();
    const interval = setInterval(updateEcosystem, 300000);
    return () => clearInterval(interval);
  }, [stats.lastWatered]);

  const handlePlantTree = (lat: number, lng: number) => {
    if (stats.seedCoins < 10) {
      alert("Insufficient Seed Coins. Collect resources by scanning recyclables.");
      return;
    }
    const newTree: Tree = {
      id: `tree-${Date.now()}`,
      type: 'Native',
      lat,
      lng,
      name: `Guardian Sapling #${Math.floor(Math.random() * 1000)}`,
      status: 'healthy',
      plantedAt: Date.now(),
      lastWateredAt: Date.now(),
      isUserPlanted: true
    };
    setTrees(prev => [...prev, newTree]);
    handleWaterTree(newTree.id, true);
    setStats(prev => ({
      ...prev,
      xp: prev.xp + 500,
      seedCoins: prev.seedCoins - 10
    }));
  };

  const handleWaterTree = (treeId: string, isNewPlant: boolean = false) => {
    const now = Date.now();
    setTrees(prev => prev.map(tree => 
      tree.id === treeId ? { ...tree, lastWateredAt: now, status: 'healthy' as const } : tree
    ));
    setStats(prev => {
      let newStreak = prev.streak;
      const lastActionDate = prev.lastWatered ? new Date(prev.lastWatered).toDateString() : null;
      const todayDate = new Date(now).toDateString();
      if (lastActionDate !== todayDate) {
        newStreak = prev.streak + 1;
      }
      return {
        ...prev,
        xp: prev.xp + (isNewPlant ? 0 : 100),
        streak: newStreak,
        lastWatered: now
      };
    });
  };

  const handleScanResult = (result: any) => {
    if (result.type === 'watered_tree') {
      setStats(prev => ({
        ...prev,
        xp: prev.xp + 200,
        seedCoins: prev.seedCoins + 5
      }));
      alert(`AI Verified: Ecosystem Hydrated! +200 XP.`);
    } else if (result.type === 'invasive') {
      setStats(prev => ({ ...prev, xp: prev.xp + 500, seedCoins: prev.seedCoins + 20 }));
      alert("Invasive Bounty Claimed!");
    }
  };

  const renderScreen = () => {
    switch (screen) {
      case AppScreen.SPLASH:
        return (
          <div className="h-screen flex flex-col items-center justify-center text-center p-8 space-y-12 animate-fadeIn relative overflow-hidden">
            <div className="haida-logo-float relative w-80 h-64 flex items-center justify-center">
              <div className="absolute inset-0 bg-red-900/10 rounded-full blur-3xl"></div>
              <HaidaLogo className="relative z-10 w-full h-full drop-shadow-[0_0_20px_rgba(139,0,0,0.4)]" />
            </div>
            <div className="relative z-10">
              <h1 className="text-5xl font-black tracking-tighter mb-2 text-white">PROJECT EDEN</h1>
              <p className="text-red-600 font-bold text-xs uppercase tracking-[0.5em] mb-4">Ancestral AI Reforestation</p>
              <p className="text-[10px] text-teal-400/60 max-w-[200px] mx-auto leading-relaxed italic">
                A Lovel AI Synergy • Courtney Virginia Brown
              </p>
            </div>
            <button 
              onClick={() => setScreen(AppScreen.FOUNDER)}
              className="mt-8 w-16 h-16 bg-white/5 rounded-full flex items-center justify-center border border-white/10 animate-bounce hover:bg-white/10 transition-colors"
            >
              <i className="fa-solid fa-chevron-down text-red-600"></i>
            </button>
          </div>
        );

      case AppScreen.FOUNDER:
        return (
          <div className="h-screen flex flex-col justify-center p-8 space-y-8 animate-fadeIn">
            <div className="w-16 h-1 bg-red-700 rounded-full shadow-[0_0_10px_#8b0000]"></div>
            <h2 className="text-4xl font-bold leading-tight text-white">{FOUNDER_MESSAGE.title}</h2>
            <p className="opacity-80 leading-relaxed italic text-lg text-teal-100/80">{FOUNDER_MESSAGE.body}</p>
            <button 
              onClick={() => setScreen(AppScreen.HUB)}
              className="bg-red-700 text-white py-5 rounded-3xl font-black uppercase tracking-widest text-sm shadow-[0_10px_30px_rgba(139,0,0,0.4)] hover:scale-105 active:scale-95 transition-all"
            >
              Initialize Guardian Link
            </button>
          </div>
        );

      case AppScreen.HUB:
        return (
          <div className="space-y-6">
            <Hub stats={stats} trees={trees} onRefer={() => {}} />
            <button 
              onClick={() => setScreen(AppScreen.CHAT)}
              className="w-full glass-card p-6 rounded-[2.5rem] border border-red-700/30 flex items-center justify-between group hover:bg-red-700/10 transition-all"
            >
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10">
                    <HaidaLogo className="w-full h-full" />
                  </div>
                  <div>
                    <h4 className="font-black text-white uppercase tracking-widest text-sm">Talk to Lovel AI</h4>
                    <p className="text-[10px] text-teal-400 italic">Get guidance from the ancestral mesh</p>
                  </div>
               </div>
               <i className="fa-solid fa-message text-red-700"></i>
            </button>
          </div>
        );
      case AppScreen.CHAT:
        return <ChatBot />;
      case AppScreen.MAP:
        return <MapScreen trees={trees} onPlant={handlePlantTree} onWater={handleWaterTree} />;
      case AppScreen.SCANNER:
        return <Scanner onScanResult={handleScanResult} />;
      case AppScreen.LIBRARY:
        return <Library />;
      case AppScreen.SUPPORT:
        return <Support />;
      default:
        return null;
    }
  };

  const showNav = ![AppScreen.SPLASH, AppScreen.FOUNDER].includes(screen);

  return (
    <div className="min-h-screen text-white selection:bg-red-700 selection:text-white">
      <Layout activeScreen={screen} onNavigate={setScreen} showNav={showNav} notificationCount={thirstyCount}>
        <div className="pb-8">
          {renderScreen()}
        </div>
      </Layout>
    </div>
  );
};

export default App;


import React, { useState, useEffect, useRef } from 'react';
import { Tree } from '../types';
import { getEnvironmentalData } from '../services/geminiService';

interface MapProps {
  trees: Tree[];
  onPlant: (lat: number, lng: number) => void;
  onWater: (treeId: string) => void;
}

const MapScreen: React.FC<MapProps> = ({ trees, onPlant, onWater }) => {
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [statusText, setStatusText] = useState("Calibrating Neural GPS...");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null);
  const [neuralTip, setNeuralTip] = useState<string | null>(null);
  const tipTimeoutRef = useRef<number | null>(null);
  const lastAlertCoords = useRef<{lat: number, lng: number} | null>(null);
  const lastAlertTime = useRef<number>(0);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ lat: latitude, lng: longitude });
        setIsLoading(false);
        setStatusText("Mesh Linked: Real-time Sync Active.");
        checkProximity(latitude, longitude);
        triggerEnvironmentalCheck(latitude, longitude);
      },
      () => setStatusText("GPS Uplink Error. Manual position required."),
      { enableHighAccuracy: true, maximumAge: 1000, timeout: 5000 }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, [trees]);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const dLat = Math.abs(lat1 - lat2);
    const dLon = Math.abs(lon1 - lon2);
    return Math.round(Math.sqrt(dLat * dLat + dLon * dLon) * 111320); // Meters
  };

  const showNeuralTip = (msg: string) => {
    if (tipTimeoutRef.current) clearTimeout(tipTimeoutRef.current);
    setNeuralTip(msg);
    tipTimeoutRef.current = window.setTimeout(() => setNeuralTip(null), 8000);
  };

  const triggerEnvironmentalCheck = async (lat: number, lng: number) => {
    const now = Date.now();
    // Only check every 5 minutes or if moved significantly (500m)
    const hasMovedSignificantly = !lastAlertCoords.current || calculateDistance(lat, lng, lastAlertCoords.current.lat, lastAlertCoords.current.lng) > 500;
    const isOldData = (now - lastAlertTime.current) > 300000;

    if (hasMovedSignificantly || isOldData) {
      lastAlertTime.current = now;
      lastAlertCoords.current = { lat, lng };
      
      try {
        const data = await getEnvironmentalData(lat, lng);
        if (data.text) {
          // Extract alerts or just show the summary if no explicit "ALERTS" section is found
          const alertMatch = data.text.match(/ALERTS:?\s*([\s\S]*?)(?=\n\n|\n#|$)/i);
          const alertText = alertMatch ? alertMatch[1].trim() : data.text.substring(0, 150) + "...";
          showNeuralTip(`ECO-SYNC: ${alertText}`);
        }
      } catch (e) {
        console.error("Environmental sync failed", e);
      }
    }
  };

  const checkProximity = (lat: number, lng: number) => {
    // Check for thirsty trees
    const nearbyThirsty = trees.find(t => t.status !== 'healthy' && calculateDistance(lat, lng, t.lat, t.lng) < 50);
    if (nearbyThirsty) {
      showNeuralTip(`ALERT: ${nearbyThirsty.name} is within 50m and requires immediate hydration!`);
      return;
    }

    // Generic walking tips
    const tips = [
      "TIP: Urban heat islands are ideal for new native saplings.",
      "TIP: Walk toward lower canopy density zones to maximize XP.",
      "MESH ALERT: High biodiversity potential detected in this sector.",
      "GUARDIAN TIP: Verification scans are most accurate in direct sunlight."
    ];
    if (Math.random() > 0.98) {
      showNeuralTip(tips[Math.floor(Math.random() * tips.length)]);
    }
  };

  const handleAction = (tree: Tree) => {
    if (!location) return;
    const dist = calculateDistance(location.lat, location.lng, tree.lat, tree.lng);
    
    if (dist > 30) {
      alert(`Too far! Move within 30m of ${tree.name} to establish a hydration link. Current distance: ${dist}m.`);
    } else {
      onWater(tree.id);
      setSelectedTree(prev => prev?.id === tree.id ? { ...tree, status: 'healthy' } : prev);
      showNeuralTip(`Mesh Synchronized: ${tree.name} status: HEALTHY.`);
    }
  };

  return (
    <div className="h-full flex flex-col py-6 relative">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Guardian Navigator</h2>
          <p className="text-[10px] text-[#A7D129] font-bold uppercase tracking-widest">{statusText}</p>
        </div>
        <button 
          onClick={() => location && onPlant(location.lat, location.lng)}
          className="bg-[#A7D129] text-[#1a2e18] px-4 py-2 rounded-xl font-bold text-xs accent-glow flex items-center gap-2 active:scale-95 transition-transform"
        >
          <i className="fa-solid fa-plus-circle"></i> Plant Here (10 SC)
        </button>
      </div>

      <div className="flex-1 relative glass-card rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#0a140a] shadow-inner">
        {/* Map Grid Background */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#A7D129 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#A7D129 1px, transparent 1px), linear-gradient(90deg, #A7D129 1px, transparent 1px)', backgroundSize: '80px 80px' }}></div>

        {/* Neural Tip Overlay */}
        {neuralTip && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[85%] z-[60] animate-slideDown">
            <div className="bg-[#1a2e18]/90 backdrop-blur-md border border-[#A7D129]/50 rounded-2xl p-4 flex items-center gap-4 shadow-[0_0_20px_rgba(167,209,41,0.2)]">
               <i className="fa-solid fa-microchip text-[#A7D129] animate-pulse shrink-0"></i>
               <p className="text-[10px] font-bold text-[#A7D129] leading-tight italic uppercase tracking-wider overflow-hidden line-clamp-3">{neuralTip}</p>
            </div>
          </div>
        )}

        {/* Tree Markers */}
        {trees.map(tree => {
          const statusColor = tree.status === 'healthy' ? '#A7D129' : (tree.status === 'thirsty' ? '#fb923c' : '#ef4444');
          const relY = location ? 50 - (tree.lat - location.lat) * 15000 : 50;
          const relX = location ? 50 + (tree.lng - location.lng) * 15000 : 50;

          if (relY < -10 || relY > 110 || relX < -10 || relX > 110) return null;

          return (
            <div 
              key={tree.id}
              onClick={() => setSelectedTree(tree)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-125 z-20 group"
              style={{ top: `${relY}%`, left: `${relX}%` }}
            >
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 border-white/20 shadow-xl transition-colors`}
                style={{ backgroundColor: statusColor }}
              >
                <i className={`fa-solid ${tree.status === 'healthy' ? 'fa-tree' : 'fa-droplet'} text-xs text-[#1a2e18]`}></i>
              </div>
              {tree.status !== 'healthy' && (
                <div className="absolute -inset-3 rounded-full border border-orange-500 animate-ping opacity-20"></div>
              )}
            </div>
          );
        })}

        {/* User Marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
          <div className="relative">
             <div className="w-10 h-10 bg-blue-500 rounded-full shadow-2xl border-4 border-white/40 flex items-center justify-center accent-glow">
                <i className="fa-solid fa-person-walking text-white"></i>
             </div>
             <div className="absolute -inset-4 bg-blue-500 rounded-full animate-pulse opacity-10"></div>
          </div>
        </div>

        {/* Selected Tree Panel */}
        {selectedTree && (
          <div className="absolute bottom-4 left-4 right-4 glass-card p-5 rounded-[2rem] z-40 animate-slideUp border border-white/10 shadow-2xl">
             <div className="flex justify-between items-center mb-3 px-2">
                <h4 className="font-bold text-sm tracking-tight">{selectedTree.name}</h4>
                <button onClick={() => setSelectedTree(null)} className="p-1"><i className="fa-solid fa-xmark text-white/40"></i></button>
             </div>
             <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/50 px-2">
                   <span>Status: <span className={selectedTree.status === 'healthy' ? 'text-[#A7D129]' : 'text-orange-400'}>{selectedTree.status}</span></span>
                   {location && (
                     <span>Dist: {calculateDistance(location.lat, location.lng, selectedTree.lat, selectedTree.lng)}m</span>
                   )}
                </div>
                <button 
                  onClick={() => handleAction(selectedTree)}
                  className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all ${selectedTree.status === 'healthy' ? 'bg-white/5 text-white/20 cursor-not-allowed' : 'bg-blue-500 text-white shadow-lg active:scale-95'}`}
                  disabled={selectedTree.status === 'healthy'}
                >
                  {selectedTree.status === 'healthy' ? 'Ecosystem Validated' : 'Verify Hydration Link'}
                </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapScreen;

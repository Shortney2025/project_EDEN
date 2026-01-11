
import React, { useState, useRef } from 'react';
import { analyzePlantImage } from '../services/geminiService';

interface ScannerProps {
  onScanResult: (result: any) => void;
}

const Scanner: React.FC<ScannerProps> = ({ onScanResult }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [showSafety, setShowSafety] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        processImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async (base64: string) => {
    setIsScanning(true);
    try {
      const result = await analyzePlantImage(base64);
      if (result.type === 'invasive') {
        setShowSafety(true);
      }
      onScanResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="h-full flex flex-col py-8 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Lovel AI Scanner</h2>
        <p className="text-sm text-white/50">Verify Hydration • Detect Invasives • Recyle</p>
      </div>

      <div className="flex-1 glass-card rounded-[2.5rem] relative overflow-hidden flex flex-col items-center justify-center border-2 border-dashed border-white/20">
        {preview ? (
          <img src={preview} alt="Capture" className="w-full h-full object-cover" />
        ) : (
          <div className="text-center p-8">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
              <i className="fa-solid fa-camera-retro text-3xl opacity-20"></i>
            </div>
            <p className="text-sm font-medium text-white/40">Point your lens at a guardian target</p>
          </div>
        )}

        {isScanning && (
          <div className="absolute inset-0 bg-[#1a2e18]/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
            <div className="w-16 h-16 border-4 border-[#A7D129] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-[#A7D129] font-bold tracking-widest animate-pulse">ANALYZING SPECIES...</p>
          </div>
        )}

        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <input 
            type="file" 
            accept="image/*" 
            capture="environment" 
            onChange={handleCapture}
            className="hidden" 
            ref={fileInputRef}
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl accent-glow border-8 border-white/20 active:scale-90 transition-transform"
          >
            <div className="w-14 h-14 bg-[#A7D129] rounded-full flex items-center justify-center">
               <i className="fa-solid fa-circle text-2xl text-[#1a2e18]"></i>
            </div>
          </button>
        </div>
      </div>

      {showSafety && (
        <div className="fixed inset-0 bg-[#1a2e18]/95 z-[60] p-8 flex flex-col justify-center items-center text-center">
          <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-6">
            <i className="fa-solid fa-triangle-exclamation text-3xl text-white animate-bounce"></i>
          </div>
          <h3 className="text-2xl font-bold mb-4">Safety Shield Active</h3>
          <p className="text-white/70 mb-8 leading-relaxed">
            Invasive detected! Handling species like <span className="text-red-400 font-bold uppercase">Knotweed</span> or <span className="text-red-400 font-bold uppercase">Kudzu</span> requires proper protective gear. Avoid skin contact with sap.
          </p>
          <div className="space-y-4 w-full">
            <div className="bg-white/5 p-4 rounded-xl text-left border border-white/10">
              <span className="text-[10px] font-bold text-[#A7D129] uppercase">Pro-Tip</span>
              <p className="text-xs mt-1">Dig deep to remove the entire root system; even a small fragment can regrow.</p>
            </div>
            <button 
              onClick={() => setShowSafety(false)}
              className="w-full bg-[#A7D129] text-[#1a2e18] py-4 rounded-xl font-bold"
            >
              I Understand & Am Prepared
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2">
        <button className="bg-white/5 p-3 rounded-xl flex flex-col items-center">
          <i className="fa-solid fa-droplet text-blue-400 mb-1"></i>
          <span className="text-[10px] uppercase font-bold">Hydrate</span>
        </button>
        <button className="bg-white/5 p-3 rounded-xl flex flex-col items-center">
          <i className="fa-solid fa-skull-crossbones text-red-400 mb-1"></i>
          <span className="text-[10px] uppercase font-bold">Bounty</span>
        </button>
        <button className="bg-white/5 p-3 rounded-xl flex flex-col items-center">
          <i className="fa-solid fa-recycle text-green-400 mb-1"></i>
          <span className="text-[10px] uppercase font-bold">Recycle</span>
        </button>
      </div>
    </div>
  );
};

export default Scanner;

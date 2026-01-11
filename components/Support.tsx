
import React, { useState } from 'react';

const Support: React.FC = () => {
  const [ticketType, setTicketType] = useState<'info' | 'feedback' | 'error'>('info');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call to assign ticket and "send email"
    setTimeout(() => {
      console.log(`Ticket Assigned! Emailing courtney.v.brown2024@gmail.com with:`, {
        from: email,
        type: ticketType,
        content: message
      });
      setIsSubmitting(false);
      setSuccess(true);
      setMessage('');
      setEmail('');
    }, 1500);
  };

  return (
    <div className="py-8 space-y-10 animate-fadeIn overflow-y-auto pb-24 px-2">
      <header className="px-2">
        <h2 className="text-4xl font-black tracking-tight text-white">Biosphere Support</h2>
        <p className="text-sm text-teal-400 mt-1 italic font-medium">Lovel AI™ Portal Control • Rooted in Harmony.</p>
      </header>

      {/* About Section - Stylized */}
      <section>
        <div className="glass-card rounded-[3rem] p-10 border border-red-900/30 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-5">
              <i className="fa-solid fa-eagle text-8xl text-red-700"></i>
           </div>
           <h3 className="text-2xl font-black mb-6 text-red-600 tracking-tight">The Vision: Project Eden</h3>
           <div className="space-y-4 relative z-10">
             <p className="text-base text-teal-50/90 leading-relaxed">
               Founded by <span className="text-white font-black underline decoration-red-700 decoration-2 underline-offset-4">Courtney Virginia Brown</span>, Project Eden is a digital totem to planetary restoration.
             </p>
             <p className="text-sm text-teal-100/60 leading-relaxed italic">
               "We weave Haida cultural wisdom with AI intelligence to build a legacy for Rylan, David, and Lilith. Our hands heal the Earth, guided by Lovel AI™."
             </p>
           </div>
        </div>
      </section>

      {/* Request Info / Ticket Form */}
      <section>
        <div className="glass-card rounded-[3rem] p-8 border border-white/5 shadow-2xl relative">
          <div className="absolute -top-4 -left-4 w-12 h-12 bg-red-700 rounded-2xl flex items-center justify-center shadow-xl shadow-red-900/20">
             <i className="fa-solid fa-feather-pointed text-white text-xl"></i>
          </div>
          <h3 className="text-xl font-black mb-8 px-8 text-white">Dispatch Transmission</h3>
          
          {success ? (
            <div className="bg-red-700/10 border border-red-700/30 p-8 rounded-[2.5rem] text-center animate-bounce">
              <i className="fa-solid fa-dove text-4xl text-teal-400 mb-4"></i>
              <p className="text-lg font-black text-white">Ticket Assigned!</p>
              <p className="text-xs text-teal-100/60 mt-2">A messenger has been sent to courtney.v.brown2024@gmail.com. Verification pending.</p>
              <button 
                onClick={() => setSuccess(false)}
                className="mt-6 text-[10px] uppercase font-black text-red-600 tracking-[0.3em] hover:text-red-500 transition-colors"
              >
                Reset Comm-Link
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex gap-2 p-1 bg-white/5 rounded-full mb-6">
                {(['info', 'feedback', 'error'] as const).map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setTicketType(type)}
                    className={`flex-1 py-3 text-[10px] uppercase font-black tracking-widest rounded-full transition-all duration-500 ${
                      ticketType === type ? 'bg-red-700 text-white shadow-lg' : 'text-white/30 hover:text-white/60'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div>
                <label className="text-[10px] uppercase font-black text-white/30 mb-2 block px-4 tracking-[0.2em]">Guardian Email</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-3xl p-5 text-sm focus:outline-none focus:border-red-700 transition-all placeholder:text-white/10"
                  placeholder="identity@biosphere.net"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-black text-white/30 mb-2 block px-4 tracking-[0.2em]">The Transmission</label>
                <textarea 
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-[2rem] p-5 text-sm focus:outline-none focus:border-red-700 transition-all resize-none placeholder:text-white/10"
                  placeholder={ticketType === 'info' ? "Inquire about reforestation protocols..." : "Log a mesh anomaly or guardian feedback..."}
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-red-700 text-white py-5 rounded-[2rem] font-black uppercase tracking-[0.4em] text-xs shadow-2xl active:scale-95 transition-all disabled:opacity-50 group overflow-hidden relative"
              >
                <span className="relative z-10">{isSubmitting ? 'Syncing...' : 'Dispatch to Courtney V. Brown'}</span>
                <div className="absolute inset-0 bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Donation Reforestation Drive */}
      <section>
        <div className="glass-card rounded-[3rem] p-10 border border-teal-900/30 bg-teal-900/5 relative overflow-hidden group shadow-xl">
           <i className="fa-solid fa-frog absolute -right-4 -bottom-4 text-8xl opacity-10 -rotate-12 group-hover:rotate-0 transition-all duration-1000"></i>
           <h3 className="text-2xl font-black mb-4 text-teal-400">Heal the Sacred Canopy</h3>
           <p className="text-sm text-teal-100/60 mb-8 leading-relaxed">
             Support urban reforestation guided by indigenous ecological knowledge. Every contribution strengthens the planetary mesh.
           </p>
           <div className="grid grid-cols-3 gap-3 mb-6">
              {[10, 25, 50].map(amt => (
                <button 
                  key={amt}
                  className="bg-white/5 border border-white/10 hover:border-teal-400 py-4 rounded-3xl text-sm font-black transition-all hover:bg-teal-900/20"
                >
                  ${amt}
                </button>
              ))}
           </div>
           <button className="w-full bg-teal-600 text-white py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-lg hover:bg-teal-500 transition-all">
              Custom Stewardship
           </button>
        </div>
      </section>

      {/* Philosophy Callout */}
      <section className="text-center px-6 pt-4">
         <div className="w-16 h-1 bg-red-700 mx-auto rounded-full mb-6 opacity-30 shadow-[0_0_10px_#8b0000]"></div>
         <p className="text-[11px] font-bold text-white/30 leading-relaxed uppercase tracking-[0.2em] italic max-w-xs mx-auto">
           "To plant a tree is to believe in a future you will never see. We are the planet's self-awareness."
         </p>
      </section>
    </div>
  );
};

export default Support;

import React, { useState, useRef, useEffect } from 'react';
import { weddingData } from './weddingData';
import { LeftCard } from './components/LeftCard';
import { RightCard } from './components/RightCard';
import { TopBar } from './components/TopBar';
import { SplashEnvelope } from './components/SplashEnvelope';
import { MapModal } from './components/MapModal';
import { RSVPModal } from './components/RSVPModal';
import { GiftBoxModal } from './components/GiftBoxModal';
import { AudioPlayer } from './components/AudioPlayer';
import { AdminRSVPPage } from './components/AdminRSVPPage';
import { FallingPetals } from './components/FallingPetals';

const isAdminRoute = () => {
  const path = window.location.pathname.replace(/\/+$/, '');
  const hash = window.location.hash;
  return path === '/quan-ly-rsvp' || hash === '#/quan-ly-rsvp';
};

export default function App() {
  const [showAdmin, setShowAdmin] = useState(() => isAdminRoute());
  const [showEnvelope, setShowEnvelope] = useState(true);
  const [viewMode, setViewMode] = useState('dual'); // 'dual' | 'mobile'
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);
  const [isGiftBoxOpen, setIsGiftBoxOpen] = useState(false);
  const [couplePhoto, setCouplePhoto] = useState('/couple.jpg');

  const fileInputRef = useRef(null);
  const audioPlayRef = useRef(null);

  useEffect(() => {
    const handleLocationChange = () => setShowAdmin(isAdminRoute());
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  if (showAdmin) {
    return (
      <AdminRSVPPage
        onBackToInvitation={() => {
          window.history.pushState({}, '', '/');
          setShowAdmin(false);
        }}
      />
    );
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCouplePhoto(url);
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden font-sans selection:bg-[#F48FB1] selection:text-white">
      
      {/* Ambient Dreamy Floral Background with Dewdrops */}
      <div className="floral-ambient-bg" />
      <div className="floral-ambient-overlay" />

      {/* Falling Romantic Petals */}
      {!showEnvelope && <FallingPetals />}

      {/* Hidden File Input for Custom Couple Photo */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handlePhotoUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Interactive Splash Envelope */}
      <SplashEnvelope
        isOpen={showEnvelope}
        onOpen={() => {
          setShowEnvelope(false);
          // Auto-play music when user opens the invitation (triggered by user gesture = safe)
          setTimeout(() => {
            if (audioPlayRef.current) audioPlayRef.current();
          }, 500);
        }}
        data={weddingData}
      />

      {/* Main Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        
        {/* Sticky Top Bar */}
        <TopBar
          viewMode={viewMode}
          setViewMode={setViewMode}
          onReopenEnvelope={() => setShowEnvelope(true)}
        />

        {/* Main Stage */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-6 md:py-10 flex flex-col items-center justify-center">
          
          {/* Top Subtitle banner */}
          <div className="w-full max-w-4xl flex items-center justify-between text-white/90 drop-shadow-md text-xs sm:text-sm font-serif px-2 mb-3">
            <span className="tracking-widest">LỄ VU QUY</span>
            <span className="tracking-widest">{weddingData.displayDate}</span>
          </div>

          {/* VIEW MODE: DUAL COLUMN (Exact match to design mockup) */}
          {viewMode === 'dual' ? (
            <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 lg:gap-8 animate-fade-in">
              {/* Left Column */}
              <div className="w-full max-w-[390px]">
                <LeftCard
                  onOpenMap={() => setIsMapOpen(true)}
                  couplePhoto={couplePhoto}
                  onChangePhoto={() => fileInputRef.current?.click()}
                />
              </div>

              {/* Right Column */}
              <div className="w-full max-w-[390px]">
                <RightCard
                  onOpenRSVP={() => setIsRSVPOpen(true)}
                  onOpenGiftBox={() => setIsGiftBoxOpen(true)}
                />
              </div>
            </div>
          ) : (
            /* VIEW MODE: MOBILE PHONE BEZEL */
            <div className="w-full max-w-[420px] bg-black/40 p-2 sm:p-3 rounded-[40px] shadow-2xl border-4 border-white/20 backdrop-blur-md animate-fade-in">
              {/* Speaker / Camera Notch */}
              <div className="w-28 h-4 bg-black/80 rounded-full mx-auto mb-2" />

              {/* Scrollable Feed */}
              <div className="max-h-[82vh] overflow-y-auto rounded-3xl space-y-4 pr-1">
                <LeftCard
                  onOpenMap={() => setIsMapOpen(true)}
                  couplePhoto={couplePhoto}
                  onChangePhoto={() => fileInputRef.current?.click()}
                />
                <RightCard
                  onOpenRSVP={() => setIsRSVPOpen(true)}
                  onOpenGiftBox={() => setIsGiftBoxOpen(true)}
                />
              </div>
            </div>
          )}

          {/* Footer watermark */}
          <div className="w-full max-w-4xl flex items-center justify-between text-white/90 drop-shadow-md text-xs font-serif px-2 mt-4">
            <span className="tracking-wider">{weddingData.groom.shortName} ♥ {weddingData.bride.shortName}</span>
            <span className="tracking-wider">Lễ Vu Quy · Happy Wedding</span>
          </div>

        </main>

        {/* Floating Background Romantic Music Player */}
        <AudioPlayer
          t={{
            topBar: {
              musicOn: 'Bật nhạc',
              musicOff: 'Tắt nhạc'
            }
          }}
          playRef={audioPlayRef}
        />

        {/* Modals */}
        <MapModal
          isOpen={isMapOpen}
          onClose={() => setIsMapOpen(false)}
        />

        <RSVPModal
          isOpen={isRSVPOpen}
          onClose={() => setIsRSVPOpen(false)}
        />

        <GiftBoxModal
          isOpen={isGiftBoxOpen}
          onClose={() => setIsGiftBoxOpen(false)}
          groom={weddingData.groom}
          bride={weddingData.bride}
        />

      </div>
    </div>
  );
}

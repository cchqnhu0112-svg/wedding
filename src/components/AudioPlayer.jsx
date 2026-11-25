import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export const AudioPlayer = ({ t, playRef }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio('/chi-la-thoang-qua.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Expose play trigger to parent (for auto-play on envelope open)
  useEffect(() => {
    if (playRef) {
      playRef.current = () => {
        const audio = audioRef.current;
        if (audio && !isPlaying) {
          audio.play().then(() => {
            setIsPlaying(true);
          }).catch(() => {
            // Autoplay blocked — user will click manually
          });
        }
      };
    }
  }, [isPlaying, playRef]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        onClick={toggleMusic}
        className={`relative flex items-center gap-2 px-3.5 py-2.5 rounded-full shadow-xl border-2 transition-all duration-300 hover:-translate-y-0.5 ${
          isPlaying
            ? 'bg-[#EE6C8D] text-white border-white scale-105 music-pulse-ring'
            : 'bg-white/90 text-[#7A5B64] border-[#E8DEC8] hover:bg-white'
        }`}
        title={isPlaying ? t.topBar.musicOff : t.topBar.musicOn}
      >
        {/* Animated Music Icon */}
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform ${
            isPlaying ? 'animate-spin-slow' : ''
          }`}
        >
          <Music size={15} />
        </div>

        <span className="text-xs font-serif font-medium hidden sm:inline">
          {isPlaying ? t.topBar.musicOff : t.topBar.musicOn}
        </span>

        {isPlaying ? (
          <Volume2 size={16} className="animate-pulse" />
        ) : (
          <VolumeX size={16} />
        )}

        {/* Floating musical note */}
        {isPlaying && (
          <span className="absolute -top-3 -right-1 text-xs animate-bounce">
            🎵
          </span>
        )}
      </button>
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export const AudioPlayer = ({ t }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef(null);
  const timerRef = useRef(null);

  // Synthesize a romantic, gentle music-box / acoustic bell melody
  const startRomanticSynthesizer = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }

      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }

      const ctx = audioContextRef.current;

      // Romantic notes (Pachelbel Canon / Wedding theme inspired in D major: D, F#, A, B, C#)
      const notes = [
        293.66, 369.99, 440.00, 587.33, // D4, F#4, A4, D5
        246.94, 329.63, 392.00, 493.88, // B3, E4, G4, B4
        261.63, 329.63, 392.00, 523.25, // C4, E4, G4, C5
        220.00, 277.18, 329.63, 440.00, // A3, C#4, E4, A4
        293.66, 369.99, 440.00, 587.33
      ];

      let step = 0;
      const playNextNote = () => {
        if (!audioContextRef.current || audioContextRef.current.state !== 'running') return;

        const freq = notes[step % notes.length];
        step++;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Soft sine wave for a gentle music box tone
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Envelope
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 1.25);

        // Schedule next note with a gentle sway
        timerRef.current = setTimeout(playNextNote, 600);
      };

      playNextNote();
    } catch {
      // AudioContext policy
    }
  };

  const stopMusic = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state === 'running') {
      audioContextRef.current.suspend();
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
      setIsPlaying(false);
    } else {
      startRomanticSynthesizer();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      stopMusic();
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        onClick={toggleMusic}
        className={`relative flex items-center gap-2 px-3.5 py-2.5 rounded-full shadow-xl border-2 transition-all duration-300 ${
          isPlaying
            ? 'bg-[#EE6C8D] text-white border-white scale-105'
            : 'bg-white/90 text-[#7A5B64] border-[#E8DEC8] hover:bg-white'
        }`}
        title={isPlaying ? t.topBar.musicOff : t.topBar.musicOn}
      >
        {/* Animated Spinning Vinyl / Music Note */}
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

        {/* Floating animated musical note indicator */}
        {isPlaying && (
          <span className="absolute -top-3 -right-1 text-xs animate-bounce">
            🎵
          </span>
        )}
      </button>
    </div>
  );
};

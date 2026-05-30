import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play, Pause, Sparkles } from "lucide-react";

const SCRIPT = [
  "Hi there! I'm Aprajita. Welcome to my portfolio.",
  "I'm an aspiring AI Engineer and Full Stack Developer passionate about Artificial Intelligence, Machine Learning, and Computer Vision.",
  "I've completed an AICTE internship in MERN Stack Development, where I built full-stack web applications using MongoDB, Express, React, and Node. I also finished a Yuva Machine Learning internship, working hands-on with Python and real-world ML workflows.",
  "My featured projects include a real-time Hand Gesture Recognition system built with Python and OpenCV, and an AI-powered Car Price Prediction model using machine learning regression techniques.",
  "My skill set spans C++, Java, Python, and JavaScript, along with React, Node, and the MERN stack, plus strong foundations in data structures, algorithms, and database systems.",
];

// Animated cartoon avatar of Aprajita with lip-sync + hand gestures
function Avatar({ speaking, mouthOpen }: { speaking: boolean; mouthOpen: number }) {
  // mouthOpen: 0 (closed) .. 1 (wide). Smoothly interpolated via inline style.
  const mh = 2 + mouthOpen * 10; // mouth height
  const mw = 14 + mouthOpen * 4; // mouth width
  return (
    <div className="relative w-28 h-28 flex items-center justify-center">
      {/* Pulsing aura while speaking */}
      <div
        className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
          speaking ? "opacity-100 animate-pulse-glow" : "opacity-40"
        }`}
        style={{ background: "var(--gradient-neon)", filter: "blur(14px)" }}
      />
      <svg
        viewBox="0 0 120 120"
        className="relative w-full h-full drop-shadow-lg"
      >
        <defs>
          <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.72 0.22 250)" />
            <stop offset="100%" stopColor="oklch(0.65 0.27 305)" />
          </linearGradient>
          <linearGradient id="hair" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a2418" />
            <stop offset="100%" stopColor="#1a0f08" />
          </linearGradient>
          <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f5d0b0" />
            <stop offset="100%" stopColor="#e8b890" />
          </linearGradient>
        </defs>

        {/* Background circle */}
        <circle cx="60" cy="60" r="58" fill="url(#bg)" opacity="0.15" />
        <circle cx="60" cy="60" r="56" fill="none" stroke="url(#bg)" strokeWidth="1.5" opacity="0.6" />

        {/* Hair back */}
        <ellipse cx="60" cy="58" rx="30" ry="34" fill="url(#hair)" />

        {/* Face */}
        <ellipse cx="60" cy="62" rx="22" ry="26" fill="url(#skin)" />

        {/* Hair fringe */}
        <path
          d="M38 48 Q50 32 60 38 Q70 32 82 48 Q78 44 70 46 Q60 42 50 46 Q42 44 38 48 Z"
          fill="url(#hair)"
        />

        {/* Eyes */}
        <g>
          <ellipse cx="51" cy="60" rx="2.4" ry={speaking ? 2.6 : 2.4} fill="#1a0f08">
            {!speaking && (
              <animate attributeName="ry" values="2.4;0.3;2.4" dur="4s" repeatCount="indefinite" />
            )}
          </ellipse>
          <ellipse cx="69" cy="60" rx="2.4" ry={speaking ? 2.6 : 2.4} fill="#1a0f08">
            {!speaking && (
              <animate attributeName="ry" values="2.4;0.3;2.4" dur="4s" repeatCount="indefinite" />
            )}
          </ellipse>
          {/* eyebrows */}
          <path d="M46 54 Q51 52 56 54" stroke="#2a1810" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <path d="M64 54 Q69 52 74 54" stroke="#2a1810" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </g>

        {/* Nose */}
        <path d="M60 64 Q58 70 60 72 Q62 70 60 64" fill="#d9a87a" opacity="0.6" />

        {/* Mouth - animates with speech */}
        <g style={{ transition: "all 90ms ease-out" }}>
          <ellipse
            cx="60"
            cy="80"
            rx={mw / 2}
            ry={mh / 2}
            fill="#7a2a2a"
            style={{ transition: "all 90ms ease-out" }}
          />
          {/* teeth hint when open */}
          {mouthOpen > 0.3 && (
            <rect
              x={60 - mw / 2 + 2}
              y={80 - mh / 2 + 0.5}
              width={mw - 4}
              height={1.5}
              fill="#fff"
              opacity="0.85"
            />
          )}
          {/* lips */}
          <path
            d={`M${60 - mw / 2 - 1} 80 Q60 ${80 - mh / 2 - 1} ${60 + mw / 2 + 1} 80`}
            stroke="#a04848"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d={`M${60 - mw / 2 - 1} 80 Q60 ${80 + mh / 2 + 1} ${60 + mw / 2 + 1} 80`}
            stroke="#a04848"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Cheek blush */}
        <circle cx="46" cy="72" r="3" fill="#f0a090" opacity="0.5" />
        <circle cx="74" cy="72" r="3" fill="#f0a090" opacity="0.5" />

        {/* Neck */}
        <rect x="54" y="86" width="12" height="10" fill="url(#skin)" />

        {/* Shoulders / shirt */}
        <path d="M30 110 Q40 96 60 96 Q80 96 90 110 L90 120 L30 120 Z" fill="url(#bg)" />

        {/* Animated waving hand (only while speaking) */}
        {speaking && (
          <g
            style={{
              transformOrigin: "92px 100px",
              animation: "wave 1.2s ease-in-out infinite",
            }}
          >
            <path d="M88 102 Q96 92 102 88" stroke="url(#skin)" strokeWidth="5" strokeLinecap="round" fill="none" />
            <circle cx="103" cy="86" r="4.5" fill="url(#skin)" />
            {/* tiny fingers */}
            <line x1="103" y1="82" x2="104" y2="78" stroke="#d9a87a" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="106" y1="84" x2="108" y2="81" stroke="#d9a87a" strokeWidth="1.2" strokeLinecap="round" />
          </g>
        )}
      </svg>

      <style>{`
        @keyframes wave {
          0%, 100% { transform: rotate(-8deg); }
          50% { transform: rotate(20deg); }
        }
      `}</style>
    </div>
  );
}

export function VoiceAssistant() {
  const [supported, setSupported] = useState(true);
  const [muted, setMuted] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [mouthOpen, setMouthOpen] = useState(0);
  const greetedRef = useRef(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const mouthIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }
    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      voiceRef.current =
        voices.find((v) => /female|samantha|zira|google uk english female|google us english/i.test(v.name)) ||
        voices.find((v) => v.lang?.startsWith("en")) ||
        voices[0] ||
        null;
    };
    pickVoice();
    window.speechSynthesis.onvoiceschanged = pickVoice;
    return () => {
      window.speechSynthesis.cancel();
      if (mouthIntervalRef.current) window.clearInterval(mouthIntervalRef.current);
    };
  }, []);

  // Mouth animation loop - oscillates while speaking to simulate lip sync
  useEffect(() => {
    if (speaking) {
      mouthIntervalRef.current = window.setInterval(() => {
        // Random mouth shape between 0.2 and 1 to mimic phonemes
        setMouthOpen(0.2 + Math.random() * 0.8);
      }, 110);
    } else {
      if (mouthIntervalRef.current) {
        window.clearInterval(mouthIntervalRef.current);
        mouthIntervalRef.current = null;
      }
      setMouthOpen(0);
    }
    return () => {
      if (mouthIntervalRef.current) {
        window.clearInterval(mouthIntervalRef.current);
        mouthIntervalRef.current = null;
      }
    };
  }, [speaking]);

  const speakAll = () => {
    if (!supported || muted) return;
    window.speechSynthesis.cancel();
    setSpeaking(true);
    setOpen(true);
    SCRIPT.forEach((line, idx) => {
      const u = new SpeechSynthesisUtterance(line);
      if (voiceRef.current) u.voice = voiceRef.current;
      u.rate = 1;
      u.pitch = 1.05;
      u.volume = 1;
      u.onstart = () => setCurrentLine(idx);
      // Boundary events give extra lip-sync accuracy per word
      u.onboundary = () => setMouthOpen(0.3 + Math.random() * 0.7);
      if (idx === SCRIPT.length - 1) {
        u.onend = () => setSpeaking(false);
      }
      window.speechSynthesis.speak(u);
    });
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  const toggleMute = () => {
    if (!muted) {
      stop();
      setMuted(true);
    } else {
      setMuted(false);
    }
  };

  useEffect(() => {
    if (!supported) return;
    const trigger = () => {
      if (greetedRef.current || muted) return;
      greetedRef.current = true;
      setTimeout(speakAll, 400);
      window.removeEventListener("pointerdown", trigger);
      window.removeEventListener("keydown", trigger);
      window.removeEventListener("scroll", trigger);
    };
    window.addEventListener("pointerdown", trigger, { once: false });
    window.addEventListener("keydown", trigger, { once: false });
    window.addEventListener("scroll", trigger, { once: false });
    return () => {
      window.removeEventListener("pointerdown", trigger);
      window.removeEventListener("keydown", trigger);
      window.removeEventListener("scroll", trigger);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supported, muted]);

  if (!supported) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
      {open && (
        <div className="glass-card rounded-2xl p-4 max-w-xs w-[20rem] shadow-2xl animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-start gap-3">
            <Avatar speaking={speaking} mouthOpen={mouthOpen} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-[var(--neon-blue)]" />
                <span className="text-xs font-semibold text-gradient">Aprajita</span>
                <button
                  onClick={() => setOpen(false)}
                  className="ml-auto text-muted-foreground hover:text-foreground text-xs"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <p
                key={currentLine}
                className="text-xs text-foreground/90 leading-relaxed min-h-[3rem] animate-in fade-in slide-in-from-bottom-1"
              >
                {SCRIPT[currentLine]}
              </p>
            </div>
          </div>
          <div className="mt-3 flex gap-1">
            {SCRIPT.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all ${
                  i <= currentLine ? "bg-[var(--neon-blue)]" : "bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          onClick={toggleMute}
          className="glass h-11 w-11 rounded-full flex items-center justify-center hover:scale-105 transition"
          aria-label={muted ? "Unmute" : "Mute"}
          title={muted ? "Unmute assistant" : "Mute assistant"}
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-[var(--neon-blue)]" />}
        </button>
        <button
          onClick={speaking ? stop : speakAll}
          className="btn-neon !py-2.5 !px-4 rounded-full animate-pulse-glow"
          aria-label={speaking ? "Stop" : "Play introduction"}
        >
          {speaking ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          <span className="text-xs font-semibold">
            {speaking ? "Speaking..." : "Meet Aprajita"}
          </span>
        </button>
      </div>
    </div>
  );
}

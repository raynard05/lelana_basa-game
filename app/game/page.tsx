"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Volume2, RotateCcw, CheckCircle2, XCircle, Play } from "lucide-react";

// Types for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  onresult: (event: any) => void;
  onerror: (event: any) => void;
  onend: () => void;
}

export default function JavaneseGame() {
  const [gameState, setGameState] = useState<"idle" | "intro" | "listening" | "result">("idle");
  const [transcript, setTranscript] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [npcText, setNpcText] = useState("");
  const [isRecognitionActive, setIsRecognitionActive] = useState(false);

  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fullNpcText = "Tulus, arep lunga lunga nde?, tresna ibumu ojo lali donga";
  const correctAnswer = "inggih badhe tindak lunga";

  useEffect(() => {
    // Initialize Speech Recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = "jv-ID"; // Javanese
      recognitionRef.current.interimResults = false;
      recognitionRef.current.continuous = false;

      recognitionRef.current.onresult = (event: any) => {
        const result = event.results[0][0].transcript.toLowerCase();
        setTranscript(result);
        checkAnswer(result);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsRecognitionActive(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecognitionActive(false);
      };
    }

    // Warm up the voices cache for Web Speech API
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {};
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const getBestLocalVoice = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return null;
    const voices = window.speechSynthesis.getVoices();
    // 1. Look for Javanese/Indonesian local voice
    return (
      voices.find(v => v.lang.toLowerCase().includes("jv") || v.lang.toLowerCase().includes("jw")) ||
      voices.find(v => v.lang.toLowerCase().startsWith("id") && v.name.toLowerCase().includes("natural")) ||
      voices.find(v => v.lang.toLowerCase().startsWith("id") && v.name.toLowerCase().includes("google")) ||
      voices.find(v => v.lang.toLowerCase().startsWith("id")) ||
      null
    );
  };

  const speak = (text: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    // Use our local Next.js API proxy to get Google Javanese (jw) TTS
    // This resolves CORS blocks and 403 Forbidden errors.
    const url = `/api/tts?lang=jw&text=${encodeURIComponent(text)}`;
    const audio = new Audio(url);
    
    // Lower pitch to create a male voice effect (disables pitch preservation so speed changes pitch)
    audio.playbackRate = 0.82; 
    audio.preservesPitch = false;
    (audio as any).webkitPreservesPitch = false;
    
    audioRef.current = audio;
    
    audio.play().catch(err => {
      console.warn("Google Translate TTS playback failed, falling back to Web Speech API:", err);
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Lower pitch for Web Speech API fallback to sound like a male
      utterance.pitch = 0.5;
      utterance.rate = 0.9;
      
      const voice = getBestLocalVoice();
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      } else {
        utterance.lang = "id-ID";
      }
      window.speechSynthesis.speak(utterance);
    });
  };

  const startGame = () => {
    setGameState("intro");
    typeWriter(fullNpcText);
    speak(fullNpcText);
  };

  const typeWriter = (text: string) => {
    let i = 0;
    setNpcText(""); // Reset text

    // Clear any existing intervals if they exist (though unlikely here)
    const interval = setInterval(() => {
      setNpcText((prev) => text.substring(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setTimeout(() => setGameState("listening"), 1000);
      }
    }, 50);
  };

  const startListening = () => {
    if (recognitionRef.current) {
      setTranscript("");
      setIsCorrect(null);
      setIsRecognitionActive(true);
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error("Recognition already started or error:", e);
        setIsRecognitionActive(false);
      }
    } else {
      alert("Browser Anda tidak mendukung Web Speech API.");
    }
  };

  const checkAnswer = (input: string) => {
    // Simple word requirement tracking
    const normalizedInput = input.toLowerCase().trim();

    // Target answer: "inggih badhe tindak lunga"
    const keywords = ["inggih", "badhe", "tindak", "lunga"];

    // Check if input contains the key words
    const matchCount = keywords.filter(word => normalizedInput.includes(word)).length;

    // If it matches enough keywords OR matches the full string closely
    const correct = matchCount >= 3 || normalizedInput.includes("inggih badhe tindak lunga");

    setIsCorrect(correct);
    setGameState("result");
  };

  const resetGame = () => {
    setGameState("idle");
    setTranscript("");
    setIsCorrect(null);
    setNpcText("");
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const options = [
    { id: 'a', text: "inggih badhe tindak lunga", correct: true },
    { id: 'b', text: "iya bu, arep lunga", correct: false },
    { id: 'c', text: "iya bu kula arep lunga", correct: false }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col items-center justify-center p-6 font-sans overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-500/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/batik.png')] bg-repeat" />
      </div>

      <main className="relative z-10 w-full max-w-2xl flex flex-col items-center gap-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-widest mb-2">
            Game Bahasa Jawa
          </div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
            Lelana Basa
          </h1>
          <p className="text-slate-400 font-medium tracking-wide">Babak 1: Pamit Lunga</p>
        </motion.div>

        {/* NPC Section */}
        <div className="relative w-full flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              scale: { duration: 0.5 },
              opacity: { duration: 0.5 }
            }}
            className="relative w-48 h-48 md:w-60 md:h-60 rounded-full border-4 border-amber-500/30 overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.2)] bg-slate-800"
          >
            <img
              src="/npc_tulus.png"
              alt="Tulus"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <AnimatePresence mode="wait">
            {(gameState !== "idle") && (
              <motion.div
                key="dialogue"
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="mt-8 w-full bg-slate-900/60 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl relative"
              >
                {/* Speech Bubble Tail */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-slate-900/60 border-t border-l border-white/10 rotate-45" />

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-amber-500 text-xs font-bold uppercase tracking-widest">Tulus Ngendika</span>
                  </div>
                  <p className="text-2xl md:text-3xl font-serif text-slate-100 leading-relaxed italic">
                    "{npcText}"
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Interaction Area */}
        <div className="w-full min-h-[200px] flex flex-col items-center justify-center">
          {gameState === "idle" && (
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(245,158,11,0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 px-10 py-5 rounded-2xl font-black text-xl transition-all shadow-xl"
            >
              <Play size={24} fill="currentColor" />
              MULAI SINAU
            </motion.button>
          )}

          {gameState === "listening" && (
            <div className="flex flex-col items-center gap-8 w-full">
              {/* Options display */}
              <div className="grid grid-cols-1 gap-3 w-full max-w-md">
                {options.map((opt) => (
                  <div
                    key={opt.id}
                    className="flex items-center gap-4 bg-slate-800/40 border border-white/5 p-4 rounded-xl hover:bg-slate-800/60 transition-all cursor-default"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-500 font-bold uppercase">
                      {opt.id}
                    </div>
                    <span className="text-slate-300 font-medium">{opt.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center gap-4">
                <motion.button
                  animate={{
                    scale: isRecognitionActive ? [1, 1.15, 1] : 1,
                    boxShadow: isRecognitionActive ? ["0 0 0px rgba(245,158,11,0)", "0 0 60px rgba(245,158,11,0.5)", "0 0 0px rgba(245,158,11,0)"] : "0 0 0px rgba(245,158,11,0)"
                  }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  onClick={startListening}
                  disabled={isRecognitionActive}
                  className={`w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${isRecognitionActive
                      ? "bg-amber-500 text-slate-900 scale-110"
                      : "bg-slate-800 hover:bg-slate-700 text-amber-500 border border-white/10"
                    }`}
                >
                  {isRecognitionActive ? <Mic size={40} className="animate-pulse" /> : <Mic size={40} />}
                </motion.button>
                <p className="text-amber-500/80 font-bold tracking-widest text-xs uppercase">
                  {isRecognitionActive ? "NYEMAK SWARA..." : "TAP MIC & MATURA"}
                </p>
              </div>
            </div>
          )}

          {gameState === "result" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-6 w-full"
            >
              <div className={`p-8 rounded-3xl w-full flex flex-col items-center gap-4 ${isCorrect ? "bg-emerald-500/10 border border-emerald-500/30" : "bg-rose-500/10 border border-rose-500/30"
                }`}>
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="text-emerald-500" size={64} />
                    <h2 className="text-3xl font-bold text-emerald-400">Pinter! Bener Banget</h2>
                  </>
                ) : (
                  <>
                    <XCircle className="text-rose-500" size={64} />
                    <h2 className="text-3xl font-bold text-rose-400">Kurang Tepat, Lur</h2>
                  </>
                )}

                <div className="text-center space-y-1">
                  <p className="text-slate-400 text-sm">Sampeyan ngomong:</p>
                  <p className="text-xl font-semibold text-slate-200">"{transcript || "..."}"</p>
                </div>
              </div>

              <button
                onClick={resetGame}
                className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors font-medium"
              >
                <RotateCcw size={20} />
                Baleni Maneh
              </button>
            </motion.div>
          )}
        </div>
      </main>

      {/* Footer Instructions */}
      <div className="absolute bottom-8 text-slate-500 text-xs font-medium uppercase tracking-[0.2em]">
        Speech-to-Text Game • Web Speech API • jv-ID
      </div>
    </div>
  );
}

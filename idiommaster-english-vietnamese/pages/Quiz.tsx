
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CheckCircle, XCircle, ArrowRight, RefreshCw, Trophy, Sparkles, Loader2, Info } from 'lucide-react';
import { IDIOMS } from '../constants';
import { Question, Stats, AIExplanation } from '../types';
import { fetchIdiomExplanation } from '../services/geminiService';

const Quiz: React.FC = () => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [stats, setStats] = useState<Stats>({ correct: 0, total: 0, streak: 0, bestStreak: 0 });
  const [aiExplanation, setAiExplanation] = useState<AIExplanation | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const generateQuestion = useCallback(() => {
    const idiom = IDIOMS[Math.floor(Math.random() * IDIOMS.length)];
    const words = idiom.en.split(' ');
    
    // Improved logic for selecting hidden word
    const candidates = words.map((w, i) => ({ word: w, index: i })).filter(item => {
      const cleanWord = item.word.replace(/[^a-zA-Z]/g, '').toLowerCase();
      return cleanWord.length > 2 && !['the', 'and', 'for', 'with', 'one', 'you', 'was', 'were', 'his', 'her'].includes(cleanWord);
    });

    const target = candidates.length > 0 
      ? candidates[Math.floor(Math.random() * candidates.length)] 
      : { word: words[0], index: 0 };

    const parts = [...words];
    const missingWord = target.word.replace(/[^a-zA-Z0-9’'-]/g, '');
    parts[target.index] = "_____";

    setQuestion({
      original: idiom,
      displayParts: parts,
      missingIndex: target.index,
      answer: missingWord,
    });
    setUserInput('');
    setFeedback(null);
    setAiExplanation(null);
    
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback !== null || !userInput.trim() || !question) return;

    const isCorrect = userInput.trim().toLowerCase() === question.answer.toLowerCase();
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    
    setStats(prev => {
      const newStreak = isCorrect ? prev.streak + 1 : 0;
      return {
        correct: prev.correct + (isCorrect ? 1 : 0),
        total: prev.total + 1,
        streak: newStreak,
        bestStreak: Math.max(prev.bestStreak, newStreak)
      };
    });
  };

  const handleLearnMore = async () => {
    if (!question || aiExplanation) return;
    setLoadingAi(true);
    const result = await fetchIdiomExplanation(question.original.en, question.original.vn);
    setAiExplanation(result);
    setLoadingAi(false);
  };

  const handleNext = () => {
    generateQuestion();
  };

  const handleSkip = () => {
    setStats(prev => ({ ...prev, total: prev.total + 1, streak: 0 }));
    generateQuestion();
  };

  const calculateScore = () => {
    if (stats.total === 0) return "0.0";
    return (10 * (stats.correct / stats.total)).toFixed(1);
  };

  if (!question) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Stats Header */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                <Trophy className="w-5 h-5" />
            </div>
            <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Điểm số</p>
                <div className="flex items-baseline gap-1">
                  <p className="font-bold text-slate-900 text-xl">{calculateScore()}</p>
                  <p className="text-xs text-slate-400">/ 10</p>
                </div>
            </div>
        </div>
        <div className="flex flex-col items-end">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Đúng</p>
            <p className="font-bold text-slate-600">{stats.correct} / {stats.total}</p>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-10 -mt-10 opacity-50"></div>
        
        <div className="relative z-10 space-y-12">
            <div className="space-y-4">
                <span className="bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Nghĩa Tiếng Việt
                </span>
                <h2 className="text-2xl md:text-3xl font-serif italic text-slate-800 leading-snug">
                    "{question.original.vn}"
                </h2>
            </div>

            <div className="space-y-8">
                <div className="text-3xl md:text-4xl font-serif font-bold text-slate-900 leading-relaxed text-center">
                    {question.displayParts.map((part, idx) => (
                        <span key={idx} className="mx-1">
                            {idx === question.missingIndex ? (
                                <span className={`inline-block border-b-4 min-w-[120px] transition-colors ${
                                    feedback === 'correct' ? 'border-green-500 text-green-600' : 
                                    feedback === 'incorrect' ? 'border-red-500 text-red-500' : 'border-indigo-600 text-indigo-600'
                                }`}>
                                    {userInput || "..."}
                                </span>
                            ) : part}
                        </span>
                    ))}
                </div>

                {feedback && (
                    <div className={`flex items-center justify-center gap-2 p-4 rounded-2xl animate-in zoom-in duration-300 ${
                        feedback === 'correct' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}>
                        {feedback === 'correct' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                        <span className="font-bold">{feedback === 'correct' ? "Chính xác!" : "Sai rồi!"}</span>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {feedback === null ? (
                    <div className="flex flex-col md:flex-row gap-3">
                        <input
                            ref={inputRef}
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Nhập từ còn thiếu..."
                            className="flex-1 px-6 py-4 rounded-2xl border-2 border-slate-100 focus:border-indigo-600 outline-none transition-all text-lg font-medium shadow-sm"
                            autoComplete="off"
                        />
                        <button 
                            type="submit"
                            disabled={!userInput.trim()}
                            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg shadow-indigo-200 active:scale-95"
                        >
                            Kiểm tra
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        <button 
                            type="button"
                            onClick={handleNext}
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-5 px-8 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2 text-xl"
                        >
                            Câu tiếp theo <ArrowRight className="w-6 h-6" />
                        </button>
                        
                        {!aiExplanation && (
                            <button
                                type="button"
                                onClick={handleLearnMore}
                                disabled={loadingAi}
                                className="w-full bg-indigo-50 text-indigo-600 font-bold py-4 px-8 rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-100 transition-all disabled:opacity-50"
                            >
                                {loadingAi ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                                {loadingAi ? "Đang tải..." : "Giải thích chi tiết (AI)"}
                            </button>
                        )}
                    </div>
                )}
            </form>

            {aiExplanation && (
                <div className="bg-slate-50 rounded-3xl p-6 space-y-4 border border-slate-100 animate-in slide-in-from-bottom duration-500">
                    <div className="flex items-start gap-3">
                        <div className="bg-white p-2 rounded-xl shadow-sm">
                            <Info className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div className="flex-1 space-y-4">
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-1">Ý nghĩa chi tiết</h4>
                                <p className="text-slate-600 leading-relaxed">{aiExplanation.meaning}</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-1">Nguồn gốc</h4>
                                <p className="text-slate-600 leading-relaxed">{aiExplanation.origin}</p>
                            </div>
                            <div className="bg-indigo-600 text-white p-4 rounded-2xl italic font-serif text-lg">
                                "{aiExplanation.example}"
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-1">Ngữ cảnh Việt Nam</h4>
                                <p className="text-slate-600 leading-relaxed">{aiExplanation.vietnameseContext}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {feedback === null && (
                <div className="flex justify-center">
                    <button 
                        onClick={handleSkip}
                        className="text-slate-400 hover:text-slate-600 text-sm font-medium flex items-center gap-1 transition-colors"
                    >
                        <RefreshCw className="w-3 h-3" /> Bỏ qua câu này
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;

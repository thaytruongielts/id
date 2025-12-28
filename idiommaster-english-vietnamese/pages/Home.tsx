
import React from 'react';
import { Link } from 'react-router-dom';
import { Play, BookOpen, Star, Trophy } from 'lucide-react';
import { IDIOMS } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <header className="space-y-4 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight">
          Master the art of <br />
          <span className="text-indigo-600">English Idioms.</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl">
          Learn 200 essential phrases with Vietnamese translations. Test your knowledge with AI-enhanced quizzes and build your confidence in natural conversation.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-600 rounded-3xl p-8 text-white flex flex-col justify-between shadow-xl shadow-indigo-200">
          <div>
            <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
              <Play className="w-6 h-6 fill-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Start Quiz</h2>
            <p className="text-indigo-100 text-sm mb-6">Test yourself with our fill-in-the-blank challenge based on the idiom library.</p>
          </div>
          <Link to="/quiz" className="bg-white text-indigo-600 font-bold py-3 px-6 rounded-2xl text-center hover:bg-indigo-50 transition-colors">
            Play Now
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 flex flex-col justify-between shadow-sm">
          <div>
            <div className="bg-slate-100 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-slate-600">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-slate-900">Library</h2>
            <p className="text-slate-500 text-sm mb-6">Browse through all {IDIOMS.length} idioms, see their meanings, and learn at your own pace.</p>
          </div>
          <Link to="/library" className="bg-slate-900 text-white font-bold py-3 px-6 rounded-2xl text-center hover:bg-slate-800 transition-colors">
            Browse All
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="flex -space-x-3 mb-4">
                {[1,2,3,4].map(i => (
                    <img key={i} src={`https://picsum.photos/seed/${i}/100`} className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="User" />
                ))}
            </div>
            <div className="flex items-center gap-1 text-yellow-500 mb-2">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
            </div>
            <p className="font-bold text-slate-900">Join 500+ students</p>
            <p className="text-slate-500 text-sm">Learning every single day</p>
        </div>
      </div>

      <section className="bg-white rounded-3xl p-8 border border-slate-200">
        <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
                <Trophy className="w-6 h-6 text-indigo-600" />
                Quick Stats
            </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 text-center">
                <p className="text-2xl font-bold text-slate-900">200</p>
                <p className="text-xs text-slate-500 uppercase font-semibold">Total Idioms</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 text-center">
                <p className="text-2xl font-bold text-slate-900">AI</p>
                <p className="text-xs text-slate-500 uppercase font-semibold">Enabled Learning</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 text-center">
                <p className="text-2xl font-bold text-slate-900">EN-VN</p>
                <p className="text-xs text-slate-500 uppercase font-semibold">Bilingual Support</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 text-center">
                <p className="text-2xl font-bold text-slate-900">Free</p>
                <p className="text-xs text-slate-500 uppercase font-semibold">Always Accessible</p>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

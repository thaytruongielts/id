
import React, { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { IDIOMS } from '../constants';

const Library: React.FC = () => {
  const [search, setSearch] = useState('');
  
  const filteredIdioms = IDIOMS.filter(item => 
    item.en.toLowerCase().includes(search.toLowerCase()) || 
    item.vn.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
            <h1 className="text-3xl font-serif font-bold">Idiom Library</h1>
            <p className="text-slate-500">Browsing {IDIOMS.length} phrases</p>
        </div>
        <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input 
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search phrases..."
                className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 w-full md:w-80 transition-all"
            />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredIdioms.map((idiom) => (
          <div 
            key={idiom.id} 
            className="group bg-white p-6 rounded-3xl border border-slate-200 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50 transition-all cursor-default"
          >
            <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded">#{idiom.id}</span>
                <div className="bg-slate-100 p-2 rounded-xl text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                </div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 font-serif group-hover:text-indigo-600 transition-colors">
                {idiom.en}
            </h3>
            <p className="text-slate-500 text-sm italic leading-relaxed">
                {idiom.vn}
            </p>
          </div>
        ))}

        {filteredIdioms.length === 0 && (
            <div className="col-span-full py-20 text-center">
                <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                    <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">No idioms found</h3>
                <p className="text-slate-500">Try searching for something else</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Library;

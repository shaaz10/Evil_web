import React, { useState } from 'react';
import { Skull, Loader2, UserCircle2, Flame, ScrollText } from 'lucide-react';
import { generateEvilTwin } from './lib/gemini';

function App() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [evilTwin, setEvilTwin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    setLoading(true);
    setError('');
    try {
      const result = await generateEvilTwin(name);
      setEvilTwin(result);
    } catch (err) {
      setError('Failed to generate evil twin. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatEvilTwin = (text: string) => {
    const sections = text.split('\n').filter(line => line.trim());
    const formattedSections = sections.map(section => {
      if (section.includes('Evil Twin Name:')) {
        const [label, ...content] = section.split(':');
        return {
          type: 'name',
          content: content.join(':').trim()
        };
      }
      if (section.includes('Personality:') || section.includes('Personality Traits:')) {
        const [label, ...content] = section.split(':');
        return {
          type: 'personality',
          content: content.join(':').trim()
        };
      }
      if (section.includes('Evil Plan:') || section.includes('Evil Master Plan:')) {
        const [label, ...content] = section.split(':');
        return {
          type: 'plan',
          content: content.join(':').trim()
        };
      }
      return {
        type: 'text',
        content: section.trim()
      };
    });
    return formattedSections;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            Evil Twin Generator <Skull className="w-10 h-10" />
          </h1>
          <p className="text-purple-300 text-lg">Discover your malevolent doppelganger...</p>
        </div>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              className="flex-1 px-4 py-2 rounded-lg bg-purple-950 border border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !name}
              className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Generate'
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="p-4 bg-red-900/50 border border-red-500 rounded-lg mb-8">
            {error}
          </div>
        )}

        {evilTwin && (
          <div className="p-8 bg-purple-950/50 backdrop-blur-sm border border-purple-500 rounded-lg shadow-2xl">
            <div className="space-y-8">
              <div className="flex items-center gap-3 text-xl font-bold text-purple-300">
                <UserCircle2 className="w-6 h-6" />
                <span>Original Name:</span>
                <span className="text-white">{name}</span>
              </div>
              
              {formatEvilTwin(evilTwin).map((section, index) => {
                switch (section.type) {
                  case 'name':
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <Skull className="w-6 h-6 mt-1 text-red-400 flex-shrink-0" />
                        <div>
                          <div className="text-red-400 font-bold mb-2">Evil Twin Name:</div>
                          <div className="text-lg">{section.content}</div>
                        </div>
                      </div>
                    );
                  case 'personality':
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <Flame className="w-6 h-6 mt-1 text-orange-400 flex-shrink-0" />
                        <div>
                          <div className="text-orange-400 font-bold mb-2">Personality Traits:</div>
                          <div className="text-lg">{section.content}</div>
                        </div>
                      </div>
                    );
                  case 'plan':
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <ScrollText className="w-6 h-6 mt-1 text-purple-400 flex-shrink-0" />
                        <div>
                          <div className="text-purple-400 font-bold mb-2">Evil Master Plan:</div>
                          <div className="text-lg">{section.content}</div>
                        </div>
                      </div>
                    );
                  default:
                    return (
                      <div key={index} className="text-lg">
                        {section.content}
                      </div>
                    );
                }
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
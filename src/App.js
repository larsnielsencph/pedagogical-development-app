import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, ArrowLeft } from 'lucide-react';

const weeks = [
  {
    id: 1,
    title: "Introduktion til Low Arousal og Børnesyn",
    theme: "Hvad er Low Arousal? Grundprincipper og værktøjer.",
    exercise: "Skriv ned, hvad du allerede ved om Low Arousal. Hvordan kan du bruge det i din praksis?"
  },
  {
    id: 2,
    title: "Empati og Forståelse i Børnesynet",
    theme: "Hvordan kan du som pædagog forstå og møde børns behov ud fra et empatisk perspektiv?",
    exercise: "Reflekter over en situation, hvor du har haft svært ved at forstå et barns behov. Hvad kunne du have gjort anderledes?"
  },
  {
    id: 3,
    title: "Kropssprog og Nonverbal Kommunikation",
    theme: "Hvordan kommunikerer du med børn gennem dit kropssprog?",
    exercise: "Vær opmærksom på dit kropssprog i løbet af ugen. Hvordan kan du bruge det til at skabe ro og tryghed?"
  },
  {
    id: 4,
    title: "Skabe Tryghed i Udfordrende Situationer",
    theme: "Hvordan skaber du tryghed, når et barn er i en stresset eller udfordrende situation?",
    exercise: "Tænk på en udfordrende situation og reflektér over, hvordan du kunne have mødt barnet med større ro og støtte."
  },
  {
    id: 5,
    title: "Aktiv Lytning og Børns Perspektiv",
    theme: "At lytte aktivt og anerkende børns perspektiver.",
    exercise: "Øv dig på at lytte uden at afbryde i samtaler med børn. Hvordan kan du anerkende deres følelser og behov?"
  },
  {
    id: 6,
    title: "Sprogbrug og Positive Forstærkninger",
    theme: "Hvordan kan du bruge sproget til at berolige og motivere børn?",
    exercise: "Reflekter over dit sprogbrug, når du taler til børn i stressede situationer. Hvordan kan du formulere dig mere støttende?"
  },
  {
    id: 7,
    title: "Forståelse af Adfærdsproblemer ud fra et Børnesyn",
    theme: "Hvordan kan du forstå og håndtere adfærd ud fra børns behov og ikke bare som 'problemadfærd'?",
    exercise: "Tænk på en udfordrende adfærd fra et barn og reflekter over, hvad adfærden måske egentlig signalerer om barnets behov."
  },
  {
    id: 8,
    title: "Rolig Tilstedeværelse og Arousal Regulation",
    theme: "Hvordan kan du regulere din egen arousal for at skabe et roligt og trygt miljø?",
    exercise: "Test forskellige teknikker til at berolige dig selv, fx dyb vejrtrækning. Hvordan påvirker det din tilgang til børnene?"
  },
  {
    id: 9,
    title: "Konflikthåndtering med Low Arousal",
    theme: "Hvordan kan du bruge Low Arousal til at håndtere konflikter uden at eskalere situationen?",
    exercise: "Øv dig på at reagere roligt i en konfliktfyldt situation. Reflekter over, hvad der kunne have gjort en forskel."
  },
  {
    id: 10,
    title: "Tilpasning af Praksis til Børns Behov",
    theme: "Hvordan tilpasser du din praksis til børns individuelle behov og ressourcer?",
    exercise: "Vælg et barn, som du arbejder tæt med. Hvilke specifikke tilpasninger kan du gøre i din praksis for at støtte deres udvikling bedre?"
  }
];

const App = () => {
  const [view, setView] = useState('overview');
  const [weekId, setWeekId] = useState(null);
  const [completed, setCompleted] = useState({});
  const [allNotes, setAllNotes] = useState({});

  useEffect(() => {
    const savedData = localStorage.getItem('appData');
    if (savedData) {
      const { completed, notes } = JSON.parse(savedData);
      setCompleted(completed || {});
      setAllNotes(notes || {});
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('appData', JSON.stringify({
      completed,
      notes: allNotes
    }));
  }, [completed, allNotes]);

  const progress = Math.round(
    (Object.values(completed).filter(Boolean).length / weeks.length) * 100
  );

  if (view === 'detail') {
    const week = weeks.find(w => w.id === weekId);
    if (!week) return null;

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => setView('overview')}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Tilbage til oversigt
          </button>

          <div className="bg-white rounded-lg shadow-lg">
            <div className="bg-purple-100 p-6 rounded-t-lg">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Uge {week.id}</div>
                  <h1 className="text-2xl font-bold text-gray-800">{week.title}</h1>
                </div>
                <button
                  onClick={() => {
                    setCompleted(prev => ({
                      ...prev,
                      [week.id]: !prev[week.id]
                    }));
                  }}
                  className={`p-2 rounded-full ${
                    completed[week.id] 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}
                >
                  <CheckCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <section className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Tema</h2>
                <p className="text-gray-600">{week.theme}</p>
              </section>

              <section className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Øvelse</h2>
                <p className="text-gray-600">{week.exercise}</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Dine noter</h2>
                <textarea
                  value={allNotes[week.id] || ''}
                  onChange={e => {
                    const newNotes = {
                      ...allNotes,
                      [week.id]: e.target.value
                    };
                    setAllNotes(newNotes);
                  }}
                  placeholder="Skriv dine refleksioner her..."
                  className="w-full p-4 border rounded-lg h-48 focus:ring-2 focus:ring-pink-200 focus:border-pink-300 outline-none"
                />
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Pædagogisk Udvikling
          </h1>
          <p className="text-gray-600">
            Low Arousal og det nye børnesyn - 10 ugers forløb
          </p>
        </header>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700 font-medium">Samlet fremgang</span>
            <span className="text-pink-600 font-bold">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-pink-400 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid gap-4">
          {weeks.map(week => (
            <div
              key={week.id}
              onClick={() => {
                setWeekId(week.id);
                setView('detail');
              }}
              className={`
                bg-white rounded-lg shadow-sm border-l-4 
                ${completed[week.id] ? 'border-l-green-500' : 'border-l-pink-300'}
                hover:shadow-md transition-shadow cursor-pointer
              `}
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-gray-500 font-medium">Uge {week.id}</span>
                      <h3 className="text-gray-800 font-semibold">{week.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{week.theme}</p>
                  </div>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      setCompleted(prev => ({
                        ...prev,
                        [week.id]: !prev[week.id]
                      }));
                    }}
                    className={`
                      p-2 rounded-full ml-4 transition-colors
                      ${completed[week.id] 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}
                    `}
                  >
                    <CheckCircle className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;

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
  const [currentView, setCurrentView] = useState('overview');
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [completedWeeks, setCompletedWeeks] = useState({});
  const [notes, setNotes] = useState({});

  useEffect(() => {
    const savedCompleted = localStorage.getItem('completedWeeks');
    const savedNotes = localStorage.getItem('weekNotes');
    
    if (savedCompleted) setCompletedWeeks(JSON.parse(savedCompleted));
    if (savedNotes) setNotes(JSON.parse(savedNotes));
  }, []);

  useEffect(() => {
    localStorage.setItem('completedWeeks', JSON.stringify(completedWeeks));
    localStorage.setItem('weekNotes', JSON.stringify(notes));
  }, [completedWeeks, notes]);

  const progress = Math.round((Object.values(completedWeeks).filter(Boolean).length / weeks.length) * 100);

  const toggleWeekCompleted = (weekId, e) => {
    e?.stopPropagation();
    setCompletedWeeks(prev => ({
      ...prev,
      [weekId]: !prev[weekId]
    }));
    // Naviger automatisk tilbage til oversigten efter markering
    setCurrentView('overview');
  };

  const updateNote = (weekId, note) => {
    setNotes(prev => ({
      ...prev,
      [weekId]: note
    }));
  };

  const Overview = () => (
    <div className="max-w-4xl mx-auto p-6">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Pædagogisk Udvikling
        </h1>
        <p className="text-gray-600">
          Low Arousal og det nye børnesyn - 10 ugers forløb
        </p>
      </header>

      {/* Progress bar */}
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

      {/* Weeks grid */}
      <div className="grid gap-4">
        {weeks.map(week => (
          <div
            key={week.id}
            onClick={() => {
              setSelectedWeek(week);
              setCurrentView('detail');
            }}
            className={`
              bg-white rounded-lg shadow-sm border-l-4 
              ${completedWeeks[week.id] ? 'border-l-green-500' : 'border-l-pink-300'}
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
                  onClick={(e) => toggleWeekCompleted(week.id, e)}
                  className={`
                    p-2 rounded-full ml-4 transition-colors
                    ${completedWeeks[week.id] 
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
  );

  const DetailView = () => {
    if (!selectedWeek) return null;

    return (
      <div className="max-w-4xl mx-auto p-6">
        <button 
          onClick={() => setCurrentView('overview')}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Tilbage til oversigt
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-purple-100 p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 text-sm mb-1">Uge {selectedWeek.id}</p>
                <h1 className="text-2xl font-bold text-gray-800">{selectedWeek.title}</h1>
              </div>
              <button
                onClick={() => toggleWeekCompleted(selectedWeek.id)}
                className={`
                  p-2 rounded-full transition-colors
                  ${completedWeeks[selectedWeek.id] 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}
                `}
              >
                <CheckCircle className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Tema</h2>
              <p className="text-gray-600">{selectedWeek.theme}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Øvelse</h2>
              <p className="text-gray-600">{selectedWeek.exercise}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Dine noter</h2>
              <textarea
                value={notes[selectedWeek.id] || ''}
                onChange={(e) => updateNote(selectedWeek.id, e.target.value)}
                placeholder="Skriv dine refleksioner her..."
                className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-300 outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'overview' ? <Overview /> : <DetailView />}
    </div>
  );
};

export default App;

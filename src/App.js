import React, { useState, useEffect } from 'react';
import { Code, BookOpen, Mail, Github, Linkedin, ChevronDown, Sparkles, Brain, Terminal, Heart, ArrowLeft } from 'lucide-react';

export default function Portfolio() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [showName, setShowName] = useState(false);
  const [showRole, setShowRole] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showContactIcons, setShowContactIcons] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      topic: "The Myth of Sisyphus",
      question: "Is the eternal struggle of Sisyphus a curse or a blessing? Does meaningless repetition destroy the soul or define it?",
      responses: []
    },
    {
      id: 2,
      topic: "Prometheus Unbound",
      question: "Did Prometheus commit hubris by stealing fire, or was it the ultimate act of compassion? Who truly suffered more - the punished or the punisher?",
      responses: []
    },
    {
      id: 3,
      topic: "The Ship of Theseus",
      question: "If all parts are replaced, is it still the same ship? At what point does identity cease and transformation begin?",
      responses: []
    }
  ]);
  const [newResponse, setNewResponse] = useState({});

  useEffect(() => {
    if (currentPage === 'landing') {
      setTimeout(() => setShowName(true), 500);
      setTimeout(() => setShowRole(true), 2000);
      setTimeout(() => setShowButtons(true), 3500);
    }
  }, [currentPage]);

  const navigateToPage = (page) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsTransitioning(false);
      if (page !== 'landing') {
        window.scrollTo(0, 0);
      }
    }, 500);
  };

  const handleAddResponse = (discussionId) => {
    if (newResponse[discussionId]?.trim()) {
      setDiscussions(discussions.map(d => 
        d.id === discussionId 
          ? { ...d, responses: [...d.responses, { text: newResponse[discussionId], timestamp: new Date().toLocaleString() }] }
          : d
      ));
      setNewResponse({ ...newResponse, [discussionId]: '' });
    }
  };

  const skills = [
    { name: 'C++', level: 85, icon: Terminal, color: 'from-cyan-400 to-blue-500' },
    { name: 'Python', level: 90, icon: Code, color: 'from-blue-400 to-cyan-500' },
    { name: 'AI/ML', level: 80, icon: Brain, color: 'from-cyan-500 to-blue-600' }
  ];

  const projects = [
    { title: 'ML Classification Model', tech: ['Python', 'TensorFlow', 'Scikit-learn'], desc: 'Advanced machine learning model for data classification' },
    { title: 'Data Structures Library', tech: ['C++', 'Templates'], desc: 'Custom implementation of advanced data structures' },
    { title: 'Neural Network Framework', tech: ['Python', 'NumPy'], desc: 'Built from scratch neural network implementation' },
    { title: 'Algorithm Visualizer', tech: ['Python', 'Pygame'], desc: 'Interactive tool for visualizing sorting algorithms' }
  ];

  const poems = [
    { title: 'Digital Dreams', preview: 'In circuits deep and code so bright, Where algorithms dance through night...', full: 'In circuits deep and code so bright,\nWhere algorithms dance through night,\nI find a world of ones and zeros,\nWhere logic reigns and reason grows.\n\nThrough silicon valleys, data streams,\nI chase electric, binary dreams.' },
    { title: 'The Algorithm of Life', preview: 'Each line we write, a path we choose, In loops and functions, win or lose...', full: 'Each line we write, a path we choose,\nIn loops and functions, win or lose,\nDebugging errors, fixing flaws,\nSearching for meaning, finding cause.\n\nLife compiles in real-time speed,\nEach decision plants a seed.' },
    { title: 'Binary Hearts', preview: 'Between the ones and zeros flow, Emotions that the machines don\'t know...', full: 'Between the ones and zeros flow,\nEmotions that machines don\'t know,\nA heart that beats in analog time,\nWhile code runs through in paradigm.\n\nWe are the bridge, human and machine,\nDancing between what\'s felt and seen.' }
  ];

  const books = [
    { title: 'The Pragmatic Programmer', author: 'Hunt & Thomas', thoughts: 'A masterclass in software craftsmanship and professional development.' },
    { title: 'Clean Code', author: 'Robert C. Martin', thoughts: 'Essential reading for anyone who cares about code quality and maintainability.' },
    { title: 'Deep Learning', author: 'Goodfellow et al.', thoughts: 'Comprehensive and rigorous treatment of modern AI techniques.' }
  ];

  // Landing Page
  if (currentPage === 'landing') {
    return (
      <div className={`min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/30 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/30 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>

        <div className="text-center z-10 px-6 max-w-4xl">
          {showName && (
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8">
              <span className="block text-cyan-400 mb-2 tracking-wider">Hello, I'm</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 bg-clip-text text-transparent">
                 Santiswarup Nayak
              </span>
            </h1>
          )}

          {showRole && (
            <div className="mb-12">
              <p className="text-2xl sm:text-3xl text-cyan-300 font-mono tracking-widest flex items-center justify-center gap-3 flex-wrap">
                <span className="hover:text-cyan-400 transition-colors cursor-default">Developer</span>
                <span className="text-cyan-500">|</span>
                <span className="hover:text-cyan-400 transition-colors cursor-default">AI Enthusiast</span>
                <span className="text-cyan-500">|</span>
                <span className="hover:text-cyan-400 transition-colors cursor-default">Artist</span>
              </p>
            </div>
          )}

          {showButtons && (
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => navigateToPage('home')}
                className="group relative px-8 py-4 bg-transparent border-2 border-cyan-500 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/30 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative text-cyan-400 font-semibold text-lg tracking-wider">Curious About Me</span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowContactIcons(!showContactIcons)}
                  className="group relative px-8 py-4 bg-transparent border-2 border-purple-500 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/30 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <span className="relative text-purple-400 font-semibold text-lg tracking-wider">Connect With Me</span>
                </button>

                {showContactIcons && (
                  <div className="absolute top-full mt-6 left-1/2 transform -translate-x-1/2 flex gap-6">
                    <a href="https://linkedin.com/in/santiswarup-nayak" target="_blank" rel="noopener noreferrer" className="group">
                      <div className="relative p-4 bg-black border-2 border-blue-500 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50">
                        <div className="absolute inset-0 bg-blue-500/20 blur-xl group-hover:bg-blue-500/40 transition-all duration-300"></div>
                        <Linkedin className="w-8 h-8 text-blue-400 relative z-10" />
                      </div>
                    </a>
                    <a href="mailto:santiswarupnayak1@gmail.com" className="group">
                      <div className="relative p-4 bg-black border-2 border-red-500 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/50">
                        <div className="absolute inset-0 bg-red-500/20 blur-xl group-hover:bg-red-500/40 transition-all duration-300"></div>
                        <Mail className="w-8 h-8 text-red-400 relative z-10" />
                      </div>
                    </a>
                    <a href="https://github.com/swarupasdev" target="_blank" rel="noopener noreferrer" className="group">
                      <div className="relative p-4 bg-black border-2 border-gray-500 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-gray-500/50">
                        <div className="absolute inset-0 bg-gray-500/20 blur-xl group-hover:bg-gray-500/40 transition-all duration-300"></div>
                        <Github className="w-8 h-8 text-gray-400 relative z-10" />
                      </div>
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Selection Page (home)
  if (currentPage === 'home') {
    return (
      <div className={`min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>

        <button
          onClick={() => navigateToPage('landing')}
          className="absolute top-8 left-8 text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 group"
        >
          <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          <span>Back</span>
        </button>

        <div className="text-center z-10 px-6 max-w-5xl">
          <h2 className="text-4xl sm:text-5xl font-bold mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Welcome to My Territory
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <button
              onClick={() => navigateToPage('dev')}
              className="group relative bg-black/50 border-2 border-cyan-500/30 hover:border-cyan-400/70 rounded-2xl p-8 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <Code className="w-16 h-16 text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-cyan-300 mb-3">As Dev</h3>
              <p className="text-gray-400">Explore my technical projects and coding journey</p>
            </button>

            <button
              onClick={() => navigateToPage('poet')}
              className="group relative bg-black/50 border-2 border-red-600/30 hover:border-red-500/70 rounded-2xl p-8 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/30"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" className="mx-auto mb-4 group-hover:scale-110 transition-transform">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09" 
                      fill="#ef4444" stroke="#ef4444" strokeWidth="0.5"/>
                <path d="M12 5.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35" 
                      fill="#ef4444" stroke="#ef4444" strokeWidth="0.5"/>
                <path d="M12 5 L12 12 L10 14 L12 16 L14 18 L12 21.35" 
                      stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 8 L12 10" stroke="#000000" strokeWidth="1" strokeLinecap="round"/>
                <path d="M14 11 L12 13" stroke="#000000" strokeWidth="1" strokeLinecap="round"/>
              </svg>
              {/*<Heart className="w-16 h-16 text-red-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />*/}
              <h3 className="text-2xl font-bold text-red-400 mb-3">As Poet</h3>
              <p className="text-gray-400">Dive into my poetry and creative expressions</p>
            </button>

            <button
              onClick={() => navigateToPage('critic')}
              className="group relative bg-black/50 border-2 border-amber-700/30 hover:border-amber-600/70 rounded-2xl p-8 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-700/0 to-amber-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <span className="w-16 h-16 mx-auto mb-4 text-5xl">🌹</span>
              <h3 className="text-2xl font-bold text-amber-400 mb-3">As Critic</h3>
              <p className="text-gray-400">Join philosophical debates and discussions</p>
            </button> 
             
          </div>
        </div>
      </div>
    );
  }

  // Dev Page
  if (currentPage === 'dev') {
    return (
      <div className={`bg-black text-white min-h-screen transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-50 border-b border-cyan-500/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
            <button
              onClick={() => navigateToPage('home')}
              className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </button>
            <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              As Dev
            </div>
            <div className="w-16"></div>
          </div>
        </nav>

        <section className="min-h-screen flex items-center py-16 sm:py-20 pt-24 relative overflow-hidden bg-gradient-to-br from-black via-slate-950 to-black">
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.5) 2px, transparent 2px), linear-gradient(90deg, rgba(6, 182, 212, 0.5) 2px, transparent 2px)',
            backgroundSize: '100px 100px'
          }}></div>
          
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-cyan-500 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-600 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              TECHNICAL SYSTEMS
            </h2>
            <p className="text-center text-cyan-400/60 mb-12 md:mb-16 font-mono tracking-wider text-sm sm:text-base">// CORE CAPABILITIES LOADED</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
              {skills.map((skill) => {
                const Icon = skill.icon;
                return (
                  <div 
                    key={skill.name}
                    className="group relative bg-black/70 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-cyan-500/30 hover:border-cyan-400/70 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 rounded-xl sm:rounded-2xl transition-opacity duration-500`}></div>
                    
                    <div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-l-2 border-cyan-400"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-r-2 border-cyan-400"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-l-2 border-cyan-400"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 border-b-2 border-r-2 border-cyan-400"></div>
                    
                    <Icon className="w-10 h-10 sm:w-12 sm:h-12 mb-4 text-cyan-400" />
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 font-mono text-cyan-300">{skill.name}</h3>
                    <p className="text-xs text-cyan-400/60 mb-4 font-mono">SKILL_LEVEL: {skill.level}%</p>
                    <div className="w-full bg-slate-900/50 rounded-full h-2.5 sm:h-3 mb-2 overflow-hidden border border-cyan-500/30">
                      <div 
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out relative`}
                        style={{ width: `${skill.level}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-16">
              {['TensorFlow', 'NumPy', 'Pandas', 'STL', 'Git', 'Docker', 'Jupyter', 'VS Code'].map((tech) => (
                <div 
                  key={tech}
                  className="bg-black/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 text-center border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <span className="text-cyan-300 font-mono text-sm sm:text-base relative z-10">{tech}</span>
                </div>
              ))}
            </div>

            <h3 className="text-3xl font-bold text-center mb-8 text-cyan-400 font-mono">DEPLOYED PROJECTS</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div key={project.title} className="bg-black/70 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/30 hover:border-cyan-400/70 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30">
                  <h4 className="text-xl font-bold text-cyan-300 mb-3">{project.title}</h4>
                  <p className="text-gray-400 mb-4">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm border border-cyan-500/30">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Poet Page
  if (currentPage === 'poet') {
    return (
      <div className={`bg-black text-white min-h-screen transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-50 border-b border-red-500/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
            <button
              onClick={() => navigateToPage('home')}
              className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-2 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </button>
            <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
              As Poet
            </div>
            <div className="w-16"></div>
          </div>
        </nav>

        <section className="min-h-screen py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-red-500 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-pink-600 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
              A Broken Heart's Wonderland
            </h2>
            <p className="text-center text-red-400/60 mb-16 italic">Binary Dreams, Human Heartbeats</p>

            <div className="space-y-8">
              {poems.map((poem) => (
                <div key={poem.title} className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 border-2 border-red-500/30 hover:border-red-400/70 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/30">
                  <h3 className="text-2xl font-bold text-red-400 mb-4">{poem.title}</h3>
                  <p className="text-gray-300 whitespace-pre-line leading-relaxed font-serif">{poem.full}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <h3 className="text-3xl font-bold text-red-400 mb-8">Reading List</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {books.map((book) => (
                  <div key={book.title} className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-red-500/30 hover:border-red-400/70 transition-all duration-300">
                    <BookOpen className="w-12 h-12 text-red-400 mx-auto mb-4" />
                    <h4 className="text-lg font-bold text-red-300 mb-2">{book.title}</h4>
                    <p className="text-gray-400 text-sm mb-3">{book.author}</p>
                    <p className="text-gray-300 text-sm italic">{book.thoughts}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Critic Page
  if (currentPage === 'critic') {
    return (
      <div className={`bg-black text-white min-h-screen transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-50 border-b border-amber-500/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
            <button
              onClick={() => navigateToPage('home')}
              className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-2 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </button>
            <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
              As Critic
            </div>
            <div className="w-16"></div>
          </div>
        </nav>

        <section className="min-h-screen py-24 relative overflow-hidden">
                      <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-yellow-600 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
              Spina di Rosula
            </h2>
            <p className="text-center text-amber-400/60 mb-16 italic">Where Ancient wisdom meets Modern Skeptism</p>

            <div className="space-y-8">
              {discussions.map((discussion) => (
                <div key={discussion.id} className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 border-2 border-amber-500/30 hover:border-amber-400/70 transition-all duration-300">
                  <h3 className="text-2xl font-bold text-amber-400 mb-4">{discussion.topic}</h3>
                  <p className="text-gray-300 mb-6 italic">"{discussion.question}"</p>
                  
                  <div className="space-y-4 mb-6">
                    {discussion.responses.map((response, idx) => (
                      <div key={idx} className="bg-amber-500/10 rounded-lg p-4 border-l-4 border-amber-500">
                        <p className="text-gray-200 mb-2">{response.text}</p>
                        <p className="text-amber-400/60 text-sm">{response.timestamp}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newResponse[discussion.id] || ''}
                      onChange={(e) => setNewResponse({ ...newResponse, [discussion.id]: e.target.value })}
                      placeholder="Share your philosophical musings... (be as sardonic or sincere as you wish)"
                      className="flex-1 bg-black/50 border border-amber-500/30 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-amber-400/70 transition-colors"
                    />
                    <button
                      onClick={() => handleAddResponse(discussion.id)}
                      className="px-6 py-3 bg-amber-500/20 border border-amber-500/50 rounded-lg text-amber-400 hover:bg-amber-500/30 hover:border-amber-400/70 transition-all duration-300 font-semibold"
                    >
                      Cast Your Thought into the Void
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return null;
}
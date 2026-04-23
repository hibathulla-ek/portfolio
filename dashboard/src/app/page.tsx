"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  GraduationCap, 
  TrendingUp, 
  StickyNote, 
  Search,
  Bell,
  MoreVertical,
  ChevronRight,
  Flame
} from "lucide-react";

export default function Home() {
  const [greeting, setGreeting] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [activeTab, setActiveTab] = useState<"personal" | "business">("personal");
  const [tasks, setTasks] = useState([
    { id: 1, text: "Work on Thesis Intro", completed: false, category: "College" },
    { id: 2, text: "Master AI Agentic Coding", completed: true, category: "Skills" },
    { id: 3, text: "Review Portfolio Layout", completed: false, category: "Design" },
  ]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    // Dynamic suggestions
    if (activeTab === "personal") {
      if (hour < 10) setSuggestion("The morning is fresh. Focus on your thesis intro today.");
      else if (hour > 20) setSuggestion("Winding down? Review your tasks for tomorrow.");
      else setSuggestion("You're in the flow. How about clearing 2 more tasks?");
    } else {
      setSuggestion("Business mode active. Let's focus on scaling BRIGHTPATH.");
    }
  }, [activeTab]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="flex min-h-screen bg-[var(--background)] text-[var(--foreground)] p-4 md:p-8 lg:p-12 transition-colors duration-500">
      {/* Background Decor */}
      <div className={`fixed top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full blur-[120px] pointer-events-none transition-colors duration-700 ${activeTab === 'personal' ? 'bg-purple-500/10' : 'bg-emerald-500/10'}`} />
      <div className={`fixed bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full blur-[120px] pointer-events-none transition-colors duration-700 ${activeTab === 'personal' ? 'bg-blue-500/10' : 'bg-blue-600/10'}`} />

      <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 relative z-10">
        
        {/* Top Header */}
        <header className="flex justify-between items-center animate-fade-in">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg transition-all duration-500 ${activeTab === 'personal' ? 'bg-gradient-to-tr from-purple-500 to-blue-500' : 'bg-gradient-to-tr from-emerald-500 to-teal-600'}`}>
              H
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">HIBATHULLA</h1>
              <p className="text-xs opacity-50 font-medium">{activeTab === 'personal' ? 'Solo Founder OS' : 'Business Center'}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex glass p-1 rounded-full">
              <button 
                onClick={() => setActiveTab("personal")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeTab === 'personal' ? 'bg-white dark:bg-zinc-800 shadow-sm' : 'opacity-50 hover:opacity-100'}`}
              >
                Personal
              </button>
              <button 
                onClick={() => setActiveTab("business")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeTab === 'business' ? 'bg-white dark:bg-zinc-800 shadow-sm' : 'opacity-50 hover:opacity-100'}`}
              >
                Business
              </button>
            </div>
            <button className="p-2 glass rounded-full hover:bg-white/20 transition-all">
              <Bell size={20} />
            </button>
            <button 
              onClick={() => setActiveTab(activeTab === 'personal' ? 'business' : 'personal')}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-full font-semibold hover:scale-105 transition-all shadow-lg active:scale-95"
            >
              <Plus size={18} />
              <span className="hidden sm:inline text-sm">Add Page</span>
            </button>
          </div>
        </header>

        {/* Hero Greeting */}
        <section className="mt-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            {greeting}, <span className={`text-transparent bg-clip-text transition-all duration-500 ${activeTab === 'personal' ? 'bg-gradient-to-r from-purple-500 to-blue-600' : 'bg-gradient-to-r from-emerald-500 to-teal-600'}`}>Hibathulla</span>
          </h2>
          <p className="mt-3 text-lg md:text-xl font-medium opacity-70 max-w-2xl">
            {suggestion}
          </p>
        </section>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Today's Focus */}
          <div className="glass p-6 rounded-[2rem] flex flex-col gap-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Calendar className={activeTab === 'personal' ? 'text-purple-500' : 'text-emerald-500'} size={20} />
                <h3 className="font-bold text-lg">Today's Focus</h3>
              </div>
              <MoreVertical size={18} className="opacity-40 cursor-pointer" />
            </div>
            <div className="space-y-4">
              {activeTab === 'personal' ? (
                <>
                  <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                    <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">Priority</p>
                    <p className="font-semibold">Complete Thesis Literature Review</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Secondary</p>
                    <p className="font-semibold">Update Business Model Canvas</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">High Impact</p>
                    <p className="font-semibold">Pitch deck review for BRIGHTPATH</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20">
                    <p className="text-xs font-bold text-teal-600 uppercase tracking-wider mb-1">Operations</p>
                    <p className="font-semibold">Email potential partners</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* To-Do List */}
          <div className="glass p-6 rounded-[2rem] flex flex-col gap-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <CheckCircle2 className={activeTab === 'personal' ? 'text-emerald-500' : 'text-teal-500'} size={20} />
                <h3 className="font-bold text-lg">To-Do List</h3>
              </div>
              <Plus size={20} className="opacity-40 cursor-pointer hover:opacity-100 transition-opacity" />
            </div>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div 
                  key={task.id} 
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${task.completed ? 'opacity-40' : 'hover:bg-white/10'}`}
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center border-2 ${task.completed ? 'bg-emerald-500 border-emerald-500' : 'border-current opacity-20'}`}>
                    {task.completed && <CheckCircle2 size={12} className="text-white" />}
                  </div>
                  <span className={`text-sm font-medium ${task.completed ? 'line-through' : ''}`}>{task.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Tracker */}
          <div className="glass p-6 rounded-[2rem] flex flex-col gap-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <TrendingUp className="text-blue-500" size={20} />
                <h3 className="font-bold text-lg">Performance</h3>
              </div>
              <Flame className="text-orange-500" size={20} />
            </div>
            <div className="flex-1 flex flex-col justify-center gap-4">
              <div>
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2 opacity-60">
                  <span>{activeTab === 'personal' ? 'Daily Goal' : 'Sales Target'}</span>
                  <span>75%</span>
                </div>
                <div className="h-2 w-full bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-1000 w-[75%] rounded-full ${activeTab === 'personal' ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gradient-to-r from-emerald-500 to-teal-500'}`} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="text-center p-3 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-2xl font-bold">{activeTab === 'personal' ? '12' : '$2.4k'}</p>
                  <p className="text-[10px] uppercase font-bold opacity-40">{activeTab === 'personal' ? 'Tasks Done' : 'Revenue'}</p>
                </div>
                <div className="text-center p-3 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-2xl font-bold">{activeTab === 'personal' ? '4.2h' : '18'}</p>
                  <p className="text-[10px] uppercase font-bold opacity-40">{activeTab === 'personal' ? 'Focus Time' : 'Leads'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Grid Section */}
          {activeTab === 'personal' ? (
            <>
              {/* College Hub */}
              <div className="glass md:col-span-2 p-6 rounded-[2rem] flex flex-col gap-6 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="text-indigo-500" size={20} />
                    <h3 className="font-bold text-lg">College Hub</h3>
                  </div>
                  <div className="text-xs font-bold px-3 py-1 bg-indigo-500/10 text-indigo-500 rounded-full uppercase">Academic Year 2026</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-500 font-bold">
                      28
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Thesis Submission</h4>
                      <p className="text-xs opacity-50">Due in May 28, 2026</p>
                    </div>
                    <ChevronRight className="ml-auto opacity-20" size={16} />
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500/50 transition-all cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-500 font-bold">
                      15
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Final Exams</h4>
                      <p className="text-xs opacity-50">Starting June 15, 2026</p>
                    </div>
                    <ChevronRight className="ml-auto opacity-20" size={16} />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="glass md:col-span-2 p-6 rounded-[2rem] flex flex-col gap-6 animate-fade-in" style={{ animationDelay: "0.5s" }}>
               <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <StickyNote className="text-emerald-500" size={20} />
                  <h3 className="font-bold text-lg">Business Strategies</h3>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-all">
                  <h4 className="font-bold text-xs uppercase opacity-40 mb-2">Q2 Goal</h4>
                  <p className="text-sm font-semibold italic">"Scale user base by 40% through AI automation."</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-all">
                  <h4 className="font-bold text-xs uppercase opacity-40 mb-2">Core Value</h4>
                  <p className="text-sm font-semibold italic">"Innovation at the intersection of Science & Tech."</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/50 transition-all">
                  <h4 className="font-bold text-xs uppercase opacity-40 mb-2">Founder Note</h4>
                  <p className="text-sm font-semibold italic">"Consistency is the only shortcut."</p>
                </div>
              </div>
            </div>
          )}

          {/* Notes & Reminders */}
          <div className="glass p-6 rounded-[2rem] flex flex-col gap-6 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <StickyNote className={activeTab === 'personal' ? 'text-amber-500' : 'text-emerald-500'} size={20} />
                <h3 className="font-bold text-lg">Notes & Dates</h3>
              </div>
              <Clock size={18} className="opacity-40" />
            </div>
            <div className="space-y-4">
              <div className="group cursor-pointer">
                <p className={`text-xs font-bold mb-1 ${activeTab === 'personal' ? 'text-amber-500' : 'text-emerald-500'}`}>APR 25, 2026</p>
                <p className={`text-sm font-semibold transition-colors ${activeTab === 'personal' ? 'group-hover:text-amber-500' : 'group-hover:text-emerald-500'}`}>
                  {activeTab === 'personal' ? 'Meeting with Supervisor' : 'Investor Sync: Phase 1'}
                </p>
              </div>
              <div className="group cursor-pointer">
                <p className={`text-xs font-bold mb-1 ${activeTab === 'personal' ? 'text-amber-500' : 'text-emerald-500'}`}>MAY 02, 2026</p>
                <p className={`text-sm font-semibold transition-colors ${activeTab === 'personal' ? 'group-hover:text-amber-500' : 'group-hover:text-emerald-500'}`}>
                  {activeTab === 'personal' ? 'Submit business proposal draft' : 'Launch beta feature v2.0'}
                </p>
              </div>
              <button className={`w-full py-2 border-2 border-dashed border-white/10 rounded-xl text-xs font-bold opacity-40 hover:opacity-100 transition-all uppercase ${activeTab === 'personal' ? 'hover:border-amber-500/50' : 'hover:border-emerald-500/50'}`}>
                Add Reminder
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

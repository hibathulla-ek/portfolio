"use client";

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  CheckCircle2, 
  Circle, 
  Calendar, 
  BookOpen, 
  ClipboardList, 
  StickyNote, 
  TrendingUp, 
  Briefcase, 
  User,
  ArrowRight,
  Home
} from "lucide-react";

// --- Types ---
type Task = {
  id: string;
  text: string;
  completed: boolean;
  category: "personal" | "business";
};

type CollegeData = {
  thesisDeadline: string;
  examDates: string;
  pendingCoursework: string;
};

type Note = {
  id: string;
  date: string;
  content: string;
};

export default function Dashboard() {
  // --- State ---
  const [view, setView] = useState<"personal" | "business">("personal");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [collegeData, setCollegeData] = useState<CollegeData>({
    thesisDeadline: "2026-05-15",
    examDates: "May 20 - June 5",
    pendingCoursework: "Advanced UI Design Project"
  });
  const [notes, setNotes] = useState<Note[]>([]);
  const [newTask, setNewTask] = useState("");
  const [newNote, setNewNote] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // --- Persistence ---
  useEffect(() => {
    setIsMounted(true);
    const savedTasks = localStorage.getItem("dashboard_tasks");
    const savedCollege = localStorage.getItem("dashboard_college");
    const savedNotes = localStorage.getItem("dashboard_notes");
    const savedView = localStorage.getItem("dashboard_view") as "personal" | "business";

    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedCollege) setCollegeData(JSON.parse(savedCollege));
    if (savedNotes) setNotes(JSON.parse(savedNotes));
    if (savedView) setView(savedView);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem("dashboard_tasks", JSON.stringify(tasks));
    localStorage.setItem("dashboard_college", JSON.stringify(collegeData));
    localStorage.setItem("dashboard_notes", JSON.stringify(notes));
    localStorage.setItem("dashboard_view", view);
  }, [tasks, collegeData, notes, view, isMounted]);

  // --- Helpers ---
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getSmartSuggestion = () => {
    const today = new Date();
    const thesisDate = new Date(collegeData.thesisDeadline);
    const diffTime = thesisDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0 && diffDays <= 7) {
      return `You have a thesis deadline in ${diffDays} day${diffDays > 1 ? "s" : ""}; perhaps focus on that today?`;
    }
    
    const pendingTasks = tasks.filter(t => !t.completed && t.category === view).length;
    if (pendingTasks > 3) {
      return `You have ${pendingTasks} pending tasks in ${view}. Let's knock out the top 3!`;
    }
    
    return "You're doing great! Keep the momentum going.";
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const task: Task = {
      id: Date.now().toString(),
      text: newTask,
      completed: false,
      category: view
    };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    const note: Note = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric" }),
      content: newNote
    };
    setNotes([note, ...notes]);
    setNewNote("");
  };

  const filteredTasks = tasks.filter(t => t.category === view);
  const dailyFocus = filteredTasks.filter(t => !t.completed).slice(0, 3);

  if (!isMounted) return <div className="min-h-screen bg-[#f8f9fa]" />;

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#0d0d0d] font-sans pb-20">
      {/* --- Top Navigation --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-[#d8d4ca]">
        <div className="flex items-center gap-6">
          <a href="../index.html" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#0047ab] rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
              <Home className="text-white w-4 h-4" />
            </div>
            <span className="font-extrabold uppercase tracking-widest text-xs hidden sm:block">Portal</span>
          </a>
          <div className="h-4 w-[1px] bg-[#d8d4ca]" />
          <span className="font-extrabold uppercase tracking-widest text-xs text-[#575550]">OS / {view}</span>
        </div>
        
        <button 
          onClick={() => setView(view === "personal" ? "business" : "personal")}
          className="flex items-center gap-3 px-4 py-2 rounded-full border border-[#d8d4ca] hover:bg-[#f1f1f1] transition-all group"
          title={`Switch to ${view === "personal" ? "Business" : "Personal"}`}
        >
          <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Toggle {view === "personal" ? "Business" : "Personal"}</span>
          <Plus className={`w-5 h-5 transition-transform duration-500 ${view === "business" ? "rotate-45 text-[#9e461a]" : "text-[#0047ab]"}`} />
        </button>
      </nav>

      <main className="max-w-[1320px] mx-auto px-6 pt-32">
        {/* --- Header Section --- */}
        <section className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
            {getGreeting()}, <span className="text-[#0047ab]">Hibathulla.</span>
          </h1>
          <div className="inline-flex items-center gap-3 bg-[#f1f1f1] px-6 py-3 rounded-full border border-[#d8d4ca]">
            <span className="w-2 h-2 bg-[#9e461a] rounded-full animate-pulse" />
            <p className="text-sm font-semibold text-[#575550]">
              <span className="text-[#0d0d0d]">Smart Suggestion:</span> {getSmartSuggestion()}
            </p>
          </div>
        </section>

        {/* --- Dashboard Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* 1. Today's Focus */}
          <div className="card p-8 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-[#0047ab]" />
              <h3 className="text-xl font-bold">Today's Focus</h3>
            </div>
            <div className="space-y-4">
              {dailyFocus.length > 0 ? dailyFocus.map(task => (
                <div key={task.id} className="flex items-start gap-3 p-4 rounded-2xl bg-[#f8f9fa] border border-[#d8d4ca]/50 group transition-all hover:border-[#0047ab]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0047ab] mt-2" />
                  <p className="font-semibold text-sm leading-relaxed">{task.text}</p>
                </div>
              )) : (
                <p className="text-sm text-[#575550] italic">No active focus items. Add some to-dos below!</p>
              )}
            </div>
          </div>

          {/* 2. College / Academic Tracker */}
          <div className="card p-8 bg-[#0d0d0d] text-white">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3 text-white">
                <BookOpen className="w-5 h-5 text-[#9e461a]" />
                <h3 className="text-xl font-bold">College Admin</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#9e461a]/20 text-[#9e461a] text-[10px] font-bold uppercase tracking-widest">Priority</span>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#575550] font-bold block mb-2">Thesis Deadline</label>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-[#9e461a]" />
                  <span className="text-lg font-bold">{new Date(collegeData.thesisDeadline).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#575550] font-bold block mb-2">Upcoming Exams</label>
                <div className="flex items-center gap-3">
                  <ClipboardList className="w-4 h-4 text-[#9e461a]" />
                  <span className="text-lg font-bold">{collegeData.examDates}</span>
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-[#575550] font-bold block mb-2">Pending Coursework</label>
                <div className="flex items-center gap-3">
                  <ArrowRight className="w-4 h-4 text-[#9e461a]" />
                  <span className="text-lg font-bold">{collegeData.pendingCoursework}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Performance Tracker */}
          <div className="card p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-[#0047ab]" />
                <h3 className="text-xl font-bold">Performance</h3>
              </div>
              <span className="text-xs font-bold text-[#575550]">Last 7 Days</span>
            </div>
            
            {/* Simple Heatmap Mockup */}
            <div className="grid grid-cols-7 gap-2 mb-6">
              {[0.8, 0.4, 1, 0.2, 0.9, 0.6, 0.1].map((val, i) => (
                <div 
                  key={i} 
                  className="aspect-square rounded-md transition-all hover:scale-110 cursor-help"
                  style={{ 
                    backgroundColor: `rgba(0, 71, 171, ${val})`,
                    border: '1px solid var(--line)'
                  }}
                  title={`${Math.round(val * 100)}% completion rate`}
                />
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-xs font-bold text-[#575550] uppercase tracking-tighter">Consistency Score</span>
                <span className="text-2xl font-black text-[#0047ab]">84%</span>
              </div>
              <div className="w-full h-1.5 bg-[#f1f1f1] rounded-full overflow-hidden">
                <div className="h-full bg-[#0047ab] transition-all duration-1000" style={{ width: '84%' }} />
              </div>
            </div>
          </div>

          {/* 4. Notes & Reminders */}
          <div className="card p-8 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <StickyNote className="w-5 h-5 text-[#9e461a]" />
              <h3 className="text-xl font-bold">Notes & Reminders</h3>
            </div>
            
            <form onSubmit={addNote} className="mb-6">
              <input 
                type="text"
                placeholder="Quick note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="w-full bg-[#f8f9fa] border border-[#d8d4ca] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#9e461a] transition-all"
              />
            </form>

            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {notes.map(note => (
                <div key={note.id} className="p-4 rounded-2xl bg-[#f8f9fa] border-l-4 border-[#9e461a]">
                  <span className="text-[10px] font-black text-[#575550] uppercase mb-1 block">{note.date}</span>
                  <p className="text-sm font-semibold leading-relaxed">{note.content}</p>
                </div>
              ))}
              {notes.length === 0 && <p className="text-xs text-[#575550] italic">No notes yet. Capture something important.</p>}
            </div>
          </div>

          {/* 5. To-Do List */}
          <div className="card p-8 md:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0047ab]" />
                <h3 className="text-xl font-bold">{view === "personal" ? "Personal" : "Business"} Tasks</h3>
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-[#f1f1f1] rounded-full text-[#575550]">
                {filteredTasks.filter(t => !t.completed).length} Pending
              </span>
            </div>

            <form onSubmit={addTask} className="mb-8">
              <div className="relative">
                <input 
                  type="text"
                  placeholder={`What needs to be done in ${view}?`}
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  className="w-full bg-white border border-[#d8d4ca] rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#0047ab] shadow-sm transition-all"
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0047ab] text-white rounded-xl flex items-center justify-center hover:bg-[#002d6b] transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredTasks.map(task => (
                <div 
                  key={task.id} 
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                    task.completed 
                    ? "bg-[#f8f9fa] border-transparent opacity-60" 
                    : "bg-white border-[#d8d4ca] hover:border-[#0047ab] hover:shadow-md"
                  }`}
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-[#0047ab]" />
                  ) : (
                    <Circle className="w-5 h-5 text-[#d8d4ca]" />
                  )}
                  <span className={`text-sm font-bold ${task.completed ? "line-through text-[#575550]" : ""}`}>
                    {task.text}
                  </span>
                </div>
              ))}
              {filteredTasks.length === 0 && (
                <div className="col-span-full py-12 text-center">
                  <p className="text-[#575550] text-sm">Everything is clear for now.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>

      {/* --- Footer Status --- */}
      <footer className="fixed bottom-0 left-0 right-0 px-6 py-3 bg-white/80 backdrop-blur-md border-t border-[#d8d4ca] flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-[10px] font-bold uppercase tracking-tighter text-[#575550]">System Online</span>
          </div>
          <div className="h-3 w-[1px] bg-[#d8d4ca]" />
          <span className="text-[10px] font-bold uppercase tracking-tighter text-[#575550]">State: Synced</span>
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#0047ab]">Process OS v1.0.4</span>
      </footer>
    </div>
  );
}

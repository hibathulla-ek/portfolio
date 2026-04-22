"use client";

import React, { useState } from "react";
import { 
  BarChart3, 
  CheckCircle2, 
  Circle, 
  History, 
  Lightbulb, 
  Plus, 
  Rocket, 
  Target, 
  TrendingUp,
  BrainCircuit,
  Lock
} from "lucide-react";

// Types
type BusinessTag = "BrightPath" | "Project X" | "Nexus" | "System";
type TaskStatus = "todo" | "doing" | "done";

interface Task {
  id: string;
  title: string;
  business: BusinessTag;
  status: TaskStatus;
}

interface Decision {
  id: string;
  tag: BusinessTag;
  context: string;
  decision: string;
  why: string;
  reviewDate: string;
}

export default function DashboardPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [morningBig3, setMorningBig3] = useState(["", "", ""]);
  const [priorityProject, setPriorityProject] = useState("");

  const tasks: Task[] = [
    { id: "1", title: "Complete Q4 Financial Audit", business: "BrightPath", status: "todo" },
    { id: "2", title: "Launch V2 Beta to Early Adopters", business: "Project X", status: "doing" },
    { id: "3", title: "Refactor Auth Service", business: "System", status: "done" },
    { id: "4", title: "Scale FB Ads for Course Launch", business: "BrightPath", status: "todo" },
  ];

  const recentDecisions: Decision[] = [
    { 
      id: "d1", 
      tag: "Nexus", 
      context: "Pricing Structure", 
      decision: "Switched to Fixed Fee", 
      why: "Simplify billing overhead and increase LTV", 
      reviewDate: "2024-05-22" 
    }
  ];

  if (!isUnlocked) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background p-6">
        <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="space-y-2 text-center">
            <Lock className="mx-auto h-12 w-12 text-brand-primary opacity-50 mb-4" />
            <h1 className="text-2xl font-semibold tracking-tight">The Morning Gate</h1>
            <p className="text-muted-foreground text-sm font-mono uppercase tracking-widest">Acknowledge to Unlock</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-mono text-zinc-500">WHAT ARE THE 3 OUTCOMES THAT MOVE THE NEEDLE TODAY?</label>
              {morningBig3.map((v, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={`Outcome ${i + 1}`}
                  className="w-full bg-card border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary"
                  onChange={(e) => {
                    const newBig3 = [...morningBig3];
                    newBig3[i] = e.target.value;
                    setMorningBig3(newBig3);
                  }}
                />
              ))}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-zinc-500">WHICH PROJECT IS THE PRIORITY?</label>
              <select 
                className="w-full bg-card border border-border rounded-md px-4 py-3 text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-brand-primary"
                onChange={(e) => setPriorityProject(e.target.value)}
              >
                <option value="">Select Priority Project</option>
                <option value="BrightPath">BrightPath</option>
                <option value="Project X">Project X</option>
                <option value="Nexus">Nexus</option>
              </select>
            </div>

            <button 
              onClick={() => setIsUnlocked(true)}
              className="w-full bg-foreground text-background font-semibold py-3 rounded-md hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              Unlock Dashboard <Rocket className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground font-sans selection:bg-brand-primary/30">
      {/* Portfolio Pulse - Top Status Bar */}
      <nav className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-8">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Total Revenue</span>
              <span className="text-lg font-mono font-bold text-brand-secondary">$124,500</span>
            </div>
            <div className="flex flex-col border-l border-border pl-8">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Active Students</span>
              <span className="text-lg font-mono font-bold">1,402</span>
            </div>
            <div className="flex flex-col border-l border-border pl-8">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Priority Project</span>
              <span className="text-lg font-semibold text-brand-primary">{priorityProject || "None"}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-brand-secondary animate-pulse" />
            <span className="text-xs font-mono text-zinc-400">SYNCED</span>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-12 gap-8">
        
        {/* Left Column: Decision Layer & Strategic Log */}
        <div className="col-span-12 lg:col-span-5 space-y-10">
          
          {/* Section: The Big 3 */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-zinc-400 uppercase font-mono text-xs tracking-widest">
              <Target className="h-4 w-4" />
              <span>The Big 3 Outcomes</span>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              {morningBig3.map((outcome, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="h-6 w-6 rounded border border-zinc-700 flex items-center justify-center group-hover:border-brand-primary transition-colors cursor-pointer">
                    <Circle className="h-3 w-3 text-transparent group-hover:text-brand-primary" />
                  </div>
                  <span className="text-sm font-medium">{outcome || `Awaiting Outcome ${i+1}...`}</span>
                </div>
              ))}
              <div className="pt-4 mt-4 border-t border-border/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-accent/10 rounded-lg">
                    <TrendingUp className="h-4 w-4 text-brand-accent" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono text-zinc-500 uppercase">Daily Growth Action</h4>
                    <p className="text-sm font-semibold">Cold outreach to 10 potential B2B partners</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Founder Brain (Strategic Log) */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-zinc-400 uppercase font-mono text-xs tracking-widest">
                <BrainCircuit className="h-4 w-4" />
                <span>Founder Brain</span>
              </div>
              <button className="p-1 hover:bg-zinc-800 rounded transition-colors">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            
            <div className="space-y-3">
              {recentDecisions.map(d => (
                <div key={d.id} className="bg-card border border-border rounded-xl p-5 hover:border-zinc-700 transition-all cursor-pointer">
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono border border-brand-primary/30 text-brand-primary bg-brand-primary/5">
                      {d.tag}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">AUDIT IN 30 DAYS</span>
                  </div>
                  <h3 className="text-sm font-semibold mb-1">{d.context}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed italic">" {d.decision} "</p>
                  <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase">
                    <History className="h-3 w-3" />
                    <span>Logged 1h ago</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Workload Classification */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-zinc-400 uppercase font-mono text-xs tracking-widest">
              <BarChart3 className="h-4 w-4" />
              <span>Effort Distribution</span>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex h-3 w-full rounded-full overflow-hidden bg-zinc-800 mb-6">
                <div className="h-full bg-brand-primary" style={{ width: '45%' }} title="Growth" />
                <div className="h-full bg-brand-accent" style={{ width: '30%' }} title="Operations" />
                <div className="h-full bg-brand-secondary" style={{ width: '25%' }} title="Systems" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <span className="block text-[10px] font-mono text-zinc-500 uppercase">Growth</span>
                  <span className="text-sm font-bold">45%</span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] font-mono text-zinc-500 uppercase">Ops</span>
                  <span className="text-sm font-bold">30%</span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] font-mono text-zinc-500 uppercase">Systems</span>
                  <span className="text-sm font-bold">25%</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Global Priority Stack */}
        <div className="col-span-12 lg:col-span-7 space-y-10">
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-zinc-400 uppercase font-mono text-xs tracking-widest">
                <Target className="h-4 w-4" />
                <span>Global Priority Stack</span>
              </div>
              <div className="flex items-center gap-4">
                <select className="bg-transparent border-none text-[10px] font-mono text-zinc-500 focus:ring-0 uppercase cursor-pointer">
                  <option>All Projects</option>
                  <option>BrightPath</option>
                  <option>Nexus</option>
                </select>
                <button className="flex items-center gap-2 px-3 py-1 bg-white text-black rounded text-[11px] font-bold hover:opacity-90 transition-all">
                  <Plus className="h-3 w-3" /> NEW COMMAND
                </button>
              </div>
            </div>

            <div className="space-y-0.5">
              {tasks.map(task => (
                <div 
                  key={task.id} 
                  className="group flex items-center gap-4 py-3 px-4 border border-transparent hover:border-border hover:bg-card rounded-lg transition-all cursor-pointer"
                >
                  <div className="mt-0.5">
                    {task.status === 'done' ? (
                      <CheckCircle2 className="h-4 w-4 text-brand-secondary" />
                    ) : (
                      <Circle className={`h-4 w-4 ${task.status === 'doing' ? 'text-brand-primary' : 'text-zinc-600'}`} />
                    )}
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className={`text-sm ${task.status === 'done' ? 'line-through text-zinc-500' : 'text-zinc-200'}`}>
                      {task.title}
                    </span>
                    <span className={`text-[10px] font-mono py-0.5 px-2 rounded-full border ${
                      task.business === 'BrightPath' ? 'border-brand-primary/30 text-brand-primary' : 
                      task.business === 'Project X' ? 'border-brand-accent/30 text-brand-accent' : 
                      'border-zinc-500/30 text-zinc-400'
                    }`}>
                      {task.business}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Audit Loop: Nightly Reflection placeholder */}
          <section className="p-8 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
            <div className="p-4 bg-zinc-900 rounded-full">
              <Lightbulb className="h-8 w-8 text-zinc-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Nightly Audit Pending</h3>
              <p className="text-sm text-zinc-500 max-w-xs mx-auto mt-2">
                Come back at the end of the day to reflect, audit, and auto-generate tomorrow's Big 3.
              </p>
            </div>
            <button className="px-6 py-2 border border-zinc-700 rounded-full text-xs font-mono uppercase tracking-widest hover:bg-zinc-900 transition-all">
              Initiate Audit
            </button>
          </section>
        </div>

      </div>
    </main>
  );
}

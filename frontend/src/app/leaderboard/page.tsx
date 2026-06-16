"use client";

import { Header } from "@/components/Header";
import { useAccount } from "wagmi";
import { useUserReputation } from "@/hooks";
import { formatAddress } from "@/utils/format";

// Mock data for the leaderboard
const TOP_WORKERS = [
  { rank: 1, address: "0x1234...5678", score: 1450, tasksCompleted: 120 },
  { rank: 2, address: "0xABCD...EF01", score: 1200, tasksCompleted: 95 },
  { rank: 3, address: "0x9876...5432", score: 980, tasksCompleted: 78 },
  { rank: 4, address: "0x4567...8901", score: 850, tasksCompleted: 60 },
  { rank: 5, address: "0x2345...6789", score: 720, tasksCompleted: 45 },
];

export default function LeaderboardPage() {
  const { address } = useAccount();
  const { reputation } = useUserReputation(address);

  return (
    <>
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Reputation Leaderboard</h1>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-6">
            The top contributors on the BaseGrid network. High reputation unlocks premium tasks and better rewards.
          </p>
          {address && (
            <div className="inline-block bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-blue-300">
              Your Current Reputation: <span className="font-bold text-white text-xl ml-2">{reputation ? reputation.toString() : "0"}</span>
            </div>
          )}
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-4 gap-4 p-6 border-b border-zinc-800 bg-zinc-950/50 text-sm font-bold text-zinc-400 uppercase tracking-wider">
            <div>Rank</div>
            <div className="col-span-2">Worker Address</div>
            <div className="text-right">Reputation Score</div>
          </div>
          
          <div className="divide-y divide-zinc-800">
            {TOP_WORKERS.length === 0 ? (
              <div className="py-20 text-center">
                <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No workers found</h3>
                <p className="text-zinc-500">There are no top workers to display on the leaderboard yet.</p>
              </div>
            ) : (
              TOP_WORKERS.map((worker) => (
                <div key={worker.rank} className="grid grid-cols-4 gap-4 p-6 items-center hover:bg-zinc-800/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      worker.rank === 1 ? 'bg-yellow-500/20 text-yellow-500' :
                      worker.rank === 2 ? 'bg-zinc-300/20 text-zinc-300' :
                      worker.rank === 3 ? 'bg-amber-600/20 text-amber-600' :
                      'bg-zinc-800 text-zinc-500'
                    }`}>
                      {worker.rank}
                    </span>
                  </div>
                  <div className="col-span-2 flex flex-col gap-1">
                    {/* Task 22: Copy to Clipboard */}
                    <div className="flex items-center gap-2 group/copy cursor-pointer" onClick={() => {
                      navigator.clipboard.writeText(worker.address);
                      alert("Copied " + worker.address);
                    }}>
                      <span className="font-mono text-white" title={worker.address}>{formatAddress(worker.address)}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-zinc-600 group-hover/copy:text-blue-400 transition-colors opacity-0 group-hover/copy:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-xs text-zinc-500">{worker.tasksCompleted} tasks completed</span>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 font-bold border border-blue-500/20">
                      <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                      {worker.score}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}

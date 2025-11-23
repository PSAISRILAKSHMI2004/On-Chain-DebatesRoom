import React, { useState } from 'react';
import { Proposal, ProposalStatus, UserUser, VotingMechanism } from '../types';
import { ShieldCheck, Lock, CheckCircle2, FileJson, AlertCircle } from 'lucide-react';
import { generateMockHash } from '../services/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface VotingModuleProps {
  proposal: Proposal;
  user: UserUser;
  onVote: (proposalId: string, choice: 'yes' | 'no' | 'abstain', amount?: number) => void;
}

export const VotingModule: React.FC<VotingModuleProps> = ({ proposal, user, onVote }) => {
  const [selectedChoice, setSelectedChoice] = useState<'yes' | 'no' | 'abstain' | null>(null);
  const [stakeAmount, setStakeAmount] = useState<number>(0);
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  const handleVote = async () => {
    if (!selectedChoice) return;
    setIsVoting(true);
    
    // Simulate network delay
    setTimeout(() => {
      onVote(proposal.id, selectedChoice, stakeAmount);
      setTxHash(generateMockHash());
      setHasVoted(true);
      setIsVoting(false);
    }, 1500);
  };

  // Chart Data
  const data = [
    { name: 'Yes', value: proposal.stats.yes, color: '#22c55e' },
    { name: 'No', value: proposal.stats.no, color: '#ef4444' },
    { name: 'Abstain', value: proposal.stats.abstain, color: '#94a3b8' },
  ];

  const isDiscussion = proposal.status === ProposalStatus.DISCUSSION;
  const isEnded = proposal.status === ProposalStatus.PASSED || proposal.status === ProposalStatus.REJECTED;

  return (
    <div className="flex flex-col gap-6 rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-700 pb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-green-400" />
          <h3 className="text-lg font-semibold text-white">On-Chain Governance</h3>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs text-slate-400 border border-slate-700">
          <span className="h-2 w-2 rounded-full bg-purple-500"></span>
          Arbitrum Nova
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Left: Results Visualization */}
        <div className="flex flex-col justify-center">
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                  itemStyle={{ color: '#f1f5f9' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle"/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-slate-400">Total Votes Cast</p>
            <p className="text-2xl font-bold text-white">
              {proposal.stats.totalVotes.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Right: Voting Actions */}
        <div className="flex flex-col gap-4">
          {isDiscussion ? (
             <div className="flex h-full flex-col items-center justify-center rounded-lg border border-dashed border-slate-600 bg-slate-900/50 p-6 text-center">
               <Lock className="mb-2 h-8 w-8 text-slate-500" />
               <h4 className="text-base font-medium text-slate-300">Voting Not Started</h4>
               <p className="text-sm text-slate-500">Proposal is currently in the discussion phase. Voting will occur on-chain once finalized.</p>
             </div>
          ) : isEnded ? (
            <div className="flex h-full flex-col items-center justify-center rounded-lg border border-slate-700 bg-slate-900/50 p-6 text-center">
              <CheckCircle2 className="mb-2 h-8 w-8 text-green-500" />
              <h4 className="text-base font-medium text-slate-300">Vote Concluded</h4>
              <p className="text-sm text-slate-500">Outcome: {proposal.status}</p>
              <div className="mt-4 w-full overflow-hidden rounded bg-slate-800 p-2 text-xs text-slate-500 font-mono text-left">
                <p>Final Merkle Root:</p>
                <p className="truncate text-green-400">{proposal.merkleRoot}</p>
              </div>
            </div>
          ) : !user.isConnected ? (
            <div className="flex h-full flex-col items-center justify-center rounded-lg border border-dashed border-slate-600 bg-slate-900/50 p-6 text-center">
              <AlertCircle className="mb-2 h-8 w-8 text-yellow-500" />
              <h4 className="text-base font-medium text-slate-300">Wallet Disconnected</h4>
              <p className="text-sm text-slate-500">Please connect your wallet to participate in the vote.</p>
            </div>
          ) : hasVoted ? (
            <div className="flex h-full flex-col items-center justify-center rounded-lg bg-green-900/20 border border-green-800 p-6 text-center animate-in fade-in zoom-in duration-300">
              <CheckCircle2 className="mb-2 h-10 w-10 text-green-400" />
              <h4 className="text-lg font-bold text-green-400">Vote Committed!</h4>
              <p className="text-sm text-green-200/70 mb-4">Your vote has been hashed and added to the Merkle tree.</p>
              <a href="#" className="text-xs text-blue-400 hover:underline truncate w-full block">
                Tx: {txHash}
              </a>
            </div>
          ) : (
            <>
              <div className="rounded-lg bg-slate-900 p-4 border border-slate-700">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Mechanism</span>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-400">{proposal.mechanism}</span>
                  {proposal.mechanism === VotingMechanism.STAKE_BASED && (
                     <input 
                        type="number" 
                        placeholder="Stake Amt"
                        className="w-24 rounded bg-slate-800 px-2 py-1 text-right text-sm text-white border border-slate-600"
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(Number(e.target.value))}
                     />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {(['yes', 'no', 'abstain'] as const).map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedChoice(option)}
                    className={`rounded-lg border px-4 py-3 text-sm font-bold capitalize transition-all ${
                      selectedChoice === option
                        ? option === 'yes' ? 'border-green-500 bg-green-500/20 text-green-400' :
                          option === 'no' ? 'border-red-500 bg-red-500/20 text-red-400' :
                          'border-slate-500 bg-slate-500/20 text-slate-400'
                        : 'border-slate-700 bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <button
                disabled={!selectedChoice || isVoting || (proposal.mechanism === VotingMechanism.STAKE_BASED && stakeAmount <= 0)}
                onClick={handleVote}
                className="mt-auto w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 py-3 text-sm font-bold text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-900/20 transition-all"
              >
                {isVoting ? 'Signing Transaction...' : 'Cast Vote on Nova'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Merkle Proof Footer */}
      <div className="mt-2 rounded bg-slate-900 p-3 border border-slate-800 flex items-center gap-4 overflow-hidden">
         <FileJson className="h-8 w-8 text-slate-600 flex-shrink-0" />
         <div className="flex-1 min-w-0">
            <p className="text-xs text-slate-500 font-mono uppercase">Current State Root (Merkle)</p>
            <p className="font-mono text-xs text-slate-400 truncate">
              {hasVoted ? generateMockHash() : proposal.merkleRoot}
            </p>
         </div>
         <div className="hidden md:block text-right">
           <p className="text-[10px] text-slate-600">Block #49201231</p>
           <p className="text-[10px] text-green-500">Verified</p>
         </div>
      </div>
    </div>
  );
};
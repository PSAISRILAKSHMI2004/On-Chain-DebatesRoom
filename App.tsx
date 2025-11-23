import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ProposalList } from './components/ProposalList';
import { DiscussionSection } from './components/DiscussionSection';
import { VotingModule } from './components/VotingModule';
import { MOCK_PROPOSALS } from './services/mockData';
import { Proposal, UserUser, Comment } from './types';
import { ArrowLeft, Info } from 'lucide-react';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserUser>({
    address: '',
    isConnected: false,
    balance: 0,
  });

  const [activeProposal, setActiveProposal] = useState<Proposal | null>(null);
  const [proposals, setProposals] = useState<Proposal[]>(MOCK_PROPOSALS);

  const handleConnect = () => {
    // Simulate connection
    if (currentUser.isConnected) {
      setCurrentUser({ address: '', isConnected: false, balance: 0 });
    } else {
      setCurrentUser({
        address: '0x71C7656EC7ab88b098defB751B7401B5f6d89A21',
        isConnected: true,
        balance: 1500,
      });
    }
  };

  const handleAddComment = (text: string) => {
    if (!activeProposal || !currentUser.isConnected) return;

    const newComment: Comment = {
      id: `c${Date.now()}`,
      author: currentUser.address.substring(0, 8), // simplified name
      text: text,
      timestamp: 'Just now',
      likes: 0
    };

    const updatedProposal = {
      ...activeProposal,
      discussionThread: [newComment, ...activeProposal.discussionThread]
    };

    setActiveProposal(updatedProposal);
    setProposals(proposals.map(p => p.id === updatedProposal.id ? updatedProposal : p));
  };

  const handleVote = (proposalId: string, choice: 'yes' | 'no' | 'abstain', amount?: number) => {
    if (!activeProposal) return;

    // Update local stats for UI feedback
    const updatedStats = { ...activeProposal.stats };
    updatedStats[choice] += amount || 1; // Simplistic weighting logic
    updatedStats.totalVotes += amount || 1;

    const updatedProposal = {
      ...activeProposal,
      stats: updatedStats
    };

    setActiveProposal(updatedProposal);
    setProposals(proposals.map(p => p.id === updatedProposal.id ? updatedProposal : p));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans pb-12">
      <Navbar 
        user={currentUser} 
        onConnect={handleConnect} 
        onHome={() => setActiveProposal(null)}
      />

      <main className="container mx-auto px-4 pt-8">
        {!activeProposal ? (
          <div className="space-y-8 animate-in fade-in duration-500">
            <header className="mb-10 text-center">
              <h1 className="mb-3 text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                Community Governance
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-slate-400">
                Debate off-chain, vote on-chain. A hybrid governance platform secured by Arbitrum Nova.
              </p>
            </header>

            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-xl font-semibold text-white">Active Proposals</h2>
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-green-500"></span>
                <span className="text-xs text-slate-400">Voting Active</span>
                <span className="ml-2 h-3 w-3 rounded-full bg-blue-500"></span>
                <span className="text-xs text-slate-400">Discussion Phase</span>
              </div>
            </div>

            <ProposalList 
              proposals={proposals} 
              onSelect={setActiveProposal} 
            />
          </div>
        ) : (
          <div className="animate-in slide-in-from-right-10 duration-300">
            <button 
              onClick={() => setActiveProposal(null)}
              className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Proposals
            </button>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              
              {/* Main Content Column */}
              <div className="lg:col-span-7 space-y-8">
                {/* Header Info */}
                <div className="space-y-4">
                   <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-mono text-slate-400 border border-slate-700">
                      {activeProposal.id}
                    </span>
                    <span className="rounded-full bg-blue-900/30 px-3 py-1 text-xs text-blue-400 border border-blue-800">
                      {activeProposal.mechanism}
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold text-white leading-tight">
                    {activeProposal.title}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span>By <span className="text-slate-300">{activeProposal.author}</span></span>
                    <span>•</span>
                    <span>{activeProposal.createdAt}</span>
                  </div>
                  <div className="prose prose-invert max-w-none rounded-xl bg-slate-800/50 p-6 border border-slate-800">
                    <p>{activeProposal.description}</p>
                  </div>
                </div>

                {/* Discussion Thread */}
                <DiscussionSection 
                  comments={activeProposal.discussionThread}
                  user={currentUser}
                  onAddComment={handleAddComment}
                />
              </div>

              {/* Sidebar / Voting Column */}
              <div className="lg:col-span-5 space-y-6">
                 <div className="rounded-lg bg-blue-900/10 border border-blue-800/50 p-4 flex gap-3">
                    <Info className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-300 space-y-1">
                      <p className="font-semibold text-blue-300">Hybrid Architecture</p>
                      <p>Discussions are stored on IPFS to save gas. Only final vote commitments and Merkle roots are stored on the Arbitrum Nova contract.</p>
                    </div>
                 </div>

                <VotingModule 
                  proposal={activeProposal}
                  user={currentUser}
                  onVote={handleVote}
                />
              </div>

            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
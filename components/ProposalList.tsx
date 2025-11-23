import React from 'react';
import { Proposal, ProposalStatus } from '../types';
import { MessageCircle, Clock, Users, ArrowRight } from 'lucide-react';

interface ProposalListProps {
  proposals: Proposal[];
  onSelect: (proposal: Proposal) => void;
}

export const ProposalList: React.FC<ProposalListProps> = ({ proposals, onSelect }) => {
  const getStatusColor = (status: ProposalStatus) => {
    switch (status) {
      case ProposalStatus.VOTING: return 'bg-green-500/10 text-green-400 border-green-500/20';
      case ProposalStatus.DISCUSSION: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default: return 'bg-slate-700/50 text-slate-400 border-slate-600/50';
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {proposals.map((proposal) => (
        <div 
          key={proposal.id}
          onClick={() => onSelect(proposal)}
          className="group relative flex flex-col justify-between rounded-xl border border-slate-700 bg-slate-800 p-6 transition-all hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-900/10 cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium border ${getStatusColor(proposal.status)}`}>
                {proposal.status}
              </span>
              <span className="text-xs text-slate-500 font-mono">{proposal.id}</span>
            </div>
            
            <h3 className="mb-2 text-lg font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
              {proposal.title}
            </h3>
            <p className="mb-4 text-sm text-slate-400 line-clamp-3">
              {proposal.description}
            </p>
          </div>

          <div className="mt-4 border-t border-slate-700 pt-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {proposal.mechanism.split(' ')[0]}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {proposal.deadline}
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-3 w-3" />
                {proposal.discussionThread.length}
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-6 right-6 opacity-0 transition-opacity group-hover:opacity-100">
            <ArrowRight className="h-5 w-5 text-blue-400" />
          </div>
        </div>
      ))}
    </div>
  );
};
export enum VotingMechanism {
  ONE_PERSON_ONE_VOTE = 'One Person One Vote (SBT)',
  TOKEN_WEIGHTED = 'Token Weighted',
  STAKE_BASED = 'Stake Based',
}

export enum ProposalStatus {
  DISCUSSION = 'Discussion',
  VOTING = 'Voting',
  PASSED = 'Passed',
  REJECTED = 'Rejected',
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
  likes: number;
}

export interface VoteStats {
  yes: number;
  no: number;
  abstain: number;
  totalVotes: number;
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  author: string;
  status: ProposalStatus;
  mechanism: VotingMechanism;
  createdAt: string;
  deadline: string;
  merkleRoot: string; // Represents the on-chain state
  contractAddress: string;
  discussionThread: Comment[];
  stats: VoteStats;
}

export interface UserUser {
  address: string;
  isConnected: boolean;
  balance: number;
  sbtId?: string;
  stakedAmount?: number;
}
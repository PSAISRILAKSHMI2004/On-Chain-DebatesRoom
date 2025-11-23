import { Proposal, ProposalStatus, VotingMechanism } from '../types';

export const MOCK_PROPOSALS: Proposal[] = [
  {
    id: 'PROP-1042',
    title: 'Arbitrum Nova Infrastructure Fund Q3',
    description: 'Proposal to allocate 50,000 tokens from the community treasury to subsidize RPC node providers on Arbitrum Nova. This aims to improve network resilience during high-traffic social app events.',
    author: '0x71C...9A21',
    status: ProposalStatus.VOTING,
    mechanism: VotingMechanism.TOKEN_WEIGHTED,
    createdAt: '2023-10-24',
    deadline: '2023-10-31',
    merkleRoot: '0x4a2f...9e1b',
    contractAddress: '0xNova...Vote1',
    discussionThread: [
      {
        id: 'c1',
        author: 'ValidatorOne',
        text: 'I support this. The latency has been an issue during the last gaming tournament.',
        timestamp: '2 hours ago',
        likes: 12
      },
      {
        id: 'c2',
        author: 'DeFiUser_99',
        text: 'Is 50k too much? Maybe we start with 25k and assess performance?',
        timestamp: '45 mins ago',
        likes: 5
      }
    ],
    stats: {
      yes: 125000,
      no: 45000,
      abstain: 10000,
      totalVotes: 156
    }
  },
  {
    id: 'PROP-1043',
    title: 'Implement Sybil Resistance via Soulbound Tokens',
    description: 'Transition the governance model for "Community Grants" to a strict One-Person-One-Vote system using the new NovaID Soulbound Token standard.',
    author: 'dao_architect.eth',
    status: ProposalStatus.DISCUSSION,
    mechanism: VotingMechanism.ONE_PERSON_ONE_VOTE,
    createdAt: '2023-10-26',
    deadline: 'TBD',
    merkleRoot: '0x0000...0000',
    contractAddress: '0xNova...Gov2',
    discussionThread: [
      {
        id: 'c3',
        author: 'AnonVoter',
        text: 'This is crucial for fairness. Whales have too much sway currently.',
        timestamp: '1 day ago',
        likes: 34
      },
      {
        id: 'c4',
        author: 'WhaleShark',
        text: 'Governance should reflect risk. Token holders take the financial risk.',
        timestamp: '5 hours ago',
        likes: 8
      }
    ],
    stats: {
      yes: 0,
      no: 0,
      abstain: 0,
      totalVotes: 0
    }
  },
  {
    id: 'PROP-1040',
    title: 'New Moderator Election: Autumn Epoch',
    description: 'Electing 3 new moderators for the off-chain forum. Voting requires staking at least 100 GOV tokens for the duration of the epoch.',
    author: 'SystemAdmin',
    status: ProposalStatus.PASSED,
    mechanism: VotingMechanism.STAKE_BASED,
    createdAt: '2023-10-01',
    deadline: '2023-10-15',
    merkleRoot: '0x9f8d...2c3a',
    contractAddress: '0xNova...Stake',
    discussionThread: [],
    stats: {
      yes: 890,
      no: 120,
      abstain: 50,
      totalVotes: 1060
    }
  }
];

export const generateMockHash = (): string => {
  const chars = '0123456789abcdef';
  let hash = '0x';
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * 16)];
  }
  return hash;
};
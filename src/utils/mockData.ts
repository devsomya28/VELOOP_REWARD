import { LeaderboardUser, AdCampaign, SocialChannel, HelpArticle } from '../types';

export const INITIAL_LEADERBOARD_USERS: LeaderboardUser[] = [
  {
    rank: 1,
    username: 'User A (Meridian Alpha)',
    avatarSeed: 'alpha',
    ves: 12450,
    xp: 48900,
    tier: 'VIP Institutional',
    change: 'up',
    prizeReward: '20,000 VEs'
  },
  {
    rank: 2,
    username: 'User B (Valence Custody)',
    avatarSeed: 'valence',
    ves: 11820,
    xp: 44200,
    tier: 'VIP Institutional',
    change: 'up',
    prizeReward: '12,500 VEs'
  },
  {
    rank: 3,
    username: 'User C (Chronos Yield)',
    avatarSeed: 'chronos',
    ves: 10970,
    xp: 39800,
    tier: 'VIP Institutional',
    change: 'down',
    prizeReward: '7,500 VEs'
  },
  {
    rank: 4,
    username: 'Nexus Trading Desk',
    avatarSeed: 'nexus',
    ves: 9850,
    xp: 35100,
    tier: 'Tier 1 Prime',
    change: 'up',
    prizeReward: '2,500 VEs'
  },
  {
    rank: 5,
    username: 'Aether Capital Mgmt',
    avatarSeed: 'aether',
    ves: 9420,
    xp: 33400,
    tier: 'Tier 1 Prime',
    change: 'same',
    prizeReward: '2,000 VEs'
  },
  {
    rank: 6,
    username: 'Solstice Syndicate',
    avatarSeed: 'solstice',
    ves: 8900,
    xp: 31200,
    tier: 'Tier 1 Prime',
    change: 'down',
    prizeReward: '1,500 VEs'
  },
  {
    rank: 7,
    username: 'Kryptos Liquid Pool',
    avatarSeed: 'kryptos',
    ves: 8430,
    xp: 29500,
    tier: 'Tier 2 Partner',
    change: 'up',
    prizeReward: '1,000 VEs'
  },
  {
    rank: 8,
    username: 'Vertex Sovereign Desk',
    avatarSeed: 'vertex',
    ves: 7920,
    xp: 27800,
    tier: 'Tier 2 Partner',
    change: 'same',
    prizeReward: '1,000 VEs'
  },
  {
    rank: 9,
    username: 'Hyperion Asset Vault',
    avatarSeed: 'hyperion',
    ves: 7410,
    xp: 25400,
    tier: 'Tier 2 Partner',
    change: 'down',
    prizeReward: '1,000 VEs'
  },
  {
    rank: 10,
    username: 'Orion Macro Hedge',
    avatarSeed: 'orion',
    ves: 7100,
    xp: 24100,
    tier: 'Tier 2 Partner',
    change: 'up',
    prizeReward: '1,000 VEs'
  }
];

export const AVAILABLE_ADS: AdCampaign[] = [
  {
    id: 'ad-1',
    title: 'Institutional Crypto Custody & Settlement',
    sponsor: 'Anchorage Prime',
    durationSeconds: 5,
    rewardVes: 38,
    tag: 'Fintech Tier 1',
    category: 'Institutional Media'
  },
  {
    id: 'ad-2',
    title: 'Automated Real-Time Yield Distribution',
    sponsor: 'VELOOP Liquidity Engine',
    durationSeconds: 6,
    rewardVes: 120,
    tag: 'Core Protocol',
    category: 'Yield & DeFi'
  },
  {
    id: 'ad-3',
    title: 'Cross-Border Instant Treasury Settlement',
    sponsor: 'Circle Financial Desk',
    durationSeconds: 5,
    rewardVes: 45,
    tag: 'Global Rail',
    category: 'Treasury'
  }
];

export const SOCIAL_CHANNELS: SocialChannel[] = [
  {
    id: 'x',
    name: 'X (formerly Twitter)',
    handle: '@velooprewards',
    description: 'Official announcements, reward stage schedules, and weekly prize distribution alerts.',
    membersCount: '24.5K Followers',
    rewardSves: 500,
    actionUrl: '#follow-x',
    joined: true
  },
  {
    id: 'discord',
    name: 'Institutional Discord Guild',
    handle: 'discord.gg/veloop-vip',
    description: 'Direct communication with VELOOP quantitative researchers, VIP ticket priority, and AMA access.',
    membersCount: '14.2K Members',
    rewardSves: 250,
    actionUrl: '#join-discord',
    joined: false
  },
  {
    id: 'telegram',
    name: 'Telegram Broadcast Channel',
    handle: 't.me/veloop_announcements',
    description: 'Real-time telemetry on competition pool refills and emergency network alerts.',
    membersCount: '31.8K Subscribers',
    rewardSves: 150,
    actionUrl: '#join-telegram',
    joined: false
  },
  {
    id: 'youtube',
    name: 'VELOOP Media & Briefings',
    handle: 'youtube.com/@VeloopOfficial',
    description: 'Quarterly institutional briefings, security audit breakdowns, and reward tutorial streams.',
    membersCount: '9.4K Subscribers',
    rewardSves: 200,
    actionUrl: '#subscribe-youtube',
    joined: false
  }
];

export const HELP_ARTICLES: HelpArticle[] = [
  {
    id: 'faq-1',
    category: 'Rewards',
    question: 'How are VE reward tokens calculated and credited?',
    answer: 'VEs (Veloop Ecosystem tokens) are awarded immediately upon verified task completion, ad view confirmation, or leaderboard snapshot finalization. Credits reflect in your balance within seconds.'
  },
  {
    id: 'faq-2',
    category: 'Rewards',
    question: 'Is there a daily limit on Watch & Earn ad views?',
    answer: 'There is No Daily Cap on eligible media view rewards. Qualified institutional accounts can earn seamlessly throughout all active campaigns.'
  },
  {
    id: 'faq-3',
    category: 'Streaks',
    question: 'What happens if I miss a day in the 7-day streak?',
    answer: 'The daily bonus cycle operates on UTC midnight resets. Missing a day without an active Streak Freeze will revert the vault cycle to Day 1. Completing Day 7 unlocks the maximum tier prize chest.'
  },
  {
    id: 'faq-4',
    category: 'Account & Security',
    question: 'What is the difference between VE tokens and SVEs?',
    answer: 'VEs represent primary institutional utility rewards exchangeable for platform benefits. SVEs (Social VEs) are bonus promotional units unlocked through partner tasks and community participation.'
  },
  {
    id: 'faq-5',
    category: 'Account & Security',
    question: 'How do I submit formal institutional verification documents?',
    answer: 'Navigate to Contact Us and choose "Submit Ticket" with the "Institutional Onboarding" category, or email velooprewardsofficial@gmail.com with your LEI / corporate entity identifiers.'
  }
];

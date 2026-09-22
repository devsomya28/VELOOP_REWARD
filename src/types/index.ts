export interface LeaderboardUser {
  rank: number;
  username: string;
  avatarSeed: string;
  ves: number;
  xp: number;
  tier: 'VIP Institutional' | 'Tier 1 Prime' | 'Tier 2 Partner';
  change: 'up' | 'down' | 'same';
  prizeReward: string;
}

export interface AdCampaign {
  id: string;
  title: string;
  sponsor: string;
  durationSeconds: number;
  rewardVes: number;
  tag: string;
  category: string;
}

export interface SocialChannel {
  id: string;
  name: string;
  handle: string;
  description: string;
  membersCount: string;
  rewardSves: number;
  actionUrl: string;
  joined: boolean;
}

export interface HelpArticle {
  id: string;
  category: 'Rewards' | 'Account & Security' | 'Institutional Yield' | 'Streaks';
  question: string;
  answer: string;
}

export interface SupportMessage {
  id: string;
  sender: 'user' | 'concierge';
  text: string;
  timestamp: string;
}

export interface UserStats {
  vesBalance: number;
  gemsBalance: number;
  svesBalance: number;
  xpPoints: number;
  streakDays: number;
  streakClaimedToday: boolean;
  followingOfficial: boolean;
  adsWatchedToday: number;
}

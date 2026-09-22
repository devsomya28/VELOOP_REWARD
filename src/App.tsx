/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header/Header';
import { LeaderboardBanner } from './components/LeaderboardBanner/LeaderboardBanner';
import { WatchAdBanner } from './components/WatchAdBanner/WatchAdBanner';
import { ContactBanner } from './components/ContactBanner/ContactBanner';
import { FollowEarnBanner } from './components/FollowEarnBanner/FollowEarnBanner';
import { DailyBonusBanner } from './components/DailyBonusBanner/DailyBonusBanner';
import { Footer } from './components/Footer/Footer';
import { RankingsModal } from './components/Modals/RankingsModal';
import { AdPlayerModal } from './components/Modals/AdPlayerModal';
import { SupportChatModal } from './components/Modals/SupportChatModal';
import { HelpCenterModal } from './components/Modals/HelpCenterModal';
import { TicketModal } from './components/Modals/TicketModal';
import { ChannelsModal } from './components/Modals/ChannelsModal';
import { ProfileModal } from './components/Modals/ProfileModal';
import { ToastNotification } from './components/Modals/ToastNotification';
import { UserStats } from './types';

export default function App() {
  // Global simulated state
  const [userStats, setUserStats] = useState<UserStats>({
    vesBalance: 14250,
    gemsBalance: 180,
    svesBalance: 1200,
    xpPoints: 34200,
    streakDays: 6,
    streakClaimedToday: false,
    followingOfficial: true,
    adsWatchedToday: 0
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal active states
  const [isRankingsOpen, setIsRankingsOpen] = useState(false);
  const [isAdPlayerOpen, setIsAdPlayerOpen] = useState(false);
  const [isSupportChatOpen, setIsSupportChatOpen] = useState(false);
  const [isHelpCenterOpen, setIsHelpCenterOpen] = useState(false);
  const [isTicketOpen, setIsTicketOpen] = useState(false);
  const [isChannelsOpen, setIsChannelsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Handlers
  const handleShowToast = (msg: string) => {
    setToastMessage(msg);
  };

  // Watch Ads callback
  const handleRewardCredited = (amount: number) => {
    setUserStats((prev) => ({
      ...prev,
      vesBalance: prev.vesBalance + amount,
      adsWatchedToday: prev.adsWatchedToday + 1
    }));
    handleShowToast(`+${amount} VEs credited to your vault! (DEMO REWARD)`);
  };

  // Follow official callback
  const handleToggleFollow = () => {
    setUserStats((prev) => {
      const nextFollow = !prev.followingOfficial;
      const svesDelta = nextFollow ? 500 : -500;
      handleShowToast(
        nextFollow
          ? 'Now following @velooprewards! +500 SVEs credited (DEMO)'
          : 'Unfollowed @velooprewards'
      );
      return {
        ...prev,
        followingOfficial: nextFollow,
        svesBalance: Math.max(0, prev.svesBalance + svesDelta)
      };
    });
  };

  // Daily Bonus claim callback
  const handleClaimDailyBonus = () => {
    if (userStats.streakClaimedToday) return;

    setUserStats((prev) => ({
      ...prev,
      gemsBalance: prev.gemsBalance + 25,
      streakDays: 7,
      streakClaimedToday: true
    }));

    handleShowToast('+25 GEMS added to your vault! (DEMO REWARD)');
  };

  // Reset demo session
  const handleResetDemo = () => {
    setUserStats({
      vesBalance: 14250,
      gemsBalance: 180,
      svesBalance: 1200,
      xpPoints: 34200,
      streakDays: 6,
      streakClaimedToday: false,
      followingOfficial: true,
      adsWatchedToday: 0
    });
    handleShowToast('Demo state reset to initial session.');
  };

  return (
    <div className="min-h-screen bg-[#161827] text-slate-100 flex flex-col justify-between selection:bg-amber-500/20 selection:text-amber-300">
      {/* Toast Feedback */}
      <ToastNotification
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

      {/* Main Sticky Header */}
      <Header
        vesBalance={userStats.vesBalance}
        gemsBalance={userStats.gemsBalance}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content: 5 Major Reward Banners in Required Order */}
      <main className="flex-grow max-w-6xl w-full mx-auto px-3.5 py-6 sm:px-6 lg:px-8 space-y-7">
        
        {/* 01 — LEADERBOARD */}
        <LeaderboardBanner
          onOpenRankings={() => setIsRankingsOpen(true)}
        />

        {/* 02 — WATCH ADS & EARN */}
        <WatchAdBanner
          isWatchingAd={isAdPlayerOpen}
          onOpenAdPlayer={() => setIsAdPlayerOpen(true)}
        />

        {/* 03 — CONTACT US */}
        <ContactBanner
          onOpenChat={() => setIsSupportChatOpen(true)}
          onOpenHelpCenter={() => setIsHelpCenterOpen(true)}
          onOpenTicket={() => setIsTicketOpen(true)}
          onShowToast={handleShowToast}
        />

        {/* 04 — FOLLOW & EARN */}
        <FollowEarnBanner
          isFollowing={userStats.followingOfficial}
          onToggleFollow={handleToggleFollow}
          onOpenChannels={() => setIsChannelsOpen(true)}
        />

        {/* 05 — DAILY BONUS */}
        <DailyBonusBanner
          claimed={userStats.streakClaimedToday}
          onClaimDailyBonus={handleClaimDailyBonus}
        />

      </main>

      {/* Footer with Legal & Disclaimer */}
      <Footer />

      {/* Interactive Modals */}
      <RankingsModal
        isOpen={isRankingsOpen}
        onClose={() => setIsRankingsOpen(false)}
      />

      <AdPlayerModal
        isOpen={isAdPlayerOpen}
        onClose={() => setIsAdPlayerOpen(false)}
        onRewardCredited={handleRewardCredited}
      />

      <SupportChatModal
        isOpen={isSupportChatOpen}
        onClose={() => setIsSupportChatOpen(false)}
        onOpenTicket={() => {
          setIsSupportChatOpen(false);
          setIsTicketOpen(true);
        }}
      />

      <HelpCenterModal
        isOpen={isHelpCenterOpen}
        onClose={() => setIsHelpCenterOpen(false)}
        onOpenTicket={() => {
          setIsHelpCenterOpen(false);
          setIsTicketOpen(true);
        }}
      />

      <TicketModal
        isOpen={isTicketOpen}
        onClose={() => setIsTicketOpen(false)}
        onShowToast={handleShowToast}
      />

      <ChannelsModal
        isOpen={isChannelsOpen}
        onClose={() => setIsChannelsOpen(false)}
        onShowToast={handleShowToast}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userStats={userStats}
        onResetDemo={handleResetDemo}
      />
    </div>
  );
}

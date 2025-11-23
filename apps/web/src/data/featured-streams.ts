/**
 * Liste SIMPLE des 3 streamers featured avec bounties
 * Version simplifiée : Juste des liens directs vers Twitch
 */

export interface FeaturedStream {
  channel: string;
  displayName: string;
  url: string;
  category: string;
  description: string;
  bounties: number;
  bountyPool: string;
}

export const featuredStreams: FeaturedStream[] = [
  {
    channel: 'rainbow6',
    displayName: 'Rainbow6',
    url: 'https://www.twitch.tv/rainbow6',
    category: 'Gaming',
    description: 'Rainbow Six Siege Official Channel',
    bounties: 2,
    bountyPool: '180 SUI',
  },
  {
    channel: 'lofigirl',
    displayName: 'Lofi Girl',
    url: 'https://www.twitch.tv/lofigirl',
    category: 'Music & Performing Arts',
    description: 'beats to relax/study to 🎵',
    bounties: 1,
    bountyPool: '50 SUI',
  },
  {
    channel: 'squeezie',
    displayName: 'Squeezie',
    url: 'https://www.twitch.tv/squeezie',
    category: 'Gaming',
    description: 'Gaming & Entertainment',
    bounties: 3,
    bountyPool: '233.6 SUI',
  },
];

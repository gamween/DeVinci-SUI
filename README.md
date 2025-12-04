# Purple SUI

## Built for DeVinci Sui Hackathon 2025

Purple SUI was developed as part of the DeVinci Sui Hackathon 2025, a competition focused on building practical onchain applications on Sui. We wanted to focus on building innovative creator economy applications. The hackathon challenges developers to leverage Sui's unique capabilities—parallel execution, low latency, and programmable objects—to create real-world solutions. Purple SUI addresses the fundamental problem of creator monetization by making viewer engagement directly rewarding through blockchain-native bounties and NFT rewards.

## The problem Purple SUI solves

Purple SUI solves the core problem of creator monetization without adding layers of complexity or intermediaries. Most platforms require manual tipping, subscription paywalls, or ad revenue sharing that takes weeks to settle and involves multiple middlemen. Purple SUI is intentionally streamlined: streamers create bounties once (watch milestones, participation goals, chat engagement), and viewers automatically earn NFT rewards when they meet those goals—all settled instantly on-chain. No payment processors, no revenue share cuts, no manual payouts, no waiting periods. The reward becomes invisible because it is built into the viewing experience itself.

Viewers don't need to understand blockchain—they just watch, engage, and receive collectible NFTs that prove their support and unlock exclusive perks. Streamers get direct funding from their community without platform fees eating into their revenue.

## Challenges we ran into

Building a full-stack Web3 streaming platform with Sui integration presented several learning curves:

- **Sui Smart Contracts**: Learning Move language and Sui's object-centric model for NFT minting and bounty management
- **Twitch Integration**: Implementing OAuth2 Implicit Flow without backend secrets while maintaining security
- **IPFS Metadata**: Orchestrating NFT metadata uploads to Pinata with proper error handling and fallbacks
- **Real-time Verification**: Detecting live stream status from Twitch thumbnails to show accurate "LIVE" badges
- **Wallet UX**: Making zkLogin and traditional wallet connections seamless for non-crypto-native users
- **Transaction Flow**: Coordinating user authentication → wallet connection → NFT minting → on-chain confirmation

The hardest piece was the NFT minting service: creating a backend that securely holds a funded Sui wallet, uploads images to IPFS, generates proper metadata, and mints NFTs to viewer addresses—all while handling errors gracefully and providing clear feedback to users.

## Link to the GitHub Repo

https://github.com/gamween/Purple-SUI

## Live URL

https://purplesui.vercel.app/

## Video presentation

https://youtu.be/WiZuRljU_XE

## What is Purple SUI's unique value proposition?

Purple SUI turns any Twitch stream into a direct reward engine powered by Sui blockchain. Streamers define engagement goals once (watch 30min → Bronze NFT, participate in poll → Silver NFT), viewers earn automatically as they engage, and NFTs mint instantly on-chain with full transparency. Unlike platforms that require manual tipping, custody services, or post-stream settlements, Purple SUI is:

- **Trustless**: Smart contracts execute rewards automatically
- **Instant**: 400ms finality means NFTs arrive in seconds
- **Transparent**: All bounties and mints are auditable on-chain
- **Creator-first**: 0% platform fees, direct wallet-to-wallet transfers

The product proves it end-to-end: connect Twitch, create bounty, viewers watch, NFTs mint, and ownership is permanent—no intermediaries, no revenue share, no waiting.

## Technology Stack

### Frontend (React + Vite + TypeScript)
- **React 18**: Component-based UI with hooks
- **Vite**: Lightning-fast dev server and HMR
- **TypeScript**: Type safety across 15K+ lines of code
- **TailwindCSS**: Utility-first styling with custom Purple SUI theme
- **React Router**: Client-side routing for SPA navigation
- **Sui dApp Kit**: Official Sui wallet connection library
- **Axios**: HTTP client for backend API communication

### Backend (Node.js + Express + TypeScript)
- **Express.js**: RESTful API server framework
- **TypeScript + tsx**: Type-safe backend with watch mode
- **CORS**: Secure cross-origin requests from frontend
- **dotenv**: Environment variable management
- **Nodemon/tsx watch**: Hot reload during development

### Blockchain Integration
- **Sui TypeScript SDK**: Official Sui blockchain client
- **Move Smart Contracts**: Custom NFT and Bounty modules
- **zkLogin**: Passwordless Web3 authentication (Google OAuth)
- **Sui Testnet**: Development and testing environment
- **Ed25519 Keypairs**: Wallet cryptography for minting service

### IPFS & Metadata
- **Pinata SDK**: IPFS pinning service for NFT images
- **FormData**: Multipart uploads for image files
- **JWT Authentication**: Secure Pinata API access

### External APIs
- **Twitch OAuth2**: Implicit Flow for streamer/viewer auth
- **Twitch Helix API**: Stream status, user info, thumbnails
- **Twitch Embed Player**: (Removed in favor of direct Twitch links)

## Architecture Overview

### Authentication Flow
```
1. User clicks "Connect Twitch"
   ↓
2. Redirect to Twitch OAuth (Implicit Flow, no backend secret needed)
   ↓
3. Twitch returns access_token in URL fragment
   ↓
4. Frontend parses token → fetch Twitch user info
   ↓
5. Store in UserContext (username, userId, avatar)
   ↓
6. User connects Sui wallet (zkLogin or traditional)
   ↓
7. Both identities linked in session (Twitch + Sui address)
```

### NFT Minting Flow
```
1. Streamer creates bounty (POST /api/bounty/create)
   → Stores in MongoDB: {streamerId, goal, reward, nftDesign}
   
2. Viewer watches stream + meets goal
   → Frontend tracks engagement
   
3. Viewer claims reward (POST /api/nft/mint)
   → Body: {recipientAddress, imageName, name, description}
   
4. Backend mints NFT:
   a. Load image from apps/api/nft-designs/{imageName}
   b. Upload to IPFS via Pinata → get CID
   c. Create NFT metadata JSON → upload to IPFS
   d. Sign Move transaction with backend wallet
   e. Execute sui_client.mint_nft(recipient, metadata_url)
   f. Return transaction digest
   
5. Frontend shows success + SuiScan link
   → NFT appears in viewer's wallet instantly
```

### Smart Contract Architecture (Move)
```move
module purple_sui::nft {
    struct CustomNFT has key, store {
        id: UID,
        name: String,
        description: String,
        url: Url,  // IPFS metadata URL
    }

    public entry fun mint_nft(
        name: vector<u8>,
        description: vector<u8>, 
        url: vector<u8>,
        recipient: address,
        ctx: &mut TxContext
    ) {
        let nft = CustomNFT {
            id: object::new(ctx),
            name: string::utf8(name),
            description: string::utf8(description),
            url: url::new_unsafe_from_bytes(url),
        };
        transfer::public_transfer(nft, recipient);
    }
}
```

### Bounty Smart Contract (Conceptual - Future)
```move
module purple_sui::bounty {
    struct Bounty has key {
        id: UID,
        streamer: address,
        goal_type: String,      // "watch_30min", "chat_msg", etc
        reward_pool: Balance<SUI>,
        nft_template: String,   // IPFS CID for NFT design
        active: bool,
    }
    
    // Auto-distribute when viewer meets goal
    public entry fun claim_reward(
        bounty: &mut Bounty,
        proof: vector<u8>,  // Signed proof from oracle
        ctx: &mut TxContext
    );
}
```

## Key Features

### For Streamers (Developer Portal)
- **Bounty Management**: Create engagement-based rewards (watch time, chat activity, polls)
-  **NFT Design Upload**: Custom images for Bronze/Silver/Gold tier rewards
-   **Analytics Dashboard**: Track total viewers, bounty claims, NFT distribution
-    **Twitch Integration**: One-click OAuth connection
-     **Direct Payouts**: Viewers send SUI tips directly to streamer wallet (0% fees)

### For Viewers (Viewer Portal)
- **Stream Discovery**: Browse live Twitch streamers with active bounties
- **Auto-Rewards**: Earn NFTs by watching and engaging (no manual claims needed)
- **NFT Gallery**: View collected rewards with IPFS images and metadata
- **Wallet Connection**: zkLogin (Google) or traditional Sui wallets
- **Transparent History**: All mints visible on SuiScan with transaction proofs

### Blockchain Benefits
- **400ms finality**: NFTs arrive in under 1 second
- **$0.0003 per mint**: 1000x cheaper than Ethereum
- **Parallel execution**: Thousands of viewers can claim simultaneously
- **Permanent ownership**: NFTs stored on Sui, not platform database

## Who is the target customer?

**Primary**: Mid-tier Twitch streamers (500-10K concurrent viewers) who want direct community monetization without platform cuts. These creators have engaged audiences but earn little from ads or subscriptions.

**Secondary**: 
- Viewers who want proof-of-support collectibles (like concert tickets or event badges)
- Gaming communities organizing tournaments with NFT prizes
- Educational streamers rewarding students for participation
- Brand sponsors wanting transparent ROI on streamer partnerships

## Who are the closest competitors and how is Purple SUI different?

Closest competitors include:
- **StreamElements/Nightbot**: Loyalty points systems (off-chain, no ownership)
- **Rally.io**: Creator coins (centralized, high fees)
- **Audius (music)**: Streaming + crypto (music-only, no live interaction)

Purple SUI is different because:
1. **On-chain from day 1**: NFTs are real assets, not platform points
2. **0% platform fees**: Direct creator-to-viewer transactions
3. **Live rewards**: Minted during stream, not post-event
4. **Multi-platform ready**: Twitch first, but architected for YouTube/Kick/Discord

Where others add crypto *on top of* existing platforms, Purple SUI makes the reward *part of* the viewing experience—invisible to users who don't care about blockchain, valuable to those who do.

## What is the distribution strategy and why?

**Community-first via Twitch streamers:**
1. **Onboard 10 beta streamers** in gaming/art niches with 1K-5K viewers
2. **Viewers discover organically**: One viewer earning NFT → shares in Discord → viral loop
3. **Cross-promote on Farcaster**: Sui ecosystem has strong Farcaster presence
4. **Streamer referrals**: Pay 10% of bounty pool to streamers who refer other streamers

No paid ads needed—once a viewer earns an NFT, they become an advocate. Network effects are built into the product: every bounty is a billboard for Purple SUI.

**Why Sui?**
- **Speed**: 400ms finality = instant gratification (critical for live streams)
- **Cost**: Sub-cent transactions enable micro-rewards (Bronze/Silver/Gold tiers)
- **zkLogin**: Non-crypto users can participate with Google auth
- **Ecosystem growth**: Sui is funding builders, positioning for mainstream adoption

# CreatorSeal - Project Structure

## 📁 Architecture

```
devinci-sui-stream/
├── contracts/              # Move Smart Contracts sur Sui
│   ├── Move.toml
│   └── sources/
│       ├── streaming.move      ✅ CreatorProfile, FanPass, ExclusiveDrop
│       ├── donations.move      ✅ Système de donations
│       └── rewards_nft.move    ✅ Badges NFT
│
├── backend/                # Node/TS + IPFS + Seal
│   ├── src/
│   │   ├── ipfs/
│   │   │   ├── ingest.ts       ⚠️  TODO: RTMP → HLS → IPFS
│   │   │   └── gateway.ts      ✅ URLs m3u8
│   │   ├── seal/
│   │   │   ├── sealClient.ts   ⚠️  TODO: SDK Seal
│   │   │   └── policies.ts     ✅ Règles d'accès
│   │   ├── sui/
│   │   │   ├── client.ts       ✅ RPC Sui
│   │   │   └── webhooks.ts     ⚠️  TODO: Events indexation
│   │   ├── api/
│   │   │   ├── lives.ts        ✅ API REST lives
│   │   │   └── users.ts        ✅ API REST users
│   │   └── index.ts            ✅ Express server
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/              # Next.js/React
│   ├── app/
│   │   ├── pages/
│   │   │   ├── index.tsx           ✅ Home avec liste de lives
│   │   │   ├── live/[id].tsx       ✅ Page live + player
│   │   │   ├── creator/[id].tsx    ✅ Profil créateur
│   │   │   └── dashboard.tsx       ✅ Stats créateur
│   │   ├── components/
│   │   │   ├── VideoPlayer.tsx     ✅ Lecteur HLS/IPFS
│   │   │   ├── DonatePanel.tsx     ✅ Interface donations
│   │   │   ├── RewardsPanel.tsx    ✅ Progression NFT
│   │   │   ├── Navbar.tsx          ✅ Navigation
│   │   │   ├── Layout.tsx          ✅ Layout principal
│   │   │   ├── counter/            ✅ Demo Counter (existing)
│   │   │   └── ui/                 ✅ shadcn/ui components
│   │   ├── lib/
│   │   │   ├── suiClient.ts        ✅ Connexion Sui
│   │   │   ├── sealClient.ts       ⚠️  TODO: SDK Seal client
│   │   │   ├── apiClient.ts        ✅ API calls backend
│   │   │   ├── networkConfig.ts    ✅ Config réseaux Sui
│   │   │   ├── constants.ts        ✅ Constantes
│   │   │   ├── providers.tsx       ✅ Providers React
│   │   │   └── utils.ts            ✅ Utilitaires
│   │   ├── layout.tsx              ✅ Root layout
│   │   ├── page.tsx                ✅ Home page
│   │   └── globals.css             ✅ Styles globaux
│   ├── package.json
│   └── tsconfig.json
│
└── move/                  # Existing counter example
    └── counter/
        ├── Move.toml
        └── sources/
            └── counter.move
```

## 🚀 Quick Start

### 1. Contracts (Move)
```bash
cd contracts
sui move build
sui client publish --gas-budget 100000000
```

### 2. Backend
```bash
cd backend
pnpm install
pnpm dev
# Runs on http://localhost:3001
```

### 3. Frontend
```bash
cd frontend
pnpm install
pnpm dev
# Runs on http://localhost:3000
```

## ✅ Ce qui est prêt

- ✅ **Structure complète** selon l'architecture du README
- ✅ **Smart Contracts Move** : CreatorProfile, FanPass, ExclusiveDrop, Donations, Badges
- ✅ **Backend API** : Structure complète avec routes lives et users
- ✅ **Frontend** : Pages principales, composants UI, navigation
- ✅ **Counter Demo** : Exemple fonctionnel de l'intégration Sui
- ✅ **Configuration** : TypeScript, Next.js, Tailwind, shadcn/ui

## ⚠️ À implémenter

- ⚠️  **IPFS Streaming** : Ingestion RTMP → HLS
- ⚠️  **Seal Integration** : SDK chiffrement/déchiffrement
- ⚠️  **Nautilus** : Score d'engagement off-chain
- ⚠️  **Events Indexing** : Webhooks pour events on-chain
- ⚠️  **VideoPlayer** : Intégration HLS.js
- ⚠️  **Donations** : Transaction Sui pour envoyer SUI

## 📝 Notes

- Le **counter example** reste dans `/move/counter/` et est intégré dans le frontend à `/frontend/app/components/counter/`
- Les **smart contracts principaux** sont dans `/contracts/`
- Le code est **clair et organisé** selon l'architecture du README
- Les fichiers **TODO** contiennent des placeholders pour les fonctionnalités à implémenter
- Le frontend utilise **Next.js App Router** avec la nouvelle structure

## 🔧 Configuration

### Après déploiement des contracts :

1. Mettre à jour `CREATOR_SEAL_PACKAGE_ID` dans `/frontend/app/lib/suiClient.ts`
2. Configurer l'URL du backend dans `/frontend/app/lib/apiClient.ts`
3. Ajouter les variables d'environnement dans `.env`

### Variables d'environnement backend :
```env
PORT=3001
SUI_NETWORK=testnet
IPFS_GATEWAY=https://ipfs.io/ipfs/
```

### Variables d'environnement frontend :
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SUI_NETWORK=testnet
```

// Sui Client: connexion wallet et transactions

import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';

export const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });

export const CREATOR_SEAL_PACKAGE_ID = '0xTODO'; // À remplacer après déploiement

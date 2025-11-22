// Sui Client: Connexion RPC Sui

import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';

export class SuiClientWrapper {
  private client: SuiClient;

  constructor(network: 'mainnet' | 'testnet' | 'devnet' = 'testnet') {
    this.client = new SuiClient({ url: getFullnodeUrl(network) });
  }

  getClient(): SuiClient {
    return this.client;
  }

  async getCreatorProfile(profileId: string) {
    return await this.client.getObject({
      id: profileId,
      options: { showContent: true }
    });
  }

  async getFanPass(passId: string) {
    return await this.client.getObject({
      id: passId,
      options: { showContent: true }
    });
  }
}

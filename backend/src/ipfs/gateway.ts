// IPFS Gateway: Génère les URLs m3u8 pour streaming

export class IPFSGateway {
  private gatewayUrl: string;

  constructor(gatewayUrl: string = 'https://ipfs.io/ipfs/') {
    this.gatewayUrl = gatewayUrl;
  }

  generatePlaylistUrl(cid: string): string {
    return `${this.gatewayUrl}${cid}/playlist.m3u8`;
  }

  generateSegmentUrl(cid: string, segmentName: string): string {
    return `${this.gatewayUrl}${cid}/${segmentName}`;
  }
}

// Stub IPFS gateway helper
// TODO: implement actual IPFS fetch logic (e.g. via public gateway or local node)

export async function fetchFromGateway(cid: string): Promise<Uint8Array> {
  // Placeholder implementation
  throw new Error('fetchFromGateway not implemented');
}

export function buildGatewayUrl(cid: string, gatewayBase: string = 'https://ipfs.io/ipfs'): string {
  return `${gatewayBase}/${cid}`;
}

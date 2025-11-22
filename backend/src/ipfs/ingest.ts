// Stub IPFS ingest helper
// TODO: implement add (pin) content to IPFS (e.g. via web3.storage, Pinata, or local daemon)

export interface IngestResult {
  cid: string;
  size: number;
}

export async function ingestBuffer(_data: Uint8Array): Promise<IngestResult> {
  // Placeholder implementation
  throw new Error('ingestBuffer not implemented');
}

export async function ingestJson(obj: unknown): Promise<IngestResult> {
  const encoded = new TextEncoder().encode(JSON.stringify(obj));
  return ingestBuffer(encoded);
}

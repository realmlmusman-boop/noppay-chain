import { Peer } from "./peer.js";

export class PeerManager {
  private readonly peers = new Map<string, Peer>();

  addPeer(host: string, port: number): Peer {
    const peer = new Peer(host, port);
    this.peers.set(peer.url, peer);
    return peer;
  }

  removePeer(host: string, port: number): boolean {
    return this.peers.delete(`http://${host}:${port}`);
  }

  getPeers(): readonly Peer[] {
    return [...this.peers.values()];
  }

  hasPeer(host: string, port: number): boolean {
    return this.peers.has(`http://${host}:${port}`);
  }

  get size(): number {
    return this.peers.size;
  }
}

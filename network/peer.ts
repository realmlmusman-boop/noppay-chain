import {
  createServer,
  type IncomingMessage,
  type ServerResponse,
} from "node:http";

export type PeerMessage = {
  type: string;
  data?: unknown;
};

export class Peer {
  readonly host: string;
  readonly port: number;

  constructor(host: string, port: number) {
    this.host = host;
    this.port = port;
  }

  get url(): string {
    return `http://${this.host}:${this.port}`;
  }

  async send(message: PeerMessage): Promise<unknown> {
    const response = await fetch(`${this.url}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    const text = await response.text();

    let parsed: unknown = null;

    if (text.trim().length > 0) {
      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = text;
      }
    }

    if (!response.ok) {
      throw new Error(`Peer request failed: ${response.status}`);
    }

    return parsed;
  }
}

export type PeerServerHandler = (
  message: PeerMessage,
) => Promise<unknown> | unknown;

export function createPeerServer(
  port: number,
  handler: PeerServerHandler,
) {
  const server = createServer(
    async (
      request: IncomingMessage,
      response: ServerResponse,
    ) => {
      response.setHeader("Content-Type", "application/json");

      if (
        request.method !== "POST" ||
        request.url !== "/message"
      ) {
        response.statusCode = 404;
        response.end(
          JSON.stringify({
            error: "Route not found",
          }),
        );
        return;
      }

      const chunks: Buffer[] = [];

      for await (const chunk of request) {
        chunks.push(
          Buffer.isBuffer(chunk)
            ? chunk
            : Buffer.from(chunk),
        );
      }

      const body = Buffer.concat(chunks).toString("utf8");

      let parsed: unknown;

      try {
        parsed = JSON.parse(body);
      } catch {
        response.statusCode = 400;
        response.end(
          JSON.stringify({
            error: "Invalid JSON",
          }),
        );
        return;
      }

      if (
        typeof parsed !== "object" ||
        parsed === null ||
        typeof (parsed as Record<string, unknown>).type !== "string"
      ) {
        response.statusCode = 400;
        response.end(
          JSON.stringify({
            error: "Invalid peer message",
          }),
        );
        return;
      }

      try {
        const result = await handler(
          parsed as PeerMessage,
        );

        response.statusCode = 200;
        response.end(JSON.stringify(result));
      } catch {
        response.statusCode = 500;
        response.end(
          JSON.stringify({
            error: "Internal server error",
          }),
        );
      }
    },
  );

  server.listen(port);

  return server;
}

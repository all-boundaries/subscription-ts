import { serverDefinition } from "./server-definition";

const server = Bun.serve(serverDefinition);

console.log(`Listening on http://${server.hostname}:${server.port}`);

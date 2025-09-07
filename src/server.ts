import { bootstrapDb } from "./plumbling/db";
import { serverDefinition } from "./routes";

bootstrapDb();
const server = Bun.serve(serverDefinition);

console.log(`Listening on http://${server.hostname}:${server.port}`);

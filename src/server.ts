import http from "http";
import config from "./config";
import app from "./app/app";
import mongoose from "mongoose";

const server = http.createServer(app);

async function main() {
  await mongoose
    .connect(config.database_url as string, {
      serverSelectionTimeoutMS: 5000,
    })
    .then(() => {
      // eslint-disable-next-line no-console
      console.log("Connected to database".cyan);
    });
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.log(err);
  process.exit(1);
});

server.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(
    `⚡Server is listening on http://localhost:${config.port}`.yellow,
  );
});

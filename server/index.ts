import fastify from "fastify";
import dotenv from "dotenv";
import {
  getServerLogPath,
  v1Router,
  logServer,
  getJanExtensionsPath,
} from "@janhq/core/node";
import { join } from "path";

dotenv.config();

const JAN_API_HOST = process.env.JAN_API_HOST || "127.0.0.1";
const JAN_API_PORT = Number.parseInt(process.env.JAN_API_PORT || "1337");

let server: any | undefined = undefined;

export const startServer = async (schemaPath?: string, baseDir?: string) => {
  const serverLogPath = getServerLogPath();
  try {
    logServer(`[API]::Debug: Starting JAN API server...`);
    server = fastify({
      logger: {
        level: "info",
        file: serverLogPath,
      },
    });
    await server.register(require("@fastify/cors"), {});

    await server.register(require("@fastify/swagger"), {
      mode: "static",
      specification: {
        path: schemaPath ?? "./../docs/openapi/jan.yaml",
        baseDir: baseDir ?? "./../docs/openapi",
      },
    });

    await server.register(require("@fastify/swagger-ui"), {
      routePrefix: "/",
      baseDir: baseDir ?? join(__dirname, "../..", "./docs/openapi"),
      uiConfig: {
        docExpansion: "full",
        deepLinking: false,
      },
      staticCSP: false,
      transformSpecificationClone: true,
    });

    await server.register(
      (childContext: any, _: any, done: any) => {
        childContext.register(require("@fastify/static"), {
          root: getJanExtensionsPath(),
          wildcard: false,
        });

        done();
      },
      { prefix: "extensions" }
    );
    await server.register(v1Router, { prefix: "/v1" });
    await server
      .listen({
        port: JAN_API_PORT,
        host: JAN_API_HOST,
      })
      .then(() => {
        logServer(
          `[API]::Debug: JAN API listening at: http://${JAN_API_HOST}:${JAN_API_PORT}`
        );
      });
  } catch (e) {
    logServer(`[API]::Error: ${e}`);
  }
};

export const stopServer = async () => {
  try {
    logServer("[API]::Debug: Server stopped");
    await server.close();
  } catch (e) {
    logServer(`[API]::Error: ${e}`);
  }
};

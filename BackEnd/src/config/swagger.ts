import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ledger Flow API",
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:8000" }],
    components: {
      securitySchemes: {
        sessionCookie: {
          type: "apiKey",
          in: "cookie",
          name: "appSession",
          description:
            "Log in at /login in the same browser before trying protected routes.",
        },
      },
    },
    security: [{ sessionCookie: [] }],
    paths: {
      "/api/users/me": {
        get: {
          summary: "Get current user",
          tags: ["Users"],
          responses: {
            "200": { description: "User found" },
            "401": { description: "Not authenticated" },
            "404": { description: "User not synced yet" },
          },
        },
        post: {
          summary: "Sync / create user from Auth0 session",
          tags: ["Users"],
          responses: {
            "200": { description: "User synced" },
            "401": { description: "Not authenticated" },
          },
        },
        put: {
          summary: "Update current user",
          tags: ["Users"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            "200": { description: "User updated" },
            "401": { description: "Not authenticated" },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);

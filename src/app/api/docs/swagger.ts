export const swaggerDoc = {
  openapi: "3.0.0",
  info: {
    title: "RadioCopilot API",
    version: "1.0.0",
    description: "API documentation for RadioCopilot admin panel"
  },
  servers: [
    {
      url: "https://api.radiocopilot.com",
      description: "Production server"
    }
  ],
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: "apiKey",
        in: "header",
        name: "X-API-Key"
      }
    },
    schemas: {
      Station: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          locationId: { type: "number" },
          omniplayerUrl: { type: "string" },
          clientId: { type: "string" },
          clientSecret: { type: "string" },
          username: { type: "string" },
          password: { type: "string" },
          language: { type: "string" },
          website: { type: "string" },
          status: { type: "string", enum: ["active", "inactive"] }
        }
      },
      Voice: {
        type: "object",
        properties: {
          id: { type: "string" },
          voiceId: { type: "string" },
          name: { type: "string" },
          gender: { type: "string", enum: ["male", "female", "other"] },
          language: { type: "string" },
          country: { type: "string" },
          category: { type: "string", enum: ["voicetracking", "news", "caller"] },
          status: { type: "string", enum: ["active", "inactive"] }
        }
      }
    }
  },
  security: [
    {
      ApiKeyAuth: []
    }
  ],
  paths: {
    "/api/stations": {
      get: {
        summary: "Get all stations",
        responses: {
          "200": {
            description: "List of radio stations",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Station"
                  }
                }
              }
            }
          }
        }
      },
      post: {
        summary: "Create a new station",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Station"
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Station created successfully"
          }
        }
      }
    },
    "/api/voices": {
      get: {
        summary: "Get all voices",
        responses: {
          "200": {
            description: "List of voices",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Voice"
                  }
                }
              }
            }
          }
        }
      },
      post: {
        summary: "Create a new voice",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Voice"
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Voice created successfully"
          }
        }
      }
    }
  }
} 
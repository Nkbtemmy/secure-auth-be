import responses from "./responses";

const auth = {
  "/auth/register": {
    post: {
      tags: ["Auth"],
      security: [],
      summary: "Register a new user",
      parameters: [
        {
          in: "body",
          name: "userData",
          required: true,
          schema: {
            example: {
              name: "",
              email: "",
              password: "",
            },
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
  },
  "/auth/login": {
    post: {
      tags: ["Auth"],
      security: [],
      summary: "Login a user",
      parameters: [
        {
          in: "body",
          name: "credentials",
          required: true,
          schema: {
            example: {
              email: "",
              password: "",
            },
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
  },
  "/auth/logout": {
    post: {
      tags: ["Auth"],
      security: [{ JWT: [] }],
      summary: "Logout the current user",
      parameters: [],
      responses,
    },
  },
  "/auth/user/{id}/password": {
    put: {
      tags: ["Auth"],
      security: [{ JWT: [] }],
      summary: "Update user password",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          type: "string",
          example: "12345",
        },
        {
          in: "body",
          name: "passwordData",
          required: true,
          schema: {
            example: {
              oldPassword: "",
              newPassword: "",
            },
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
  },
  "/auth/reset-password": {
    put: {
      tags: ["Auth"],
      security: [],
      summary: "Reset user password",
      parameters: [
        {
          in: "body",
          name: "resetData",
          required: true,
          schema: {
            example: {
              email: "",
              newPassword: "",
            },
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
  },
  "/auth/verify-token/{token}": {
    get: {
      tags: ["Auth"],
      security: [],
      summary: "Verify the provided token",
      parameters: [
        {
          in: "path",
          name: "token",
          required: true,
          type: "string",
          example: "some-verification-token",
        },
      ],
      responses,
    },
  },
  "/auth/refresh-token/{token}": {
    get: {
      tags: ["Auth"],
      security: [],
      summary: "Refresh the access token",
      parameters: [
        {
          in: "path",
          name: "token",
          required: true,
          type: "string",
          example: "some-refresh-token",
        },
      ],
      responses,
    },
  },
};

export default auth;

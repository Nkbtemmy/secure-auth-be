import responses from "./responses";

export const users = {
  "/users/me": {
    get: {
      tags: ["User"],
      security: [
        {
          JWT: [],
        },
      ],
      summary: "Retrieve the profile of the current authenticated user",
      consumes: ["application/json"],
      responses,
    },
    put: {
      tags: ["User"],
      security: [
        {
          JWT: [],
        },
      ],
      summary: "Update the current authenticated user's profile",
      parameters: [
        {
          in: "body",
          name: "user",
          required: true,
          schema: {
            example: {
              name: "",
              email: "",
              phoneNumber: "",
            },
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
  },
  "/users": {
    get: {
      tags: ["User", "Admin"],
      security: [
        {
          JWT: [],
        },
      ],
      summary: "List all users (admin-only)",
      parameters: [
        {
          name: "search",
          in: "query",
          description: "Filter users by search string",
          schema: {
            type: "string",
          },
        },
        {
          name: "page",
          in: "query",
          description: "Current page number",
          schema: {
            type: "number",
          },
        },
        {
          name: "itemsPerPage",
          in: "query",
          description: "Number of items per page",
          schema: {
            type: "number",
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
  },
  "/users/{id}/role": {
    put: {
      tags: ["User", "Admin"],
      security: [
        {
          JWT: [],
        },
      ],
      summary: "Update a user's role (admin-only)",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
        },
        {
          in: "body",
          name: "role",
          required: true,
          schema: {
            example: {
              role: "admin",
            },
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
  },
  "/users/{id}": {
    delete: {
      tags: ["User", "Admin"],
      security: [
        {
          JWT: [],
        },
      ],
      summary: "Delete a user (admin-only)",
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
  },
};

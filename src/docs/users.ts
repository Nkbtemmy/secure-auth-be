import responses from "./responses";

export const users = {
  "/users": {
    post: {
      tags: ["User"],
      security: [
        {
          JWT: [],
        },
      ],
      summary: "Create a user",
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
              gender: "M",
              dob: "1990-01-01",
            },
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
    get: {
      tags: ["User"],
      security: [
        {
          JWT: [],
        },
      ],
      parameters: [
        {
          name: "search",
          in: "query",
          description: "Filter tariffs by search",
          schema: {
            type: "string",
          },
        },
				{
					name: "page",
					in: "query",
					description: "Current Page",
					schema: {
						type: "number",
					},
				},
				{
					name: "itemsPerPage",
					in: "query",
					description: "Number of items to be displayed",
					schema: {
						type: "number",
					},
				},
			],
      summary: "List all users",
      consumes: ["application/json"],
      responses,
    },
  },
  "/users/{id}": {
    get: {
      tags: ["User"],
      security: [
        {
          JWT: [],
        },
      ],
      summary: "Retreive a certain user",
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
    patch: {
      tags: ["User"],
      security: [
        {
          JWT: [],
        },
      ],
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
      summary: "Update a certain users",
      consumes: ["application/json"],
      responses,
    },
    delete: {
      tags: ["User"],
      security: [
        {
          JWT: [],
        },
      ],
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
      summary: "delete a certain users",
      consumes: ["application/json"],
      responses,
    },
  },
  "/users/profile": {
    get: {
      tags: ["User"],
      security: [
        {
          JWT: [],
        },
      ],
      summary: "Retrieve a user profile",
      parameters: [],
      consumes: ["application/json"],
      responses,
    }
  },
  "/users/disactivate": {
    post: {
      tags: ["User"],
      security: [{JWT: [],},],
      summary: "Disactivating",
      parameters: [
        {
          in: "body",
          name: "userId",
          required: true,
          schema: {
            example: {
              userId: "",
            },
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
  },
  "/users/activate": {
    post: {
      tags: ["User"],
      security: [{JWT: [],},],
      summary: "Disactivating",
      parameters: [
        {
          in: "body",
          name: "userId",
          required: true,
          schema: {
            example: {
              userId: "",
            },
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
  },
};

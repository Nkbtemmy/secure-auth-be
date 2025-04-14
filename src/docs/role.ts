import responses from "./responses";

export const roles = {
    "/roles": {
        post: {
            tags: ["Role"],
            security: [
                {
                    JWT: []
                }
            ],
            summary: "Create a role",
            parameters: [
                {
                    in: "body",
                    name: "role",
                    required: true,
                    schema: {
                        example: {
                            name: "Admin",
                            description: "Administrator role"
                        }
                    }
                }
            ],
            consumes: ["application/json"],
            responses
        },
        get: {
            tags: ["Role"],
            security: [
                {
                    JWT: []
                }
            ],
            summary: "List all roles",
            parameters: [
                {
                    in: "query",
                    name: "search",
                    description: "Filter roles by search",
                    schema: {
                        type: "string"
                    }
                },
                {
                    in: "query",
                    name: "page",
                    description: "Current Page",
                    schema: {
                        type: "number"
                    }
                },
                {
                    in: "query",
                    name: "itemsPerPage",
                    description: "Number of items to be displayed",
                    schema: {
                        type: "number"
                    }
                }
            ],
            consumes: ["application/json"],
            responses
        }
    },
    "/roles/{id}": {
        get: {
            tags: ["Role"],
            security: [
                {
                    JWT: []
                }
            ],
            summary: "Retrieve a specific role",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    schema: {
                        type: "string"
                    }
                }
            ],
            consumes: ["application/json"],
            responses
        },
        patch: {
            tags: ["Role"],
            security: [
                {
                    JWT: []
                }
            ],
            summary: "Update a specific role",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    schema: {
                        type: "string"
                    }
                },
                {
                    in: "body",
                    name: "role",
                    required: true,
                    schema: {
                        example: {
                            name: "Admin",
                            description: "Updated role description"
                        }
                    }
                }
            ],
            consumes: ["application/json"],
            responses
        },
        delete: {
            tags: ["Role"],
            security: [
                {
                    JWT: []
                }
            ],
            summary: "Delete a specific role",
            parameters: [
                {
                    in: "path",
                    name: "id",
                    required: true,
                    schema: {
                        type: "string"
                    }
                }
            ],
            consumes: ["application/json"],
            responses
        }
    }
};
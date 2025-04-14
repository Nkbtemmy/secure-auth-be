import responses from "./responses";

const auth = {
  "/auth/login/email": {
    post: {
      tags: ["Auth"],
      security: [],
      summary: "Login by email",
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
  "/auth/login/phone": {
    post: {
      tags: ["Auth"],
      security: [],
      summary: "Login by phone",
      parameters: [
        {
          in: "body",
          name: "credentials",
          required: true,
          schema: {
            example: {
              phoneNumber: "",
              password: "",
            },
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
  },
  "/auth/email/forget-password": {
    post: {
      tags: ["Auth"],
      security: [],
      summary: "Forget password account email",
      parameters: [
        {
          in: "body",
          name: "email",
          required: true,
          schema: {
            example: {
              email: "",
            },
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
  },
  "/auth/email/reset-password": {
    put: {
      tags: ["Auth"],
      security: [],
      summary: "Reseting account password",
      parameters: [
        {
          in: "body",
          name: "Required fields",
          required: true,
          schema: {
            example: {
              email: "",
              password: "",
              verificationCode: "",
            },
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
  },
  "/auth/change-password": {
    post: {
      tags: ["Auth"],
      security: [{ JWT: [] }],
      summary: "Change password fields",
      parameters: [
        {
          in: "body",
          name: "credentials",
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
  "/auth/phone/forget-pin": {
    post: {
      tags: ["Auth"],
      security: [],
      summary: "Forget PIN account phone number",
      parameters: [
        {
          in: "body",
          name: "phoneNumber",
          required: true,
          schema: {
            example: {
              phoneNumber: "",
            },
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
  },
  "/auth/phone/reset-pin": {
    put: {
      tags: ["Auth"],
      security: [],
      summary: "Resetting account PIN",
      parameters: [
        {
          in: "body",
          name: "Required fields",
          required: true,
          schema: {
            example: {
              phoneNumber: "",
              password: "",
              verificationCode: "",
            },
          },
        },
      ],
      consumes: ["application/json"],
      responses,
    },
  },
};

export default auth;

// app.d.ts
/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("./auth/lucia").Auth;
  type DatabaseUserAttributes = {
    email: string;
    username: string;
    name: string;
  };
  type DatabaseSessionAttributes = {};
}

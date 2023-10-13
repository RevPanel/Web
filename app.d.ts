// app.d.ts
/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("./src/lib/lucia").Auth;
  type DatabaseUserAttributes = {
    email: string;
    username: string;
    name: string;
    emailVerified: boolean;
    plan?: string | null;
    emailToken?: string | null;
    avatarUrl?: string | null;
  };
  type DatabaseSessionAttributes = {
    address: string;
    user_agent: string;
  };
}

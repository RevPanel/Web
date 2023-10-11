import type { ImagePort, UserAction } from "@prisma/client";

export interface Describable {
  id: string;
  name: string;
  description: string | null;
}

export interface ServiceProps {
  serverId: string;
  id: string;
}

export interface SessionProps {
  session: any;
}

export type ServiceLogAction =
  | "START"
  | "STOP"
  | "RESTART"
  | "COMMAND"
  | "CREATE";

export interface AuditLog {
  id: number;
  action: ServiceLogAction | UserAction;
  data: string | null;
  userId: string;
  createdAt: Date;
}

export type ImageInfo = {
  id: string;
  name: string;
  description: string;
  version: string;
  homepage: string | null;
  createdAt: Date;
  dockerImage: string;
  ports: ImagePort[];
};

export type SystemStats = {
  cpu: {
    cores: number;
    usage: number;
  };

  memory: {
    total: number;
    usage: number;
  };

  disk: {
    total: number;
    usage: number;
  };

  processes: number;
};
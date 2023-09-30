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

export interface AuditLog {
  id: number;
  action: "START" | "STOP" | "RESTART" | "COMMAND" | "CREATE";
  data?: string;
  userId: string;
  createdAt: Date;
}

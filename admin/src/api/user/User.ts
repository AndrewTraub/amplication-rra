export type User = {
  createdAt: Date;
  firstName: string | null;
  id: string;
  lastIp: string | null;
  lastLogin: Date | null;
  lastName: string | null;
  roles: Array<string>;
  updatedAt: Date;
  username: string;
};

export type UserUpdateInput = {
  firstName?: string | null;
  lastIp?: string | null;
  lastLogin?: Date | null;
  lastName?: string | null;
  password?: string;
  roles?: Array<string>;
  username?: string;
};

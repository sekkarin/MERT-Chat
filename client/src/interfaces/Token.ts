export interface AccessTokenPayload {
  userInfo: {
    userName: string;
    roles: number[];
  };
  iat: number;
  exp: number;
}

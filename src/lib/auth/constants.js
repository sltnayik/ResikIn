export const USER_ROLES = {
  MASYARAKAT: "masyarakat",
  PETUGAS: "petugas",
};

export const ROLE_DASHBOARD_PATHS = {
  [USER_ROLES.MASYARAKAT]: "/user/dashboard",
  [USER_ROLES.PETUGAS]: "/officer/dashboard",
};

export const DEFAULT_LOGIN_PATH = "/login";

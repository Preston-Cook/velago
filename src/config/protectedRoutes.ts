import { Role } from '@prisma/client';

type Route = string;

interface RouteConfig {
  api: Route[];
  pages: Route[];
}

export const protectedRoutes: Record<Role, RouteConfig> = {
  USER: {
    api: [],
    pages: ['/en/profile'],
  },
  ADMIN: {
    api: [],
    pages: ['/en/dashboard', '/es/tablero'],
  },
  ORGANIZATION: {
    api: [],
    pages: ['/en/dashboard', '/es/tablero'],
  },
};

export const protectedApiRoutes = Object.values(protectedRoutes).flatMap(
  (config) => config.api,
);

export const protectedPageRoutes = Object.values(protectedRoutes).flatMap(
  (config) => config.pages,
);

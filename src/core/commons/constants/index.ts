export const ROLES = {
  'FULL CONTROL': 1,
  'BROWSING CONTROL': 2,
} as const; // union
export type RolesKey = keyof typeof ROLES;
export type RolesValue = typeof ROLES[RolesKey];

export enum ADMIN_STATUS {
  'ACTIVATED' = 'ACTIVATED',
  'PENDING' = 'PENDING',
}

export const CATEGORIES = {
  'UI DESIGN': 1,
  'GRAPHIC DESIGN': 2,
} as const; // union
export type CategoriesKey = keyof typeof CATEGORIES;
export type CategoriesValue = typeof CATEGORIES[CategoriesKey];

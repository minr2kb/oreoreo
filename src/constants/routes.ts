export const ROUTES = {
  home: '/',
  theme: '/theme',
  other: '*',
} as const;

export const pageTitleMap: Record<string, string> = {
  '/': 'home',
  '/theme': 'theme',
};

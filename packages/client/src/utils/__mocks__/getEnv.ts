export const getEnv = (name: string) => {
  switch (name) {
    case 'MODE':
      return 'production';
    case 'VITE_CLIENT_VERSION':
      return '1.0.0';
    default:
      return '';
  }
};

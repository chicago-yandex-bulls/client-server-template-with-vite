export const getEnv = (name: keyof ImportMetaEnv) => {
  return import.meta.env[name];
};

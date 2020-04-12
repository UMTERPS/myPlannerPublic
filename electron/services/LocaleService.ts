// Get locale from current OS setting
// If not found, 'en' will be used
export const getEnvLocale = () => {
  const env: NodeJS.ProcessEnv = process.env;
  const locale =
    env.LC_ALL || env.LC_MESSAGES || env.LANG || env.LANGUAGE || 'en';
  return locale.split('_')[0];
};

class ConfigRegistry {
  /** Runtime Environment */
  static runtimeEnv() {
    return process.env.RUNTIME_ENVIRONMENT || 'dev';
  }
}

export default ConfigRegistry;

export interface IEnvironment {
  PORT: number;
  NODE_ENV: NodeEnvironment;
  LOG_LEVEL: LogLevel;
  CACHE_TTL: number;
  UNSPLASH_ACCESS_KEY: string;
  UNSPLASH_SECRET_KEY: string;
  CORS_ALLOWED_ORIGINS: string[];
  PAGE_SIZE: number;
}

export const validNodeEnvs = ["dev", "test", "prod"] as const;
export type NodeEnvironment = typeof validNodeEnvs[number];

const validLogLevels = [
  "error",
  "warn",
  "help",
  "data",
  "info",
  "debug",
  "prompt",
  "http",
  "verbose",
  "input",
  "silly",
] as const;

export type LogLevel = typeof validLogLevels[number];

const getEnvValue = (key: string) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} not found.`);
  }
  return value;
};

const getEnvArrayValue = (key: string, optional?: boolean): string[] => {
  const valueStr = process.env[key];
  if (!valueStr) {
    if (optional) {
      return [];
    }
    throw new Error(`Environment variable ${key} not found.`);
  }
  const value = valueStr.split(",");
  if (value.length === 0) {
    if (optional) {
      return [];
    }
    throw new Error(`Environment variable ${key} is empty.`);
  }
  return value;
};

const getNumericEnvValue = (key: string) => {
  const valueStr = getEnvValue(key);
  const value = parseInt(valueStr);
  if (isNaN(value) || value <= 0) {
    throw new Error(`Expected ${key} to be a positive integer, got="{value}"`);
  }
  return value;
};

const getConstrainedEnvValue = <T extends string>(
  key: string,
  values: ReadonlyArray<T>,
  defaultValue?: T
) => {
  try {
    const value = getEnvValue(key);
    if (values.includes(value as T)) {
      return value as T;
    }
    throw new Error(`Expected ${key} to be one of ${values.join(",")}`);
  } catch (e) {
    if (defaultValue) {
      return defaultValue;
    }
    throw e;
  }
};

export const environment = (): IEnvironment => {
  const PORT = getNumericEnvValue("PORT");
  const CACHE_TTL = getNumericEnvValue("CACHE_TTL");
  const NODE_ENV = getConstrainedEnvValue("NODE_ENV", validNodeEnvs);
  const LOG_LEVEL = getConstrainedEnvValue("LOG_LEVEL", validLogLevels, "info");
  const UNSPLASH_ACCESS_KEY = getEnvValue("UNSPLASH_ACCESS_KEY");
  const UNSPLASH_SECRET_KEY = getEnvValue("UNSPLASH_SECRET_KEY");
  const CORS_ALLOWED_ORIGINS = getEnvArrayValue("CORS_ALLOWED_ORIGINS", true);
  const PAGE_SIZE = getNumericEnvValue("PAGE_SIZE");

  return {
    PORT,
    NODE_ENV,
    LOG_LEVEL,
    CACHE_TTL,
    PAGE_SIZE,
    UNSPLASH_ACCESS_KEY,
    UNSPLASH_SECRET_KEY,
    CORS_ALLOWED_ORIGINS,
  };
};

export const currentEnv = process.env.NODE_ENV || "development";

export const isProductionEnv = currentEnv === "production";

export const isTestEnv = currentEnv === "test";

export const isStagingEnv = currentEnv === "staging";

export const isDevEnv = currentEnv === "development";

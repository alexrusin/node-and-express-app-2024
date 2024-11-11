const config = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "3000"),
  debug: process.env.APP_DEBUG === "true",
  appSecret: process.env.APP_SECRET || "",
  issuerBaseUrl: process.env.ISSUER_BASE_URL || "",
  audience: process.env.AUDIENCE || "",
};

export default config;

const config = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "3000"),
  debug: process.env.APP_DEBUG === "true",
  logLevel: process.env.LOG_LEVEL || "info",
  consoleLogEmails: process.env.CONSOLE_LOG_EMAILS === "true",
  defaultPageSize: parseInt(process.env.DEFAULT_PAGE_SIZE || "5"),
  appSecret: process.env.APP_SECRET || "",
  issuerBaseUrl: process.env.ISSUER_BASE_URL || "https://ussuer.com",
  audience: process.env.AUDIENCE || "default-audience",
  mail: {
    mailer: process.env.MAIL_MAILER || "smtp",
    host: process.env.MAIL_HOST || "",
    port: Number(process.env.MAIL_PORT) || 0,
    username: process.env.MAIL_USERNAME || "",
    password: process.env.MAIL_PASSWORD || "",
  },
  adminEmail: process.env.ADMIN_EMAIL || "",
};

export default config;

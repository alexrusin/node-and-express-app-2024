import { mailer as mailtrapMailer } from "./mailtrap-mailer";
import { IMailer } from "./interface";
import { mailer as consoleLogMailer } from "./console-log-mailer";
import config from "@/config";

let mailer: IMailer = mailtrapMailer;

if (config.consoleLogEmails) {
  mailer = consoleLogMailer;
}

export { mailer };

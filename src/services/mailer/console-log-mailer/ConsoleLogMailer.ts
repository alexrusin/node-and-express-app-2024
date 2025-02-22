import { IMailer, IMailNotification } from "../interface";

export class ConsoleLogMailer implements IMailer {
  async send(mailNotification: IMailNotification) {
    console.log(mailNotification.text);
  }
}

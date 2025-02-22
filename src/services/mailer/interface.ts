export interface IMailNotification {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export interface IMailer {
  send(mailNotification: IMailNotification): Promise<void>;
}

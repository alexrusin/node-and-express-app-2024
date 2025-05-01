import nodemailer from "nodemailer";
import config from "@/config";
import { MailtrapMailer } from "@/services/mailer/mailtrap-mailer/MailtrapMailer";
import { IMailNotification } from "@/services/mailer/interface";

const sendMailMock = jest.fn().mockResolvedValue("Email sent successfully");

jest.mock("nodemailer", () => ({
  createTransport: jest.fn(() => ({
    sendMail: sendMailMock,
  })),
}));

describe("MailtrapMailer", () => {
  let mailer: MailtrapMailer;

  beforeEach(() => {
    mailer = new MailtrapMailer();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should send an email with correct parameters", async () => {
    const mailNotification: IMailNotification = {
      to: "recipient@example.com",
      subject: "Test Subject",
      text: "Test email content",
      html: "<p>Test email content</p>",
    };

    await mailer.send(mailNotification);

    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      host: config.mail.host,
      port: config.mail.port,
      auth: {
        user: config.mail.username,
        pass: config.mail.password,
      },
    });

    expect(sendMailMock).toHaveBeenCalledTimes(1);
    expect(sendMailMock).toHaveBeenCalledWith({
      from: '"Task Manager" <notifications@taskmanager.com>',
      to: "recipient@example.com",
      subject: "Test Subject",
      text: "Test email content",
      html: "<p>Test email content</p>",
    });
  });
});

import { fieldInformation } from "./fieldsCheck";

export enum MailSubmission {
  NAME = "name",
  EMAIL = "email",
  MESSAGE = "message",
  SUBJECT = "subject",
}

export const mailRegexPatterns: { [key: string]: fieldInformation } = {
  [MailSubmission.NAME]: { regex: /^[a-zA-Z ]+$/, required: true },
  [MailSubmission.EMAIL]: {
    regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    required: true,
  },
  [MailSubmission.MESSAGE]: { regex: /^[a-zA-Z0-9\s,'-]*$/, required: true },
};

type mailData = {
  sender: {
    name: string;
    email: string;
  };
  receiver: {
    name: string;
    email: string;
  };
  subject: string;
  message: string;
  type?: string;
  headers?: { [key: string]: string };
};

export const sendMail = (data: mailData) => {
  const send_request = new Request("https://api.mailchannels.net/tx/v1/send", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...data.headers,
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: data.receiver.email, name: data.receiver.name }],
        },
      ],
      from: {
        email: data.sender.email,
        name: data.sender.name,
      },
      subject: data.subject,
      content: [
        {
          type: data.type ?? "text/plain",
          value: data.message,
        },
      ],
    }),
  });
};

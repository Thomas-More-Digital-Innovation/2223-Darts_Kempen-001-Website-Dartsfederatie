import { fieldInformation } from "./fieldsCheck";

export enum MailSubmission {
  SENDER_NAME = "senderName",
  SENDER_EMAIL = "senderEmail",
  RECEIVER_NAME = "receiverName",
  RECEIVER_EMAIL = "receiverEmail",
  MESSAGE = "message",
  SUBJECT = "subject",
}

export const mailRegexPatterns: { [key: string]: fieldInformation } = {
  [MailSubmission.SENDER_NAME]: {
    regex: /^[a-zA-Z ]{2,30}$/,
  },
  [MailSubmission.SENDER_EMAIL]: {
    regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  [MailSubmission.RECEIVER_NAME]: {
    regex: /^[a-zA-Z ]{2,30}$/,
  },
  [MailSubmission.RECEIVER_EMAIL]: {
    regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  [MailSubmission.SUBJECT]: {
    regex: /^[a-zA-Z ]{2,30}$/,
  },
  [MailSubmission.MESSAGE]: {
    regex: /^[a-zA-Z ]{2,30}$/,
  },
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
  console.log("sendMail");
  console.log(data);
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
  console.log("send_request");
  console.log(send_request);
};

import { changeData } from "../../../modules/general";
import { PagesEnv } from "../env";
import { mailRegexPatterns, sendMail } from "../../../modules/mail";

type MailSubmission = {
  senderName: string;
  senderEmail: string;
  receiverName: string;
  receiverEmail: string;
  message: string;
  subject: string;
};

export const onRequestPost: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    let formData = await request.formData();

    console.log("formData")
    console.log(formData)

    let data: MailSubmission = await changeData(
      mailRegexPatterns,
      {},
      formData
    );

    console.log("data")
    console.log(data)

    sendMail({
      message: data.message,
      subject: data.subject,
      receiver: {
        name: data.receiverName,
        email: "bryan.deckers1@gmail.com", // data.receiverEmail,
      },
      sender: {
        name: data.senderName,
        email: data.senderEmail,
      },
    });

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
};

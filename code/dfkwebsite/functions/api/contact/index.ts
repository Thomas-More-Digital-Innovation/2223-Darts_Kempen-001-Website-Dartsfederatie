import { changeData } from "../../../modules/general";
import { PagesEnv } from "../env";
import { mailRegexPatterns, sendMail } from "../../../modules/mail";

type MailSubmission = {
  name: string;
  email: string;
  message: string;
  subject: string;
};

export const onRequestPost: PagesFunction<PagesEnv> = async ({
  request,
  env,
}) => {
  try {
    let formData = await request.formData();

    let data: MailSubmission = await changeData(
      mailRegexPatterns,
      {},
      formData
    );

    sendMail({
        message: data.message,
        subject: data.subject,
        receiver: {
            name: "Joske paljaske",
            email: "",
        },
        sender: {
            name: data.name,
            email: data.email,
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

interface ContactEnv {
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
}

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
}

interface PagesFunctionContext {
  request: Request;
  env: ContactEnv;
}

const recipient = "akshaansingh.2018@gmail.com";

function jsonResponse(body: object, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function readField(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export const onRequestPost = async ({
  request,
  env,
}: PagesFunctionContext): Promise<Response> => {
  if (!env.RESEND_API_KEY || !env.RESEND_FROM_EMAIL) {
    console.error("Contact form requires RESEND_API_KEY and RESEND_FROM_EMAIL.");
    return jsonResponse({ error: "The contact form is not configured." }, 503);
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return jsonResponse({ error: "Invalid form submission." }, 400);
  }

  const values: ContactForm = {
    name: readField(formData, "name"),
    email: readField(formData, "email"),
    subject: readField(formData, "subject"),
    message: readField(formData, "message"),
    website: readField(formData, "website"),
  };

  if (values.website) {
    return jsonResponse({ success: true });
  }

  if (
    !values.name ||
    !values.email ||
    !values.subject ||
    !values.message ||
    values.name.length > 100 ||
    values.email.length > 254 ||
    values.subject.length > 150 ||
    values.message.length > 5000 ||
    !/^[^\s@]+@[^.\s@]+(?:\.[^.\s@]+)+$/.test(values.email) ||
    /[\r\n]/.test(values.subject)
  ) {
    return jsonResponse(
      { error: "Please check the form fields and try again." },
      400,
    );
  }

  let resendResponse: Response;
  try {
    resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${env.RESEND_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: env.RESEND_FROM_EMAIL,
        to: [recipient],
        reply_to: values.email,
        subject: `Subject: ${values.subject}`,
        text: [
          `Name: ${values.name}`,
          `Email: ${values.email}`,
          "",
          values.message,
        ].join("\n"),
      }),
    });
  } catch (error) {
    console.error("Resend request failed", error);
    return jsonResponse({ error: "Unable to send your message right now." }, 502);
  }

  if (!resendResponse.ok) {
    console.error("Resend rejected contact email", {
      status: resendResponse.status,
      response: await resendResponse.text(),
    });
    return jsonResponse({ error: "Unable to send your message right now." }, 502);
  }

  return jsonResponse({ success: true });
};

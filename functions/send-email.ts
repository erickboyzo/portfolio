import { Env } from "./api.env";

interface Personalization {
  to: EmailAddress[];
  cc?: EmailAddress[];
  bcc?: EmailAddress[];
}

interface Content {
  type: string;
  value: string;
}

interface MessageBodyRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface SendGridBodyRequest {
  personalizations: Personalization[];
  from: EmailAddress;
  replyTo: EmailAddress;
  subject: string;
  content: Content[];
  mailSettings: { bypassListManagement: { enable: boolean }; footer: { enable: boolean }; sandboxMode: { enable: boolean } };
  trackingSettings: { clickTracking: { enable: boolean; enableText: boolean }; openTracking: { enable: boolean; substitutionTag: string }; subscriptionTracking: { enable: boolean } };
}

interface EmailAddress {
  email: string;
  name?: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  try {
    const sendGridApiKey = context.env.SEND_GRID_API_KEY;
    const destinationEmail = context.env.EMAIL_ADDRESS;
    const fromEmailAddress = context.env.SENDER_EMAIL_ADDRESS;

    if (!sendGridApiKey) {
      console.warn("Missing sendGridApiKey");
      return generateResponse(500, "An error occurred.");
    }

    if (!destinationEmail || !fromEmailAddress) {
      console.warn("Missing email address");
      return generateResponse(500, "An error occurred.");
    }

    const body = (await context.request.json())['body'] as MessageBodyRequest;
    const { name, email, subject, message } = body;

    if (![name, email, subject, message].every((val) => Boolean(val))) {
      console.warn("Missing required field");
      return generateResponse(500, "An error occurred. Missing Required Fields.");
    }

    const response = await sendGridApiRequest(prepareEmailRequest(destinationEmail, fromEmailAddress, body), sendGridApiKey);

    if (response.ok) {
      return generateResponse(200, "Email sent successfully!");
    } else {
      const errorBody = await response.text(); // Get error details from SendGrid
      console.error("SendGrid Error:", response.status, errorBody); // Log the error
      return generateResponse(response.status, "Failed to send email.");
    }
  } catch (error) {
    return generateResponse(500, "An error occurred.");
  }
};

const sendGridApiRequest = (message: SendGridBodyRequest, sendGridApiKey: string) => {
  return fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sendGridApiKey}`,
    },
    body: JSON.stringify(message),
  });
};

const generateResponse = (
  status: number,
  error: string,
  headers: Record<string, string> = {
    "Content-Type": "application/json",
  },
): Response => {
  return new Response(JSON.stringify({ error }), {
    status,
    headers,
  });
};

const prepareEmailRequest = (destinationEmail: string, fromEmailAddress: string, { name, subject, message, email }: MessageBodyRequest): SendGridBodyRequest => {
  return {
    personalizations: [
      {
        to: [
          {
            email: destinationEmail,
          },
        ],
        cc: [
          {
            email,
            name,
          },
        ],
      },
    ],
    from: {
      email: fromEmailAddress,
    },
    replyTo: {
      email: fromEmailAddress,
    },
    subject: `New message from ${name}: ${subject}`,
    content: [
      {
        type: "text/html",
        value: `<p>New Message recieved from contact me page.</p><br><p><strong>Contact Email: </strong>${email}</p><br><p>${message}</p>`,
      },
    ],
    mailSettings: {
      bypassListManagement: {
        enable: false,
      },
      footer: {
        enable: false,
      },
      sandboxMode: {
        enable: false,
      },
    },
    trackingSettings: {
      clickTracking: {
        enable: true,
        enableText: false,
      },
      openTracking: {
        enable: false,
        substitutionTag: "%open-track%",
      },
      subscriptionTracking: {
        enable: false,
      },
    },
  };
};

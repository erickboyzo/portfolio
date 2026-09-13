import { Env } from './api.env';

interface MessageBodyRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface TelegramMessageRequest {
  chat_id: string;
  text: string;
  parse_mode: 'HTML';
  disable_web_page_preview: boolean;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  try {
    const botToken = context.env.TELEGRAM_BOT_TOKEN;
    const chatId = context.env.TELEGRAM_CHAT_ID;

    if (!botToken) {
      console.warn('Missing telegramBotToken');
      return generateResponse(500, 'An error occurred.');
    }

    if (!chatId) {
      console.warn('Missing telegramChatId');
      return generateResponse(500, 'An error occurred.');
    }

    const body = (await context.request.json())['body'] as MessageBodyRequest;
    const { name, email, subject, message } = body;

    if (![name, email, subject, message].every((val) => Boolean(val))) {
      console.warn('Missing required field');
      return generateResponse(500, 'An error occurred. Missing Required Fields.');
    }

    const response = await telegramApiRequest(prepareTelegramMessage(chatId, body), botToken);

    if (response.ok) {
      return generateResponse(200, 'Message sent successfully!');
    } else {
      const errorBody = await response.text();
      console.error('Telegram Error:', response.status, errorBody);
      return generateResponse(response.status, 'Failed to send message.');
    }
  } catch (error) {
    console.error('Message send failed:', error);
    return generateResponse(500, 'An error occurred.');
  }
};

const telegramApiRequest = (message: TelegramMessageRequest, botToken: string) => {
  return fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
};

const generateResponse = (
  status: number,
  error: string,
  headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
): Response => {
  return new Response(JSON.stringify({ error }), {
    status,
    headers,
  });
};

const escapeHtml = (value: string): string => {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

const prepareTelegramMessage = (
  chatId: string,
  { name, subject, message, email }: MessageBodyRequest
): TelegramMessageRequest => {
  const text = [
    '<b>New message from contact me page</b>',
    '',
    `<b>Name:</b> ${escapeHtml(name)}`,
    `<b>Email:</b> ${escapeHtml(email)}`,
    `<b>Subject:</b> ${escapeHtml(subject)}`,
    '',
    escapeHtml(message),
  ].join('\n');

  return {
    chat_id: chatId,
    text,
    parse_mode: 'HTML',
    disable_web_page_preview: true,
  };
};

import { APIError } from '../middleware/errorHandler';

type EmailAdapter = 'sendgrid' | 'resend';

const provider: EmailAdapter | null = process.env.RESEND_API_KEY
  ? 'resend'
  : process.env.SENDGRID_API_KEY
    ? 'sendgrid'
    : null;

export const sendWelcomeEmail = async (to: string) => {
  if (!provider) throw new APIError(500, 'EMAIL_NOT_CONFIGURED', 'Email provider not configured');
  if (provider === 'resend') {
    const { Resend } = await import('resend');
    const client = new Resend(process.env.RESEND_API_KEY);
    await client.emails.send({
      from: process.env.RESEND_FROM || 'no-reply@example.com',
      to,
      subject: 'Welcome!',
      html: '<p>Welcome to our app.</p>'
    });
    return;
  }
  if (provider === 'sendgrid') {
    const sgMail = await import('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
    await sgMail.send({
      to,
      from: process.env.SENDGRID_FROM || 'no-reply@example.com',
      subject: 'Welcome!',
      html: '<p>Welcome to our app.</p>'
    });
    return;
  }
};

export const sendResetEmail = async (to: string, token: string) => {
  if (!provider) throw new APIError(500, 'EMAIL_NOT_CONFIGURED', 'Email provider not configured');
  const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset?token=${token}`;
  if (provider === 'resend') {
    const { Resend } = await import('resend');
    const client = new Resend(process.env.RESEND_API_KEY);
    await client.emails.send({
      from: process.env.RESEND_FROM || 'no-reply@example.com',
      to,
      subject: 'Password Reset',
      html: `<p>Click to reset: <a href="${resetLink}">${resetLink}</a></p>`
    });
    return;
  }
  if (provider === 'sendgrid') {
    const sgMail = await import('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
    await sgMail.send({
      to,
      from: process.env.SENDGRID_FROM || 'no-reply@example.com',
      subject: 'Password Reset',
      html: `<p>Click to reset: <a href="${resetLink}">${resetLink}</a></p>`
    });
    return;
  }
};


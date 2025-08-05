import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';
import * as React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, isAnonymous, recaptchaToken } = body;

    // Verify reCAPTCHA token
    if (!recaptchaToken) {
      return Response.json({ error: 'reCAPTCHA token is required' }, { status: 400 });
    }

    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`
    });

    const recaptchaData = await recaptchaResponse.json();
    
    if (!recaptchaData.success) {
      console.error('reCAPTCHA verification failed:', recaptchaData);
      return Response.json({ error: 'reCAPTCHA verification failed' }, { status: 400 });
    }

    // Check if score is too low (likely a bot)
    if (recaptchaData.score < 0.5) {
      console.log('Bot detected - reCAPTCHA score:', recaptchaData.score);
      return Response.json({ error: 'Bot detected' }, { status: 400 });
    }

    // Validate required fields
    if (!message || message.trim().length === 0) {
      return Response.json({ error: 'Message is required' }, { status: 400 });
    }

    // If not anonymous, validate name and email
    if (!isAnonymous) {
      if (!name || name.trim().length === 0) {
        return Response.json({ error: 'Name is required when not sending anonymously' }, { status: 400 });
      }
      if (!email || email.trim().length === 0) {
        return Response.json({ error: 'Email is required when not sending anonymously' }, { status: 400 });
      }
      // Basic email validation
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        return Response.json({ error: 'Please enter a valid email address' }, { status: 400 });
      }
    }

    // Get the recipient email from environment variable or use a default
    const recipientEmail = ['byers.jacob@gmail.com', 'michaelbernallifecoach@gmail.com'];

    const { data, error } = await resend.emails.send({
      from: 'Denver Contact Improv <noreply@denvercontactimprov.com>',
      to: recipientEmail,
      subject: isAnonymous ? "Anonymous Contact Form Submission" : `Contact Form Submission from ${name}`,
      react: EmailTemplate({ 
        name: isAnonymous ? undefined : name,
        email: isAnonymous ? undefined : email,
        message: message.trim(),
        isAnonymous 
      }) as React.ReactElement,
    });

    if (error) {
      console.error('Resend error:', error);
      return Response.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return Response.json({ success: true, data });
  } catch (error) {
    console.error('API error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
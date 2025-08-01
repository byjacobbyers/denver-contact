import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';
import * as React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, isAnonymous } = body;

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
    const recipientEmail = process.env.CONTACT_EMAIL || 'contact@denvercontactimprov.com';

    const { data, error } = await resend.emails.send({
      from: 'Denver Contact Improv <noreply@denvercontactimprov.com>',
      to: [recipientEmail],
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
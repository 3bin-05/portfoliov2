import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { z } from 'zod';

// Initialize Upstash Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Create a new ratelimiter, that allows 50 requests per 15 minutes
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(50, '15 m'),
  analytics: true,
});

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(5, 'Message must be at least 5 characters'),
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 1. Rate Limiting
  const identifier = req.headers['x-forwarded-for'] || 'anonymous';
  const { success, limit, reset, remaining } = await ratelimit.limit(identifier);

  if (!success) {
    return res.status(429).json({
      error: 'Too many requests. Please try again later.',
      limit,
      remaining,
      reset,
    });
  }

  // 2. Input Sanitization/Validation
  try {
    const validatedData = contactSchema.parse(req.body);

    // 3. Send Email via EmailJS REST API
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: process.env.VITE_EMAILJS_SERVICE_ID,
        template_id: process.env.VITE_EMAILJS_TEMPLATE_ID,
        user_id: process.env.VITE_EMAILJS_PUBLIC_KEY,
        template_params: {
          from_name: validatedData.name,
          from_email: validatedData.email,
          message: validatedData.message,
          to_name: 'Ebin',
        },
      }),
    });

    if (response.ok) {
      return res.status(200).json({ message: 'Email sent successfully' });
    } else {
      const errorData = await response.text();
      console.error('EmailJS Error:', errorData);
      return res.status(500).json({ error: 'Failed to send email' });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

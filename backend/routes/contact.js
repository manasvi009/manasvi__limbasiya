import express from 'express';

const router = express.Router();

// Contact form submission (in production, integrate with email service like SendGrid)
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // TODO: Integrate with email service like SendGrid or Resend
    // For now, just log and return success
    console.log('[v0] Contact form submission:', { name, email, message, timestamp: new Date() });

    res.json({
      message: 'Message sent successfully. We will get back to you soon!',
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('[v0] Contact form error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

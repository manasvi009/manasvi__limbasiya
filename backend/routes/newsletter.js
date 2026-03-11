import express from 'express';
import NewsletterSubscriber from '../models/NewsletterSubscriber.js';

const router = express.Router();

// Subscribe to newsletter
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const existing = await NewsletterSubscriber.findOne({ email });
    if (existing) {
      if (existing.subscribed) {
        return res.status(400).json({ error: 'Already subscribed' });
      }
      existing.subscribed = true;
      await existing.save();
      return res.json({ message: 'Resubscribed successfully' });
    }

    const subscriber = new NewsletterSubscriber({ email });
    await subscriber.save();

    res.status(201).json({
      message: 'Subscribed successfully',
      subscriber,
    });
  } catch (error) {
    console.error('[v0] Newsletter subscribe error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Unsubscribe from newsletter
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const subscriber = await NewsletterSubscriber.findOne({ email });
    if (!subscriber) {
      return res.status(404).json({ error: 'Subscriber not found' });
    }

    subscriber.subscribed = false;
    await subscriber.save();

    res.json({ message: 'Unsubscribed successfully' });
  } catch (error) {
    console.error('[v0] Newsletter unsubscribe error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

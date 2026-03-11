import express from 'express';
import Comment from '../models/Comment.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get comments for a post
router.get('/post/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({
      post: req.params.postId,
      approved: true,
    })
      .populate('author', 'name avatar')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    console.error('[v0] Get comments error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create comment
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { content, post } = req.body;

    if (!content || !post) {
      return res.status(400).json({ error: 'Content and post ID required' });
    }

    const comment = new Comment({
      content,
      post,
      author: req.userId,
    });

    await comment.save();
    await comment.populate('author', 'name avatar');

    res.status(201).json({
      message: 'Comment created successfully',
      comment,
    });
  } catch (error) {
    console.error('[v0] Create comment error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update comment
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (comment.author.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    if (req.body.content) {
      comment.content = req.body.content;
    }

    await comment.save();

    res.json({
      message: 'Comment updated successfully',
      comment,
    });
  } catch (error) {
    console.error('[v0] Update comment error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete comment
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (comment.author.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await Comment.findByIdAndDelete(req.params.id);

    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('[v0] Delete comment error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

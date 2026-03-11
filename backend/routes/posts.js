import express from 'express';
import BlogPost from '../models/BlogPost.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search, tag, category } = req.query;
    const skip = (page - 1) * limit;

    let query = { published: true };

    if (search) {
      query = { ...query, $text: { $search: search } };
    }
    if (tag) {
      query = { ...query, tags: tag };
    }
    if (category) {
      query = { ...query, category };
    }

    const posts = await BlogPost.find(query)
      .populate('author', 'name avatar')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await BlogPost.countDocuments(query);

    res.json({
      posts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (error) {
    console.error('[v0] Get posts error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get single post by slug
router.get('/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug })
      .populate('author', 'name avatar email');

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Increment views
    post.views += 1;
    await post.save();

    res.json(post);
  } catch (error) {
    console.error('[v0] Get post error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create post (authenticated)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, content, excerpt, tags, category, image, slug } = req.body;

    if (!title || !content || !excerpt || !slug) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const post = new BlogPost({
      title,
      content,
      excerpt,
      tags: tags || [],
      category: category || 'General',
      image: image || 'https://via.placeholder.com/800x400?text=Blog+Post',
      slug: slug.toLowerCase().replace(/\s+/g, '-'),
      author: req.userId,
    });

    await post.save();
    await post.populate('author', 'name avatar');

    res.status(201).json({
      message: 'Post created successfully',
      post,
    });
  } catch (error) {
    console.error('[v0] Create post error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update post
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const { title, content, excerpt, tags, category, image, published } = req.body;

    if (title) post.title = title;
    if (content) post.content = content;
    if (excerpt) post.excerpt = excerpt;
    if (tags) post.tags = tags;
    if (category) post.category = category;
    if (image) post.image = image;
    if (published !== undefined) post.published = published;

    await post.save();

    res.json({
      message: 'Post updated successfully',
      post,
    });
  } catch (error) {
    console.error('[v0] Update post error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete post
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await BlogPost.findByIdAndDelete(req.params.id);

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('[v0] Delete post error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

import express from 'express';
import Project from '../models/Project.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all projects
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, featured = false } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (featured === 'true') {
      query.featured = true;
    }

    const projects = await Project.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Project.countDocuments(query);

    res.json({
      projects,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (error) {
    console.error('[v0] Get projects error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get single project by slug
router.get('/:slug', async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    project.views += 1;
    await project.save();

    res.json(project);
  } catch (error) {
    console.error('[v0] Get project error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create project (authenticated)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, description, slug, content, image, technologies, links, featured } = req.body;

    if (!title || !description || !slug) {
      return res.status(400).json({ error: 'Title, description, and slug required' });
    }

    const project = new Project({
      title,
      description,
      slug: slug.toLowerCase().replace(/\s+/g, '-'),
      content: content || '',
      image: image || 'https://via.placeholder.com/800x600?text=Project',
      technologies: technologies || [],
      links: links || {},
      featured: featured || false,
    });

    await project.save();

    res.status(201).json({
      message: 'Project created successfully',
      project,
    });
  } catch (error) {
    console.error('[v0] Create project error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update project
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const { title, description, content, image, technologies, links, featured } = req.body;

    if (title) project.title = title;
    if (description) project.description = description;
    if (content !== undefined) project.content = content;
    if (image) project.image = image;
    if (technologies) project.technologies = technologies;
    if (links) project.links = links;
    if (featured !== undefined) project.featured = featured;

    await project.save();

    res.json({
      message: 'Project updated successfully',
      project,
    });
  } catch (error) {
    console.error('[v0] Update project error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete project
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('[v0] Delete project error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

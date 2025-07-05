import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import User from '../models/User.js';
import Post from '../models/Post.js';

const router = express.Router();

// @desc    Get all users (admin only)
// @route   GET /api/admin/users
router.get('/users', protect, admin, async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
});

// @desc    Delete user (admin only)
// @route   DELETE /api/admin/users/:id
router.delete('/users/:id', protect, admin, async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (user) {
    // Delete all user posts first
    await Post.deleteMany({ author: user._id });
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
router.get('/stats', protect, admin, async (req, res) => {
  const stats = {
    users: await User.countDocuments(),
    posts: await Post.countDocuments(),
    categories: await Category.countDocuments()
  };
  res.json(stats);
});

export default router;

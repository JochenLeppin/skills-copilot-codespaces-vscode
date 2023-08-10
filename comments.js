// Create web server application with Node.js

// Import modules

const express = require('express');
const router = express.Router();    
const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');
const { check, validationResult } = require('express-validator');
const { ensureAuthenticated } = require('../config/auth');

// Create comment
router.post('/', ensureAuthenticated, [
    check('content').isLength({ min: 1 }).withMessage('Comment cannot be empty!'),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.redirect('back');
        }
        const comment = new Comment({
            content: req.body.content,
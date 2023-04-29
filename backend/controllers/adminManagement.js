const { validationResult } = require('express-validator');

const Post = require('../models/post');
const db = require('../util/database');

exports.fetchAll = async (req, res, next) => {
  try {
    const [allPosts] = await Post.fetchAll();
    res.status(200).json(allPosts);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.absences =async (req, res) => {
  try {
    const query = 'SELECT userId, COUNT(*) as count FROM absence GROUP BY userId';
    const result = await db.query(query);
    console.log("res",result );
     return res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}

exports.monthly = async (req, res) => {
  try {
    const query = `
    SELECT
    DATE_FORMAT(date_absence, '%M') AS monthabs,
    COUNT(*) AS nbuser
  FROM
    absence
  GROUP BY
    DATE_FORMAT(date_absence, '%M');
  
    `;
    const result = await db.query(query);
    return res.json(result[0]);

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}


exports.visitcount =async (req, res) => {
  try {
    const query = 'SELECT COUNT(*) as nbvisit FROM visite ';
    const result = await db.query(query);
    console.log("res",result );
     return res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}

exports.userscount =async (req, res) => {
  try {
    const query = 'SELECT COUNT(*) as nbuser FROM users ';
    const result = await db.query(query);
    console.log("res",result );
     return res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}



exports.postPost = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const title = req.body.title;
  const body = req.body.body;
  const user = req.body.user;

  try {
    const post = {
      title: title,
      body: body,
      user: user,
    };
    const result = await Post.save(post);
    res.status(201).json({ message: 'Posted!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const deleteResponse = await Post.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

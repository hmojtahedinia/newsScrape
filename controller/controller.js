/* eslint-disable no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-undef */
const express = require('express');

const router = express.Router();
const path = require('path');

const request = require('request');
const cheerio = require('cheerio');

const comment = require('../models/Comment.js');
const Article = require('../models/Article.js');

router.get('/', (req, res) => {
  res.redirect('/articles');
});

router.get('/scrape', (req, res) => {
  request('https://www.medicalnewstoday.com/', (error, response, html) => {
    const $ = cheerio.load(html);
    const titleArray = [];

    $('.featured').each((i, element) => {
      const result = {};

      result.title = $(this).find('a').attr('title');
      result.link = $(this).find('a').attr('href');
      result.description = $(this).find('em').text();

      if (result.title !== '' && result.link !== '') {
        if (titlesArray.indexOf(result.title) === -1) {
          titlesArray.push(result.title);

          Article.count({ title: result.title }, (err, test) => {
            if (test === 0) {
              const entry = new Article(result);

              entry.save((err, doc) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(doc);
                }
              });
            }
          });
        } else {
          console.log('Article already exists.');
        }
      } else {
        console.log('Not saved to DB. Missing data');
      }
    });
    res.redirect('/');
  });
});

router.get('/articles', (req, res) => {
  Article.find().sort({ _id: -1 }).exec((err, doc) => {
    if (err) {
      console.log(err);
    } else {
      const artcl = { article: doc };
      res.render('index', artcl);
    }
  });
});

reouter.get('/articles-json', (req, res) => {
  Article.find({}, (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      res.json(doc);
    }
  });
});

module.exports = router;

const express = require('express');
const router = express.Router({ mergeParams: true });

const { getReviews } = require('../controllers/reviews');

const Review = require('../models/Review');
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router.route('/').get(
  advancedResults(Review, {
    path: 'bootcamp',
    select: ['name', 'description'],
  }),
  getReviews
);
//   .post(protect, authorize('publisher', 'admin'), addCourse);
router;
//   .route('/:id')
//   .get(getCourse)
//   .put(protect, authorize('publisher', 'admin'), updateCourse)
//   .delete(protect, authorize('publisher', 'admin'), deleteCourse);

module.exports = router;

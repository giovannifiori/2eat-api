import express from 'express';
import ReviewController from '../controllers/review';
import checkAuth from '../middleware/auth';

const router = express.Router();
const review = new ReviewController();

router.use(checkAuth);

router.route('/').get(review.getAll).post(review.create);
router.route('/review/:id').get(review.getById).delete(review.delete).patch(review.update);
router.route('/review/:id/comments').get(review.getRecipeReviewComments);
router.route('/recipe/:recipeId').get(review.getRecipeReviews);
router.route('/user/:userId/recipe/:recipeId').get(review.getUserDidReview);

export { router as reviewRouter };

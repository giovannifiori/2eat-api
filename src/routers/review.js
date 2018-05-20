import express from 'express';
import ReviewController from '../controllers/review';
import checkAuth from '../middleware/auth';

const router = express.Router();
const review = new ReviewController();

router.use(checkAuth);

router.route('/').post(review.create);
router.route('/review/:id').get(review.getById).delete(review.delete);
router.route('/review/:id/comments').get(review.getRecipeReviewComments);
router.route('/recipe/:recipeId').get(review.getRecipeReviews);

export { router as reviewRouter };
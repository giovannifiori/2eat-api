import express from 'express';
import ReviewController from '../controllers/review';

const router = express.Router();
const review = new ReviewController();

router.route('/').post(review.create);
router.route('/review/:id').get(review.getById).delete(review.delete);
router.route('/recipe/:recipeId').get(review.getRecipeReviews);

export { router as reviewRouter };
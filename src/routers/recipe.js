import express from 'express';
import RecipeController from '../controllers/recipe';
import checkAuth from '../middleware/auth';

const router = express.Router();
const recipe = new RecipeController();

router.use(checkAuth);

router.route('/').get(recipe.getAll).post(recipe.create);
router.route('/recipe/:id').get(recipe.getById).patch(recipe.update).delete(recipe.delete);
router.route('/user/:userId').get(recipe.getUserRecipes);
router.route('/user/:userId/feed').get(recipe.getFeed);
router.route('/search/:title').get(recipe.findByTitle);

export { router as recipeRouter };
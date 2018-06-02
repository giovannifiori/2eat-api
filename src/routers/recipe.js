import express from 'express';
import RecipeController from '../controllers/recipe';
import checkAuth from '../middleware/auth';
import multer from 'multer';
import path from 'path';

const router = express.Router();
const recipe = new RecipeController();

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/recipes');
    },
    filename: (req, file, callback) => {
        callback(null, 'recipe' + new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, callback) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        callback(null, true);
    }else{
        callback(new Error('INVALID_MIMETYPE'), false);
    }
};

const upload = multer({ 
    storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter 
});

router.use(checkAuth);

router.route('/').get(recipe.getAll).post(upload.single('image'), recipe.create);
router.route('/recipe/:id').get(recipe.getById).patch(recipe.update).delete(recipe.delete);
router.route('/user/:userId').get(recipe.getUserRecipes);
router.route('/user/:userId/feed').get(recipe.getFeed);
router.route('/search/:title').get(recipe.findByTitle);

export { router as recipeRouter };
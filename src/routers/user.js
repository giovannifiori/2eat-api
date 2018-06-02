import express from 'express';
import UserController from '../controllers/user';
import checkAuth from '../middleware/auth';
import multer from 'multer';
import path from 'path';

const user = new UserController();
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/users');
    },
    filename: (req, file, callback) => {
        callback(null, 'user' + new Date().toISOString() + file.originalname);
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

router.route('/').get(checkAuth, user.getAll).post(upload.single('image'), user.create);
router.route('/search/:name').get(checkAuth, user.find);
router.route('/auth').get(checkAuth, user.validate).post(user.authorize);
router.route('/user/:id').get(checkAuth, user.getById).patch(checkAuth, user.update).delete(checkAuth, user.delete);
router.route('/user/:id/follow/:followId').get(checkAuth, user.isFollowing).post(checkAuth, user.follow);
router.route('/user/:id/unfollow/:unfollowId').post(checkAuth, user.unfollow);
router.route('/user/:id/following').get(checkAuth, user.getFollowing);
router.route('/user/:id/followers').get(checkAuth, user.getFollowers);

export { router as userRouter };

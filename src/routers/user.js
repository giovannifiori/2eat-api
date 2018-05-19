import express from 'express';
import UserController from '../controllers/user';
import checkAuth from '../middleware/auth';

const user = new UserController();
const router = express.Router();

router.use(checkAuth);
router.route('/').get(user.getAll).post(user.create);
router.route('/search/:name').get(user.find);
router.route('/auth').post(user.authorize);
router.route('/user/:id').get(user.getById).patch(user.update).delete(user.delete);
router.route('/user/:id/follow/:followId').post(user.follow);
router.route('/user/:id/unfollow/:unfollowId').post(user.unfollow);
router.route('/user/:id/following').get(user.getFollowing);
router.route('/user/:id/followers').get(user.getFollowers);

export { router as userRouter };
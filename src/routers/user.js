import express from 'express';
import UserController from '../controllers/user';
import checkAuth from '../middleware/auth';

const user = new UserController();
const router = express.Router();

router.route('/').get(checkAuth, user.getAll).post(user.create);
router.route('/search/:name').get(checkAuth, user.find);
router.route('/auth').post(user.authorize);
router.route('/user/:id').get(checkAuth, user.getById).patch(checkAuth, user.update).delete(checkAuth, user.delete);
router.route('/user/:id/follow/:followId').post(checkAuth, user.follow);
router.route('/user/:id/unfollow/:unfollowId').post(checkAuth, user.unfollow);
router.route('/user/:id/following').get(checkAuth, user.getFollowing);
router.route('/user/:id/followers').get(checkAuth, user.getFollowers);

export { router as userRouter };
import Review from '../models/review';
import User from '../models/user';
import Comments from '../models/comments';

export default class ReviewController {

    getAll = (req, res) => {
        Review.findAll()
        .then(reviews => {
            if(!reviews || reviews.length == 0){
                return res.status(404).json({ message: 'No reviews found' });
            }
            res.status(200).json(reviews);
        })
        .catch(error => {
            res.status(500).json({ message: 'Error getting reviews', error });
        });
    };

    create = (req, res) => {
        Review.create({
            user_id: req.body.userId,
            recipe_id: req.body.recipeId,
            grade: req.body.grade,
            text: req.body.text
        })
        .then(review => {
            res.status(201).json({ message: 'Review created', review });
        })
        .catch(error => {
            res.status(500).json({ message: 'Error creating review', error });
        });
    };

    getById = (req, res) => {
        Review.findOne({
            attributes: ['id', 'recipe_id', 'grade', 'text', 'created_at'],
            where: {
                id: req.params.id
            },
            include: [{ model: User, attributes: ['name', 'email'] }]
        })
        .then(review => {
            res.status(200).json(review);
        })
        .catch(error => {
            res.status(500).json({ message: 'Error getting review', error });
        });
    };
    
    delete = (req, res) => {
        Review.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(review => {
            res.status(200).json({ message: 'Review deleted' });
        })
        .catch(error => {
            res.status(500).json({ message: 'Error deleting review', error });
        });
    };

    getRecipeReviews = (req, res) => {
        Review.findAll({
            attributes: ['id', 'recipe_id', 'grade', 'text'],
            where: {
                recipe_id: req.params.recipeId
            },
            order: [['created_at', 'DESC']],
            include: [{ model: User, attributes: ['id', 'name'] }]
        })
        .then(reviews => {
            if(!reviews || reviews.length == 0){
                return res.status(404).json({ message: 'No reviews found for this recipe' });    
            }
            res.status(200).json(reviews);
        })
        .catch(error => {
            res.status(500).json({ message: 'Error getting reviews', error });
        });

    };

    getRecipeReviewComments = (req, res) => {
        Comments.findAll({
            attributes: ['comment_id', 'text'],
            where: {
                comment_id: req.params.id
            },
            order: [['created_at', 'DESC']],
            include: [{ model: User, attributes: ['id', 'name'] }]
        })
        .then(comments => {
            if(!comments || comments.length == 0){
                return res.status(404).json({ message: 'No comments found for this review' });    
            }
            res.status(200).json(comments);
        })
        .catch(error => {
            res.status(500).json({ message: 'Error getting review comments', error });
        });

    };
}
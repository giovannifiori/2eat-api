import Recipe from '../models/recipe';
import UserRelation from '../models/userRelation';
import Sequelize from 'sequelize';

const Op = Sequelize.Op;

export default class RecipeController {

    getAll = (req, res) => {
        Recipe.findAll()
        .then(recipes => {
            if(!recipes || recipes.length == 0){
                res.status(404).json({ message: 'No recipes found' });
            }
            res.status(200).json(recipes);
        })
        .catch(error => {
            res.status(500).json({ message: 'error getting recipes' });
        });
    };

    getById = (req, res) => {
        Recipe.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(recipe => {
            res.status(200).json(recipe);
        })
        .catch(error => {
            res.status(500).json({ message: 'Error getting recipe' });
        });
    };

    create = (req, res) => {
        Recipe.create(req.body)
        .then(recipe => {
            res.status(201).json({ message: 'Recipe created', recipe });
        })
        .catch(error => {
            res.status(500).json({ message: 'Error creating recipe', error });
        });
    };

    update = (req, res) => {
        Recipe.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        .then(recipe => {
            res.status(200).json({ message: 'Recipe updated', recipe });
        })
        .catch(error => {
            res.status(500).json({ message: 'Error updating recipe', error });
        });
    };

    delete = (req, res) => {
        Recipe.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(recipe => {
            res.status(200).json({ message: 'Recipe deleted', recipe });
        })
        .catch(error => {
            res.status(500).json({ message: 'Error deleting recipe', error });
        });
    };

    getFeed = (req, res) => {
        UserRelation.findAll({
            attributes: ['following_user_id'],
            where: {
                user_id: req.params.userId,
            },
            order: [['created_at', 'DESC']]
        })
        .then(following => {
            let people = [];
            for(let i=0; i<following.length; i++){
                people.push(following[i].following_user_id);
            }
            
            Recipe.findAll({
                where: {
                    user_id: {
                        [Op.in]: people
                    }
                }
            })
            .then(recipes => {
                if(!recipes || recipes.length == 0){
                    return res.status(404).json({ message: 'No recipes found' });
                }
                res.status(200).json(recipes)
            })
            .catch(error => {
                res.status(500).json({ message: 'Error deleting recipe', error });
            });
        })
        .catch(error => {
            res.status(500).json({ message: 'Error deleting recipe', error });
        });
    };

    getUserRecipes = (req, res) => {
        Recipe.findAll({
            where: {
                user_id: req.params.userId
            }
        })
        .then(recipes => {
            if(!recipes || recipes.length == 0){
                return res.status(404).json({ message: 'No recipes found' });
            }
            res.status(200).json(recipes);
        })
        .catch(error => {
            res.status(500).json({ message: 'Error fetching recipes', error });
        });
    };

    findByTitle = (req, res) => {
        Recipe.findAll({
            where: {
                title: {
                    [Op.like]: `%${req.params.title}%`
                }
            }
        })
        .then(recipes => {
            if(!recipes || recipes.length == 0){
                return res.status(404).json({ message: 'No recipes found' });
            }
            res.status(200).json(recipes);
        })
        .catch(error => {
            res.status(500).json({ message: 'Error fetching recipes', error });
        });
    };

}
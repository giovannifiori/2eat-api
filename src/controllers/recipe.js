import Recipe from '../models/recipe';
import UserRelation from '../models/userRelation';
import Sequelize from 'sequelize';
import Review from '../models/review';
import User from '../models/user';

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
            Review.findAndCountAll({
                attributes: ['grade'],
                where: {
                    recipe_id: recipe.id
                }
            })
            .then(result => {
                let reviewQty = result.count,
                average = 0;

                result.rows.forEach(e => {
                    average += e.grade;
                });
                average /= reviewQty;

                recipe.dataValues.average = average.toFixed(2);
                recipe.dataValues.reviewQty = reviewQty;

                res.status(200).json(recipe);
            })
            .catch(error => {
                res.status(500).json({ message: 'Error getting recipe 1' });
            });
        })
        .catch(error => {
            res.status(500).json({ message: 'Error getting recipe 2' });
        });
    };

    create = (req, res) => {
        Recipe.create({
            title: req.body.title,
            ingredients: req.body.ingredients,
            description: req.body.description,
            user_id: req.body.user_id,
            tags: req.body.tags,
            image_path: req.file.path
        })
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
        }).then(
          Review.destroy({
            where: {
                recipe_id: req.params.id
            }
        })
      ).then(recipe => {
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
            }
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
                },
                order: [['created_at', 'DESC']],
                include: [{ model: User, attributes: ['name', 'image_path'] }]
            })
            .then(async recipes => {
                if(!recipes || recipes.length == 0){
                    return res.status(404).json({ message: 'No recipes found' });
                }
                for (let i = 0; i < recipes.length; i++) {
                    await Review.sum('grade',{
                        where: {
                            recipe_id: recipes[i].id
                        }
                    }).then(async sum => {
                        await Review.count({
                            where: {
                                recipe_id: recipes[i].id
                            }
                        }).then(count => {
                            let average = sum/count;
                            let reviewQty = count;
                            recipes[i].dataValues.average = average.toFixed(2);
                            recipes[i].dataValues.reviewQty = reviewQty;
                        })
                        .catch(error => {
                            return res.status(500).json({ message: 'error counting', error });
                        });
                    })
                    .catch(error => {
                        return res.status(500).json({ message: 'error summing', error });
                    });
                }
                res.status(200).json(recipes);
            })
            .catch(error => {
                res.status(500).json({ message: 'Error getting feed', error });
            });
        })
        .catch(error => {
            res.status(500).json({ message: 'Error getting feed', error });
        });
    };

    getUserRecipes = (req, res) => {
        Recipe.findAll({
            where: {
                user_id: req.params.userId
            }
        })
        .then(async recipes => {
            if(!recipes || recipes.length == 0){
                return res.status(404).json({ message: 'No recipes found' });
            }
            for (let i = 0; i < recipes.length; i++) {
                const thisRecipe = recipes[i];
                await Review.count({
                    where: {
                        recipe_id: thisRecipe.id
                    }
                }).then(qty => {
                    thisRecipe.dataValues.reviewQty = qty;
                })
                .catch(error => {
                    return res.status(500).json({ message: 'Error counting reviews', error });
                })
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

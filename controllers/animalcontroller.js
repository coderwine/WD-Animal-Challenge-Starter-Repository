const express = require("express");
const router = express.Router();
const { Animal } = require("../models");

//! GET ALL
router.get('/', async (req,res) => {
    
    try{
        const allAnimals = await Animal.findAll();

        res.status(200).json(allAnimals);
    } catch (err) {
        res.status(500).json({
            error: err,
        })
    }
})

router.post('/create', async (req,res) => {
    const {
        name,
        legNumber,
        predator,
    } = req.body;

    try {
        const animal = await Animal.create({
            name,
            legNumber,
            predator,
            userID: req.user.id
        })

        res.status(201).json({
            msg: 'Animal Created!',
            animal
        })

    } catch (err) {
        res.status(500).json({
            msg: `Failed to create animal: ${err}`
        })

        console.log('ERROR MESSAGE: ', err)
    }
})

//! UPDATE
router.put('/:id', async (req,res) => {
    const {
        name,
        legNumber,
        predator,
    } = req.body;

    try {
        await Animal.update(
            {name, legNumber, predator},
            {where: {
                id: req.params.id,
                userID: req.user.id
                }
            }
        ).then(result => {
            res.status(200).json({
                msg: `Animal with ID: ${result} has been successfully updated`,
                updated: result
            })
        });
    } catch (error) {
        res.status(500).json({
            msg: `Failed to update animal: ${error}`
        })
    }
})

//! DELETE
router.delete('/:id', async (req,res) => {

    try {

        await Animal.destroy(
            {where: {
                id: req.params.id,
                userID: req.user.id
            }},
        ).then((results) => {
            res.status(200).json({
                msg: 'Animal destroyed!',
                deletedAnimal: results
            })
        });

    } catch (error) {
        res.status(500).json({
            msg: `Failed to destroy animal: ${error}`
        })
    }
})

module.exports = router;
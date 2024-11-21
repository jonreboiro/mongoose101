const Ikasle = require('../models/ikasle.model');

exports.getIkasleak = async (req, res, next) => {
    try {
        const ikasleak = await Ikasle.find();
        res.json(ikasleak);
    } catch (error) {
        next(error);
    }
};

exports.createIkasle = async (req, res, next) => {
    try {
        const ikasle = new Ikasle(req.body);
        const savedIkasle = await ikasle.save();
        res.status(201).json(savedIkasle);
    } catch (error) {
        next(error);
    }
};

exports.getIkasleById = async (req, res, next) => {
    try {
        const ikasle = await Ikasle.findById(req.params.id);
        if (!ikasle) {
            return res.status(404).json({ message: 'Ikaslea ez da aurkitu' });
        }
        res.json(ikasle);
    } catch (error) {
        next(error);
    }
};

// Gehitu beste kontroladoreak...

exports.deleteIkasleByID = async (req, res, next) => {
    try {
        const ikasle = await Ikasle.findByIdAndDelete(req.params.id);
        if (!ikasle) {
            return res.status(404).json({ message: 'Ikaslea ez da aurkitu' });
        }
        res.status(200).json({message: 'Ikaslea ezabatu da.'});
    } catch (error) {
        next(error);
    }
};

exports.editIkasle = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedIkasle = await Ikasle.findByIdAndUpdate(id, req.body, { 
            new: true, 
            runValidators: true 
        });

        if (!updatedIkasle) {
            return res.status(404).json({ message: 'Ikasle not found' });
        }

        res.status(200).json(updatedIkasle);
    } catch (error) {
        next(error);
    }
};
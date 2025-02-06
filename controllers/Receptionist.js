import { Receptionist } from "../models/models.js";

export const getReceptionists = async (req, res) => {
    try {
        const receptionists = await Receptionist.findAll();
        res.status(200).json(receptionists);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getReceptionistById = async (req, res) => {
    try {
        const receptionist = await Receptionist.findByPk(req.params.id);
        res.status(200).json(receptionist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const createReceptionist = async (req, res) => {
    try {
        const receptionist = await Receptionist.create(req.body);
        res.status(201).json(receptionist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateReceptionist = async (req, res) => {
    try {
        const receptionist = await Receptionist.findByPk(req.params.id);
        if (receptionist) {
            await receptionist.update(req.body);
            res.status(200).json(receptionist);
        } else {
            res.status(404).json({ error: 'Receptionist not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteReceptionist = async (req, res) => {
    try {
        const receptionist = await Receptionist.findByPk(req.params.id);
        if (receptionist) {
            await receptionist.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Receptionist not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const receptionist = await Receptionist.findOne({ where: { username: req.body.username } });
        if (receptionist && receptionist.password === req.body.password) {
            res.status(200).json(receptionist);
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
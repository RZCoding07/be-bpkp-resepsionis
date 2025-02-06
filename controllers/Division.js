import { Division } from "../models/models.js";

export const getDivisions = async (req, res) => {
    try {
        const divisions = await Division.findAll();
        res.status(200).json(divisions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getDivisionById = async (req, res) => {
    try {
        const division = await Division.findByPk(req.params.id);
        res.status(200).json(division);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const createDivision = async (req, res) => {
    try {
        const division = await Division.create(req.body);
        res.status(201).json(division);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateDivision = async (req, res) => {
    try {
        const division = await Division.findByPk(req.params.id);
        if (division) {
            await division.update(req.body);
            res.status(200).json(division);
        } else {
            res.status(404).json({ error: 'Division not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteDivision = async (req, res) => {
    try {
        const division = await Division.findByPk(req.params.id);
        if (division) {
            await division.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Division not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}




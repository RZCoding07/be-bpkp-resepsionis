import { Visitor } from "../models/models";

export const getVisitors = async (req, res) => {
    try {
        const visitors = await Visitor.findAll();
        res.status(200).json(visitors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getVisitorById = async (req, res) => {
    try {
        const visitor = await Visitor.findByPk(req.params.id);
        res.status(200).json(visitor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const createVisitor = async (req, res) => {
    try {
        const visitor = await Visitor.create(req.body);
        res.status(201).json(visitor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateVisitor = async (req, res) => {
    try {
        const visitor = await Visitor.findByPk(req.params.id);
        if (visitor) {
            await visitor.update(req.body);
            res.status(200).json(visitor);
        } else {
            res.status(404).json({ error: 'Visitor not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const deleteVisitor = async (req, res) => {
    try {
        const visitor = await Visitor.findByPk(req.params.id);
        if (visitor) {
            await visitor.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Visitor not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
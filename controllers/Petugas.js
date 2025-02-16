import bcrypt from 'bcrypt';
import nodemailer from "nodemailer";
import jwt from 'jsonwebtoken';
import { Op } from "sequelize";
import { Petugas } from '../models/models.js';
import { db_app } from "../config/Database.js";


export const getAdmin = async (req, res) => {
    try {
        const PetugasAll = await Petugas.findAll({
            where: {
                role: 'admin',
            },
        });
        res.status(200).json(PetugasAll);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getPetugas = async (req, res) => {
    try {
        const PetugasAll = await Petugas.findAll({
            where: {
                role: 'receptionists',
            },
        });
        res.status(200).json(PetugasAll);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getPetugasById = async (req, res) => {
    try {
        const Petuga = await Petugas.findByPk(req.params.id);
        res.status(200).json(Petuga);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const createPetugas = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        req.body.role = 'receptionists';
        req.body.password = await bcrypt.hash(req.body.password, salt);
        const Petuga = await Petugas.create(req.body);
        res.status(201).json(Petuga);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updatePetugas = async (req, res) => {
    try {
        const Petuga = await Petugas.findByPk(req.params.id);
        req.body.role = 'receptionists';
        if (Petuga) {
            await Petugas.update(req.body);
            res.status(200).json(Petuga);
        } else {
            res.status(404).json({ error: 'Petuga not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const createAdmin = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        req.body.role = 'admin';
        req.body.password = await bcrypt.hash(req.body.password, salt);
        const Petuga = await Petugas.create(req.body);
        res.status(201).json(Petuga);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateAdmin = async (req, res) => {
    try {
        const Petuga = await Petugas.findByPk(req.params.id);
        req.body.role = 'receptionists';
        if (Petuga) {
            await Petugas.update(req.body);
            res.status(200).json(Petuga);
        } else {
            res.status(404).json({ error: 'Petuga not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const deletePetugas = async (req, res) => {
    try {
        const Petuga = await Petugas.findByPk(req.params.id);
        if (Petuga) {
            await Petuga.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Petuga not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const login = async (req, res) => {
    try {
        let { identifier, password } = req.body; // Gunakan let agar bisa diubah

        // Pastikan identifier dan password ada
        if (!identifier || !password) {
            return res.status(400).json({ error: "Email/Username dan password harus diisi" });
        }

        let account;
        let role;

        if (typeof identifier === "string") {
            account = await Petugas.findOne({
                where: {
                    [Op.or]: [{ email: identifier }, { username: identifier }],
                },
            });
        }

        if (account && (await bcrypt.compare(password, account.password))) {

            const accessToken = jwt.sign(
                { id: account.id, email: account.email, username: account.username, fullname: account.fullname, role },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "1h" }
            );

            const refreshToken = jwt.sign(
                { id: account.id, email: account.email, username: account.username, fullname: account.fullname, role },
                process.env.REFRESH_TOKEN_SECRET
            );

            // 

            account.refreshToken = refreshToken;
            await account.save();
            
            return res.status(200).json({
                message: "Login successful",
                token: accessToken,
                user: { id: account.id, email: account.email, username: account.username, fullname: account.fullname, role: account.role },
            });
        } else {
            console.log("Invalid email/username or password");
            return res.status(400).json({ error: "Invalid email/username or password" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};


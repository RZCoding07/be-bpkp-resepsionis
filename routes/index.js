import express from "express";
import multer from "multer";
import { Piscina } from 'piscina';
import path from 'path';
import url from 'url';
import { db_app } from "../config/Database.js";
import bcrypt from 'bcrypt';
import { getAdmins , getAdminById, createAdmin, updateAdmin, deleteAdmin } from '../controllers/Admin.js';
import { getReceptionists, getReceptionistById, createReceptionist, updateReceptionist, deleteReceptionist } from '../controllers/Receptionist.js';
import { getVisitors, getVisitorById, createVisitor, updateVisitor, deleteVisitor } from '../controllers/Visitor.js';
import { getDivisions, getDivisionById, createDivision, updateDivision, deleteDivision } from '../controllers/Division.js';
import { getEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee } from '../controllers/Employee.js';

const router = express.Router();


// Admin routes
router.get('/admins', getAdmins);
router.get('/admins/:id', getAdminById);
router.post('/admins', createAdmin);
router.put('/admins/:id', updateAdmin);
router.delete('/admins/:id', deleteAdmin);


// Receptionist routes
router.get('/receptionists', getReceptionists);
router.get('/receptionists/:id', getReceptionistById);
router.post('/receptionists', createReceptionist);
router.put('/receptionists/:id', updateReceptionist);
router.delete('/receptionists/:id', deleteReceptionist);

// Visitor routes
router.get('/visitors', getVisitors);
router.get('/visitors/:id', getVisitorById);
router.post('/visitors', createVisitor);
router.put('/visitors/:id', updateVisitor);
router.delete('/visitors/:id', deleteVisitor);

// Division routes
router.get('/divisions', getDivisions);
router.get('/divisions/:id', getDivisionById);
router.post('/divisions', createDivision);
router.put('/divisions/:id', updateDivision);
router.delete('/divisions/:id', deleteDivision);

// Employee routes
router.get('/employees', getEmployees);
router.get('/employees/:id', getEmployeeById);
router.post('/employees', createEmployee);
router.put('/employees/:id', updateEmployee);
router.delete('/employees/:id', deleteEmployee);

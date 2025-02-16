import express from "express";
import multer from "multer";
import { Piscina } from 'piscina';
import path from 'path';
import url from 'url';
import { db_app } from "../config/Database.js";
import bcrypt from 'bcrypt';
import { getPetugas, getAdmin, createAdmin, updateAdmin, getPetugasById, createPetugas, updatePetugas, deletePetugas, login } from '../controllers/Petugas.js';
import { getVisitors, getVisitorById, createVisitor, updateVisitor, deleteVisitor, checkInVisitor, checkOutVisitor } from '../controllers/Visitor.js';
import { getDivisions, getDivisionById, createDivision, updateDivision, deleteDivision } from '../controllers/Division.js';
import { getEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee, getVwEmployees } from '../controllers/Employee.js';
import { getDashboard } from "../controllers/Dashboard.js";

const router = express.Router();

router.get('/dashboard',  getDashboard);

// petuga routes
router.get('/admins', getAdmin);
router.get('/receptionists', getPetugas);


router.get('/receptionists/:id', getPetugasById);
router.post('/receptionists', createPetugas);
router.put('/receptionists/:id', updatePetugas);
router.delete('/receptionists/:id', deletePetugas);

router.get('/admins/:id', getPetugasById);
router.post('/admins', createAdmin);
router.put('/admins/:id', updateAdmin);
router.delete('/admins/:id', deletePetugas);

// Visitor routes
router.get('/visitors', getVisitors);
router.get('/visitors/:id', getVisitorById);
router.post('/visitors', createVisitor);
router.put('/visitors/:id', updateVisitor);
router.delete('/visitors/:id', deleteVisitor);
//   endpoint = `${apiUrl}/approvals/${id}/check-out`

router.post('/visitors-checkin/:id', checkInVisitor);

router.post('/visitors-checkout/:id', checkOutVisitor);

// Division routes
router.get('/divisions', getDivisions);
router.get('/divisions/:id', getDivisionById);
router.post('/divisions', createDivision);
router.put('/divisions/:id', updateDivision);
router.delete('/divisions/:id', deleteDivision);

// Employee routes
router.get('/vw-employees', getVwEmployees);
router.get('/employees', getEmployees);
router.get('/employees/:id', getEmployeeById);
router.post('/employees', createEmployee);
router.put('/employees/:id', updateEmployee);
router.delete('/employees/:id', deleteEmployee);

router.post('/login', login);

export default router;
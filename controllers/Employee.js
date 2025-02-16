import { Employee } from "../models/models.js";
import { Division } from "../models/models.js"; // Make sure to import the Division model
import { db_app } from "../config/Database.js";


// vw_employee
export const getVwEmployees = async (req, res) => {
    try {
        const employees = await db_app.query('SELECT * FROM vw_employee_division', { type: db_app.QueryTypes.SELECT });
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll({
            include: {
                model: Division, // Specify the Division model to include in the join
                attributes: ['id', 'name'] // Specify the attributes to retrieve from the Division model
            }
        });
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const createEmployee = async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        res.status(201).json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (employee) {
            await employee.update(req.body);
            res.status(200).json(employee);
        } else {
            res.status(404).json({ error: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.id);
        if (employee) {
            await employee.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

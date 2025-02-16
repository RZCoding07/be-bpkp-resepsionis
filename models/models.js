import { Sequelize } from "sequelize";
import { db_app } from "../config/Database.js";
const DataTypes = Sequelize;

// Admin model
const Petugas = db_app.define('petugas', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
    fullname: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
}, { freezeTableName: true });


// Visitor model
const Visitor = db_app.define('visitor', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
    fullname: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.TEXT, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    purpose: { type: DataTypes.TEXT, allowNull: false },
    agency: { type: DataTypes.STRING, allowNull: false },
    checkIn: { type: DataTypes.TIME, allowNull: true },
    checkOut: { type: DataTypes.TIME, allowNull: true },
    visit_date: { type: DataTypes.DATE, allowNull: false },
    signature: { type: DataTypes.TEXT, allowNull: true },
    departement: { type: DataTypes.STRING, allowNull: false },
}, { freezeTableName: true });

// Division model
const Division = db_app.define('division', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
}, { freezeTableName: true });

// Employee model
const Employee = db_app.define('employee', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
    fullname: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.TEXT, allowNull: false },
    division_id: { type: DataTypes.UUID, allowNull: false }
}, { freezeTableName: true });

// Add foreign key for Employee -> Division
Employee.belongsTo(Division, { foreignKey: 'division_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// ratings model
const Ratings = db_app.define('ratings', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
    visitor_id: { type: DataTypes.UUID, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false },
    comment: { type: DataTypes.TEXT, allowNull: true },
}, { freezeTableName: true });

export { Petugas, Visitor, Division, Employee };

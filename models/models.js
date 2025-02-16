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

// make approval checkin, petugas_id and visitor_id as foreign key

const ApprovalCheckIn = db_app.define('approval_checkin', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
    petugas_id: { type: DataTypes.UUID, allowNull: false },
    visitor_id: { type: DataTypes.UUID, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
}, { freezeTableName: true });


// Add foreign key for ApprovalCheckIn -> Petugas
ApprovalCheckIn.belongsTo(Petugas, { foreignKey: 'petugas_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Add foreign key for ApprovalCheckIn -> Visitor
ApprovalCheckIn.belongsTo(Visitor, { foreignKey: 'visitor_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Add foreign key for Ratings -> Visitor
Ratings.belongsTo(Visitor, { foreignKey: 'visitor_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// ADD checkout, checkIn id and petugas_id as foreign key
const ApprovalCheckOut = db_app.define('approval_checkout', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
    checkIn_id: { type: DataTypes.UUID, allowNull: false },
    petugas_id: { type: DataTypes.UUID, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
}, { freezeTableName: true });

// Add foreign key for ApprovalCheckOut -> Petugas
ApprovalCheckOut.belongsTo(Petugas, { foreignKey: 'petugas_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Add foreign key for ApprovalCheckOut -> checkIn
ApprovalCheckOut.belongsTo(ApprovalCheckIn, { foreignKey: 'checkIn_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

export { Petugas, Visitor, Division, Employee, Ratings, ApprovalCheckIn, ApprovalCheckOut };

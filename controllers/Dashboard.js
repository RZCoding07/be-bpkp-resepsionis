import { db_app } from "../config/Database.js";
import { QueryTypes } from "sequelize";

export const getDashboard = async (req, res) => {
    try {
        const countApproveTamuHariIniCheckIn = await db_app.query(
            `SELECT COUNT(*) AS total_approved_today FROM approval_checkin WHERE status = 'approved' AND DATE("createdAt") = CURRENT_DATE;`,
            { type: QueryTypes.SELECT }
        );

        const countApproveTamuHariIniCheckOut = await db_app.query(
            `SELECT COUNT(*) AS total_approved_today FROM approval_checkout WHERE status = 'approved' AND DATE("createdAt") = CURRENT_DATE;`,
            { type: QueryTypes.SELECT }
        );

        const countApproveKeseluruhanTamuCheckIn = await db_app.query(
            `SELECT COUNT(*) AS total_approved FROM approval_checkin WHERE status = 'approved';`,
            { type: QueryTypes.SELECT }
        );

        const countApproveKeseluruhanTamuCheckOut = await db_app.query(
            `SELECT COUNT(*) AS total_approved FROM approval_checkout WHERE status = 'approved';`,
            { type: QueryTypes.SELECT }
        );

        return res.status(200).json({
            countApproveTamuHariIniCheckIn: countApproveTamuHariIniCheckIn[0]?.total_approved_today || 0,
            countApproveTamuHariIniCheckOut: countApproveTamuHariIniCheckOut[0]?.total_approved_today || 0,
            countApproveKeseluruhanTamuCheckIn: countApproveKeseluruhanTamuCheckIn[0]?.total_approved || 0,
            countApproveKeseluruhanTamuCheckOut: countApproveKeseluruhanTamuCheckOut[0]?.total_approved || 0,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

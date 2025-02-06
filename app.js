import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import { db_app } from './config/Database.js';
import { rateLimit } from 'express-rate-limit'
import compression from "compression";
import { Admin, Receptionist, Visitor, Division, Employee, VisitorQR } from './models/models.js';
import router from './routes/index.js';

dotenv.config();

const app = express();
app.use(compression());
// Allow all origins (or specify specific origins if needed)
app.use(cors({
    origin: ["http://localhost:3000"], // Frontend origin
    methods: 'GET, POST, PUT, DELETE, OPTIONS', // Allowed methods
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With', // Allowed headers
    credentials: true, // If you need cookies to be included in requests
}));

app.use(bodyParser.json({ limit: '50mb' }));  // Increase the limit as needed
app.use(helmet());  // Security middleware
app.use(morgan('dev'));

const initializeDatabase = async () => {
    try {
        await db_app.authenticate(); // Test connection
        // await db_app.sync(); // Sync all models
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

initializeDatabase();

app.use(express.json());  // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies
app.use(cookieParser());  // Parse Cookie header and populate req.cookies
app.use(router);

app.use((err, req, res, next) => {
    console.error('Error occurred:', err);
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error'
        }
    });
});

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 menit
    max: 1000, // Maksimal 100 permintaan per menit per IP
    message: "Terlalu banyak permintaan dari IP ini. Jangan mencoba brute force yaaa... Salam dari Tika Security Protocol!",
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
  });
  
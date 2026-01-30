import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load env vars
dotenv.config();

// Initialize Sequelize
export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false,
  }
);

// Connection Function
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL Database connected successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1); // Exit process with failure
  }
};
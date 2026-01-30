import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { connectDB, sequelize } from './config/database.js'; 
import authRoutes from './routes/auth.routes.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); 
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const startServer = async () => {
  await connectDB();
  
 
  await sequelize.sync({ force: false }); 
  console.log('✅ Database Synced');

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
};

startServer();
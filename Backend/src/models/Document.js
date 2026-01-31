import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import User from './User.js'; // Import User to setup relationship

const Document = sequelize.define('Document', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  originalName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  storagePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mimeType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('PENDING', 'PROCESSED', 'ERROR'),
    defaultValue: 'PENDING',
  },
  summary: {
    type: DataTypes.TEXT, // Using TEXT for longer summaries
    allowNull: true,
  },
}, {
  timestamps: true,
});

// Setup Associations
User.hasMany(Document, { foreignKey: 'userId' });
Document.belongsTo(User, { foreignKey: 'userId' });

export default Document;
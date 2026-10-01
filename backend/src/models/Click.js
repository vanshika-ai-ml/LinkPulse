import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

// Define the "clicks" table in PostgreSQL (stores each visit for analytics)
export const Click = sequelize.define('Click', {
  linkId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field:'link_id',
  },
  userAgent:{
    type:DataTypes.STRING,
    field:'user_agent',
  },
  ipAddress: {
    type: DataTypes.STRING,
    field:'ip_address',
  },
  browser: {
    type: DataTypes.STRING,
  },
  os: {
    type: DataTypes.STRING,
  },
  referrer: {
    type: DataTypes.STRING,
  },
  clickedAt:{
    type:DataTypes.DATE,
    field:'clicked_at',
  },
},{
  tableName:'clicks',
  timestamps:false
});

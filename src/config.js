import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 3000;

export const DB_HOST = process.env.DB_HOST || 'mysql-28407-0.cloudclusters.net';
export const DB_USER = process.env.DB_USER || 'admin01';
export const DB_PASSWORD = process.env.DB_PASSWORD || 'alayza2213';
export const DB_PORT = process.env.DB_PORT || 28416;
export const DB_DATABASE = process.env.DB_DATABASE || 'genesisDB';
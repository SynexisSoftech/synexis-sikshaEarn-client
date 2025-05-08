import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || '';

if (!MONGO_URI) throw new Error('Please add your MONGO_URI to .env.local');

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(MONGO_URI, {
      dbName: 'authDB',
    });
    isConnected = db.connections[0].readyState === 1;
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
  }
}

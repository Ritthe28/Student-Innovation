import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import createNoteRouter from './routes/notes.js'; // ✅ Correct Import
import createUserRouter from './routes/users.js';


console.log("Starting server...");
const app = express();
const port = 3000;
const Obj = new ObjectId();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = 'mongodb://localhost:27017/';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function startServer() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db('authApp');
    const usersCollection = db.collection('users');
    const notesCollection = db.collection('notes');
//  await notesCollection.find({_id : Obj("67b55be61ab4889e6530929f")})
    
    // ✅ Use correct function name
   
    app.use('/notes', createNoteRouter(notesCollection)); 
    app.use('/users', createUserRouter(usersCollection));

    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });

  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err);
  }
}

// Handle cleanup on exit
process.on('SIGINT', async () => {
  console.log("🛑 Closing MongoDB connection...");
  await client.close();
  process.exit();
});

startServer();

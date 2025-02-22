import express from 'express';
import multer from 'multer';
import {ObjectId} from "mongodb"

const createNoteRouter = (notesCollection) => {
  const router = express.Router();

  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // ⬆️ Increased to 50MB (Modify as needed)

   });

  router.post('/upload', upload.single('pdf'), async (req, res) => {
    try {
      const { title, content, uploadedBy, role, branch, semester } = req.body;

      if (role !== 'teacher') {
        return res.status(403).json({ error: 'Only teachers can upload notes' });
      }

      const note = {
        title,
        content,
        uploadedBy,
        branch,
        semester,
        pdf: req.file
          ? { data: req.file.buffer, contentType: req.file.mimetype, filename: req.file.originalname }
          : undefined,
        uploadedAt: new Date(),
      };

      await notesCollection.insertOne(note);
      res.json(note);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/course-semester', async (req, res) => {
    try {
      const { course, semester } = req.query;
      console.log (req.query)
      if (!course || !semester) {
        return res.status(400).json({ error: "Course and semester are required" });
      }

      const notes = await notesCollection.find({ branch: course, semester: semester }).toArray();

      const formattedNotes = notes.map(note => ({
        ...note,
        pdf: note.pdf
          ? {
              ...note.pdf,
              data: note.pdf.data.buffer.toString('base64')
            }
          : null
      }));

      res.json(formattedNotes);
    } catch (error) {
      console.error("Error in /course-semester:", error);
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/download', async (req, res) => {
    try {
      const { username } = req.query;
      if (!username) {
        return res.status(400).json({ error: "Username is required" });
      }

      const notes = await notesCollection.find({ uploadedBy: username }).toArray();

      const formattedNotes = notes.map(note => ({
        ...note,
        pdf: note.pdf
          ? {
              ...note.pdf,
              data: note.pdf.data.buffer.toString('base64')
            }
          : null
      }));

      res.json(formattedNotes);
    } catch (error) {
      console.error("❌ Error in /download:", error);
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/all', async (req, res) => {
    try {
      const notes = await notesCollection.find({}).toArray();
      
      const formattedNotes = notes.map(note => ({
        ...note,
        pdf: note.pdf
          ? {
              ...note.pdf,
              data: note.pdf.data.buffer.toString('base64')
            }
          : null
      }));
      res.json(formattedNotes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get("/delete/:id", async(req, res)=>{
    console.log(req.params.id, "Id Milali Habibi");

    // Fetch all notes properly
    let response = await notesCollection.deleteOne({ _id: new ObjectId(req.params.id) });

    
    console.log(response); // Logs the actual documents

    res.json(response); // Sends the documents as response

  })

  return router;
};

export default createNoteRouter;

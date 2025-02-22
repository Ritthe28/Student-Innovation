import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  title: String,
  content: String,
  uploadedBy: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const Note = mongoose.model('Note', NoteSchema);

export default Note;

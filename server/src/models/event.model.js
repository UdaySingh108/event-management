import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  attendees: [{ type: String }] // ✅ Allow plain strings for Socket IDs
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);

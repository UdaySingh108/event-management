import Event from "../models/event.model.js";

const createEvent = async (req, res) => {
    try {
        const event = new Event({ ...req.body, createdBy: req.user.id });
        await event.save();
        res.status(201).json(event);
      } catch (error) {
        res.status(500).json({ message: 'Server Error' });
      }
};
const getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('attendees', 'name');
        res.json(events);
      } catch (error) {
        res.status(500).json({ message: 'Server Error' });
      }
};
export { createEvent, getEvents };
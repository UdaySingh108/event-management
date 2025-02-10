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
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this event' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this event' });
    }

    await event.deleteOne();
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export { createEvent, getEvents,updateEvent,deleteEvent };
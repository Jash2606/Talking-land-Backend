const Pin = require('../models/pin');

// Get all pins
exports.getPins = async (req, res) => {
    try {
        const pins = await Pin.find();
        res.status(200).json(pins);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new pin
exports.createPin = async (req, res) => {
    try {
        console.log("Creating a new pin");
        console.log("req.body", req.body);
        const { title, story, address, lat, lng } = req.body;
        console.log("Story is ",story);

        const pin = new Pin({
            position: { lat, lng },
            title,
            story,
            address,
            image: req.file ? {
                data: req.file.buffer, // Store binary data
                contentType: req.file.mimetype,
            } : undefined,
        });

        console.log("Pin is ",pin);

        await pin.save();
        res.status(201).json(pin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updatePin = async (req, res) => {
    try {
        console.log("Updating a pin" , req.body);
        const { id } = req.params;
        const { title, story, address, lat, lng } = req.body;

        const updatedData = {};

        if(title) updatedData.title = title;
        if (story) updatedData.story = story;
        if (address) updatedData.address = address;
        if (lat && lng) updatedData.position = { lat, lng };

        if (req.file) {
            updatedData.image = {
                data: req.file.buffer, // Update image binary data
                contentType: req.file.mimetype,
            };
        }

        const pin = await Pin.findByIdAndUpdate(id, updatedData, { new: true });

        if (!pin) return res.status(404).json({ error: 'Pin not found.' });

        res.status(200).json(pin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Delete a pin
exports.deletePin = async (req, res) => {
    try {
        const { id } = req.params;
        const pin = await Pin.findByIdAndDelete(id);

        if (!pin) return res.status(404).json({ error: 'Pin not found.' });

        res.status(200).json({ message: 'Pin deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

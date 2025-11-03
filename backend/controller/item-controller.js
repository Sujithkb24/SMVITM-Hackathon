// item-controller.js
const Item = require("../models/item-model");

const addItem = async(req, res) => {
    try {
        const { name, description, serving_day, type } = req.body;
        
        const itemExists = await Item.findOne({ name, serving_day });
        if (itemExists) {
            return res.status(400).json({ error: "Item already exists for the given serving day" });
        }
        const newItem = new Item({
            name,
            description,
            serving_day,
            type
        });
        await newItem.save();
        console.log("New item added:", newItem);
        return res.status(201).json({ message: "Item added successfully", item: newItem });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const getItemsByDay = async(req, res) => {
    try {
        const { day } = req.params;
        
        if (!day) {
            return res.status(400).json({ error: "Day parameter is required" });
        }

        // Case-insensitive search and trim whitespace
        const items = await Item.find({ 
            serving_day: { $regex: new RegExp(`^${day.trim()}$`, 'i') } 
        }).sort({ createdAt: -1 }); // Sort by newest first

        return res.status(200).json({ 
            message: `Items for ${day}`, 
            count: items.length,
            items: items 
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const getAllItems = async(req, res) => {
    try {
        const items = await Item.find().sort({ serving_day: 1, createdAt: -1 });
        
        return res.status(200).json({ 
            message: "All items retrieved successfully", 
            count: items.length,
            items: items 
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = { addItem, getItemsByDay, getAllItems };
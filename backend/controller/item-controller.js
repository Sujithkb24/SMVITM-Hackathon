const Item = require("../models/item-model");

const addItem = async(req, res) => {
    try {
        const { name, description, serving_day } = req.body;

        const itemExists = await Item.findOne({ name, serving_day });
        if (itemExists) {
            return res.status(400).json({ error: "Item already exists for the given serving day" });
        }
        const newItem = new Item({
            name,
            description,
            serving_day
        });
        await newItem.save();
        return res.status(201).json({ message: "Item added successfully", item: newItem });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = { addItem };
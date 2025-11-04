const router = require("express").Router();
const { 
    addItem, 
    getItemsByDay, 
    getAllItems, 
    updateItem, 
    deleteItem 
} = require("../controller/item-controller");

router.route('/add-item').post(addItem);

router.route('/allitems').get(getAllItems);


router.route('/:day').get(getItemsByDay);

// Update item by ID
router.route('/update/:id').put(updateItem);

// Delete item by ID
router.route('/delete/:id').delete(deleteItem);

module.exports = router;

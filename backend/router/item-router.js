const router = require("express").Router();
const { addItem } = require("../controller/item-controller");

router.route('/add-item').post(addItem);

module.exports = router;
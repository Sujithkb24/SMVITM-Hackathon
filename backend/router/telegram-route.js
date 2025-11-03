const { getTelegramUpdates } = require("../controller/telegram");

const router = require("express").Router();


router.route('/bot').post(getTelegramUpdates);


module.exports = router
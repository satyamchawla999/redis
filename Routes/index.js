const router = require("express").Router();
const indexController = require("../Controllers/index");

router.get('/', (req, res) => res.send('Hello World!'));
router.get("/fish/:species", indexController.getSpeciesData);

module.exports = router;
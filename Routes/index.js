const router = require("express").Router();
const indexController = require("../Controllers/index");

router.get('/', (req, res) => res.render('home', {
    title: 'Home',
    user: req.session.user
}));

// router.get('/test', (req, res) => res.render('test', {
//     title: 'test',
//     user: req.session.user
// }));

router.get('/signin',indexController.signin)
router.get('/signup', indexController.signup);
router.get('/logout', indexController.logout);


router.get("/fish/:species", indexController.getSpeciesData);

router.use('/users', require('./users'));

module.exports = router;
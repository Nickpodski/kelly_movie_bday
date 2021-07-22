const router = require('express').Router();
const userRoutes = require('./user')
const movieRoutes = require('./movies');

router.use('/user', userRoutes);
router.use('/movies', movieRoutes)

          
module.exports = router;

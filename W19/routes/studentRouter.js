const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController')


router.get('/init',studentController.initDB)
router.get('/all',studentController.viewAll)
router.post('/update',studentController.updateRecord)
router.post('/delete',studentController.deleteRecord)
router.get('/more-than-20-in-DSBDA',studentController.moreThan20InDSBDA)
router.get('/more-than-25-in-all',studentController.moreThan25InAll)
router.get('/less-than-40-in-wad-and-ai',studentController.lessThan40InWadAi)


module.exports = router;
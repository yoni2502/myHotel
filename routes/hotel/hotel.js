const router = require('express').Router();
const {resError, resSuccess} = require("../../consts");
const ctrl = require('../../controllers/hotel/hotel');
const router_schedule = require('./schedule/schedule');
const router_table = require("./table/table");

router.use("/schedule",router_schedule);
router.use("/table",router_table);

router.post('/getAvailableRooms', (req,res) => {
  ctrl.getAvailableRooms(req).then(rooms => resSuccess(res, rooms)).catch(err => resError(res, err));
});

router.post('/getTables', (req,res) => {
  ctrl.getTables(req).then(tables => resSuccess(res, tables)).catch(err => resError(res, err));  
});

router.put('/addRooms', (req,res) => {
  ctrl.addRooms(req).then(str => resSuccess(res, str)).catch(err => resError(res, err));
});

router.put('/create', (req,res) => {
  ctrl.createHotel(req).then(hotel => resSuccess(res, hotel)).catch(err => resError(res, err));
});



module.exports = router;

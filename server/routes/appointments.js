import express from 'express';
import {
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointment,
  getallAppointment,
  getAppByUserId,
  getallAppointmentbyUserId,
  getallAppointmentsAdmin
} from '../controllers/appointment.js';
import {verifyAdmin} from '../utils/verifyToken.js'


const router = express.Router();

router.post('/', createAppointment);

//UPDATE
router.put('/:id', updateAppointment);
//DELETE
router.delete('/:id', deleteAppointment);
//GET
router.get('/:id', getAppointment);
router.get('/appbyuserid/:user_id', getAppByUserId);
//GET ALL
router.get('/', getallAppointment);
router.get('/getallAppointmentbyUserId/:user_id', getallAppointmentbyUserId);
router.get('/admin/getallAppointmentsAdmin/', getallAppointmentsAdmin);


export default router;
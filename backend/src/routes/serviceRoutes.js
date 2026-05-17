const express = require('express');
const router = express.Router();

const { authenticate } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const serviceController = require('../controllers/serviceController');

router.get('/', serviceController.getServices);

router.get(
  '/my-services',
  authenticate,
  authorize(['provider']),
  serviceController.getMyServices
);

router.get('/:id', serviceController.getServiceById);

router.post(
  '/',
  authenticate,
  authorize(['provider']),
  serviceController.createService
);

router.put(
  '/:id',
  authenticate,
  authorize(['provider']),
  serviceController.updateService
);

router.delete(
  '/:id',
  authenticate,
  authorize(['provider']),
  serviceController.deleteService
);

module.exports = router;
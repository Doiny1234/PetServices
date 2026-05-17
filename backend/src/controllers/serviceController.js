const serviceService = require('../services/serviceService');

const createService = async (req, res) => {
  try {
    const service = await serviceService.createService(req.user.id, req.body);
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getServices = async (req, res) => {
  try {
    const services = await serviceService.getServices(req.query);
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getServiceById = async (req, res) => {
  try {
    const service = await serviceService.getServiceById(req.params.id);
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMyServices = async (req, res) => {
  try {
    const services = await serviceService.getProviderServices(req.user.id);
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateService = async (req, res) => {
  try {
    const result = await serviceService.updateService(req.params.id, req.user.id, req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const result = await serviceService.deleteService(req.params.id, req.user.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createService,
  getServices,
  getServiceById,
  getMyServices,
  updateService,
  deleteService
};
const express = require('express');
const { getPins, createPin, updatePin } = require('../controller/pinController');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

// Routes
router.get('/', getPins);                          
router.post('/', upload.single('image'), createPin); 
router.put('/:id', upload.single('image'), updatePin); 

module.exports = router;

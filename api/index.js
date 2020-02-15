import express from 'express';
import testData from '../src/testData.json';

const router = express.Router();
 
router.get('/contests', (req, res) => {
    res.send({ contests: testData.contests});
});

export default router;
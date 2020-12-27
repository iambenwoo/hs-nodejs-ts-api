import winston from '../config/winston';
import express from 'express';
import { Request, Response } from 'express';
import { param, validationResult } from 'express-validator';
import * as service from '../services/productService';

const logger = winston(module);
const router = express.Router();

router.get(
    '/:id',
    [
        // param('id').isAlphanumeric().withMessage('invalid input:id'),
        param('id')
            .isLength({
                min: 5,
            })
            .withMessage('id must be greater > 5'),
    ],
    async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const id = req.params?.id;
            logger.log('info', 'Getting Product by id:' + id);

            // call service
            const product = await service.getProductById(id);
            logger.log('info', product);
            res.json(product);
        } catch (err) {
            // system error
            logger.log('error', err.message);
            res.json('System Error');
        }
    },
);

export default router;

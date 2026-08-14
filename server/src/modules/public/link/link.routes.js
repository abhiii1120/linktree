import express from 'express';
import { getLinksByUsername } from './link.controller.js';

let router = express.Router();

router.get('/:username',getLinksByUsername)

export default router;
import express from 'express';
import { getLinksByUsername, incrementLinkClick } from './link.controller.js';

let router = express.Router();

router.get('/:username',getLinksByUsername);
router.patch('/:linkId/click',incrementLinkClick);

export default router;
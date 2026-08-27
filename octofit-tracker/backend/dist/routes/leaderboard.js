"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Leaderboard_1 = __importDefault(require("../models/Leaderboard"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const leaderboard = await Leaderboard_1.default.find().populate('team').sort({ points: -1 });
        res.json(leaderboard);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});
router.post('/', async (req, res) => {
    try {
        const entry = await Leaderboard_1.default.create(req.body);
        res.status(201).json(entry);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create leaderboard entry' });
    }
});
exports.default = router;

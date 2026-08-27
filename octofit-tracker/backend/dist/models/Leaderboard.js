"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const leaderboardSchema = new mongoose_1.Schema({
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, default: 0 },
    rank: { type: Number },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Leaderboard', leaderboardSchema);

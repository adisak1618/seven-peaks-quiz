"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nextApp_1 = __importDefault(require("./../../nextApp"));
const router = express_1.default.Router();
const handler = nextApp_1.default.getRequestHandler();
router.get("/*", (req, res) => {
    return handler(req, res);
});
exports.default = router;
//# sourceMappingURL=index.js.map
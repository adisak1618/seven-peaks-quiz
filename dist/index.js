"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const nextApp_1 = __importDefault(require("./nextApp"));
const port = process.env.PORT || 3000;
const server = express_1.default();
server.use('/', index_1.default);
(async () => {
    try {
        await nextApp_1.default.prepare();
        server.listen(port, (err) => {
            if (err)
                throw err;
            console.log(`> Ready on http://localhost:${port} - env ${process.env.NODE_ENV}`);
        });
    }
    catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
//# sourceMappingURL=index.js.map
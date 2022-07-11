"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// utils
const config_1 = __importDefault(require("./config"));
const mongo_1 = __importDefault(require("./utils/mongo"));
const logger_1 = __importDefault(require("./utils/logger"));
const welcome_json_1 = __importDefault(require("./welcome.json"));
// routes
const utility_1 = __importDefault(require("./routes/utility"));
const user_1 = __importDefault(require("./routes/user"));
const posts_1 = __importDefault(require("./routes/posts"));
const server = (0, express_1.default)();
server.listen(config_1.default.server.port, () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Server listening on ${config_1.default.server.hostname}:${config_1.default.server.port}`);
    yield (0, mongo_1.default)();
    // parsing requests
    server.use(express_1.default.json());
    server.use(express_1.default.urlencoded({ extended: true }));
    // cors setup
    server.use((0, cors_1.default)());
    // routes
    server.use("/api", utility_1.default);
    server.use("/api/users", user_1.default);
    server.use("/api/posts", posts_1.default);
    // welcome message
    server.get("/", (req, res) => {
        res.status(200).json(welcome_json_1.default);
    });
}));

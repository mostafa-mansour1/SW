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
const express_1 = require("express");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const people_services_1 = require("../../services/people.services");
// Constants
const router = (0, express_1.Router)();
const people = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const req_id = Number((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.id);
    const req_page = Number((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.page);
    const page = Number.isNaN(req_page) ? 1 : req_page;
    let output = {};
    if (!Number.isNaN(req_id))
        output = yield (0, people_services_1.getOnePeople)(req_id);
    else
        output = yield (0, people_services_1.getAllPeople)(page);
    // console.log("output", output)
    res.status(http_status_codes_1.default.OK).json(output);
});
/**
 * Call a service with post.
 */
router.post('/people', people);
// Export default
exports.default = router;

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPeople = exports.getOnePeople = void 0;
const SWApi_1 = require("../helper/SWApi");
/**
 * Call getAllPeople.
 *
 * @param page number
 * @returns IPeople
 */
const getOnePeople = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield SWApi_1.People.getId(id);
});
exports.getOnePeople = getOnePeople;
/**
 * Call getAllPeople.
 *
 * @param page number
 * @returns IPeople[]
 */
const getAllPeople = (page = 1) => __awaiter(void 0, void 0, void 0, function* () {
    return yield SWApi_1.People.getPage(page);
});
exports.getAllPeople = getAllPeople;

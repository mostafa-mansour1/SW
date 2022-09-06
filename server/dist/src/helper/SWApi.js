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
exports.Vehicles = exports.Starships = exports.Species = exports.Planets = exports.People = exports.Films = void 0;
const lodash_1 = __importDefault(require("lodash"));
const node_localstorage_1 = require("node-localstorage");
const axios_1 = __importDefault(require("axios"));
const SWApi_interface_1 = require("../interfaces/SWApi.interface");
const cache = new node_localstorage_1.LocalStorage('./SWApi');
;
// cache.clear();
const prefix = 'swCache';
function request(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const cached = cache.getItem(`${prefix}.${url}`);
        if (cached) {
            return JSON.parse(cached);
        }
        const headers = {
            "headers": {
                "accept": "application/json"
            }
        };
        const { data } = yield axios_1.default.get(url, headers);
        cache.setItem(`${prefix}.${url}`, JSON.stringify(data));
        return data;
    });
}
class Resource {
    constructor(value) {
        this.value = value;
    }
    populate(path) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.populateRec(path, this.value);
            return this;
        });
    }
    populateSingle(path, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Array.isArray(obj[path])) {
                obj[path] = yield Promise.all(obj[path].map(url => request(url.replace('http', 'https'))));
                return this;
            }
            obj[path] = yield request(obj[path].replace('http', 'https'));
            return this;
        });
    }
    populateRec(path, obj) {
        const [next, ...rest] = path.split('.');
        if (rest.length > 0 && Array.isArray(obj[next])) {
            return Promise.all(obj[next].map((single) => this.populateRec(rest.join('.'), single)));
        }
        if (rest.length === 0 && Array.isArray(obj)) {
            return Promise.all(obj.map(single => this.populateSingle(next, single)));
        }
        else if (rest.length === 0) {
            return this.populateSingle(next, obj);
        }
        return this.populateRec(rest.join('.'), obj[next]);
    }
}
function collectionBuilder(resource) {
    var _a;
    return _a = class SWCollection {
            constructor(unparsedResources) {
                this.resources = [];
                this.resources = unparsedResources.map(resource => new Resource(resource));
            }
            populateAll(path) {
                return __awaiter(this, void 0, void 0, function* () {
                    this.resources = yield Promise.all(this.resources.map(obj => obj.populate(path)));
                    return this;
                });
            }
            static getId(id) {
                // console.log("getId", `${SWCollection.root}/${id}/`);
                return request(`${SWCollection.root}/${id}/`);
                ;
            }
            static getPage(page = 1, search) {
                // console.log("getPage", `${SWCollection.root}/${page}/`);
                if (search) {
                    return request(`${SWCollection.root}?page=${page}&search=${search}`);
                }
                return request(`${SWCollection.root}?page=${page}`);
            }
            static find(predicate) {
                return __awaiter(this, void 0, void 0, function* () {
                    const { count, results: firstResult } = yield SWCollection.getPage();
                    const pages = Math.ceil(count / firstResult.length);
                    const left = Array.from({
                        length: (pages - 1)
                    }, (_, i) => SWCollection.getPage(2 + i));
                    const restResults = yield Promise.all(left);
                    const totalResults = [{
                            results: firstResult
                        }, ...restResults].reduce((allResults, { results }) => {
                        return [...allResults, ...results];
                    }, []);
                    return new SWCollection(lodash_1.default.filter(totalResults, predicate));
                });
            }
            static findBySearch(predicate) {
                return __awaiter(this, void 0, void 0, function* () {
                    const pages = yield Promise.all(predicate.map(query => this.getPage(1, query)));
                    return new SWCollection(lodash_1.default.flatMap(pages, 'results'));
                });
            }
        },
        _a.root = `https://swapi.dev/api/${resource}/`,
        _a;
}
exports.Films = collectionBuilder(SWApi_interface_1.ResourcesType.Films);
exports.People = collectionBuilder(SWApi_interface_1.ResourcesType.People);
exports.Planets = collectionBuilder(SWApi_interface_1.ResourcesType.Planets);
exports.Species = collectionBuilder(SWApi_interface_1.ResourcesType.Species);
exports.Starships = collectionBuilder(SWApi_interface_1.ResourcesType.Starships);
exports.Vehicles = collectionBuilder(SWApi_interface_1.ResourcesType.Vehicles);

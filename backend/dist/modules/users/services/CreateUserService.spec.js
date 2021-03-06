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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AppError_1 = __importDefault(require("@shared/erros/AppError"));
var FakeHashProvider_1 = __importDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));
var FakeUsersRepository_1 = __importDefault(require("../repositories/fakes/FakeUsersRepository"));
var CreateUserService_1 = __importDefault(require("./CreateUserService"));
var FakeCityRepository_1 = __importDefault(require("@modules/cities/repositories/fakes/FakeCityRepository"));
var fakeUsersRepository;
var fakeCityRepository;
var fakeHashProvider;
var createUserService;
describe('CreateUserService', function () {
    beforeEach(function () {
        fakeUsersRepository = new FakeUsersRepository_1.default();
        fakeCityRepository = new FakeCityRepository_1.default();
        fakeHashProvider = new FakeHashProvider_1.default();
        createUserService = new CreateUserService_1.default(fakeUsersRepository, fakeCityRepository, fakeHashProvider);
    });
    it('should be able to create user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var params, cityFake, userFake;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = {
                        name: 'Fortaleza',
                        state: 'CE'
                    };
                    return [4 /*yield*/, fakeCityRepository.create(params)];
                case 1:
                    cityFake = _a.sent();
                    return [4 /*yield*/, createUserService.execute({
                            name: 'Daniel Morais',
                            email: 'daniel@email.com',
                            password: '12345678',
                            cityId: cityFake.id
                        })];
                case 2:
                    userFake = _a.sent();
                    expect(userFake).toHaveProperty('id');
                    expect(userFake.name).toBe('Daniel Morais');
                    expect(userFake.city).toBe(cityFake);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should be able to create user with email existed', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, userCreate;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fakeUsersRepository.create({
                        name: 'Daniel Morais',
                        email: 'daniel@email.com',
                        password: '12345678',
                        cityId: '2e09dc4e-83de-4ade-9ad5-dc8f6c620c93'
                    })];
                case 1:
                    user = _a.sent();
                    userCreate = createUserService.execute({
                        name: 'Daniel Morais',
                        email: 'daniel@email.com',
                        password: '12345678',
                        cityId: '2e09dc4e-83de-4ade-9ad5-dc8f6c620c93'
                    });
                    return [4 /*yield*/, expect(userCreate).rejects.toBeInstanceOf(AppError_1.default)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not be able to create user with exeception', function () { return __awaiter(void 0, void 0, void 0, function () {
        var fakeUsersRepositoryMock, createUserServiceMock, userCreate;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fakeUsersRepositoryMock = new FakeUsersRepository_1.default();
                    fakeUsersRepositoryMock.create = function (data) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            throw new AppError_1.default('Error');
                        });
                    }); };
                    createUserServiceMock = new CreateUserService_1.default(fakeUsersRepositoryMock, fakeCityRepository, fakeHashProvider);
                    userCreate = createUserServiceMock.execute({
                        name: 'Daniel Morais',
                        email: 'daniel@email.com',
                        password: '12345678',
                        cityId: '2e09dc4e-83de-4ade-9ad5-dc8f6c620c93'
                    });
                    return [4 /*yield*/, expect(userCreate).rejects.toBeInstanceOf(AppError_1.default)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    // it('should be able to create user, but return default user', async () => {
    //     const fakeUsersRepositoryMock = new FakeUsersRepository();
    //     fakeUsersRepositoryMock.findById = async (id: string) : Promise<User | undefined> => {
    //         throw undefined;
    //     }
    //     const createUserServiceMock = new CreateUserService(fakeUsersRepositoryMock, fakeCityRepository, fakeHashProvider);
    //     const userCreate = await createUserServiceMock.execute({
    //         name: 'Daniel Morais',
    //         email: 'daniel@email.com',
    //         password: '12345678',
    //         cityId: '2e09dc4e-83de-4ade-9ad5-dc8f6c620c93'
    //     });
    //     expect(userCreate).rejects.toBeInstanceOf(AppError);
    // });
});

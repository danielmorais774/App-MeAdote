import AppError from '@shared/erros/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUserService: AuthenticateUserService;

describe('AuthenticateUserService', () => {

    beforeEach(() => {
        fakeHashProvider = new FakeHashProvider();
        fakeUsersRepository = new FakeUsersRepository();
        authenticateUserService = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
    });

    it('should be able to authenticate', async () => {
        const userFake = await fakeUsersRepository.create({
            name: 'Daniel Morais',
            email: 'daniel@email.com',
            password: '12345678',
            cityId: '2e09dc4e-83de-4ade-9ad5-dc8f6c620c93'
        });

        const response = await authenticateUserService.execute({
            email: 'daniel@email.com',
            password: '12345678',
        });

        expect(response).toHaveProperty('token');
    });

    it('should not be able to authenticate with non existing user', async () => {
        const auth = authenticateUserService.execute({
            email: 'daniel@email.com',
            password: '12345678',
        });

        await expect(auth).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate with password incorrect', async () => {
        const userFake = await fakeUsersRepository.create({
            name: 'Daniel Morais',
            email: 'daniel@email.com',
            password: '12345678',
            cityId: '2e09dc4e-83de-4ade-9ad5-dc8f6c620c93'
        });

        const auth = authenticateUserService.execute({
            email: 'daniel@email.com',
            password: '123456789',
        });

        await expect(auth).rejects.toBeInstanceOf(AppError);
    });
})
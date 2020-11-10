import { getRepository } from 'typeorm';
import User from '../entities/User';

interface Request {
  name: string;
  cpf: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, cpf, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: [{ email }, { cpf }],
    });

    if (checkUserExists) {
      throw new Error('Email or CPF already used!');
    }

    const user = usersRepository.create({
      name,
      cpf,
      email,
      password,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
import {UserModel} from "../models/user-model.js";
import { v4 as uuidv4 } from 'uuid';
import {mailService} from './mail-service.js'
import {tokenService} from "./token-service.js";
import {UserDto} from "../dtos/user-dto.js";
import * as bcrypt from 'bcrypt'

class UserService {
    async registration(email, password) {
       const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw new Error(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        const hashPasssword = await bcrypt.hash(password, 3)
        const activationLink = uuidv4()

        const user = await UserModel.create({email, password, activationLink})
        await mailService.sendActivationMail(email, activationLink)

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken((userDto.id, tokens.refreshToken))

        return  { ...tokens, user: userDto}
    }
}

export const userService = new UserService()
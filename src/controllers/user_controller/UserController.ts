import User from "../../classes/User/User";
import { UserCodeMessage } from "../../enums/UserCodeMessages";
import UserModel from "../../models/user_model/userModel";
import validateUserPassword from "./scripts/validatePassword";

export default class UserControler {

  static async createNewUser({email, password, username}: { email: string, password: string, username: string }): Promise<{ code : number, message: string, userId?: string }> {
    if(await UserModel.findOne({ email })) {
      return { code: UserCodeMessage.EMAIL_ALREADY_REGISTERED, message: "email already registered" };
    };

    if(await UserModel.findOne({ username })) {
      return { code: UserCodeMessage.USERNAME_ALREADY_REGISTERED, message: "username already registered" };
    };
    
    const newUser = new User({ email, password, pusername: username });

    const userCreated = await UserModel.create({ ...newUser });

    return { code: UserCodeMessage.USER_REGISTED, message: 'user registered', userId: userCreated._id };
  }

  static async validateUserLogin({email, password}: { email: string, password: string }): Promise<{ code : number, message: string, userId?: string  }> {

    const user = await UserModel.findOne({ email });

    if(!user) {
      return { code: UserCodeMessage.USER_NOT_FOUND, message: "user not found" };
    };

    const validPassoword = await validateUserPassword({ password, userPassword: user.password })

    if(!validPassoword) {
      return { code: UserCodeMessage.INVALID_CREDENTIALS, message: "invalid password" }
    }

    return { code: UserCodeMessage.LOGIN_SUCCESSFUL, message: "login successful", userId: user._id }
  }

  static async getUserData( userId: string ): Promise<{ code : number, message: string, user?: any }> {
    const user = await UserModel.findById(userId);

    if(!user) {
      return { code: UserCodeMessage.USER_NOT_FOUND, message: "user not found" };
    };

    return { code: UserCodeMessage.USER_DATA_FOUND, message: "user data found", user}
  }

  static async updateUserProfile({ userId, changes, password }: { userId: string, changes: any, password: string }): Promise<{ code : number, message: string, userId?: any }> {

    const user = await UserModel.findById(userId);

    if(!user) {
      return { code: UserCodeMessage.USER_NOT_FOUND, message: "user not found" };
    };

    const validPassoword = await validateUserPassword({ password, userPassword: user.password })

    if(!validPassoword) {
      return { code: UserCodeMessage.INVALID_CREDENTIALS, message: "invalid credentials" }
    }

    const userUpdated = await UserModel.findByIdAndUpdate(userId, changes, { new: true });

    return { code: UserCodeMessage.USER_UPDATED, message: "user updated", userId: userUpdated?._id }
  }

  static async deleteUser({ userId, password }: { userId: string, password: string }): Promise<{ code : number, message: string, userId?: string }> {

    const user = await UserModel.findById(userId);

    if(!user) {
      return { code: UserCodeMessage.USER_NOT_FOUND, message: "user not found" };
    };

    const validPassoword = await validateUserPassword({ password, userPassword: user.password })

    if(!validPassoword) {
      return { code: UserCodeMessage.INVALID_CREDENTIALS, message: "invalid credentials" }
    }

    const mongoResponse = await UserModel.findByIdAndDelete(userId);

    return { code: UserCodeMessage.USER_DELETED, message: "user deleted", userId };
  }
}
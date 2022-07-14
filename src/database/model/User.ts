import AsyncStorage from "@react-native-async-storage/async-storage";

const userKey = "@rentx:user";

interface IUser {
  id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string;
  token: string;
}

export default {
  async getUser() {
    const users = await AsyncStorage.getItem(userKey);

    if (users) {
      const user = JSON.parse(users) as IUser;

      return user;
    }
  },

  async saveUser(data: IUser) {
    const user = JSON.stringify(data);

    await AsyncStorage.setItem(userKey, user);
  }
};
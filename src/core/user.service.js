export class UserService {
  constructor(api) {
    this.api = api;
  }
  async checkUser(telegram_id) {
    try {
      const user = await this.api.post("/api/checkUser", {
        telegram_id
      });
      return user;
    } catch (err) {
      console.log(err);
      return;
    }
  }
}

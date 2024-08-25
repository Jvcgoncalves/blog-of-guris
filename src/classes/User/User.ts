export default class User {

  username: string;
  email: string;
  password: string;
  posts: string[];
  
  constructor({ pusername, email, password }: { pusername: string, email: string, password: string }) {
    this.username = pusername;
    this.email = email;
    this.password = password;
    this.posts = [];
  }
}
export default class Post {

  author: string
  title: string;
  content: string;
  comments = [];
  createdAt: Date;
  likes: number = 0;
  dislikes: number = 0;

  constructor(author: string, title: string, content: string) {
    this.author = author;
    this.title = title;
    this.content = content;
    this.createdAt = this.getCurrentDate();
  }

  getCurrentDate(): Date {
    return new Date();
  }
}
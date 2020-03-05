export class Cat{
    catId : number;
    catName : string;
  }
  export class User{
    userId : number;
    username : string;
  }
  export class Post{
    postId : number;
    postTitle : string;
    postContent : string;
    user : User;
    cat : Cat;
  }
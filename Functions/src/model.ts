export class Post{
    postId : number;
    postTitle : string;
    postContent : string;
    constructor(postId : number,postTitle : string,postContent : string){
        this.postId = postId;
        this.postTitle = postTitle;
        this.postContent = postContent;
    }
}
// export class Post{
//     postId : number;
//     postTitle : string;
//     postContent : string;
//     cat : Cat;
//     user: User;
//     constructor(post : Post){
//         this.postId = post.postId;
//         this.postTitle = post.postTitle;
//         this.postContent = post.postContent;
//         this.cat = post.cat;
//         this.user = post.user;
//     }
// }

// export class Cat{
//     catId : number;
//     catName : string;
//     constructor(cat:Cat){
//         this.catId = cat.catId;
//         this.catName = cat.catName;
//     }
// }

// export class User{
//     userId : number;
//     userName : string;
//     constructor(user:User){
//         this.userId = user.userId;
//         this.userName = user.userName;
//     }
// }
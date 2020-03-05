import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import { Post, User, Cat } from 'src/app/models/model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts : Post[] = [];
  ref = firebase.firestore();
  constructor() { }

  ngOnInit(): void {
    this.getPosts(1); // Category Id' si 1 olan postları getirdik.
  }

  getPosts(catId: number) {
    let post: Post = new Post();
    this.ref.collection('/posts').where('catId', '==', catId).get().then(postDoc => {
      postDoc.forEach(element => {
        post.postId = element.data().postId;
        post.postTitle = element.data().postTitle;
        post.postContent = element.data().postContent;
        this.ref.collection('/users').where('userId', '==', element.data().userId).get().then(userDoc => {
          post.user = userDoc.docs[0].data() as User;
          this.ref.collection('/cats').where('catId', '==', catId).get().then(catDoc => {
            post.cat = catDoc.docs[0].data() as Cat;
          }).catch(err => {
            console.log(err);
          })
        }).catch(err => {
          console.log(err);
        });
        this.posts.push(post);
      });
      console.log(this.posts);
    }).catch(err => {
      console.log(err);
    })
  }
}
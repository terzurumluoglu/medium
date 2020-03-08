import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import { Post } from 'src/app/models/model';
// import { map } from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    posts: Post[] = [];

    postRef = firebase.firestore().collection('posts');
    catRef = firebase.firestore().collection('cats');
    userRef = firebase.firestore().collection('users');
    constructor() { }

    ngOnInit(): void {
        let posts : Post[] = [];
        this.getPost(1).then((p : any[]) => {
            p.forEach(element => {
                let post : Post = new Post(element.postId,element.postTitle,element.postContent);   
                posts.push(post);
            });
            console.log(posts);
        }).catch(e => {
            console.log(e);
        });

    }

    async getPost(param ?: number){
        let snapshot : any;
        if (param) {
            snapshot = await this.postRef.where('catId','==',param).get();
        }else{
            snapshot = await this.postRef.get();
        }
        return snapshot.docs.map((doc: any) => doc.data());;
    }
    

}
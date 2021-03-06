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
        this.getData();
        // let posts : Post[] = [];
        // this.getPost(undefined).then((p : any[]) => {
        //     p.forEach(element => {
        //         let post : Post = new Post(element.postId,element.postTitle,element.postContent);   
        //         posts.push(post);
        //     });
        //     console.log(posts);
        // }).catch(e => {
        //     console.log(e);
        // });

    }

    async getData() {
        const data = await fetch('https://us-central1-mediumtoprak.cloudfunctions.net/GetPosts?catId=4');
        let dataJson = data.json();
        if (data.status == 200) {
            dataJson.then(p => {
                console.log(p);
            }).catch(e => {
                console.log(e);
            })
        } else if (data.status == 404) {
            console.log('Bulunamadı!');
        }
        else {
            console.log('Hata');
        }
    }


    async getPost(param?: string) {
        let catId: number = parseInt(param);
        console.log(catId);
        if (isNaN(catId)) {
            console.log('if');
        } else {
            console.log('else');
        }
        let snapshot: any;
        if (param) {
            snapshot = await this.postRef.where('catId', '==', param).get();
        } else {
            snapshot = await this.postRef.get();
        }
        return snapshot.docs.map((doc: any) => doc.data());;
    }
}
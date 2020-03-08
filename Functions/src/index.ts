import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Post } from './model';
admin.initializeApp();
const _db = admin.firestore();

const postRef = _db.collection('posts');

async function getPost(param ?: string){
    let snapshot : any;
    if (param) {
        const catId : number = parseInt(param);
        snapshot = await postRef.where('catId','==',catId).get();
    }else{
        snapshot = await postRef.get();
    }
    return snapshot.docs.map((doc: any) => doc.data());;
}

export const MyFirstFunctions = functions.https.onRequest((req, res) => {
    res.send('My API is working')
});

export const GetPosts = functions.https.onRequest((req, res) => {
    const posts : Post[] = [];
    getPost(req.query.catId).then((p : any[]) => {
        p.forEach(element => {
            const post : Post = new Post(element.postId,element.postTitle,element.postContent);   
            posts.push(post);
        });
        res.send(posts);
    }).catch(e => {
        res.status(500).send(e);
    });
});
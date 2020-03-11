import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Post } from './model';
import * as cors from 'cors';
admin.initializeApp();
const _db = admin.firestore();
const corsHandler = cors({ origin: getWhiteListURL(), methods: 'GET' });

const postRef = _db.collection('posts');

function getWhiteListURL() : string[]{
    return ['http://localhost:4200','http://localhost:4201'];
}

async function getPost(param?: number) {
    let snapshot: any;
    if (param) {
        snapshot = await postRef.where('catId', '==', param).get();
    } else {
        snapshot = await postRef.get();
    }
    return snapshot.docs.map((doc: any) => doc.data());;
}

function isParameterValid(param: any): any[] {
    const catId: number = parseInt(param);
    if (isNaN(catId) && param !== undefined) {
        return [false, param];
    } else {
        return [true, catId];
    }
}

export const MyFirstFunctions = functions.https.onRequest((req, res) => {
    res.send('My API is working')
});

export const GetPosts = functions.https.onRequest((req, res) => {
    corsHandler(req, res, () => {
        main();
    });
    function main() {
        const posts: Post[] = [];
        const param: any[] = isParameterValid(req.query.catId);
        if (param[0] === false) {
            res.status(404).send('Anlamsız Parametre!');
        } else {
            getPost(param[1]).then((p: any[]) => {
                if (p.length === 0) {
                    res.status(404).send('Bu kategoride henüz hiç yazı bulunamadı!');
                } else {
                    p.forEach(element => {
                        const post: Post = new Post(element.postId, element.postTitle, element.postContent);
                        posts.push(post);
                    });
                    res.send(posts);
                }
            }).catch(e => {
                res.status(500).send(e);
            });
        }
    }
});
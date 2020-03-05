import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
const _db = admin.firestore();
const postRef = _db.collection('posts');
const catRef = _db.collection('cats');
const userRef = _db.collection('users');

const getCat = (catId: number) => {
    return catRef.where('catId', '==', catId).get();
};
const getPost = (catId: number) => {
    return postRef.where('catId', '==', catId).get();
};
const getUser = (userId: number) => {
    return userRef.where('userId', '==', userId).get();
};


export const getPostsByCatId = functions.https.onRequest((req, res) => {
    let posts: any[] = [];
    let post: any = {
        postId: null,
        postTitle: null,
        postContent: null,
        user: null,
        cat: null
    };
    // cors(req, res, async () => {
    // corsHandler(req, res, () => {
    getPosts(1);
    // });
    // });

    function getPosts(catId: number) {
        getPost(catId).then((p: any) => {
            p.forEach((element: any) => {
                post.postId = element.data().postId;
                post.postTitle = element.data().postTitle;
                post.postContent = element.data().postContent;

                getUser(element.data().userId).then((u: any) => {
                    console.log(u.docs[0].data());
                    post.user = u.docs[0].data();
                    getCat(catId).then(c => {
                        console.log(c.docs[0].data());
                        post.cat = c.docs[0].data();
                        posts.push(post);
                        res.send(posts);
                    }).catch((e: any) => {
                        res.status(500).send(e);
                    });
                }).catch((e: any) => {
                    res.status(500).send(e);
                });
            });
        }).catch((e: any) => {
            res.status(500).send(e);
        });
    };
});
import { firebaseDatabase, firebaseAuth } from '../utils/firebaseUtils';

export default class FirebaseService {
    getDataList = (nodePath, callback, size = 10) => {

        let query = firebaseDatabase.ref(nodePath).limitToLast(size);

        query.on('value', dataSnapshot => {
            let items = [];
            dataSnapshot.forEach(childSnapshot => {
                let item = childSnapshot.val();
                item['key'] = childSnapshot.key;
                items.push(item);
            });
            callback(items);
        });
        return query;
    };

    pushData = (node, objToSubmit) => {
        const ref = firebaseDatabase.ref(node).push();
        const id = firebaseDatabase.ref(node).push().key;
        ref.set(objToSubmit);
        return id;
    };

    remove = (id, node) => {
        return firebaseDatabase.ref(node + '/' + id).remove();
    };

    static getUniqueDataBy = (node, id, callback) => {
        const ref = firebaseDatabase.ref(node + '/' + id);
        let newData = {};
        ref.once('value', (dataSnapshot) => {

            if (!dataSnapshot || dataSnapshot === undefined || !dataSnapshot.val() || dataSnapshot.val() === undefined) {
                callback(null);
                return;
            }

            const snap = dataSnapshot.val();
            const keys = Object.keys(snap);
            keys.forEach((key) => {
                newData[key] = snap[key];
            });
        }).then(() => {
            callback(newData);
        });
    };

    updateData = (id, node, obj) => {
        return firebaseDatabase.ref(node + '/' + id).set({ ...obj });
    };

    createUser = (email, password) => {
        return firebaseAuth.createUserWithEmailAndPassword(email, password);
    };

    login = (email, password) => {
        return firebaseAuth.signInWithEmailAndPassword(email, password);
    };

    logout = () => {
        return firebaseAuth.signOut();
    };

    onAuthChange = (callbackLogin, callbackLogout) => {
        firebaseAuth.onAuthStateChanged(authUser => {
            if (!authUser) {
                callbackLogout(authUser);
            } else {
                callbackLogin(authUser);
            }
        });
    };
};


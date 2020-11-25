import { firebaseDatabase, firebaseAuth } from '../utils/firebaseUtils';


export const getDataList = (nodePath, callback, size = 10) => {

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

export const pushData = (node, objToSubmit) => {
    const ref = firebaseDatabase.ref(node).push();
    const id = firebaseDatabase.ref(node).push().key;
    ref.set(objToSubmit);
    return id;
};

export const remove = (id, node) => {
    return firebaseDatabase.ref(node + '/' + id).remove();
};

export const getUniqueDataBy = (node, id, callback) => {
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

export const updateData = (id, node, obj) => {
    return firebaseDatabase.ref(node + '/' + id).set({ ...obj });
};

export const createUser = (email, password) => {
    return firebaseAuth.createUserWithEmailAndPassword(email, password);
};

export const login = (email, password) => {
    return firebaseAuth.signInWithEmailAndPassword(email, password);
};

export const logout = () => {
    return firebaseAuth.signOut();
};

export const onAuthChange = (callbackLogin, callbackLogout) => {
    firebaseAuth.onAuthStateChanged(authUser => {
        if (!authUser) {
            callbackLogout(authUser);
        } else {
            callbackLogin(authUser);
        }
    });
};



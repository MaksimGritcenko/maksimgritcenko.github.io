import { auth, db } from 'Utils/Firebase';

export const signInWithEmailAndPassword = async (email, password) => {
    try {
        return await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
        alert(err.message);
    }
};

export const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const res = await auth.createUserWithEmailAndPassword(email, password);
        const { user } = res;
        await db.collection('admins').doc(user.uid).set({
            uid: user.uid,
            name,
            authProvider: 'local',
            email,
        });
    } catch (err) {
        alert(err.message);
    }
};

export const logout = async () => {
    await auth.signOut();
};

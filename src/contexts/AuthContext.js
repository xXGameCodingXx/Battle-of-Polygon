import { useContext, createContext, useState, useEffect } from 'react'
import { auth } from '../firebase';

const AuthContext = createContext()

export function UseAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    async function register(username, email, password) {
        try {
            const result = await auth.createUserWithEmailAndPassword(email, password);
            return await result.user.updateProfile({ displayName: username });
        } catch (error) {
            if (error.code === "auth/email-already-in-use" || error.code === "auth/email-already-exists") return "Email already in use";
            else if (error.code === "auth/weak-password") return "Password too week";
            else if (error.code === "auth/invalid-email") return "Invalid Email";
            else if (error.code === "auth/invalid-password") return "Invalid Password";
            else if (error.code === "auth/maximum-user-count-exceeded") return "Account Creation Failed because User Limit Exceeded";
        }
    }

    async function login(email, password) {
        try {
            return await auth.signInWithEmailAndPassword(email, password)
        } catch (error) {
            if (error.code === "auth/user-not-found") return "User does not exist";
            else if (error.code === "auth/wrong-password") return "Invalid Password";
        }
    }

    async function logout() {
        await auth.signOut()
    }

    async function resetPassword(email) {
        try {
            return await auth.sendPasswordResetEmail(email)
        } catch (error) {
            if (error.code === "auth/user-not-found") return "User does not exist";
            else if (error.code === "auth/invalid-email") return "Invalid Email";
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        register,
        login,
        logout,
        resetPassword
    }

    return (
    <AuthContext.Provider value={value}>
        { !loading && children }
    </AuthContext.Provider>
  )
}
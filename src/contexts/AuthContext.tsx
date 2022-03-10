import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../services/firebase";

type UserType = {
    id: string,
    name: string | null,
    email: string | null
    avatar: string | null
}

type AuthContextType = {
    user: UserType | undefined,
    signInWithGoogle: () => Promise<void>
}

type AuthContextProviderProps = {
    children?: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(prop: AuthContextProviderProps) {
    const [ user, setUser ] = useState<UserType>();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const { displayName, email, photoURL, uid } = user;
            
                setUser({
                    id: uid,
                    name: displayName,
                    email: email,
                    avatar: photoURL
                })
            }
        })

        return () => {
            unsubscribe();
        }
    }, []);

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider)
        if (result.user) {
            const { displayName, email, photoURL, uid } = result.user;

            setUser({
                id: uid,
                name: displayName,
                email: email,
                avatar: photoURL
            });
        }
    }

    return (
        <AuthContext.Provider value={{user, signInWithGoogle}}>
            { prop.children }
        </AuthContext.Provider>
    );
}
import { onValue, ref } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { database } from "../services/firebase";

type NotePadsType = {
    id: string;
    title: string;
    color: string;
    date: string
}

type NotePadsDataType = Record<string, {
    title: string;
    color: string;
    date: string
}>

export function useNotePads() {
    const [ notePads, setNotePads ] = useState<NotePadsType[]>([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            const dbref = ref(database, `users/${user?.id}`);
            const unsubscribeOnValue = onValue(dbref, snapshot => {
                if (snapshot.exists()) {
                    const notepadsData: NotePadsDataType = snapshot.val().notepads;
                    const parsedNotePads = Object.entries(notepadsData).map(([key, value]) => {
                        return {
                            id: key,
                            title: value.title,
                            color: value.color,
                            date: value.date
                        }    
                    });
                    setNotePads(parsedNotePads);
                } else {
                    setNotePads([])
                }
            })

            return () => {
                unsubscribeOnValue();
            }
        }

    }, [user]);

    return notePads;
}
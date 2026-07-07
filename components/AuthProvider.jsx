"use client";
import { createClient } from '@/utils/supabase/client';
import {createContext, useContext, useState, useEffect} from 'react'

const AuthContext = createContext({
    user : null,
    profile : null,
    loading : true,
    signOut : async ()=>{}
})

export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const supabase = createClient();

    useEffect(()=>{

        const getInitialUser = async ()=>{
            const {data : {user}} = await supabase.auth.getUser();
            if(user){
                setUser(user);
                const {data} = await supabase.from("profiles").select("*").eq("id", user.id).single();
                setProfile(data);
            }
            setLoading(false);
        }

        getInitialUser();

        const {data: {subscription}} = supabase.auth.onAuthStateChange(async (event, session)=>{
            if(session){
                setUser(session.user);
                const {data} = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
                setProfile(data);
            }else {
                setUser(null);
                setProfile(null);
            }
            setLoading(false);
        })

        return ()=>subscription.unsubscribe();
    }, [supabase]);

    const signOut = async () => await supabase.auth.signOut();

    const refreshProfile = async () => {
        if (user) {
            const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
            if (data) setProfile(data);
        }
    };

    return (
        <AuthContext.Provider value={{user, profile, loading, signOut, refreshProfile}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useGlobalAuth = () => useContext(AuthContext);


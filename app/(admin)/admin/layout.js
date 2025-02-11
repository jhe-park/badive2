import React from 'react';
import SidebarComplete from './components/SidebarComplete';
import {createClient} from '@/utils/supabase/server';

export default async function ({children}) {
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();
    

    return (
        <>
            <SidebarComplete children={children} user={user} />
        </>
    );
};
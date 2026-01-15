"use server";

import { createClient } from "@/lib/supabase/server";

export async function getSavedMenus() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase.from('saved_menus').select('*').eq('user_id', user.id as string);
    if (error) {
        throw error;
    }
    return data;
}

export async function deleteSavedMenu(id: string) {
    const supabase = await createClient();
    const { data, error } = await supabase.from('saved_menus').delete().eq('id', id);
    if (error) {
        throw error;
    }
    return data;
}

export async function saveMenu(name: string, entradas: string[], platos: string[]) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase.from('saved_menus').insert({ name, entradas, platos, user_id: user.id as string });
    if (error) {
        throw error;
    }
    return data;
}

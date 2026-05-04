import { supabase } from "@/lib/supabase.js";

export async function getReports() {
  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return [];
  }

  return data || [];
}

export async function getReportById(id) {
  const { data, error } = await supabase.from("reports").select("*").eq("id", id).single();

  if (error) {
    return null;
  }

  return data;
}

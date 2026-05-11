import { supabase } from "@/lib/supabase.js";

function getDateRangeStart(range) {
  if (range === "hari-ini") {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    return start.toISOString();
  }

  if (range === "minggu-ini") {
    const start = new Date();
    start.setDate(start.getDate() - 7);
    return start.toISOString();
  }

  if (range === "bulan-ini") {
    const start = new Date();
    start.setMonth(start.getMonth() - 1);
    return start.toISOString();
  }

  return null;
}

export async function getReports(filters = {}) {
  const search = String(filters.search || "")
    .trim()
    .replace(/[%,()]/g, " ");
  const status = String(filters.status || "semua");
  const time = String(filters.time || "semua");

  let query = supabase
    .from("reports")
    .select("*")
    .order("created_at", { ascending: false });

  if (search) {
    query = query.or(
      `reporter_name.ilike.%${search}%,location_text.ilike.%${search}%,waste_type.ilike.%${search}%,description.ilike.%${search}%`
    );
  }

  if (status !== "semua") {
    query = query.eq("status", status);
  }

  const dateRangeStart = getDateRangeStart(time);
  if (dateRangeStart) {
    query = query.gte("created_at", dateRangeStart);
  }

  const { data, error } = await query;

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

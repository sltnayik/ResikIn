import { createClient } from "@/lib/supabase/server";

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

async function withSignedImageUrls(supabase, reports) {
  return Promise.all(
    (reports || []).map(async (report) => {
      if (!report.image_path) {
        return report;
      }

      const { data, error } = await supabase.storage
        .from("report-images")
        .createSignedUrl(report.image_path, 60 * 10);

      if (error) {
        return { ...report, image_url: "" };
      }

      return { ...report, image_url: data?.signedUrl || "" };
    })
  );
}

export async function getReports(filters = {}) {
  const supabase = await createClient();
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

  return withSignedImageUrls(supabase, data || []);
}

export async function getReportById(id) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("reports").select("*").eq("id", id).single();

  if (error || !data) {
    return null;
  }

  const [report] = await withSignedImageUrls(supabase, [data]);
  return report;
}

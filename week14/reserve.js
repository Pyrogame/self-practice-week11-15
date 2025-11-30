function formatLocalDate(serverTimeString) {
  const d = new Date(serverTimeString);
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const datePart = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(d);

  const timePart = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format(d);

  return `${datePart}, ${timePart} (${tz})`;
}
// function formatLocalDate แปลงวันที่–เวลาจาก server ให้เป็นรูปแบบ DD/MM/YYYY HH:mm:ss
// พร้อมแสดงตาม timezone ของคนใช้ เช่น "30/11/2025, 17:22:35 (Asia/Bangkok)"

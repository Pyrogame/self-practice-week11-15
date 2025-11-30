const BASE_URL =
  "https://bscit.sit.kmutt.ac.th/intproj25/cs4/itb-ecors/api/v1/study-plans";

async function loadStudyPlans() {
  try {
    const res = await fetch(BASE_URL, { headers: { Accept: "application/json" } });

    if (!res.ok) return showErrorDialog();

    const plans = await res.json();

    document.querySelector("#study_plans tbody").innerHTML = plans
      .map(
        p => `
        <tr class="ecors-row">
          <td class="ecors-id">${p.id}</td>
          <td class="ecors-planCode">${p.planCode}</td>
          <td class="ecors-nameEng">${p.nameEng}</td>
          <td class="ecors-nameTh">${p.nameTh}</td>
        </tr>`
      )
      .join("");

  } catch {
    showErrorDialog();
  }
}
function showErrorDialog() {
  const dialog = document.getElementById("ecorsDialog");
  dialog.querySelector(".ecors-dialog-message").textContent =
    "There is a problem. Please try again later.";
  dialog.showModal();
}

document.addEventListener("DOMContentLoaded", () => {
  requestIdleCallback(() => loadStudyPlans());

  document.querySelector(".ecors-button-manage")
    .addEventListener("click", () => {
      location.assign("./reserve.html");
    });
});
// function loadStudyPlans ดึง Study Plans จาก API แล้วสร้างแถวข้อมูล (<tr>)
// เพื่อแสดงในตาราง (study_plans) ถ้า fetch ผิดพลาดจะเรียก showErrorDialog()

// function showErrorDialog: แสดงข้อความแจ้งเตือนเมื่อเกิดข้อผิดพลาด
// เช่น API ล่ม, network error หรือ response ไม่ถูกต้อง

// ใน DOMContentLoaded: เรียก loadStudyPlans เมื่อหน้าโหลดเสร็จ
// และผูก event ให้ปุ่ม .ecors-button-manage เพื่อ redirect ไป reserve.html


//    Dialog Functions

/**
 * showDialog(message)
 * แสดงกล่องแจ้งเตือน (alert dialog) หรืออาจจะไม่ควรทำalert ไม่มั่นใจ
 * ใช้สำหรับแจ้ง error หรือข้อความปกติ
 */
function showDialog(message) {
  const dlg = document.querySelector(".ecors-dialog");
  dlg.querySelector(".ecors-dialog-message").textContent = message;
  dlg.showModal();
}

/**
 * showConfirm(message)
 * แสดงกล่องยืนยัน (Confirm dialog)
 * ใช้ตอนกดCancel Declaration
 */
function showConfirm(message) {
  const dlg = document.querySelector(".ecors-confirm-dialog");
  dlg.querySelector(".ecors-confirm-message").textContent = message;
  dlg.showModal();
}


/* -----------------------------
   Update Status UI
------------------------------ */

/**
 * updateStatusUI(data)
 * อัปเดตหน้าจอ UI ตามสถานะการประกาศวิชา (declare)
 * ทำให้ปุ่มและ dropdown แสดงตามสถานะจริง เช่น DECLARED / CANCELLED
 */
function updateStatusUI(data) {
  const declaredStatus = document.querySelector(".ecors-declared-plan");
  const declareBtn = document.querySelector(".ecors-button-declare");
  const changeBtn = document.querySelector(".ecors-button-change");
  const cancelBtn = document.querySelector(".ecors-button-cancel");
  const planDropdown = document.querySelector(".ecors-dropdown-plan");

  currentDeclaration = data; // เก็บสถานะล่าสุด

  /* -------------------------
     กรณียังไม่เคย declare
  -------------------------- */
  if (!data) {
    declaredStatus.textContent = "Not Declared";

    declareBtn.style.display = "inline-block";
    declareBtn.disabled = true; // ต้องเลือกแผนก่อน

    changeBtn.style.display = "none";
    cancelBtn.style.display = "none";

    planDropdown.disabled = false;
    planDropdown.value = "";
    return;
  }

  // หาแผนที่ประกาศจาก list ของ studyPlans
  const plan = studyPlans.find(p => p.id === data.planId);
  const formatted = formatLocalDate(data.updatedAt);

  /* -------------------------
     กรณี DECLARED
  -------------------------- */
  if (data.status === "DECLARED") {
    declaredStatus.textContent =
      `Declared ${plan.planCode} - ${plan.nameEng} on ${formatted}`;

    declareBtn.style.display = "none";

    changeBtn.style.display = "inline-block";
    changeBtn.disabled = true; // ต้องเลือกแผนใหม่ก่อนถึงจะเปลี่ยนได้

    cancelBtn.style.display = "inline-block";
    cancelBtn.disabled = false;

    planDropdown.disabled = false;
    planDropdown.value = plan.id;
  }

  /* -------------------------
     กรณี CANCELLED
  -------------------------- */
  if (data.status === "CANCELLED") {
    declaredStatus.textContent =
      `Cancelled ${plan.planCode} - ${plan.nameEng} on ${formatted}`;

    declareBtn.style.display = "inline-block";
    declareBtn.disabled = true;

    changeBtn.style.display = "none";
    cancelBtn.style.display = "none";

    planDropdown.disabled = false;
    planDropdown.value = "";
  }
}


/* -----------------------------
   DOM Loaded
------------------------------ */

document.addEventListener("DOMContentLoaded", async () => {
  const fullname = document.querySelector(".ecors-fullname");
  const planDropdown = document.querySelector(".ecors-dropdown-plan");
  const declareBtn = document.querySelector(".ecors-button-declare");
  const changeBtn = document.querySelector(".ecors-button-change");
  const cancelBtn = document.querySelector(".ecors-button-cancel");

  /* -------------------------
     ปุ่มใน dialog
  -------------------------- */

  // ปิด dialog แจ้งเตือนทั่วไป
  document.querySelector(".ecors-button-dialog")
    .addEventListener("click", () => {
      document.querySelector(".ecors-dialog").close();
    });

  // ปิด confirm dialog แต่ไม่ทำอะไรต่อ
  document.querySelector(".ecors-button-keep")
    .addEventListener("click", () => {
      document.querySelector(".ecors-confirm-dialog").close();
    });

  // ยืนยันการ cancel เรียก handleCancel() ที่เขียนไว้ก่อนหน้า
  document.querySelector(".ecors-button-confirm-cancel")
    .addEventListener("click", async () => {
      document.querySelector(".ecors-confirm-dialog").close();
      await handleCancel();
    });

  /* -------------------------
     Event: เปลี่ยน plan ใน dropdown
  -------------------------- */

  planDropdown.addEventListener("change", () => {
    const sel = planDropdown.value;

    // ถ้าไม่เลือกอะไรกด declare ไม่ได้
    declareBtn.disabled = !sel;

    // ถ้าเคย declare แล้ว ต้องเลือกแผนใหม่ถึงจะ change ได้
    if (currentDeclaration && currentDeclaration.status === "DECLARED") {
      changeBtn.disabled = parseInt(sel) === currentDeclaration.planId;
    }
  });

    // ปุ่ม declare
  declareBtn.addEventListener("click", async () => {
    if (planDropdown.value) await handleDeclare(planDropdown.value);
  });


    // ปุ่ม change
  changeBtn.addEventListener("click", async () => {
    if (planDropdown.value) await handleChange(planDropdown.value);
  });

    // ปุ่ม cancel
  cancelBtn.addEventListener("click", () => {
    if (!currentDeclaration) return;

    const plan = studyPlans.find(p => p.id === currentDeclaration.planId);
    const formatted = formatLocalDate(currentDeclaration.updatedAt);

    // แสดงหน้าต่างยืนยันก่อนยกเลิก
    showConfirm(
      `You have declared ${plan.planCode} - ${plan.nameEng} on ${formatted}. Are you sure?`
    );
  });

});

async function checkDeclarationStatus() {
  const res = await fetch(
    `/intproj25/cs4/itb-ecors/api/v1/students/${studentId}/declared-plan`
  );

  if (res.status !== 200) {
    updateStatusUI(null);
    return;
  }

  const data = await res.json();
  updateStatusUI(data);
}
// function checkDeclarationStatus ดึงข้อมูลว่าตอนนี้นักศึกษา ประกาศวิชา (declare) ไว้อยู่หรือไม่
// ถ้า status ไม่ใช่ 200 แปลว่า ยังไม่ได้ declare ส่ง null ไปอัปเดต UI
// ถ้า 200 อ่าน JSON แล้วส่งข้อมูลไปให้ updateStatusUI() อัปเดตหน้าจอ




async function handleDeclare(planId) {
  const res = await fetch(
    `/intproj25/cs4/itb-ecors/api/v1/students/${studentId}/declared-plan`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId: parseInt(planId) })
    }
  );

  if (res.status === 201) {
    updateStatusUI(await res.json());
  } else {
    showDialog("Declare failed.");
  }
}
// function handleDeclare ส่ง request แบบ POST เพื่อประกาศแผนครั้งแรก(method POST)
// ส่งค่า planId ไปให้ backend
// ถ้า backend ตอบกลับ 201 Created
// อ่านข้อมูลแล้วอัปเดต UI
// ถ้าไม่ใช่ 201 แจ้งว่าประกาศไม่สำเร็จ




async function handleChange(planId) {
  const res = await fetch(
    `/intproj25/cs4/itb-ecors/api/v1/students/${studentId}/declared-plan`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId: parseInt(planId) })
    }
  );

  if (res.status === 200) {
    updateStatusUI(await res.json());
    showDialog("Declaration updated.");
  } else {
    showDialog("Could not update declaration.");
  }
}
// function handleChange ใช้ตอนนักศึกษาต้องการ เปลี่ยนแผนที่ประกาศไปแล้ว(method PUT)
// ส่ง request แบบ PUT เพื่อ เปลี่ยนแผนที่เคย declare ไปแล้ว
// ส่ง planId ใหม่
// ถ้าสำเร็จ (status 200) อัปเดต UI + แจ้งข้อความ
// ถ้าไม่ บอกว่าแก้ไขไม่ได้




async function handleCancel() {
  const res = await fetch(
    `/intproj25/cs4/itb-ecors/api/v1/students/${studentId}/declared-plan`,
    {
      method: "DELETE"
    }
  );

  if (res.status === 200) {
    updateStatusUI(await res.json());
    showDialog("Declaration cancelled.");
  } else {
    showDialog("Cancel failed.");
  }
}
// function handleCancel ใช้ตอนต้องการ ลบ การประกาศแผน (method DELETE)
// ส่ง request แบบ DELETE เพื่อยกเลิกแผนที่ประกาศไปแล้ว
// ถ้าสำเร็จ (200) อัปเดต UI + แจ้งว่ายกเลิกแล้ว
// ถ้า error แจ้งว่าล้มเหลว




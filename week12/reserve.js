async function loadPlans() {
  const res = await fetch(`/intproj25/cs4/itb-ecors/api/v1/study-plans`);
  studyPlans = await res.json();

  const dd = document.querySelector(".ecors-dropdown-plan");
  dd.innerHTML = `<option value="">-- Select Plan --</option>`;

  studyPlans.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = `${p.planCode} - ${p.nameEng}`;
    dd.appendChild(opt);
  });
}

// function loadplan โหลดรายการ Study Plans ทั้งหมดจาก API ที่fetchไป 
// แล้วแสดงเป็นตัวเลือกใน dropdown เพื่อให้ผู้ใช้เลือกแผนที่จะ Declare บนหน้า reserve.js


// เริ่มต้นด้วย array เปล่า ไม่มีรายการใดๆ
let transactions = [];

// ยอดคงเหลือ
function createBalanceSection() {
    const wrapper = document.createElement('div');
    wrapper.className = 'balance-box';
 
    const heading = document.createElement('h1');
    heading.textContent = 'ตารางรายรับ-รายจ่าย';
 
    const label = document.createElement('h3');
    label.textContent = 'ยอดคงเหลือ';
 
    // ใส่ id ไว้ เพราะต้องหา element นี้เจอทีหลัง เพื่อเปลี่ยนตัวเลขข้างใน
    const value = document.createElement('div');
    value.id = 'balanceValue';
    value.className = 'balance-value';
 
    wrapper.appendChild(heading);
    wrapper.appendChild(label);
    wrapper.appendChild(value);
 
    return wrapper;
}
 
// ฟังก์ชันคำนวณยอดคงเหลือ แล้วอัปเดตตัวเลขบนหน้าจอ
function updateBalance() {
    let totalIncome = 0;
    let totalExpense = 0;
 
    // ไล่ดูทุกรายการใน array แล้วบวกเข้ากลุ่มให้ถูกประเภท
    for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].type === 'income') {
            totalIncome += transactions[i].amount;
        } else {
            totalExpense += transactions[i].amount;
        }
    }
 
    const balance = totalIncome - totalExpense;
 
    // หา element ที่สร้างไว้ก่อนหน้า แล้วเปลี่ยนข้อความข้างในเป็นยอดล่าสุด
    document.getElementById('balanceValue').textContent = balance;
}

// สร้างแถวฟอร์มสำหรับกรอกรายการใหม่
function createFormSection() {
    const row = document.createElement('div');
    row.className = 'form-row';
 
    // ช่องกรอกชื่อรายการ
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'inputName';
    nameInput.placeholder = 'รายการ';
 
    // ช่องกรอกจำนวนเงิน ใช้ type="number" เพื่อให้กรอกได้แต่ตัวเลข
    const amountInput = document.createElement('input');
    amountInput.type = 'number';
    amountInput.id = 'inputAmount';
    amountInput.placeholder = 'จำนวน';
 
    // dropdown เลือกประเภท: รายรับ หรือ รายจ่าย
    const typeSelect = document.createElement('select');
    typeSelect.id = 'inputType';
 
    const options = [
        { value: 'income',  text: 'รายรับ'  },
        { value: 'expense', text: 'รายจ่าย' }
    ];
    for (let i = 0; i < options.length; i++) {
        const opt = document.createElement('option');
        opt.value = options[i].value;
        opt.textContent = options[i].text;
        typeSelect.appendChild(opt);
    }
 
    // ช่องเลือกวันที่ ใช้ type="date" เบราว์เซอร์จะแสดง date picker ให้อัตโนมัติ
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = 'inputDate';
 
    // ปุ่มเพิ่มรายการ
    const addButton = document.createElement('button');
    addButton.type = 'button'; // กัน form submit / กันหน้ารีเฟรช
    addButton.textContent = 'เพิ่มรายการ';
 
    // ผูก event: พอกดปุ่มนี้ ให้เรียกฟังก์ชัน addTransaction()
    addButton.addEventListener('click', addTransaction);
 
    // ประกอบทุกช่องเข้า row เดียวกันตามลำดับที่จะแสดงผล
    row.appendChild(nameInput);
    row.appendChild(amountInput);
    row.appendChild(typeSelect);
    row.appendChild(dateInput);
    row.appendChild(addButton);
 
    return row;
}

function addTransaction() {
    const name = document.getElementById('inputName').value.trim();
    const amount = document.getElementById('inputAmount').value.trim();
    const type = document.getElementById('inputType').value;
    const date = document.getElementById('inputDate').value;
 
    // ตรวจสอบข้อมูลเบื้องต้นก่อนเพิ่ม กันผู้ใช้กดปุ่มโดยไม่กรอกอะไรเลย
    if (name === '') {
        alert('กรุณากรอกชื่อรายการ');
        return;
    }
    if (amount === '' || isNaN(amount) || Number(amount) <= 0) {
        alert('กรุณากรอกจำนวนเงินให้ถูกต้อง');
        return;
    }
    if (date === '') {
        alert('กรุณาเลือกวันที่');
        return;
    }
 
    // สร้าง object รายการใหม่ แล้วดันเข้า array ด้วย push
    transactions.push({
        date: date,
        name: name,
        amount: Number(amount), // แปลงจาก string เป็นตัวเลขจริง เพื่อเอาไปบวกลบได้
        type: type
    });
 
    // เรียงรายการทั้งหมดตามวันที่จากเก่าไปใหม่ ก่อนวาดตารางใหม่
    transactions.sort(function (a, b) {
        return a.date.localeCompare(b.date);
    });
 
    renderTable();     // วาดตารางใหม่ทั้งหมดให้ตรงกับข้อมูลล่าสุด
    updateBalance();   // คำนวณยอดคงเหลือใหม่
 
    // ล้างค่าฟอร์มหลังเพิ่มสำเร็จ เพื่อให้กรอกรายการถัดไปได้ทันที
    document.getElementById('inputName').value = '';
    document.getElementById('inputAmount').value = '';
    document.getElementById('inputDate').value = '';
}

// สร้างโครงตาราง (thead + tbody เปล่า)
function createTableSection() {
    const table = document.createElement('table');
 
    // สร้างส่วนหัวตาราง
    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');
 
    const headers = ['วันที่', 'รายการ', 'รายรับ', 'รายจ่าย'];
    for (let i = 0; i < headers.length; i++) {
        const th = document.createElement('th');
        th.textContent = headers[i];
        headRow.appendChild(th);
    }
    thead.appendChild(headRow);
 
    // สร้าง tbody ไว้เปล่าๆ ก่อน ใส่ id ไว้เพื่อให้ renderTable() หาเจอ
    const tbody = document.createElement('tbody');
    tbody.id = 'tableBody';
 
    table.appendChild(thead);
    table.appendChild(tbody);
 
    return table;
}

// วาดแถวข้อมูลลงในตาราง ทำงานโดย "ลบของเก่าทั้งหมดแล้ววาดใหม่ทั้งหมด" ทุกครั้ง
function renderTable() {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = ''; // ล้างแถวเก่าทั้งหมดออกก่อน
 
    for (let i = 0; i < transactions.length; i++) {
        const t = transactions[i];
        const row = document.createElement('tr');
 
        const dateCell = document.createElement('td');
        dateCell.textContent = t.date;
 
        const nameCell = document.createElement('td');
        nameCell.textContent = t.name;
 
        const incomeCell = document.createElement('td');
        // ถ้าเป็นรายรับ ให้แสดงจำนวนเงินในคอลัมน์นี้ ถ้าไม่ใช่ให้แสดง 0
        incomeCell.textContent = t.type === 'income' ? t.amount : 0;
 
        const expenseCell = document.createElement('td');
        // ถ้าเป็นรายจ่าย ให้แสดงจำนวนเงินในคอลัมน์นี้ ถ้าไม่ใช่ให้แสดง 0
        expenseCell.textContent = t.type === 'expense' ? t.amount : 0;
 
        row.appendChild(dateCell);
        row.appendChild(nameCell);
        row.appendChild(incomeCell);
        row.appendChild(expenseCell);
 
        tbody.appendChild(row);
    }
}

// เริ่มต้นของโปรแกรม
document.body.appendChild(createBalanceSection());
document.body.appendChild(createFormSection());
document.body.appendChild(createTableSection());
 
// วาดตารางและคำนวณยอดคงเหลือครั้งแรกด้วยข้อมูลตั้งต้น
renderTable();
updateBalance();
 

let style = document.createElement('style');
style.textContent = `
    body {
    font-family: 'Sarabun', Arial, sans-serif;
    background-color: #f4f6f8;
    padding: 30px;
    }
    
    .balance-box {
    text-align: center;
    margin-bottom: 25px;
    }
    
    .balance-value {
    font-size: 48px;
    font-weight: bold;
    }
    
    .form-row {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-bottom: 30px;
    flex-wrap: wrap;
    }
    
    .form-row input,
    .form-row select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 15px;
    }
    
    .form-row button {
    padding: 10px 20px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    cursor: pointer;
    }
    
    table {
    width: 100%;
    border-collapse: collapse;
    max-width: 900px;
    margin: 0 auto;
    }
    
    th {
    background-color: #17a2b8;
    color: white;
    padding: 12px;
    }
    
    td {
    padding: 12px;
    text-align: center;
    border-bottom: 1px solid #eee;
    }`;
document.head.appendChild(style);

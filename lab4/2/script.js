// เก็บคำแปล 2 ภาษา
const translate = {
    en: {
        title: 'Register',
        lang: 'Language:',
        username: 'Full Name',
        usernamePHD: 'Enter your name',
        email: 'email',
        emailPHD: 'Enter your email',
        password: 'Password',
        passwordPHD: 'Create a password',
        confirm: 'Confirm Password',
        confirmPHD: 'Confirm your password',
        button: 'Sign Up'
    },

    th: {
        title: 'สมัครสมาชิก',
        lang: 'ภาษา:',
        username: 'ชื่อ-นามสกุล',
        usernamePHD: 'กรอกชื่อของคุณ',
        email: 'อีเมล',
        emailPHD: 'กรอกอีเมลของคุณ',
        password: 'รหัสผ่าน',
        passwordPHD: 'สร้างรหัสผ่าน',
        confirm: 'ยืนยันรหัสผ่าน',
        confirmPHD: 'ยืนยันรหัสผ่านของคุณ',
        button: 'สมัครสมาชิก'
    }
};

// กำหนดค่าเริ่มต้นของภาษา
let currentLang = 'en';

// สร้างปุ่มเปลี่ยนภาษา
function createLangSelector() {
    const div1 = document.createElement('div');
    div1.className = 'LangSelect';
    div1.className = 'LangSelect';
    div1.style.textAlign = "right";
    div1.style.marginBottom = "20px";

    // ใช้ span แทน label เพราะแค่ต้องการห่อข้อความไว้เฉยๆ
    const label = document.createElement('span');
    label.id = 'LangLabel';
    label.textContent = translate[currentLang].lang;
    label.style.fontWeight = "bold";

    // สร้าง dropdown สำหรับเลือกภาษา
    const select = document.createElement('select');
    select.id = 'LangSwitch';
    select.style.marginTop = "5px";
    select.style.padding = "5px";
    select.style.borderRadius = "6px";

    // เก็บรายการภาษาไว้เป็น array ของ object ใช้ loop สร้าง <option> แทนการเขียน createElement ซ้ำทีละตัว
    const option = [
        {value: 'en', text: 'English'},
        {value: 'th', text: 'ไทย'}
    ];

    for (let i =0; i < option.length; i++) {
        const optionEl = document.createElement('option');
        optionEl.value = option[i].value;
        optionEl.textContent = option[i].text;
        select.appendChild(optionEl);
    }

    // ทำให้ dropdown แสดงค่าตรงกับภาษาปัจจุบัน
    select.value = currentLang;

    // ผูก event: ทุกครั้งที่ผู้ใช้เปลี่ยนตัวเลือกใน dropdown
    select.addEventListener('change', function(e){
        renderForm(e.target.value);
    });

    div1.appendChild(label);
    div1.appendChild(document.createElement('br'));
    div1.appendChild(select);
    
    return div1;
}

// สร้างฟอร์มทั้งหมดใหม่ตามภาษาที่ระบุ ถูกเรียกทั้งตอนโหลดหน้าเว็บครั้งแรก และทุกครั้งที่สลับภาษา
function renderForm(lang) {
    currentLang = lang;
    const t = translate[lang];

    // เช็คว่ามีฟอร์มเก่าค้างอยู่ไหม ถ้ามีให้ลบทิ้งก่อน
    let div2 = document.getElementById('formContainer');
    if (div2) {
        div2.remove();
    }

    div2 = document.createElement('div');
    div2.id = 'formContainer';
    
    // css
    div2.style.width = "420px";
    div2.style.margin = "40px auto";
    div2.style.padding = "30px";
    div2.style.backgroundColor = "white";
    div2.style.borderRadius = "15px";
    div2.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";
    div2.appendChild(createLangSelector());

    const title = document.createElement('h1');
    title.textContent = t.title;
    div2.appendChild(title);

    const form = document.createElement('form');
    form.id = 'myForm';

    // ช่วยลดการเขียนโค้ดซ้ำ
    function createField(id, labelText, PHD, iptype) {
        const fieldDiv = document.createElement('p');

        const label = document.createElement('label');
        label.textContent = labelText;
        label.setAttribute('for', id);

        // css
        label.style.fontWeight = "bold";
        label.style.display = "block";
        label.style.fontSize = '16px'
        label.style.marginBottom = "5px";

        const input = document.createElement('input');
        input.type = iptype;
        input.id = id;
        input.name = id;
        input.placeholder = PHD;

        // css
        input.style.width = "100%";
        input.style.padding = "10px";
        input.style.marginBottom = "15px";
        input.style.border = "1px solid #ccc";
        input.style.borderRadius = "8px";
        input.style.fontSize = "15px";

        fieldDiv.appendChild(label);
        fieldDiv.appendChild(document.createElement('br'));
        fieldDiv.appendChild(input);

        return fieldDiv;
    }

    form.appendChild(createField('username', t.username, t.usernamePHD, 'text'));
    form.appendChild(createField('email', t.email, t.emailPHD, 'email'));
    form.appendChild(createField('password', t.password, t.passwordPHD, 'password'));
    form.appendChild(createField('confirm', t.confirm, t.confirmPHD, 'password'));

    div2.appendChild(form);

    // ปุ่ม, css
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = t.button;
    button.style.width = "100%";
    button.style.padding = "12px";
    button.style.backgroundColor = "#007BFF";
    button.style.color = "white";
    button.style.border = "none";
    button.style.borderRadius = "8px";
    button.style.fontSize = "16px";
    button.style.cursor = "pointer";
    div2.appendChild(button);

    document.body.appendChild(div2);

    // อัปเดตข้อความ "Language:" ให้ตรงกับภาษาปัจจุบันด้วย
    const LangLabelEl = document.getElementById('LangLabel');
    if (LangLabelEl) {
        LangLabelEl.textContent = t.lang;
    }

}

// เรียก renderForm ครั้งแรกตอนไฟล์นี้ถูกโหลด
renderForm('en');


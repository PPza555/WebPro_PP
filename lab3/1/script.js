
function RegisterForm() {    

    const user = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirm = document.getElementById("confirm").value.trim();

    if (user.length < 5 ) {
        alert("Username  ต้องไม่ต่ำกว่า 5 ตัวอักษร");
        return false;
    }
    
    let atPosition = email.indexOf("@");
    let dotPosition = email.indexOf(".", atPosition);
    if (atPosition === -1 || dotPosition === -1) {
        alert("กรุณากรอก email ให้ถูกต้อง");
        return false;
    }

    if (phone.length != 10 || isNaN(phone)) {
        alert("กรุณากรอกเบอร์โทรศัพท์มือถือให้ถูกต้อง");
        return false;
    }

    let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!passwordPattern.test(password)) {
        alert("Password ต้องไม่ต่ำกว่า 8 ตัวอักษร และต้องมีตัวอักษรพิมพ์ใหญ่ ตัวอักษรพิมพ์เล็ก ตัวเลข และอักขระพิเศษอย่างน้อยอย่างละ 1 ตัว");
        return false;
    }
    
    if (confirm != password) {
        alert("Confirm Password ไม่ตรงกับรหัสผ่านที่ป้อน");
        return false;
    }

    alert("ลงทะเบียนสำเร็จ");
    return true;
}


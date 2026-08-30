
// สร้าง tag style แล้วใส่ข้อความเข้าไปใน style ด้วย textContent
let style = document.createElement('style');
style.textContent = `
    th, td {
        font-size: 24px;
        border-bottom: 1px black solid;
        text-align: center;
    }

    table {
        width: 330px;
    }

    body {
    margin: 50px;
    width: 80%;
    }
`;
document.head.appendChild(style);

// ชื่อหัวข้อ
let H1 = document.createElement('h1');
H1.appendChild(document.createTextNode('ป้อนเลขสูตรคูณ (1-12)'));
document.body.appendChild(H1);

// แบ่ง div
let div = document.createElement('div');

// input
let input = document.createElement('input');
input.type = 'number';
input.id = 'input';
input.style.fontSize = '16px';
input.style.padding = '6px';

// button
let button = document.createElement('button');
button.appendChild(document.createTextNode('แสดงสูตรคูณ'));
button.onclick = St;
button.style.fontSize = '16px';
button.style.padding = '6px';
button.style.marginLeft = '15px';

// เพิ่มไปยัง HTML
div.appendChild(input);
div.appendChild(button);
document.body.appendChild(div);


// func
function St() {
    let n = document.getElementById('input').value;
    if (n < 1 || n > 12) {
        alert('กรุณาป้อนตัวเลข 1-12');
        return;
    }
    // ลบตารางเดิม
    let oldTable = document.querySelector('table');
    if (oldTable) oldTable.remove();

    // สร้างตาราง
    let table = document.createElement('table');
    let trHead = document.createElement('tr');
    
    let th1 = document.createElement('th');
    th1.appendChild(document.createTextNode('เลขคูณ'));
    let th2 = document.createElement('th');
    th2.appendChild(document.createTextNode('ผลลัพธ์'));
    
    trHead.appendChild(th1);
    trHead.appendChild(th2);
    table.appendChild(trHead);
    
    // สร้างแถวในตาราง
    for (let i=1; i<=12; i++) {
        let trbody = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');

        td1.appendChild(document.createTextNode(`${n} x ${i}`));
        td2.appendChild(document.createTextNode(n *i));
        
        trbody.appendChild(td1);
        trbody.appendChild(td2);
        table.appendChild(trbody);

    }
    
    document.body.appendChild(table);

}


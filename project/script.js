window.addEventListener("DOMContentLoaded", () => {
    const contentBox = document.getElementById("text-of-content");
    const main = document.querySelector("main");

    const h2List = main.querySelectorAll("section > h2");

    let html = `<h2 id='textref'>สารบัญ</h2><ul class="toc">`;

    h2List.forEach((h2, index) => {

        // สร้าง id ให้ h2
        const h2Id = `section-${index + 1}`;
        h2.id = h2Id;

        html += `
            <li>
                <a href="#${h2Id}">${h2.textContent}</a>
        `;

        // หา h3 ที่อยู่ใน section เดียวกัน
        const h3List = h2.parentElement.querySelectorAll("article > h3");

        if (h3List.length > 0) {

            html += `<ul>`;

            h3List.forEach((h3, subIndex) => {

                const h3Id = `${h2Id}-${subIndex + 1}`;
                h3.id = h3Id;

                html += `
                    <li>
                        <a href="#${h3Id}">
                            ${h3.textContent}
                        </a>
                    </li>
                `;
            });

            html += `</ul>`;
        }

        html += `</li>`;
    });

    html += `</ul>`;

    contentBox.innerHTML = html;
});

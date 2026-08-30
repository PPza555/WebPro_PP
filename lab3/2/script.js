const numberImages = [
    "http://webdev.it.kmitl.ac.th/labdocs/unit3/images/0.png",
    "http://webdev.it.kmitl.ac.th/labdocs/unit3/images/1.png",
    "http://webdev.it.kmitl.ac.th/labdocs/unit3/images/2.png",
    "http://webdev.it.kmitl.ac.th/labdocs/unit3/images/3.png",
    "http://webdev.it.kmitl.ac.th/labdocs/unit3/images/4.png",
    "http://webdev.it.kmitl.ac.th/labdocs/unit3/images/5.png",
    "http://webdev.it.kmitl.ac.th/labdocs/unit3/images/6.png",
    "http://webdev.it.kmitl.ac.th/labdocs/unit3/images/7.png",
    "http://webdev.it.kmitl.ac.th/labdocs/unit3/images/8.png",
    "http://webdev.it.kmitl.ac.th/labdocs/unit3/images/9.png"
  ];

function RandomNum() {
    const output = document.getElementById('rannum');
    output.innerHTML = '';

    for (let i = 0; i < 6; i++) {
        let rand = Math.floor(Math.random() * 10);
        let img = document.createElement('img');
        img.src = numberImages[rand];
        img.alt = rand;
        output.appendChild(img);
    }
}
RandomNum();

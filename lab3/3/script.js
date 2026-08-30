const SPoint = document.querySelectorAll('.point');
const SGrade = document.querySelectorAll('.grade');

let scores = [];

function RandomScore() {
    return Math.floor(Math.random() * 61) + 40;
}

window.onload = function () {
    for (let i = 0; i < SPoint.length; i++) {
        scores[i] = RandomScore();
        SPoint[i].textContent = scores[i];
    }
}

function calculate() {

    for (let i = 0; i < scores.length; i++) {
        let score = scores[i];
        let grade = '';

        if (score >= 80) {
            grade = 'A';
        } else if (score >= 70) {
            grade = 'B';
        } else if (score >= 60) {
            grade = 'C';
        } else if (score >= 50) {
            grade = 'D';
        } else {
            grade = 'F';
        }

        SGrade[i].textContent = grade;
    }
}

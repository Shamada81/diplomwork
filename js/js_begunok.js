//***Основные переменные
let bordLeft = document.getElementById("blockPhoto");
let sliderMark = document.getElementById("marker");
let divConteiner = document.getElementById("div");
let downPhotoBlock = document.getElementById("downPhotoBlock");
let downPhoto = document.getElementById("downPhoto");
let upPhoto = document.getElementById("upPhoto");

//***Создаем адаптивность

//***Параметры экрана если на полный экран
// let widthScreen = document.body.clientWidth;
// let conversionFactor = document.body.clientWidth / document.getElementById("upPhoto").offsetWidth;
// Если встраиваем в блок
let widthScreen = divConteiner.parentElement.offsetWidth;
let conversionFactor = widthScreen / document.getElementById("upPhoto").offsetWidth;


//***Корректировка размеров блока и составляющих

//****Блоки
//***Основной контейнер
divConteiner.style.width = widthScreen + "px";
divConteiner.style.height = divConteiner.offsetHeight * conversionFactor + "px";
//Верхний блок id="blockPhoto"
bordLeft.style.width = divConteiner.offsetWidth / 2 + "px";
bordLeft.style.height = divConteiner.offsetHeight + "px";
//Нижний блок id="downPhotoBlock"
downPhotoBlock.style.width = divConteiner.offsetWidth + "px";
downPhotoBlock.style.height = divConteiner.offsetHeight + "px";
downPhotoBlock.style.top = -downPhotoBlock.offsetHeight + "px"


//***Фото
//***Нижнее фото id="downPhoto"
downPhoto.style.width = downPhotoBlock.offsetWidth + "px";
downPhoto.style.height = downPhotoBlock.offsetHeight + "px";


//***Верхнее фото id="upPhoto"
upPhoto.style.width = downPhoto.offsetWidth  + "px";
upPhoto.style.height = bordLeft.offsetHeight + "px";

//***Бегунок
sliderMark.style.height = bordLeft.offsetHeight + "px";
sliderMark.style.left = bordLeft.clientLeft + "px"


//Отслеживаем перемещения
let divLeft = divConteiner.offsetLeft;
// let moveDelta;
let moveDelta = bordLeft.clientX - 10 + "px";
let overDelta;

//Расчет положения границы
let markerLeft = (divConteiner.offsetWidth + divConteiner.offsetLeft) - bordLeft.offsetWidth - 10 + "px";
let markerTop =  divConteiner.offsetTop;

//Начальное положение границы
sliderMark.style.top = markerTop;
sliderMark.style.left = markerLeft;
sliderMark.hidden = false;

// Функция захвата нажатия мыши на границе
sliderMark.onmousedown = function (e) {
    moveBorder(e);
    // console.log("Сработал onklick");

    sliderMark.style.position = "absolute";

    //Задаем глубину слоя
    sliderMark.style.zIndex = 1000;


    function moveBorder(e) {
        sliderMark.style.left = e.clientX - 20 + 'px';
        overDelta = e.clientX - 20 - bordLeft.offsetLeft;
        bordLeft.style.width = bordLeft.clientWidth - overDelta + 'px';
        console.log(((e.clientX + 30) > (divConteiner.offsetWidth + divConteiner.offsetLeft)) || (e.clientX < (divConteiner.offsetLeft +10)));

        if ((e.clientX + 30) > (divConteiner.offsetWidth + divConteiner.offsetLeft)){
            document.removeEventListener("mousemove",moveBorder)
            document.onmousemove = null;
            sliderMark.onmouseup = null;
            sliderMark.style.left = divConteiner.offsetWidth + divConteiner.offsetLeft - 50 + "px";
            bordLeft.style.width = bordLeft.clientWidth - sliderMark.offsetWidth / 2 - 10 + "px";
        }
        if(e.clientX < divConteiner.offsetLeft + 20){
            document.removeEventListener("mousemove",moveBorder)
            document.onmousemove = null;
            sliderMark.onmouseup = null;
            sliderMark.style.left = divConteiner.offsetLeft + 10+ "px";
            bordLeft.style.width = bordLeft.clientWidth - sliderMark.offsetWidth / 2 - 10 + "px";
            //console.log(bordLeft.style.width,sliderMark.style.left)
        }
    }

    sliderMark.ondragstart = function() {
        return false;
    };

    document.addEventListener("mousemove", moveBorder);

    document.onmouseup = function() {
        document.removeEventListener("mousemove",moveBorder)
        document.onmousemove = null;
        sliderMark.onmouseup = null;
    }

}
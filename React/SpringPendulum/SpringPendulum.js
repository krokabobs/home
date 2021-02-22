// Пружина
import React from 'react'
window.addEventListener("load", Main_Spring, true);
export default function Canv () {
    return (
    function Main_Spring() {
        var canvas = spring_canvas;
        canvas.onselectstart = function () {
            return false;
        };     // запрет выделения canvas
        var ctx = canvas.getContext("2d");                      // на ctx происходит рисование
        var w = canvas.width;                                   // ширина окна в расчетных координатах
        var h = canvas.height;                                  // высота окна в расчетных координатах

        var Pi = 3.1415926;    	      	    // число "пи"

        var m0 = 1;    		      	        // масштаб массы
        var T0 = 1;    		      	        // масштаб времени (период колебаний исходной системы)

        var k0 = 2 * Pi / T0;           	// масштаб частоты
        var C0 = m0 * k0 * k0;          	// масштаб жесткости

        // *** Задание физических параметров ***

        var m = 1 * m0;                 	// масса
        var C = 1 * C0;                 	// жесткость
        slider_m.value = (m / m0).toFixed(1);
        number_m.value = (m / m0).toFixed(1);
        slider_C.value = (C / C0).toFixed(1);
        number_C.value = (C / C0).toFixed(1);

        // *** Задание вычислительных параметров ***

        var fps = 60;		      	        // frames per second - число кадров в секунду (качество отображения)
        var spf = 10;		      	        // steps per frame   - число шагов интегрирования между кадрами (увеличивает скорость расчета)
        var dt = 0.05 * T0 / fps;    	    // шаг интегрирования (качество расчета)
        var steps = 0;                      // количество шагов интегрирования

        function setM(new_m) {
            m = new_m * m0;
        }

        function setC(new_C) {
            C = new_C * C0;
        }

        slider_m.oninput = function () {
            number_m.value = slider_m.value;
            setM(slider_m.value);
        };
        number_m.oninput = function () {
            slider_m.value = number_m.value;
            setM(number_m.value);
        };
        slider_C.oninput = function () {
            number_C.value = slider_C.value;
            setC(slider_C.value);
        };
        number_C.oninput = function () {
            slider_C.value = number_C.value;
            setC(number_C.value);
        };

        var count = true;       // проводить ли расчет системы
        var v = 0;				// скорость тела

        var rw = canvas.width / 30;
        var rh = canvas.height / 1.5;
        var x0 = 15 * rw - rw / 2;
        var y0 = rh / 1.33 - rh / 2;

        // параметры пружины
        var coil = 10;        // количество витков
        var startX = 0;       // закрепление пружины

        // создаем прямоугольник-грузик
        var rect = {
            x: x0, width: rw,
            y: y0, height: rh,
            fill: "rgba(0, 0, 255, 1)"    	// цвет
        };

        // захват прямоугольника мышью
        var mx_;                                    // буфер позиции мыши (для расчета скорости при отпускании шара)
        document.onmousedown = function (e) {        // функция при нажатии клавиши мыши
            var m = mouseCoords(e);                 // получаем расчетные координаты курсора мыши

            var x = rect.x;
            var xw = rect.x + rect.width;
            var y = rect.y;
            var yh = rect.y + rect.height;
            if (x <= m.x && xw >= m.x && y <= m.y && yh >= m.y) {
                if (e.which == 1) {                         // нажата левая клавиша мыши
                    rect.xPlus = rect.x - m.x;              // сдвиг курсора относительно грузика по x
                    rect.yPlus = rect.y - m.y;              // сдвиг курсора относительно грузика по y
                    mx_ = m.x;
                    count = false;
                    document.onmousemove = mouseMove;       // пока клавиша нажата - работает функция перемещения
                }
            }
        };

        document.onmouseup = function (e) {          // функция при отпускании клавиши мыши
            document.onmousemove = null;              // когда клавиша отпущена - функции перемещения нету
            count = true;
        };

        function mouseMove(e) {                     // функция при перемещении мыши, работает только с зажатой ЛКМ
            var m = mouseCoords(e);                 // получаем расчетные координаты курсора мыши
            rect.x = m.x + rect.xPlus;
            v = 6.0 * (m.x - mx_) / dt / fps;     // сохранение инерции
            mx_ = m.x;
        }

        function mouseCoords(e) {                   // функция возвращает расчетные координаты курсора мыши
            var m = [];
            var rect = canvas.getBoundingClientRect();
            m.x = (e.clientX - rect.left);
            m.y = (e.clientY - rect.top);
            return m;
        }

        function control() {
            calculate();
            draw();
            requestAnimationFrame(control);
            var start;
            window.requestAnimationFrame(function step(timestamp) {
                if (!start) start = timestamp;
                var time = timestamp - start;
                // Get percent of completion in range [0, 1].
                var percent = Math.min(time / 2000, 1);

                // Proceed with animation as long as we wanted it to.
                if (time < 2000) {
                    window.requestAnimationFrame(step);
                }
            })
        }

        control();

        function calculate() {
            if (!count) return;
            for (var s = 1; s <= spf; s++) {
                var f = -C * (rect.x - x0);
                v += f / m * dt;
                rect.x += v * dt;

                steps++;
            }

        }

        function draw() {
            ctx.clearRect(0, 0, w, h);

            ctx.strokeStyle = "#0aa";
            ctx.beginPath();
            ctx.moveTo(0, y0 + rh / 2);
            for (var i = 1; i <= coil + 1; i++) {
                var x;
                var y;
                if (i != coil + 1) {
                    x = startX + ((rect.x - startX)) / coil * i - ((rect.x - startX)) / coil / 2;
                    y = y0 + rh / 2 + ((i % 2 == 0) ? 1 : -1) * 30;
                } else {
                    x = startX + ((rect.x - startX)) / coil * i - ((rect.x - startX)) / coil;
                    y = y0 + rh / 2;
                }

                ctx.lineTo(x, y);
            }
            ctx.stroke();

            ctx.fillStyle = "#0000ff";
            ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
        }
    })
}
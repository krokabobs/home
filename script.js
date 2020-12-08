let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
function circle (pos_x, pos_y, radius, color) {
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.arc(pos_x, pos_y, radius, 0, Math.PI*2, true);
    ctx.fill();
}
// Создание функции отображения блока
function block (pos_x, pos_y, width, height, color) {
    // Назначаем цвет для блока
    ctx.fillStyle = color;
    // Рисуем блок
    ctx.fillRect(pos_x, pos_y, width, height);
}
// Переменные для позиции шарика
let x_circle = 30, y_circle = 250;
// Переменные для направления шарика
let move_right = true, move_top = true;

// Переменные для размера блока
let y_block = 200, height_block = 100;

// счёт
let score = 0;
// Запускаем обработчик события нажатия клавиш
document.addEventListener('keydown', function(event) {
    if (event.code == "ArrowDown" && y_block + height_block !== 500) {
        y_block += 5;
    } else if (event.code == "ArrowUp" && y_block != 0) {
        y_block -= 5;
    }
});
let playGame = setInterval(function () {
// Удаление всего с поля
   // ctx.clearRect(0, 0, 800, 500);

// Проверка что шарик столкнулся с блоком
    if (y_circle >= y_block && y_circle <= y_block + height_block && x_circle == 725) {
        // Меняем направление шарика
        move_right = false;
        // Увеличиваем счёт
        score++;
    }
// Проверка столкновения с верху
    if (y_circle - 25 == 0) {
        // Меняет направление вниз
        move_top = false;
// Проверка столкновения с низу
    } else if (y_circle + 25 == 500) {
        // Меняем направление вверх
        move_top = true;
    }

// Проверка столкновения с лева
    if (x_circle - 25 == 0) {
        Меняет направление в право
        move_right = true;
    }
// Проверка что идёт направление шарика в право
    if (move_right == true) {
        // Увеличиваем позицию шарика по X
        x_circle++;
    } else { // Иначе
        // Уменьшаем позицию шарика по X
        x_circle--;
    }

// Проверка что направление шарика в верх
    if (move_top == true) {
        // Уменьшаем позицию шарика по Y
        y_circle--;
    } else {
        // Увеличиваем позицию шарика по Y
        y_circle++;
    }
    // Рисуем шарик
    circle(x_circle, y_circle, 25, "red");
// Рисуем блок
    block(750, y_block, 25, height_block, "green");

// Условие для закачивания игры
    if ((y_circle <= y_block || y_circle >= y_block + height_block) && x_circle > 725) {
        // Остановка таймера
        clearInterval(playGame);
        // Вывод счёта
        alert("Ваш счёт: " + score);
    }
}, 10)

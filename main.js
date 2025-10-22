
// Инициализация EmailJS
(function () {
    emailjs.init("lNvlGywvZEQFxNmRx");
})();

window.onload = function () {
    let now = new Date();
    let today = now.toISOString().split("T")[0];
    document.getElementById('datenow').min = today;

    document.getElementById('datenow').addEventListener('change', function () {
        const startDate = this.value;
        document.getElementById('dateEnd').min = startDate;
    });
};

let id = 0;
let name;
let dateIn;
let dateOut;
let rooms;
let additionalInfo = [];
let userEmail = '';

let bookingCounter = 0; // Добавляем глобальный счетчик

function toEmailJs(bookingData) {
    return function (e) {
        e.preventDefault();

        // Увеличиваем счетчик для каждого нового бронирования
        bookingCounter++;

        // Формируем параметры для отправки
        const templateParams = {
            to_email: bookingData.email,
            booking_id: bookingCounter, // Используем счетчик вместо id
            customer_name: bookingData.name,
            check_in: bookingData.dateIn,
            check_out: bookingData.dateOut,
            guests: bookingData.guest,
            rooms: bookingData.rooms,
            additional_info: bookingData.additionalInfo.join(', ')
        };

        console.log("Sending email with params:", templateParams);

        emailjs.send('service_ikayqip', 'template_ogrw80n', templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Бронирование подтверждено и отправлено на email!');
            }, function (error) {
                console.log('FAILED...', error);
                alert('Ошибка при отправке email. Пожалуйста, свяжитесь с нами напрямую.');
            });
    };
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function bookingHotel(fio, date1, date2, guest) {
    const bookingList = document.getElementById('bookingList');
    const emailInput = document.getElementById('userEmail');

    userEmail = emailInput.value;

    if (!validateEmail(userEmail)) {
        alert("Пожалуйста, введите корректный email!");
        return;
    }

    if (fio !== null && fio.trim() !== '') {
        getName(fio);

        if (date1 !== null && date1 !== '' && date2 !== null && date2 !== '') {
            Func(date1, date2);
            if (guest === null || guest === '') {
                alert("Введите количество гостей!!!");
            } else {
                const selRoom = document.form1.room;
                rooms = selRoom.options[selRoom.selectedIndex];
                getAdditInfo();
                id++;
            }
        } else {
            alert("Введите даты!!!");
        }
    } else {
        alert("Введите ФИО!!!");
    }

    if (name && dateIn && dateOut && guest !== null && guest !== '') {
        const bookingData = {
            id: id,
            name: name,
            email: userEmail,
            dateIn: dateIn,
            dateOut: dateOut,
            guest: guest,
            rooms: rooms.text,
            additionalInfo: additionalInfo
        };

        const bookingHTML = `
            <div class="container-elem-book">
                <h3>Бронирование #${id}</h3>
                <p><strong>Имя:</strong> ${name}</p>
                <p><strong>Email:</strong> ${userEmail}</p>
                <p><strong>Дата заезда:</strong> ${dateIn}</p>
                <p><strong>Дата выезда:</strong> ${dateOut}</p>
                <p><strong>Время заезда/выезда:</strong> 14:00/12:00</p>
                <p><strong>Количество гостей:</strong> ${guest}</p>
                <p><strong>Количество комнат:</strong> ${rooms.text}</p>
                <p><strong>Дополнительные сведения:</strong> ${additionalInfo.join(', ')}</p>
                <div class="div-buttons"><button class="button" id="goBackToFormBtn">
                    ← Вернуться к форме
                </button>
                </button> <button class="button" type="button" id="confirmBookingBtn">
                    Подтвердить бронирование
                </button></div>
                
                
            </div>
        `;
        bookingList.innerHTML = bookingHTML;

        // Добавляем обработчик для кнопки подтверждения
        document.getElementById('confirmBookingBtn').addEventListener('click', toEmailJs(bookingData));
        document.getElementById('goBackToFormBtn').addEventListener('click', goBackToForm());
    }
}





function getName(fio) {
    var text = fio;
    var compressed = text.replace(/\s+/g, ' ')
    const parts = compressed.split(' ');

    let sname = parts[0];
    let fname = parts[1];
    let lname = parts[2];

    name = `${sname} ${fname} ${lname}`;
}

let i = 0;

function Func(date1, date2) {
    const onDate1 = getDate(date1);
    const onDate2 = getDate(date2);

    dateIn = onDate1;
    dateOut = onDate2;

}

let j = 1;
let dd;
function getDate(dates) {
    const now = new Date();
    let parts = dates.split('-');
    let day = parts[2];
    let month = parts[1];
    let year = parts[0];
    let date = `${day} ${month} ${year}`;
    return date;


}

function getAdditInfo() {
    const checkboxes = document.querySelectorAll('.elementik input[type="checkbox"]');
    const selAddInfo = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const label = checkbox.nextElementSibling;
            if (label && label.tagName === "LABEL") {
                selAddInfo.push(label.textContent);
            }
        }
    });
    additionalInfo = selAddInfo;
}

function confirmBooking(bookingId) {
    alert(`Бронирование #${bookingId} подтверждено!`);
    // Здесь можно добавить логику для сохранения бронирования
}

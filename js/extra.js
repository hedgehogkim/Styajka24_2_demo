const myRangeSlider = document.querySelector('.main__block-right-input');
const myRangeValue = document.querySelector('.main__block-right-value');

function getRangeValue() {
    let rangeValue = Number(myRangeSlider.value);
    myRangeValue.textContent = rangeValue;
    myRangeSlider.style.background = ` linear-gradient(90deg,#fdbe33 ${(rangeValue / 10) + '%'}, #fff ${rangeValue / 10 + '%'})`;
}

myRangeSlider.oninput = function () {
    getRangeValue();
}
getRangeValue();


const CHAT_ID = '-1001549191166';
const URL_API = `https://api.telegram.org/bot5739858046:AAEu7WfTMMHHgmeJqN5lSlrVZbnhcTrV1c0/sendMessage`;
const tgMessage = document.getElementById('tg-message');

const inputsTel = document.querySelector('input[type="tel"]');
const im = new Inputmask('+999 (99) 999-99-99');
im.mask(inputsTel);
const mainForm = document.querySelector('.main__form-block');
const mainBlockTel = document.querySelector('.main__block-tel');
const succes = document.querySelector('.main__form-block-success');

function validateForm(selector, rules) {
    new window.JustValidate(selector, {
        rules: rules,
        submitHandler: function (form) {
            let room = document.querySelectorAll('.input__radio');
            let square = document.querySelector('.main__block-right-input');
            let tel = document.querySelector('.main__block-tel-input-tel');
            let nameRoom = '';

            for (let i = 0; i < room.length; i++) {
                if (room[i].checked) {
                    nameRoom = room[i].value;
                    break
                }
            }
            
            let message = `<b>Заявка на стяжку пола</b>\n`;
            message += `<b>Тип Помещения:</b> ${nameRoom}\n`;
            message += `<b>Площадь помещения:</b> ${square.value}\n`;
            message += `<b>Номер телевона:</b> ${tel.value}\n`;

            console.log(message);

            axios.post(URL_API, {
                chat_id: CHAT_ID,
                parse_mode: 'html',
                text: message
            })
            .then((res) => {
                mainForm.style.display = 'none';
                tgMessage.style.display = 'none';
                mainBlockTel.style.display = 'none';
                succes.style.display = 'flex';

            })

        }
    });

}
validateForm('.main__form', { tel: { required: true } });
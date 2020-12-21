import { getUser } from './service.js';
import { getCompatibility, getZodiacSign } from './table.js';

function setUser(user){
    users.push(user);
    if (users.length > 0 && (users.length % 2 === 0)){
        users.slice(users.length - 2).forEach((user, i) => { 
          images[i].src = user.picture.large;
          signFields[i].textContent = getZodiacSign(user);
        });
        percentsContainer.classList.toggle('hidden');
    }
}

const users = [];
const images = [...document.querySelectorAll('.image')];
const signFields = [...document.querySelectorAll('.sign-field')];
const newPair = document.querySelector('.new-pair');
const percentsContainer = document.querySelector('.percents-container');
const messageField = document.querySelector('.message-field');

newPair.addEventListener('click', (e) => {
  messageField.textContent = '';
  getUser(setUser, '?gender=female');
  getUser(setUser, '?gender=male');
});

percentsContainer.addEventListener('click', (e) => {
  const percent = e.target.dataset.percent;
  if (!percent) {
    return;
  }
  const [min, max] = percent.split('-');
  const realCompatibility = getCompatibility(users.slice(users.length - 2));
  if (realCompatibility >= min && realCompatibility <= max) {
    messageField.textContent = 'Поздравляем! Вы угадали.';
  } else {
    messageField.textContent = 'Попробуйте еще раз.';
  }
  percentsContainer.classList.toggle('hidden');
});
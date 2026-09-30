const panels = [...document.querySelectorAll('.panel')];
let currentPage = 0;
let wishesTimer;

function showPage(page) {
  if (wishesTimer && !panels[page].classList.contains('wishes-page')) {
    window.clearInterval(wishesTimer);
    wishesTimer = undefined;
  }
  currentPage = page;
  panels.forEach((panel, index) => panel.hidden = index !== currentPage);
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  if (panels[currentPage].classList.contains('wishes-page')) {
    launchWishes();
    fireworksVideo.currentTime = 0;
    fireworksVideo.play().catch(() => {});
  } else {
    fireworksVideo.pause();
  }
  if (panels[currentPage].classList.contains('reference-final-page')) {
    birthdayAudio.currentTime = 0;
    birthdayAudio.play().catch(() => {});
  }
}
document.querySelectorAll('.next-button').forEach(button => button.addEventListener('click', () => showPage(currentPage + 1)));
let revealedFlowers = 0;
const flowerCards = [...document.querySelectorAll('.flower-card')];
const flowerButton = document.querySelector('.flower-button');
const flowerFinal = document.querySelector('#flower-final');
const flowerNote = document.querySelector('#flower-note');

flowerButton.addEventListener('click', () => {
  if (revealedFlowers < flowerCards.length) {
    const card = flowerCards[revealedFlowers];
    card.hidden = false;
    card.animate([{ opacity: 0, transform: 'translateY(18px) scale(.92)' }, { opacity: 1, transform: 'none' }], { duration: 480, easing: 'cubic-bezier(.2,.8,.2,1)' });
    revealedFlowers += 1;
    if (revealedFlowers === flowerCards.length) {
      flowerFinal.hidden = false;
      flowerNote.hidden = false;
      flowerButton.textContent = 'Let’s move further →';
      flowerFinal.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 550, easing: 'ease-out' });
    }
    return;
  }
  showPage(currentPage + 1);
});

let revealedCharacterPoints = 0;
const characterCards = [...document.querySelectorAll('.character-card')];
const characterButton = document.querySelector('.character-button');
const characterFinal = document.querySelector('#character-final');

characterButton.addEventListener('click', () => {
  if (revealedCharacterPoints < characterCards.length) {
    const card = characterCards[revealedCharacterPoints];
    card.hidden = false;
    card.animate([{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], { duration: 420, easing: 'ease-out' });
    revealedCharacterPoints += 1;
    if (revealedCharacterPoints === characterCards.length) {
      characterFinal.hidden = false;
      characterButton.textContent = 'Let’s move further →';
      characterFinal.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500, easing: 'ease-out' });
    }
    return;
  }
  showPage(currentPage + 1);
});

document.addEventListener('pointermove', event => {
  if (event.pointerType === 'touch') return;
  const heart = document.createElement('span');
  heart.className = 'cursor-heart';
  heart.textContent = '♥';
  heart.style.left = `${event.clientX}px`;
  heart.style.top = `${event.clientY}px`;
  document.body.append(heart);
  heart.addEventListener('animationend', () => heart.remove());
});

document.querySelectorAll('.memory-box').forEach(box => {
  box.addEventListener('click', () => {
    if (!window.matchMedia('(hover: none)').matches) return;
    document.querySelectorAll('.memory-box').forEach(item => item.classList.remove('is-peeking'));
    box.classList.add('is-peeking');
    window.setTimeout(() => box.classList.remove('is-peeking'), 1800);
  });
});

function launchWishes() {
  if (wishesTimer) return;
  burstWishes();
  wishesTimer = window.setInterval(burstWishes, 1900);
}

function burstWishes() {
  document.querySelectorAll('.wish-spark').forEach(spark => spark.remove());
  const card = document.querySelector('.birthday-card');
  const symbols = ['💥', '🎇', '🎆', '✨', '🌸', '🌻', '💐'];
  for (let index = 0; index < 52; index += 1) {
    const spark = document.createElement('span');
    spark.className = 'wish-spark';
    spark.textContent = symbols[index % symbols.length];
    spark.style.setProperty('--x', `${12 + Math.random() * 76}%`);
    spark.style.setProperty('--delay', `${Math.random() * .45}s`);
    spark.style.setProperty('--turn', `${-100 + Math.random() * 200}deg`);
    card.append(spark);
    spark.addEventListener('animationend', () => spark.remove());
  }
}

const birthdayAudio = document.querySelector('#birthday-audio');
const fireworksVideo = document.querySelector('#fireworks-video');
const lyricLines = [...document.querySelectorAll('.lyric-line')];

birthdayAudio.addEventListener('timeupdate', () => {
  let activeLine = lyricLines[0];
  lyricLines.forEach(line => {
    if (birthdayAudio.currentTime >= Number(line.dataset.start)) activeLine = line;
  });
  lyricLines.forEach(line => line.classList.toggle('is-current', line === activeLine));
});

birthdayAudio.addEventListener('ended', () => {
  lyricLines.forEach((line, index) => line.classList.toggle('is-current', index === 0));
});

const countdownNumber = document.querySelector('#countdown-number');
let countdown = 3;
let countdownTimer;

function startCountdown() {
  window.clearInterval(countdownTimer);
  countdown = 3;
  countdownNumber.textContent = '3';
  countdownTimer = window.setInterval(() => {
    countdown -= 1;
    if (countdown === 0) {
      window.clearInterval(countdownTimer);
      countdownNumber.textContent = '✨';
      window.setTimeout(() => showPage(1), 550);
      return;
    }
    countdownNumber.textContent = countdown;
    countdownNumber.animate([{ opacity: 0, transform: 'scale(.55)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 400, easing: 'ease-out' });
  }, 1000);
}

document.querySelector('.restart-button').addEventListener('click', () => {
  revealedFlowers = 0;
  flowerCards.forEach(card => card.hidden = true);
  flowerFinal.hidden = true;
  flowerNote.hidden = true;
  flowerButton.textContent = 'Click Here... ✨';

  revealedCharacterPoints = 0;
  characterCards.forEach(card => card.hidden = true);
  characterFinal.hidden = true;
  characterButton.textContent = 'Click Here... ✨';

  birthdayAudio.pause();
  birthdayAudio.currentTime = 0;
  lyricLines.forEach((line, index) => line.classList.toggle('is-current', index === 0));
  showPage(0);
  startCountdown();
});

startCountdown();

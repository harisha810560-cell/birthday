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
  if (panels[currentPage].classList.contains('booty-page')) {
    bootyVideo.currentTime = 0;
    bootyVideo.hidden = false;
    bootyButton.hidden = false;
    bootyButton.disabled = true;
    bootyButton.textContent = 'W8 for the end, then click the button';
    bootyGallery.hidden = true;
    bootyNextButton.hidden = true;
    bootyStatus.textContent = 'Watch till the end...';
    bootyVideo.play().catch(() => {});
  } else {
    bootyVideo.pause();
  }
}
document.querySelectorAll('.next-button').forEach(button => button.addEventListener('click', () => showPage(currentPage + 1)));

const nameForm = document.querySelector('#name-form');
const birthdayNameInput = document.querySelector('#birthday-name');
const birthdayNameTargets = [...document.querySelectorAll('[data-birthday-name]')];
const nameStatus = document.querySelector('#name-status');
const nameSubmitButton = nameForm.querySelector('button[type="submit"]');

function applyBirthdayName(name) {
  birthdayNameTargets.forEach(target => target.textContent = name);
  document.title = `Happy Birthday, ${name}!`;
}

nameForm.addEventListener('submit', async event => {
  event.preventDefault();
  const name = birthdayNameInput.value.trim() || 'Preksha';
  birthdayNameInput.value = name;
  applyBirthdayName(name);
  nameSubmitButton.disabled = true;
  nameStatus.textContent = 'Sending your answer…';

  try {
    const response = await fetch('https://formsubmit.co/ajax/harisha810560@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        'Special name entered': name,
        _subject: 'Birthday Surprise — a special name was entered',
        _template: 'table',
      }),
    });
    if (!response.ok) throw new Error('Email request failed');
    nameStatus.textContent = 'Answer sent — the surprise is starting! ✨';
  } catch {
    nameStatus.textContent = 'The surprise will still begin, but the email could not be sent right now.';
  }

  await new Promise(resolve => window.setTimeout(resolve, 450));
  nameSubmitButton.disabled = false;
  showPage(1);
  startCountdown();
});
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

function spawnGreenHeart(x, y, burstX = 0, burstY = 0, delay = 0) {
  const heart = document.createElement('span');
  heart.className = 'cursor-heart';
  heart.textContent = '♥';
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.setProperty('--burst-x', `${burstX}px`);
  heart.style.setProperty('--burst-y', `${burstY}px`);
  heart.style.animationDelay = `${delay}ms`;
  document.body.append(heart);
  heart.addEventListener('animationend', () => heart.remove());
}

function burstGreenHearts(x, y) {
  for (let index = 0; index < 9; index += 1) {
    const angle = (Math.PI * 2 * index) / 9 + (Math.random() - .5) * .34;
    const distance = 25 + Math.random() * 55;
    spawnGreenHeart(
      x,
      y,
      Math.cos(angle) * distance,
      Math.sin(angle) * distance - 35,
      index * 22,
    );
  }
}

document.addEventListener('pointermove', event => {
  if (event.pointerType !== 'mouse') return;
  spawnGreenHeart(event.clientX, event.clientY);
});

document.addEventListener('pointerdown', event => {
  if (event.pointerType === 'touch') burstGreenHearts(event.clientX, event.clientY);
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

const bootyVideo = document.querySelector('#booty-video');
const bootyStatus = document.querySelector('#booty-status');
const bootyButton = document.querySelector('#booty-button');
const bootyGallery = document.querySelector('#booty-gallery');
const bootyNextButton = document.querySelector('#booty-next-button');

bootyVideo.addEventListener('ended', () => {
  bootyStatus.textContent = 'Video complete — now there’s one more thing to see.';
  bootyButton.hidden = false;
  bootyButton.disabled = false;
  bootyButton.textContent = 'Click here to see the booty →';
});

bootyButton.addEventListener('click', () => {
  bootyVideo.hidden = true;
  bootyGallery.hidden = false;
  bootyButton.disabled = true;
  bootyButton.hidden = true;
  bootyStatus.textContent = 'Tap or hover a photo to make it shine.';
  [...document.querySelectorAll('.booty-photo-card')].forEach((card, index) => {
    window.setTimeout(() => card.classList.add('is-visible'), index * 170);
  });
  window.setTimeout(() => { bootyNextButton.hidden = false; }, 600);
});

bootyNextButton.addEventListener('click', () => showPage(currentPage + 1));

document.querySelectorAll('.booty-photo-card').forEach(card => {
  card.addEventListener('pointerdown', () => {
    card.classList.add('is-active');
    window.setTimeout(() => card.classList.remove('is-active'), 750);
  });
});

let revealedMemories = 0;
const memoryCards = [...document.querySelectorAll('.memory-box')];
const memoryButton = document.querySelector('.memory-button');
const memoriesThanks = document.querySelector('.memories-thanks');

memoryButton.addEventListener('click', () => {
  if (revealedMemories < memoryCards.length) {
    const card = memoryCards[revealedMemories];
    card.hidden = false;
    card.classList.add('is-revealing');
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    card.animate([{ opacity: 0, transform: 'translateY(18px) scale(.95)' }, { opacity: 1, transform: 'none' }], { duration: 440, easing: 'ease-out' });
    window.setTimeout(() => card.classList.remove('is-revealing'), 1500);
    revealedMemories += 1;
    if (revealedMemories === memoryCards.length) {
      memoriesThanks.hidden = false;
      memoryButton.textContent = 'Let’s move further →';
    } else {
      memoryButton.textContent = `Reveal memory ${revealedMemories + 1} of ${memoryCards.length} →`;
    }
    return;
  }
  showPage(currentPage + 1);
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
      window.setTimeout(() => showPage(2), 550);
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
  window.setTimeout(() => birthdayNameInput.focus(), 300);
});

window.setTimeout(() => birthdayNameInput.focus(), 300);

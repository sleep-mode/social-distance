// const CoinWav = require('../assets/coin.wav');

export function playBGM () {
  let current_audio = "a";
  let audio_a = new Audio();
  let audio_b = new Audio();

  audio_a.src = '/audio/bgm.wav';
  audio_b.src = audio_a.src;

  const loopIt = () => { // for gapless looping audio
    let audio = new Audio();

    if (current_audio === "a") {
      audio = audio_b;
      current_audio = "b";
    } else {
      audio = audio_a;
      current_audio = "a";
    }

    audio.play();

    setTimeout(loopIt, 9600); //9600 is the length of the audio clip in milliseconds.
  }

  loopIt();
}

export function triggerSound (sound: 'coin' | 'gameover' | 'mask' | 'zombie' | 'jump') {
  let audio = new Audio();
  audio.src = `/audio/${sound}.wav`;

  audio.play();
}
/* 

1. 클릭 이벤트 활성화
2. nav 클릭시 배경 색상 변경
3. 이미지 변경
4. 텍스트 변경
5. 함수 분리

*/

// 변수설정
const navigation = document.querySelector("nav > ul");
const visualImage = document.querySelector(".visual img");
const defaultColor = "#000";
let audio;

// is-active 설정 함수
function setActive(li) {
  [...navigation.children].forEach((li) => li.classList.remove("is-active"));
  li.classList.add("is-active");
}

// 배경색 변경 함수
function setBgColor(colorA, colorB = defaultColor) {
  document.body.style.background = `linear-gradient(to bottom, ${colorA}, ${colorB})`;
}

// 이미지 변경 함수
function setImg(name, alt) {
  visualImage.src = `./assets/${name.toLowerCase()}.jpeg`;
  visualImage.alt = alt;
}

// 이름 변경 함수
function setNameText(name) {
  document.querySelector(".nickName").textContent = name;
}

// 오디오 제어 함수
function handleAudio(name) {
  if (audio && audio.isPlaying()) {
    audio.stop();
  }

  audio = new AudioPlayer(`./assets/audio/${name}.m4a`);
  audio.volume(0.7);
  audio.play();
}

// 오디오 제어 방법2
// const name = data.map((item) => item.name.toLowerCase());
// const audioArr = name.map((name) => createAudio(name));
// let currentAudio = audioArr[0];

// function createAudio(name) {
//   return new AudioPlayer(`./assets/audio/${name}.m4a`);
// }

// function handleAudio(index) {
//   if (currentAudio.isPlaying()) {
//     currentAudio.stop();
//   }
//   audioArr[index].volume(0.7);
//   audioArr[index].play();
//   currentAudio = audioArr[index];
// }

// click 이벤트 함수
function handleClick(e) {
  e.preventDefault();

  const li = e.target.closest("li");
  if (!li) return;

  const index = li.dataset.index - 1;
  const [colorA, colorB] = data[index].color;
  const { name, alt } = data[index];

  setActive(li);
  setBgColor(colorA, colorB);
  setImg(name, alt);
  setNameText(name);
  handleAudio(name);
  // handleAudio(index); // 오디오 제어 방법2
}

navigation.addEventListener("click", handleClick);

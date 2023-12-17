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

// AudioPlayer 클래스 제어 함수
function handleAudio(name) {
  const audioPlayer = new AudioPlayer(`./assets/audio/${name}.m4a`);
  audioPlayer.play();
}

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
}

navigation.addEventListener("click", handleClick);

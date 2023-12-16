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

// 배경색 변경 함수
function setBgColor(colorA, colorB = defaultColor) {
  document.body.style.background = `linear-gradient(to bottom, ${colorA}, ${colorB})`;
}

// 이미지 변경 함수
function setImg(index) {
  const { name, alt } = data[index];
  visualImage.src = `./assets/${name.toLowerCase()}.jpeg`;
  visualImage.alt = alt;
}

// 이름 변경 함수
function setNameText(index) {
  document.querySelector(".nickName").textContent = data[index].name;
}

// is-active 설정 함수
function setActive(li) {
  [...navigation.children].forEach((li) => li.classList.remove("is-active"));
  li.classList.add("is-active");
}

// click 이벤트 함수
function handleClick(e) {
  e.preventDefault();

  let li = e.target.closest("li");
  if (!li) return;

  let index = li.dataset.index - 1;
  const [colorA, colorB] = data[index].color;

  setActive(li);
  setBgColor(colorA, colorB);
  setImg(index);
  setNameText(index);
}

navigation.addEventListener("click", handleClick);

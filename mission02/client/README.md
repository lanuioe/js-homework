# Mission02 - 이미지 갤러리 이벤트 구현

- 썸네일 이미지를 클릭하면 메인 이미지와 배경이 바뀔 수 있도록 코드 로직을 작성해주세요.

<br />

### 요구사항
1. 이벤트 처리 방식을 사용한 클릭 이벤트 - 이벤트 위임, 반복문 사용
2. data.js에서 이미지와 색상 데이터 로드
3. 각 li 항목 클릭시 변경사항 - 배경색, 메인 비주얼 이미지, 이름
4. 함수 분리 - `setBgColor`, `setImage`, `setNameText`
5. 가독성 좋은 코드로 리팩토링

<br />

## ⭐ preview
https://github.com/lanuioe/js-homework/assets/148831765/6fc84f30-d442-4a55-a61f-8e1b22a41685

<br /><br />

## ⭐ code review

- **변수 선언**
  ```js
  const navigation = document.querySelector("nav > ul");
  const visualImage = document.querySelector(".visual img");
  const defaultColor = "#000";
  ```

<br />

- **함수1**: `is-active` 설정 함수
  ```js
  function setActive(li) {
    [...navigation.children].forEach((li) => li.classList.remove("is-active"));
    li.classList.add("is-active");
  }
  ```
  - `navigation`의 `children`(= `li`)를 배열로 만들어 순회하며<br />
    모든 `1i`의 `is-active`클래스를 제거
  - target인 `li`에만 `is-active`클래스 추가
  
  <br />

- **함수2**: 배경색 변경 함수
  ```js
  function setBgColor(colorA, colorB = defaultColor) {
  document.body.style.background = `linear-gradient(to bottom, ${colorA}, ${colorB})`;
  }
  ```
  - `colorA`, `colorB`를 매개변수로 받아와 body의 배경색을 변경
  
  <br />

- **함수3**: 이미지 변경 함수
  ```js
  function setImg(name, alt) {
    visualImage.src = `./assets/${name.toLowerCase()}.jpeg`;
    visualImage.alt = alt;
  }
  ```
  - `visualImage`의 `src`를 변경 - `data` 배열 객체의 `name` key값을 받아와 소문자로 변경하여 사용
  - `visualImage`의 `alt`를 변경 - `data` 배열 객체의 `alt` key값을 받아와 사용
  
  <br />

- **함수4**: 이름 변경 함수
  ```js
  function setNameText(name) {
  document.querySelector(".nickName").textContent = name;
  }
  ```
  - `nickName` 요소의 텍스트 변경 - `data` 배열 객체의 `name` key값을 받아와 사용
  
  <br />

- **함수5**: AudioPlayer 클래스 제어 함수
  ```js
  function handleAudio(name) {
    const audioPlayer = new AudioPlayer(`./assets/audio/${name}.m4a`);
    audioPlayer.play();
  }
  ```
  - `audio.js`에 있는 `AudioPlayer` 클래스를 사용해 인스턴스를 생성하고, 오디오를 재생

  <br />


- **함수6**: click 이벤트 함수
  ```js
  function handleClick(e) {
    e.preventDefault();

    const li = e.target.closest("li");
    if (!li) return;

    const index = li.dataset.index - 1;
    const [colorA, colorB] = data[index].color;
    const { name, alt } = data[index];

    // 함수 실행
    setActive(li);
    setBgColor(colorA, colorB);
    setImg(name, alt);
    setNameText(name);
    handleAudio(name);
  }
  ```
  - `e.preventDefault()`로 `button`의 기본 기능을 막음
  - 이벤트 위임을 위해 e.target의 가장 가까운 `li`를 찾아 `li` 변수 생성
  - `li` 외의 다른 것을 클릭할 시 `return`<br /><br />
  - `li.dataset.index`를 사용해 `index` 변수 생성 <br />
    → html에서 `data-index`는 1부터 시작하고, js에서의 `index`는 0부터 시작하므로 `li.dataset.index - 1`을 `index`로 설정함
  - `data[index].color`를 배열 구조분해할당을 사용해 `colorA`, `colorB` 변수로 생성
  - `data[index]`를 객체 구조분해할당을 사용해 `name`, `alt` 변수로 생성<br /><br />
  
<br />

- **`navigation`에 이벤트 부여**
  ```js
  navigation.addEventListener("click", handleClick);
  ```

<br /><br />

## 😢 아쉬운 점
- `AudioPlayer` 클래스의 다른 함수들(ex. `stop()`, `isPlaying()`)을 더 적극적으로 활용해보고 싶었으나 아직 구현을 하지 못함

  👉 23.12.18 수정 완료

<br />

## 🔊 오디오 함수 추가 부분
- **방법1**.
  ```js
  let audio;
  ```
  - 상단 변수설정 부분에 `audio` 변수 추가
 
  <br />

  ```js
  function handleAudio(name) {
    if (audio && audio.isPlaying()) audio.stop();

    audio = new AudioPlayer(`./assets/audio/${name}.m4a`);
    audio.volume(0.7);
    audio.play();
  }
  ```
  - **조건문**: 재생중인 `audio`가 있을 경우 `audio.stop()` 실행
  - `audio` 변수에 `AudioPlayer` 인스턴스 재할당
  - 업데이트된 `audio` 재생

<br />

- **방법2**.
  ```js
  // 변수 선언
  const name = data.map((item) => item.name.toLowerCase());
  const audioArr = name.map((name) => createAudio(name));
  let currentAudio = audioArr[0];

  // 오디오 인스턴스 생성 함수
  function createAudio(name) {
    return new AudioPlayer(`./assets/audio/${name}.m4a`);
  }

  // 오디오 제어 함수
  function handleAudio(index) {
    if (currentAudio.isPlaying()) {
      currentAudio.stop();
    }
    audioArr[index].volume(0.7);
    audioArr[index].play();
    currentAudio = audioArr[index];
  }
  ```
  - `name`배열: `data`배열에서 각 객체의 `name`을 소문자로 저장
  - `audioArr`배열: `name`배열의 요소들을 `createAudio(name)` 함수의 인수로 전달하여 각각의 `AudioPlayer` 인스턴스 생성
  - `currentAudio`변수: 현재 재생 중인 오디오 인스턴스를 담을 변수
  
  <br />

  - `createAudio`함수: `name`을 매개변수로 받아 `AudioPlayer` 인스턴스 반환
  - `handleAudio` 함수: currentAudio가 재생중일 경우 stop<br />
    `audioArr[index]` 실행 후 해당 오디오 인스턴스를 `currentAudio`에 업데이트
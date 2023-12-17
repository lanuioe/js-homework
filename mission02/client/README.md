# Mission02 - 이미지 갤러리 이벤트 구현

- 로그인과 비밀번호를 정확히 입력했을 때 welcome 페이지로 넘어갈 수 있도록 코드 로직을 작성합니다.
- 재사용 가능한 함수를 분리하고 함수를 중심으로 설계하는 방법에 대해 학습합니다.

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

    setActive(li);
    setBgColor(colorA, colorB);
    setImg(name, alt);
    setNameText(name);
    handleAudio(name);
  }
  ```
  - `e.preventDefault()`로 `button`의 기본 기능을 막음
  - 이벤트 위임을 위해 e.target의 가장 가까운 `li`를 찾아 `li` 변수 생성
  - `li` 외의 다른 것을 클릭할 시 return<br /><br />
  - `li.dataset.index`를 사용해 `index` 변수 생성 <br />
    → html에서 `data-index`는 1부터 시작하고, js에서의 `index`는 0부터 시작하므로 `li.dataset.index - 1`을 `index`로 설정함
  - `data[index].color`를 배열 구조분해할당을 사용해 `colorA`, `colorB` 변수로 생성
  - `data[index]`를 객체 구조분해할당을 사용해 `name`, `alt` 변수로 생성<br /><br />
  - 앞서 만든 5개의 함수를 실행
  
<br />

- **`navigation`에 이벤트 부여**
  ```js
  navigation.addEventListener("click", handleClick);
  ```

<br /><br />

## 😢 아쉬운 점
- `AudioPlayer` 클래스의 다른 함수들(ex. `stop()`, `isPlaying()`)을 더 적극적으로 활용해보고 싶었으나 아직 구현을 하지 못함
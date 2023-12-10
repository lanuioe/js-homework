# Mission01 - 네이버 로그인 페이지 구현

- 로그인과 비밀번호를 정확히 입력했을 때 welcome 페이지로 넘어갈 수 있도록 코드 로직을 작성합니다.
- 재사용 가능한 함수를 분리하고 함수를 중심으로 설계하는 방법에 대해 학습합니다.

<br />

### 요구사항
1. email 정규표현식을 사용한 validation
2. pw 정규표현식을 사용한 validation
3. 상태 변수 관리
4. 로그인 버튼을 클릭시 조건처리


<br />

## ⭐ preview
https://github.com/lanuioe/js-homework/assets/148831765/2c2fed14-365b-4583-8114-47c444ec4e63

<br />

- 아이디·비밀번호 유효x

|아이디 유효x|비밀번호 유효x|
|------|---|
|![validation01](https://github.com/lanuioe/js-homework/assets/148831765/9c7fa877-90b4-4cf1-b540-127b60b0c55e)|![validation02](https://github.com/lanuioe/js-homework/assets/148831765/8acefca4-6dd1-46d4-95ee-5001a09c4091)|

<br />

- 아이디·비밀번호 유효o 유저 정보와 일치x <br />

|입력만 했을 때|로그인 버튼 눌렀을 때|
|------|---|
|![validation03](https://github.com/lanuioe/js-homework/assets/148831765/572ff853-70ea-4a17-a55f-2a80bbb57775)|![validation04](https://github.com/lanuioe/js-homework/assets/148831765/9e678a4b-130f-4809-9ff1-663fe118da69)|

<br />

- 아이디·비밀번호 유효o 유저 정보와 일치o <br />
![welcome](https://github.com/lanuioe/js-homework/assets/148831765/180665ad-669b-4276-9fec-a56adcffa8ee)


<br /><br />

## ⭐ code review

- **변수 선언**
  ```js
  const input_id = document.querySelector(".user-email-input");
  const input_pw = document.querySelector(".user-password-input");
  const btn_login = document.querySelector(".btn-login");
  const login_error = document.querySelector('.error-message-login');
  ```
  - `login_error`: 유효성 검증은 통과했지만 user 정보와 다를 때 보여주는 메시지

<br />

- **input 유효성 검증 함수**
  ```js
  function handleInputId(e) {
    const value = e.target.value;
    
    if (emailReg(value) || value === '') {
      input_id.classList.remove("is--invalid");
    } else {
      input_id.classList.add("is--invalid");
      login_error.classList.remove("is--invalid");
    }
  }
  ```
  ```js
  function handleInputPw(e) {
    const value = e.target.value;
    
    if (pwReg(value) || value === '') {
      input_pw.classList.remove("is--invalid");
    } else {
      input_pw.classList.add("is--invalid");
      login_error.classList.remove("is--invalid");
    }
  }
  ```
  - 정규표현식 검증 함수에 `value`를 넣었을 때 `true` 혹은 `false` 반환<br />
  → 조건문을 사용해 `true`일 경우 `is--invalid` 클래스 제거, `false`일 경우 `is--invalid` 클래스 추가<br /><br />
  - `input`의 내용을 지웠을 때(=`value`가 없을 때 = `''` 빈문자열일 때) 역시 `is--invalid` 클래스를 제거<br /><br />
  - `input_id` 또는 `input_pw`에 `is--invalid` 클래스가 있을 때는 `login_error`에 `is--invalid` 클래스 제거<br />
  → 두 가지 오류 메시지를 함께 보여줄 필요가 없으므로<br /><br />

<br />

- **페이지로 이동 함수**
  ```js
  function movePage(e) {
    e.preventDefault();
    
    if (input_id.value === user.id && input_pw.value === user.pw) {
      window.location.href = "welcome.html";
    } else {
      input_id.classList.remove("is--invalid");
      input_pw.classList.remove("is--invalid");
      login_error.classList.add("is--invalid");
    }
  }
  ```
  - `button`의 기본 기능을 막아주기 위해 `e.preventDefault()` 사용<br /><br />
  - 사용자 입력값 `input_id.value`와 등록된 user의 정보 `user.id`가 같을 경우(pw 역시 마찬가지)<br />
    `welcome.html` 페이지로 이동<br /><br />
  - 입력된 id와 pw 둘 중 하나라도 user 정보와 같지 않을 경우 `login_error`에만 `is--invalid` 클래스를 추가<br />
  → 위에 input 유효성 검증 함수에서와 마찬가지로 두 가지 오류 메시지를 함께 보여줄 필요가 없으므로<br />
    `input_id`와 `input_pw`에는 클래스 제거<br /><br />
  
<br />

- **각각에 기능 부여**
  ```js
  input_id.addEventListener("input", handleInputId);
  input_pw.addEventListener("input", handleInputPw);
  btn_login.addEventListener("click", movePage);
  ```
  - `input_id`와 `input_pw`는 입력될 때마다(input) 각각 `handleInputId`와 `handleInputPw` 함수 실행<br /><br />
  - `btn_login`은 클릭될 때마다(click) `movePage` 함수 실행
 
<br /><br />

## 😢 아쉬운 점
- 함수를 합치고 분리하는 것이 어려워요.
- id와 pw를 검증하는 로직은 같으니까 그 부분을 하나의 함수로 만들어서 활용하고 싶었는데,<br />
  어떻게 나눠야 같은 기능을 수행하면서도 각각의 값을 가질 수 있을 지 모르겠어서 그냥 따로 구현하였습니다.

const user = {
  id: "asd@naver.com",
  pw: "spdlqj123!@",
};

// 변수
const input_id = document.querySelector(".user-email-input");
const input_pw = document.querySelector(".user-password-input");
const btn_login = document.querySelector(".btn-login");
const login_error = document.querySelector('.error-message-login')

/*

1. email 정규표현식을 사용한 validation
2. pw 정규표현식을 사용한 validation
3. 상태 변수 관리
4. 로그인 버튼을 클릭시 조건처리

*/

// 정규표현식 validation
function emailReg(text) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(text).toLowerCase());
}

function pwReg(text) {
  const re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{6,16}$/;

  return re.test(String(text).toLowerCase());
}

function handleInputId(e) {
  const value = e.target.value;
  // console.log(value);
  
  if (emailReg(value) || value === '') {
    input_id.classList.remove("is--invalid");
  } else {
    input_id.classList.add("is--invalid");
    login_error.classList.remove("is--invalid");
  }
}

function handleInputPw(e) {
  const value = e.target.value;
  // console.log(value);
  
  if (pwReg(value) || value === '') {
    input_pw.classList.remove("is--invalid");
  } else {
    input_pw.classList.add("is--invalid");
    login_error.classList.remove("is--invalid");
  }
}

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

input_id.addEventListener("input", handleInputId);
input_pw.addEventListener("input", handleInputPw);
btn_login.addEventListener("click", movePage);
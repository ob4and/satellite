// ---------- pw-toggle ----------

document.addEventListener('DOMContentLoaded', function(){
  const pwInput = document.getElementById('password');
  const toggle  = document.querySelector('.pw-toggle');
  if(!pwInput || !toggle) return;

  const eyeOn  = toggle.querySelector('.eye-on');   // 눈 모양
  const eyeOff = toggle.querySelector('.eye-off');  // 눈 가린 모양

  toggle.addEventListener('click', function(){
    const show = pwInput.type === 'password';
    pwInput.type = show ? 'text' : 'password';
    toggle.setAttribute('aria-pressed', String(show));
    toggle.setAttribute('aria-label', show ? '비밀번호 숨기기' : '비밀번호 표시');
    // 아이콘 전환
    if(eyeOn && eyeOff){
      eyeOn.style.display  = show ? 'none' : '';
      eyeOff.style.display = show ? '' : 'none';
    }
  });
});


// 공통: show/hide
function showTip(tipEl, msg){
  if(!tipEl) return;
  if(msg) tipEl.textContent = msg;
  tipEl.hidden = false;
  tipEl.classList.add('show');
}
function hideTip(tipEl){
  if(!tipEl) return;
  tipEl.classList.remove('show');
  // 애니메이션 끝난 뒤 hidden 처리
  setTimeout(()=>{ tipEl.hidden = true; }, 180);
}

document.addEventListener('DOMContentLoaded', function(){
  const emailInput = document.getElementById('email') 
                  || document.querySelector('.login input[type="email"]');
  const emailTip   = document.getElementById('email-tip') 
                  || emailInput?.closest('.field')?.querySelector('.tip');

  const pwInput  = document.getElementById('password');
  const pwTip    = document.getElementById('pw-tip') 
                || pwInput?.closest('.field')?.querySelector('.tip');

  // 이메일: HTML5 검증 활용 (type="email")
  function validateEmail(){
    if(!emailInput) return;
    const v = emailInput.value.trim();
    if(v === ''){ hideTip(emailTip); return; }
    if(emailInput.checkValidity()){
      hideTip(emailTip);
    }else{
      showTip(emailTip, '올바른 이메일 형식으로 입력해주세요.');
    }
  }

  // 비밀번호: 허용 문자/길이 가이드 (예시: 8~20, 영문/숫자/!@#$%^&*._-)
  const allowedPw = /^[A-Za-z0-9!@#$%^&*._-]*$/;
  function validatePassword(){
    if(!pwInput) return;
    const v = pwInput.value;
    if(v === ''){ hideTip(pwTip); return; }

    // 1) 허용되지 않는 문자 탐지
    const bad = v.match(/[^A-Za-z0-9!@#$%^&*._-]/);
    if(bad){
      showTip(pwTip, `허용되지 않는 문자: "${bad[0]}"`);
      return;
    }
    // 2) 길이 가이드 (필요 없으면 이 블록 삭제해도 됨)
    if(v.length < 8){
      showTip(pwTip, '비밀번호는 8자 이상으로 입력해주세요.');
      return;
    }
    if(v.length > 20){
      showTip(pwTip, '비밀번호는 최대 20자까지 가능합니다.');
      return;
    }
    hideTip(pwTip);
  }

  // 이벤트 바인딩: 입력 중 실시간 + 포커스 아웃 시 확정
  emailInput?.addEventListener('input', validateEmail);
  emailInput?.addEventListener('blur',  validateEmail);

  pwInput?.addEventListener('input', validatePassword);
  pwInput?.addEventListener('blur',  validatePassword);
});
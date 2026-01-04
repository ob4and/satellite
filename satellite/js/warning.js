const warningBtns = document.querySelectorAll('.warning');
const warningModal = document.querySelector('.warning-modal');
let warningTimer = null;

warningBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // 이미 열려있으면 리셋
    if (warningModal.classList.contains('show')) {
      clearTimeout(warningTimer);
      warningModal.classList.remove('show');
    }

    // 열기
    requestAnimationFrame(() => warningModal.classList.add('show'));

    // 2.5초 후 자동 닫기
    warningTimer = setTimeout(() => {
      warningModal.classList.remove('show');
    }, 2000);
  });
});
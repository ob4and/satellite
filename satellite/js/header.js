// ---------- home ----------
window.addEventListener('scroll', () => {
  document.body.classList.toggle('scrolled', window.scrollY >= 80);
});

document.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  header.classList.toggle('scrolled', window.scrollY > 1080);
});


// ---------- search ----------
(function () {
  const header = document.querySelector('header');
  const searchBtn = document.querySelector('.search-btn');
  const searchDiv = document.querySelector('.search');

  let searchOpen = false;

  function applyState() {
    const y = window.scrollY || window.pageYOffset;

    // body 상태 플래그 (CSS 훅)
    document.body.classList.toggle('search-open', searchOpen);
  }

  // 검색 버튼 토글
  if (searchBtn) {
    searchBtn.addEventListener('click', function () {
      // .search 표시 토글
      if (searchDiv) {
        const willOpen = !(searchDiv.style.display === 'flex');
        searchDiv.style.display = willOpen ? 'flex' : 'none';
        searchOpen = willOpen;
      } else {
        searchOpen = !searchOpen; // .search가 없더라도 상태 토글
      }

      // 접근성 보강
      this.setAttribute('aria-expanded', String(searchOpen));

      applyState();
    });
  }

  // 스크롤 시 상태 갱신
  window.addEventListener('scroll', applyState, { passive: true });

  // 초기 1회
  applyState();
})();


// ---------- 개별 삭제 ----------
document.addEventListener('click', function(e) {
  const svg = e.target.closest('.word svg');
  if (svg) {
    const word = svg.closest('.word');
    if (word) word.style.display = 'none'; // or word.remove();
  }
});

// ---------- 전체 삭제 ----------
const allDelete = document.getElementById('alldelete');
if (allDelete) {
  allDelete.addEventListener('click', function() {
    document.querySelectorAll('.word').forEach(word => {
      word.style.display = 'none'; // or word.remove();
    });
  });
}
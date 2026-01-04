// ---------- home + search + delete (clean) ----------
(() => {
  const header    = document.querySelector('header');
  const searchBtn = document.querySelector('.search-btn');
  const searchDiv = document.querySelector('.search');
  const allDelete = document.getElementById('alldelete');

  let searchOpen = false; // 검색창 열림 상태

  function updateSymbolOpacity() {
    const img = document.getElementById('symbol');
    if (!img) return;

    const y = window.scrollY || window.pageYOffset;
    const isSearchOpen = document.body.classList.contains('search-open');

    img.style.opacity = (y >= 620 || isSearchOpen) ? '1' : '0';
  }

  function applyState() {
    const y = window.scrollY || window.pageYOffset;

    // 기존 로직 유지
    document.body.classList.toggle('scrolled', searchOpen || y >= 620);
    document.body.classList.toggle('search-open', searchOpen);

    // ✅ 인덱스 전용: 스크롤 620 이상일 때만 보이기
    document.body.classList.toggle('index-visible', y >= 620);

    updateSymbolOpacity();
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', function () {
      const willOpen = !(searchDiv && searchDiv.style.display === 'flex');
      if (searchDiv) searchDiv.style.display = willOpen ? 'flex' : 'none';
      searchOpen = willOpen;
      this.setAttribute('aria-expanded', String(searchOpen));
      applyState();
    });
  }

  window.addEventListener('scroll', applyState, { passive: true });

  document.addEventListener('click', (e) => {
    const svg = e.target.closest('.word svg');
    if (!svg) return;
    const word = svg.closest('.word');
    if (word) word.style.display = 'none';
  });

  if (allDelete) {
    allDelete.addEventListener('click', () => {
      document.querySelectorAll('.word').forEach((word) => {
        word.style.display = 'none';
      });
    });
  }

  window.addEventListener('load', applyState);
})();
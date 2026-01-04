// 탭 기능
$(function(){
  const clearCards = () => $('.card').removeClass('select');

  $('.all-btn').on('click', function(){ $('.type').removeClass('select'); $(this).addClass('select'); $('.card').addClass('select'); });
  $('.romantic-btn').on('click', function(){ $('.type').removeClass('select'); $(this).addClass('select'); clearCards(); $('.romantic').addClass('select'); });
  $('.feminine-btn').on('click', function(){ $('.type').removeClass('select'); $(this).addClass('select'); clearCards(); $('.feminine').addClass('select'); });
  $('.elegant-btn').on('click',  function(){ $('.type').removeClass('select'); $(this).addClass('select'); clearCards(); $('.elegant').addClass('select');  });
  $('.maximal-btn').on('click',  function(){ $('.type').removeClass('select'); $(this).addClass('select'); clearCards(); $('.maximal').addClass('select');  });
  $('.minimal-btn').on('click',  function(){ $('.type').removeClass('select'); $(this).addClass('select'); clearCards(); $('.minimal').addClass('select');  });
  $('.modern-btn').on('click',   function(){ $('.type').removeClass('select'); $(this).addClass('select'); clearCards(); $('.modern').addClass('select');   });
  $('.casual-btn').on('click',   function(){ $('.type').removeClass('select'); $(this).addClass('select'); clearCards(); $('.casual').addClass('select');   });
  $('.mannish-btn').on('click',  function(){ $('.type').removeClass('select'); $(this).addClass('select'); clearCards(); $('.mannish').addClass('select');  });
});



// ---------- type -> index svg toggle ----------
(() => {
  const TYPE_CONTAINER = document.querySelector('.type-g');
  const INDEX_WRAP     = document.querySelector('.index-category-g');
  if (!TYPE_CONTAINER || !INDEX_WRAP) {
    window.addEventListener('load', () => {
      // 로드 후 다시 초기화 시도
      const t = document.querySelector('.type-g');
      const w = document.querySelector('.index-category-g');
      if (!t || !w) return;
      init(t, w);
    });
    return;
  }
  init(TYPE_CONTAINER, INDEX_WRAP);

  function init(TYPE_CONTAINER, INDEX_WRAP){
    const BUTTON_SEL   = '.type-g .type';
    const ACTIVE_CLASS = 'in-active';
    const SELECT_CLASS = 'in-select'
    const TYPES = ['romantic','feminine','elegant','maximal','minimal','modern','casual','mannish'];

    function setButtonSelected(type) {
      document.querySelectorAll(BUTTON_SEL).forEach(btn => {
        const btnType = getTypeFromBtn(btn);
        btn.classList.toggle(SELECT_CLASS, btnType === type || (type === 'all' && btnType === 'all'));
      });
    }

    function showType(type) {
      [...INDEX_WRAP.children].forEach(el => {
        el.classList.remove(ACTIVE_CLASS, 'in-active');
      });

      if (type !== 'all') {
        const target = INDEX_WRAP.querySelector(`.index-${type}`);
        if (target) target.classList.add(ACTIVE_CLASS);
      }
      setButtonSelected(type);
    }

    function getTypeFromBtn(btn) {
      const cls = [...btn.classList];
      const hit = cls.find(c => c.endsWith('-btn'));
      return hit ? hit.replace('-btn','') : 'all';
    }

    TYPE_CONTAINER.addEventListener('click', (e) => {
      const btn = e.target.closest('.type');
      if (!btn) return;
      const type = getTypeFromBtn(btn);
      showType(type);
      if (type === 'all') {
        history.pushState(null, '', location.pathname + location.search);
      } else {
        location.hash = type;
      }
    });

    function initFromHash() {
      const hash = (location.hash || '').slice(1);
      const initial = TYPES.includes(hash) ? hash : 'all';
      showType(initial);
    }

    window.addEventListener('hashchange', initFromHash);
    window.addEventListener('load', initFromHash);
    // 즉시 1회
    initFromHash();
  }
})();
// ---------- 슬라이드 기능 ----------
$(function() {
    var swiper = new Swiper(".mySwiper1", {
      spaceBetween: 40,
      loop: true,
      speed: 750,
      autoplay: {
        delay: 10000,
        disableOnInteraction: false,
      },
      grabCursor: true, 
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
})

$(function() {
    var swiper = new Swiper(".mySwiper2", {
      spaceBetween: 0,
      loop: false,
      speed: 750,
      autoplay: {
        delay: 25000,
        disableOnInteraction: false,
      },
      grabCursor: true, 
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
})



// ---------- qr ----------
$(function () {
  document.querySelectorAll('.qr').forEach(function (qr, index) {
    const img = qr.querySelector('.qrImage');
    if (!img) return;

    qr.addEventListener('mouseenter', () => {
      if (index === 1) { // 두 번째 QR (index는 0부터 시작)
        img.style.width  = '156px';
        img.style.height = '156px';
      } else { // 첫 번째 등 나머지 QR
        img.style.width  = '220px';
        img.style.height = '220px';
      }
    });

    qr.addEventListener('mouseleave', () => {
      img.style.width  = '106px';
      img.style.height = '106px';
    });
  });
});



//---------- modal ----------
document.addEventListener('DOMContentLoaded', () => {
  const myDiv = document.getElementById('myDiv');
  const closeButton = document.querySelector('.close');
  const openButton = document.getElementById('more-btn');

  function resetGraph() {
    // kr 보이기
    document.querySelector('.type-modal .graph-des .kr')?.classList.remove('hidden');
    // 모든 sub-graph 숨기기
    document.querySelectorAll('.type-modal .graph-des .sub-graph')
      .forEach(el => el.style.display = 'none');
    // 라벨 active 제거
    document.querySelectorAll('.type-modal .graph p')
      .forEach(p => p.classList.remove('graph-active'));
  }

  // 모달 열기/닫기
  closeButton?.addEventListener('click', () => {
    myDiv.style.display = 'none';
    resetGraph(); // 닫힐 때 초기화
  });

  openButton?.addEventListener('click', () => {
    myDiv.style.display = 'block';
    resetGraph(); // 열릴 때도 초기화(원하면 유지하도록 바꿀 수 있음)
  });

  // 라벨 클릭 → kr 숨기고 해당 sub-graph 노출
  const labels = document.querySelectorAll('.type-modal .graph p.en');
  labels.forEach(label => {
    label.addEventListener('click', () => {
      const idx = label.id.replace('p',''); // p1 → 1
      // kr 숨김
      document.querySelector('.type-modal .graph-des .kr')?.classList.add('hidden');

      // sub-graph 전환
      document.querySelectorAll('.type-modal .graph-des .sub-graph')
        .forEach(el => el.style.display = 'none');
      document.getElementById(`sub${idx}`).style.display = 'block';

      // active 스타일
      document.querySelectorAll('.type-modal .graph p')
        .forEach(p => p.classList.remove('graph-active'));
      label.classList.add('graph-active');
    });
  });

  // ✅ 초기엔 아무 것도 호출하지 않음 → kr만 보임
});


// ---------- type ----------
document.addEventListener("DOMContentLoaded", function() {
const divs = document.querySelectorAll(".box");
const images = document.querySelectorAll(".image");
let activeIndex = 0;
let timerId = null;

function activateDivAndImage(index) {
  // guard
  if (!divs.length || index < 0) return;

  // 모든 div와 img에서 'type-active' 제거
  divs.forEach(div => div.classList.remove("type-active"));
  images.forEach(img => img.classList.remove("type-active"));

  // 선택된 div와 img에 'type-active' 추가
  if (divs[index]) divs[index].classList.add("type-active");
  if (images[index]) images[index].classList.add("type-active");
}

function startAutoplay() {
  stopAutoplay();
  timerId = setInterval(function() {
    activeIndex = (activeIndex + 1) % divs.length;
    activateDivAndImage(activeIndex);
  }, 7500);
}

function stopAutoplay() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}

// 초기화 - 첫 번째 활성화 + 자동재생 시작
activateDivAndImage(activeIndex);
startAutoplay();

// div 클릭 시: 인덱스 갱신 + 즉시 렌더 + 타이머 리셋
divs.forEach(div => {
  div.addEventListener("click", function() {
    const indexAttr = div.getAttribute("data-index");
    // data-index가 1베이스라면: const index = parseInt(indexAttr, 10) - 1;
    const index = parseInt(indexAttr, 10);
    activeIndex = index;            // ★ 클릭 기준으로 상태 재설정
    activateDivAndImage(activeIndex);
    startAutoplay();                // (선택) 클릭 시점부터 다시 7.5초 카운트
  });
});
});



// ranking
const categories = document.querySelectorAll('.category');
const cardGroups = document.querySelectorAll('.card-group');

let currentIndex = 0;

function showCategory(index) {
  // 카드 표시 제어
  cardGroups.forEach((g, i) => {
    g.classList.toggle('is-active', i === index);
  });

  // 카테고리 활성화 제어
  categories.forEach((cat, i) => {
    cat.classList.toggle('is-active', i === index);
  });
}

function autoClickCategories() {
  showCategory(currentIndex);
  currentIndex = (currentIndex + 1) % categories.length;
}

setInterval(autoClickCategories, 5000);

categories.forEach((category, index) => {
  category.addEventListener('click', () => {
    currentIndex = index;
    showCategory(currentIndex);
  });
});

window.addEventListener('DOMContentLoaded', () => {
  showCategory(0);
});
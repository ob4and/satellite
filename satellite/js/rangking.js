//items
document.querySelectorAll('.items').forEach(item => {
    item.addEventListener('click', function() {
        const svg = item.querySelector('svg');
        if (svg) {
            // 현재 회전 상태를 확인하고 180도 추가
            if (svg.style.transform === 'rotate(180deg)') {
                svg.style.transform = 'rotate(0deg)';
            } else {
                svg.style.transform = 'rotate(180deg)';
            }

            // 부드러운 회전을 위해 CSS 전환 추가
            svg.style.transition = 'transform 0.3s ease-in';
        }
    });
});



//option
(function() {
    // 코드가 IIFE(즉시 실행 함수)로 감싸져 있어 다른 코드와의 변수 충돌을 방지합니다.
    const itemsElement = document.querySelector('.items');
    const typesDiv = document.querySelector('.types');

    if (!itemsElement || !typesDiv) {
        console.warn('Required elements are missing');
        return;  // 요소가 없을 경우, 코드 실행 중단
    }

    itemsElement.addEventListener('click', function() {
        // 현재 상태 확인 후 display 속성 전환
        if (typesDiv.style.display === 'none' || typesDiv.style.display === '') {
            typesDiv.style.display = 'flex';  // 보이기
        } else {
            typesDiv.style.display = 'none';  // 숨기기
        }
    });
})();



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
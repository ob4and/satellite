document.addEventListener('DOMContentLoaded', function(){
  const masterChk   = document.getElementById('check_btn');
  const orderWrap   = document.querySelector('.order');
  const deleteBox   = document.querySelector('.delet');
  const delSelectedBtn = deleteBox?.querySelector('p:nth-child(1)');
  const delAllBtn      = deleteBox?.querySelector('p:nth-child(2)');
  const orderBtn = document.querySelector('.pay .order-btn');

  // 표기 텍스트 교체(로드 후 보장)
  delAllBtn?.replaceChildren(document.createTextNode('전체 삭제'));

  // 결제 요약
  const payTitleTotal = document.querySelector('.pay-title p:nth-child(2)');
  const payProdEl     = document.querySelector('.pay-des p:nth-child(2)');
  const payDiscEl     = document.querySelector('.pay-des p:nth-child(4)');
  const payShipEl     = document.querySelector('.pay-des p:nth-child(6)');

  // 헤더 카운트 요소
  const cartCountEl = document.getElementById('cart-count');

  // 유틸
  const parseWon = (txt)=> Number(String(txt||'').replace(/[^\d\-]/g,'') || 0);
  const toWon    = (n)=> n.toLocaleString('ko-KR') + '원';

  // 카드 정보
  function getCardAmounts(card){
    const costEl  = card.querySelector('.cost');
    const priceEl = card.querySelector('.price');
    let cost=0, price=0, discount=0;
    if(priceEl){
      price = parseWon(priceEl.textContent);
      if(costEl){
        cost = parseWon(costEl.textContent);
        discount = Math.max(cost - price, 0);
      } else {
        cost = price;
      }
    }
    return {cost, price, discount};
  }
  const getCards          = ()=> Array.from(document.querySelectorAll('.order .card'));
  const getSelectedCards  = ()=> getCards().filter(c => c.querySelector('.check_wrap input[type="checkbox"]')?.checked);

  // ✅ 헤더 카운트 갱신
  function updateCartCount(){
    if(!cartCountEl) return;
    cartCountEl.textContent = String(getCards().length);
  }

  // ✅ 합계 + 버튼 + 헤더카운트 동시 갱신
  function updateTotals(){
    const selected = getSelectedCards();
    const selectedCount = selected.length;

    let sumCost = 0, sumDiscount = 0;
    selected.forEach(card=>{
      const {cost, discount} = getCardAmounts(card);
      sumCost += cost;
      sumDiscount += discount;
    });

    const shipping = selectedCount > 0 ? 3000 : 0;
    const total = (sumCost - sumDiscount) + shipping;

    if(payProdEl)     payProdEl.textContent     = toWon(sumCost);
    if(payDiscEl)     payDiscEl.textContent     = (sumDiscount>0 ? '-' : '') + toWon(sumDiscount);
    if(payShipEl)     payShipEl.textContent     = toWon(shipping);
    if(payTitleTotal) payTitleTotal.textContent = toWon(total);

    if(orderBtn){
      orderBtn.textContent = selectedCount > 0 ? `${selectedCount}개 구매하기` : '구매하기';
      orderBtn.classList.toggle('is-disabled', selectedCount === 0);
      orderBtn.setAttribute('aria-disabled', String(selectedCount === 0));
    }

    if(masterChk){
      const cards = getCards();
      masterChk.checked = cards.length>0 && cards.every(c => c.querySelector('.check_wrap input[type="checkbox"]')?.checked);
    }

    // 🔵 헤더 카운트도 여기서 항상 갱신
    updateCartCount();
  }

  // 이벤트들
  orderWrap.addEventListener('change', (e)=>{
    if(e.target.matches('.card .check_wrap input[type="checkbox"]')) updateTotals();
  });

  masterChk?.addEventListener('change', function(){
    getCards().forEach(card=>{
      const cb = card.querySelector('.check_wrap input[type="checkbox"]');
      if(cb) cb.checked = this.checked;
    });
    updateTotals();
  });

  delSelectedBtn?.addEventListener('click', function(){
    const selected = getSelectedCards();
    if(selected.length===0) return;
    selected.forEach(card=>{
      card.classList.add('removing');
      setTimeout(()=> card.remove(), 180);
    });
    setTimeout(updateTotals, 200);
  });

  delAllBtn?.addEventListener('click', function(){
    const cards = getCards();
    if(!cards.length) return;
    cards.forEach(card=>{
      card.classList.add('removing');
      setTimeout(()=> card.remove(), 180);
    });
    setTimeout(()=>{
      if(masterChk) masterChk.checked = false;
      updateTotals();
    }, 200);
  });

  // X 아이콘 클릭 삭제
  orderWrap.addEventListener('click', function(e){
    const svg = e.target.closest('.card svg');
    if(!svg) return;
    const card = svg.closest('.card');
    if(!card) return;
    card.classList.add('removing');
    setTimeout(()=> card.remove(), 180);
    setTimeout(updateTotals, 200);
  });

  // 초기 1회
  updateTotals();      // 합계 + 버튼 + 헤더카운트 모두 세팅
});
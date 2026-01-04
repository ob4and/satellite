// ---------- heart ----------
document.addEventListener('DOMContentLoaded', () => {
document.querySelectorAll('.heart svg').forEach((svg) => {
  svg.addEventListener('click', function () {
    const paths = this.querySelectorAll('path');
    const useEl = this.querySelector('use');

    if (paths.length) {
      paths.forEach((p) => {
        const fillAttr = p.getAttribute('fill'); // null일 수 있음
        const current = fillAttr ?? 'none';      // null이면 none 취급
        p.setAttribute('fill', current === 'none' ? 'white' : 'none');
      });
    } else if (useEl) {
      // 스프라이트의 경우 svg 자체 fill을 토글
      const current = this.style.fill || 'none';
      this.style.fill = current === 'none' ? 'white' : 'none';
    }
  });
});
});

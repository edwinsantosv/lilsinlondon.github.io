(() => {
  const menu=document.querySelector('.site-menu');
  menu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.open=false));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu?.open){menu.open=false;menu.querySelector('summary').focus();}});
  document.addEventListener('click',e=>{if(menu?.open&&!menu.contains(e.target))menu.open=false;});
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window))return;
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('tal-entered');observer.unobserve(e.target);}}),{threshold:.1});
  document.querySelectorAll('.card,.section-title,.faq-item').forEach(el=>observer.observe(el));
})();

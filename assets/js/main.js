/* shared: nav toggle + entrance sequencing */
(function(){
  var burger=document.querySelector('.burger');
  var links=document.querySelector('.nav-links');
  if(burger&&links){
    burger.addEventListener('click',function(){
      var open=links.classList.toggle('open');
      burger.setAttribute('aria-expanded',open?'true':'false');
    });
  }
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els=document.querySelectorAll('.rise');
  if(reduce||!('IntersectionObserver' in window)){
    els.forEach(function(e){e.classList.add('in')});
    return;
  }
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}
    });
  },{threshold:.12});
  els.forEach(function(e){io.observe(e)});
  // stagger hero items
  var heroItems=document.querySelectorAll('.hero .rise');
  heroItems.forEach(function(e,i){e.style.transitionDelay=(i*0.12)+'s'});
})();

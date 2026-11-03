/* Home hero: autoplay scripted chat (pauses to static transcript on reduced motion) */
(function(){
  var body=document.getElementById('hero-chat');
  if(!body) return;
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function t(){var d=new Date();return d.getHours()+':'+String(d.getMinutes()).padStart(2,'0')}
  function bubble(who,html){
    var m=document.createElement('div');
    m.className='msg '+who;
    m.innerHTML=html+'<div class="t">'+t()+'</div>';
    body.appendChild(m); body.scrollTop=body.scrollHeight;
  }
  function typing(cb,ms){
    var tp=document.createElement('div');
    tp.className='typing'; tp.innerHTML='<i></i><i></i><i></i>';
    body.appendChild(tp); body.scrollTop=body.scrollHeight;
    setTimeout(function(){tp.remove();cb()},ms||900);
  }
  var script=[
    ['in',"Hi! I'm your quoting assistant. Which client is this for?"],
    ['out',"SkyView Realty — the solar farm survey"],
    ['in',"Got it, repeat client. How many flight hours?"],
    ['out',"6 hours"],
    ['in',"Quote ready — INV-2026-0148, $1,860. Sheet updated. Want me to send the PDF?"],
    ['out',"Send it"]
  ];
  if(reduce){
    script.forEach(function(s){bubble(s[0],s[1])});
    return;
  }
  var i=0;
  function step(){
    if(i>=script.length){
      setTimeout(function(){body.innerHTML='';i=0;step()},6000);
      return;
    }
    var s=script[i++];
    if(s[0]==='in'){typing(function(){bubble('in',s[1]);setTimeout(step,700)})}
    else{bubble('out',s[1]);setTimeout(step,900)}
  }
  // start when visible
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(en){
      if(en[0].isIntersecting){io.disconnect();setTimeout(step,1200)}
    },{threshold:.4});
    io.observe(body);
  }else{setTimeout(step,1200)}
})();

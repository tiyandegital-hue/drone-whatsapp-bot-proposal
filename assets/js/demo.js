/* Interactive concept demo — simulated WhatsApp quotation flow. No real messages are sent. */
(function(){
  var body=document.getElementById('demo-chat');
  var tray=document.getElementById('demo-tray');
  if(!body||!tray) return;

  var state={inv:148, client:null, repeat:false, hours:0, extras:[], rate:300};
  var EXTRAS={'thermal':['Thermal imaging',150],'rush':['Rush delivery',100]};

  function t(){var d=new Date();return d.getHours()+':'+String(d.getMinutes()).padStart(2,'0')}
  function scroll(){body.scrollTop=body.scrollHeight}
  function bubble(who,html){
    var m=document.createElement('div');
    m.className='msg '+who; m.innerHTML=html+'<div class="t">'+t()+'</div>';
    body.appendChild(m); scroll();
  }
  function typing(cb,ms){
    var tp=document.createElement('div');
    tp.className='typing'; tp.innerHTML='<i></i><i></i><i></i>';
    body.appendChild(tp); scroll();
    setTimeout(function(){tp.remove();cb()},ms||900);
  }
  function clearTray(){tray.innerHTML=''}
  function replies(opts){
    // opts: [{label, value}] or {input:true, placeholder, onSubmit}
    clearTray();
    var q=document.createElement('div'); q.className='quick';
    if(opts.input){
      var inp=document.createElement('input');
      inp.type='text'; inp.placeholder=opts.placeholder||'Type here…';
      inp.setAttribute('aria-label',opts.placeholder||'Type here');
      inp.style.cssText='flex:1;min-width:180px;border:1px solid var(--line);border-radius:999px;padding:10px 18px;font-size:14px;font-family:inherit';
      var go=document.createElement('button'); go.textContent='Send';
      var send=function(){var v=inp.value.trim();if(!v)return;clearTray();opts.onSubmit(v)};
      go.onclick=send;
      inp.onkeydown=function(e){if(e.key==='Enter')send()};
      q.appendChild(inp); q.appendChild(go); tray.appendChild(q);
      setTimeout(function(){inp.focus()},100);
      return;
    }
    opts.forEach(function(o){
      var b=document.createElement('button'); b.textContent=o.label;
      b.onclick=function(){clearTray();bubble('out',o.label);o.fn(o.value)};
      q.appendChild(b);
    });
    tray.appendChild(q);
  }
  function money(n){return '$'+n.toLocaleString('en-US')}

  /* ---- flow ---- */
  function start(){
    body.innerHTML=''; clearTray();
    Object.assign(state,{client:null,repeat:false,hours:0,extras:[]});
    typing(function(){
      bubble('in',"Hi, I'm your quoting assistant <b>(concept demo)</b>. Which client is this for?");
      replies([
        {label:'SkyView Realty',value:'SkyView Realty',fn:pickClient},
        {label:'HarborLine Logistics',value:'HarborLine Logistics',fn:pickClient},
        {label:'+ New client',value:'__new',fn:pickClient}
      ]);
    },1100);
  }
  function pickClient(v){
    if(v==='__new'){
      typing(function(){
        bubble('in',"New client — nice. What's their name?");
        replies({input:true,placeholder:'Client name…',onSubmit:function(name){
          bubble('out',name);
          state.client=name; state.repeat=false;
          typing(function(){bubble('in',"Got it — <b>"+esc(name)+"</b>. How many flight hours?");askHours()},800);
        }});
      },800);
      return;
    }
    state.client=v; state.repeat=true;
    typing(function(){
      bubble('in',"Got it — <b>"+esc(v)+"</b>, repeat client. Their last 3 jobs averaged <b>$310/hr</b>, so I'll sharpen the rate. How many flight hours?");
      askHours();
    },900);
  }
  function askHours(){
    replies([2,4,6,8].map(function(h){
      return {label:h+' hours',value:h,fn:function(v){state.hours=v;askExtras()}};
    }));
  }
  function askExtras(){
    typing(function(){
      bubble('in',"Any extras on this job?");
      replies([
        {label:'Thermal imaging +$150',value:'thermal',fn:pickExtra},
        {label:'Rush delivery +$100',value:'rush',fn:pickExtra},
        {label:'None',value:'none',fn:pickExtra}
      ]);
    },700);
  }
  function pickExtra(v){
    if(v!=='none' && state.extras.indexOf(v)===-1) state.extras.push(v);
    var remaining=Object.keys(EXTRAS).filter(function(k){return state.extras.indexOf(k)===-1});
    if(v==='none'||remaining.length===0){buildQuote();return}
    // offer the remaining extra(s), then done
    typing(function(){
      bubble('in',"Added. Anything else?");
      var opts=remaining.map(function(k){
        return {label:EXTRAS[k][0]+' +$'+EXTRAS[k][1],value:k,fn:function(x){state.extras.push(x);buildQuote()}};
      });
      opts.push({label:"That's all",value:'done',fn:function(){buildQuote()}});
      replies(opts);
    },700);
  }
  function totals(){
    var rate=state.repeat?Math.round(state.rate*0.95):state.rate;
    var base=state.hours*rate;
    var ex=state.extras.reduce(function(s,k){return s+EXTRAS[k][1]},0);
    return {rate:rate,base:base,ex:ex,total:base+ex};
  }
  function buildQuote(){
    typing(function(){
      var tt=totals();
      var inv='INV-2026-0'+(state.inv++);
      state.invNo=inv;
      var rows='<tr><td>Flight time — '+state.hours+'h × '+money(tt.rate)+'/hr</td><td>'+money(tt.base)+'</td></tr>';
      state.extras.forEach(function(k){
        rows+='<tr><td>'+EXTRAS[k][0]+'</td><td>'+money(EXTRAS[k][1])+'</td></tr>';
      });
      if(state.repeat) rows+='<tr><td>Repeat-client adjustment (5%)</td><td>−'+money(state.hours*state.rate-tt.base)+'</td></tr>';
      var card='<div class="quote-card"><div class="qh"><strong>Quotation</strong><span class="qno">'+inv+'</span></div>'+
        '<div style="font-size:13px;color:var(--muted)">'+esc(state.client)+'</div>'+
        '<table>'+rows+'</table>'+
        '<div class="qtotal"><span>Total</span><span>'+money(tt.total)+'</span></div></div>';
      bubble('in',card+'<div style="margin-top:6px;font-size:12.5px;color:var(--muted)">Demo rates — your real rate card goes here.</div>');
      setTimeout(function(){
        replies([
          {label:'Looks good — send it',value:1,fn:confirm},
          {label:'Start over',value:0,fn:start}
        ]);
      },600);
    },1400);
  }
  function confirm(){
    typing(function(){
      var tt=totals();
      bubble('in','Invoice <b>'+state.invNo+'</b> confirmed.');
    },800);
    setTimeout(function(){
      typing(function(){
        var row='<div class="ledger">google-sheets · quotations<br>'+
          '<span class="ok">✓ row 213 appended</span> — '+state.invNo+' · '+esc(state.client)+' · '+state.hours+'h · '+money(totals().total)+'<br>'+
          '<span class="ok">✓</span> template pulled from Drive: '+esc(state.client).replace(/\s+/g,'_')+'_Quote_Template<br>'+
          '<span class="ok">✓</span> PDF generated &amp; ready to send</div>';
        bubble('in',row);
        setTimeout(function(){
          typing(function(){
            var insight=state.repeat
              ? "And because they're a repeat client, I've logged this job — their next quote starts from real history, not a guess."
              : "First job logged — next time, their quote improves automatically from this history.";
            bubble('in',insight);
            setTimeout(function(){
              var d=document.createElement('div');
              d.style.cssText='align-self:center;margin-top:8px';
              d.innerHTML='<button class="btn small ghost" id="replay">Replay demo</button>';
              body.appendChild(d); scroll();
              document.getElementById('replay').onclick=start;
            },700);
          },900);
        },900);
      },1100);
    },1600);
  }
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}

  start();
})();

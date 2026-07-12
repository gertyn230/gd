document.addEventListener('DOMContentLoaded', function(){

  // highlight active nav link based on current file name
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navlinks a').forEach(a=>{
    const href = a.getAttribute('href');
    if(href === current){ a.classList.add('active'); }
  });

  // copy server IP
  const copyBtn = document.getElementById('copyIpBtn');
  if(copyBtn){
    copyBtn.addEventListener('click', function(){
      const ip = 'play.soracraft.net';
      if(navigator.clipboard){ navigator.clipboard.writeText(ip); }
      const old = copyBtn.textContent;
      copyBtn.textContent = 'Скопійовано!';
      setTimeout(()=> copyBtn.textContent = old, 1500);
    });
  }

  // jittering "live" counters
  function jitterCounter(el, base, spread){
    const val = base + Math.floor(Math.random()*spread - spread/2);
    el.textContent = val.toLocaleString('uk-UA');
  }
  const liveOnline = document.getElementById('liveOnline');
  const statPlayers = document.getElementById('statPlayers');
  if(liveOnline || statPlayers){
    setInterval(()=>{
      if(liveOnline) jitterCounter(liveOnline, 1842, 40);
      if(statPlayers) jitterCounter(statPlayers, 1842, 40);
    }, 4000);
  }
});

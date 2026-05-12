(function(){
  function buildWord(id, text, isGold){
    const el=document.getElementById(id);
    text.split('').forEach((ch,i)=>{
      const s=document.createElement('span');
      s.className='letter'+(isGold?' gold':'');
      s.textContent=ch;
      const base=id==='iWord1'?.3:.95;
      s.style.animationDelay=(base+i*.09)+'s';
      el.appendChild(s);
    });
  }
  buildWord('iWord1','Tusar',false);
  buildWord('iWord2','Khan',true);

  
  const ic=document.getElementById('introCanvas');
  const ictx=ic.getContext('2d');
  let iW,iH,iP=[];
  function iRes(){iW=ic.width=window.innerWidth;iH=ic.height=window.innerHeight}
  iRes(); window.addEventListener('resize',iRes);
  function IP(){
    this.x=Math.random()*iW;this.y=Math.random()*iH;
    this.z=Math.random()*200-100;
    this.r=Math.random()*1.2+.2;this.a=Math.random()*.25+.04;
    this.vx=(Math.random()-.5)*.28;this.vy=(Math.random()-.5)*.28;
    this.vz=(Math.random()-.5)*.15;
    this.va=(Math.random()-.5)*.003;
    this.scale=1;
  }
  for(let i=0;i<55;i++) iP.push(new IP());
  function drawI(){
    ictx.clearRect(0,0,iW,iH);
    iP.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;p.z+=p.vz;p.a+=p.va;
      if(p.x<0||p.x>iW)p.vx*=-1;
      if(p.y<0||p.y>iH)p.vy*=-1;
      if(p.z<-100||p.z>100)p.vz*=-1;
      if(p.a<.02||p.a>.3)p.va*=-1;
      p.scale=1+p.z/200;
      const adjR=p.r*p.scale;
      const adjA=p.a*(0.5+p.z/200);
      ictx.beginPath();ictx.arc(p.x,p.y,adjR,0,Math.PI*2);
      ictx.fillStyle='rgba(201,168,76,'+adjA+')';ictx.fill();
    });
    if(document.getElementById('intro')) requestAnimationFrame(drawI);
  }
  drawI();

  
  const fill=document.getElementById('iBarFill');
  const pctEl=document.getElementById('iPct');
  const stEl=document.getElementById('iSt');
  const msgs=['Initializing…','Loading assets…','Building UI…','Almost ready…','Done!'];
  let pct=0,done=false;
  const t=setInterval(()=>{
    if(done)return;
    pct=Math.min(pct+Math.random()*3.5+1.5,99);
    fill.style.width=pct+'%';
    pctEl.textContent=Math.floor(pct)+'%';
    stEl.textContent=msgs[Math.min(Math.floor(pct/25),3)];
  },55);
  setTimeout(()=>{
    done=true;clearInterval(t);
    fill.style.width='100%';pctEl.textContent='100%';stEl.textContent=msgs[4];
    setTimeout(()=>{
      const el=document.getElementById('intro');
      if(el){el.classList.add('hide');setTimeout(()=>el.remove(),1000);}
    },450);
  },2900);
})();


const hamBtn=document.getElementById('hamBtn');
const navOverlay=document.getElementById('navOverlay');
function closeNav(){
  hamBtn.classList.remove('open');
  navOverlay.classList.remove('show');
  setTimeout(()=>{navOverlay.style.display='none';},350);
}
hamBtn.addEventListener('click',()=>{
  const isOpen=hamBtn.classList.contains('open');
  if(isOpen){ closeNav(); }
  else{
    hamBtn.classList.add('open');
    navOverlay.style.display='flex';
    requestAnimationFrame(()=>requestAnimationFrame(()=>navOverlay.classList.add('show')));
  }
});


const cur=document.getElementById('cursor');
const ring=document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
const isMouse=window.matchMedia('(hover:hover) and (pointer:fine)').matches;
if(isMouse){
  document.addEventListener('mousemove',e=>{
    mx=e.clientX;my=e.clientY;
    cur.style.left=mx+'px';cur.style.top=my+'px';
  });
  (function aR(){
    rx+=(mx-rx)*.12;ry+=(my-ry)*.12;
    ring.style.left=rx+'px';ring.style.top=ry+'px';
    requestAnimationFrame(aR);
  })();
} else {
  cur.style.display='none';ring.style.display='none';
  document.body.style.cursor='auto';
}


const cv=document.getElementById('bgCanvas');
const ctx=cv.getContext('2d');
let W,H,pts=[];
function resize(){W=cv.width=window.innerWidth;H=cv.height=window.innerHeight}
resize();window.addEventListener('resize',resize);
const COLS=['rgba(201,168,76,','rgba(123,108,255,','rgba(45,212,191,'];
function Pt(){
  this.x=Math.random()*W;this.y=Math.random()*H;
  this.r=Math.random()*1.4+.3;
  this.c=COLS[Math.floor(Math.random()*COLS.length)];
  this.a=Math.random()*.38+.05;
  this.vx=(Math.random()-.5)*.22;this.vy=(Math.random()-.5)*.22;
  this.va=(Math.random()-.5)*.004;
}
const COUNT=window.innerWidth<600?45:85;
for(let i=0;i<COUNT;i++) pts.push(new Pt());
function draw(){
  ctx.clearRect(0,0,W,H);
  pts.forEach(p=>{
    p.x+=p.vx;p.y+=p.vy;p.a+=p.va;
    if(p.x<0||p.x>W)p.vx*=-1;
    if(p.y<0||p.y>H)p.vy*=-1;
    if(p.a<.02||p.a>.45)p.va*=-1;
    ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=p.c+p.a+')';ctx.fill();
  });
  if(window.innerWidth>=600){
    for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){
      const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y;
      const d=Math.sqrt(dx*dx+dy*dy);
      if(d<110){
        ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);
        ctx.strokeStyle='rgba(201,168,76,'+(0.038*(1-d/110))+')';
        ctx.lineWidth=.5;ctx.stroke();
      }
    }
  }
  requestAnimationFrame(draw);
}
draw();


document.getElementById('fileIn').addEventListener('change',function(e){
  const f=e.target.files[0];if(!f)return;
  const r=new FileReader();
  r.onload=ev=>{
    document.getElementById('pImg').src=ev.target.result;
    document.getElementById('pImg').style.display='block';
    document.getElementById('pPh').style.display='none';
  };
  r.readAsDataURL(f);
});


const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');io.unobserve(e.target);}});
},{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));


const bIO=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.style.width=e.target.dataset.w+'%';
      e.target.classList.add('active');bIO.unobserve(e.target);
    }
  });
},{threshold:.2});
document.querySelectorAll('.prof-fill').forEach(b=>bIO.observe(b));
const secEls=document.querySelectorAll('[id]');
const navAs=document.querySelectorAll('.nav-links a:not(.nav-cta)');
window.addEventListener('scroll',()=>{
  let cur='';
  secEls.forEach(s=>{if(window.scrollY>=s.offsetTop-100)cur=s.id});
  navAs.forEach(a=>{a.style.color=a.getAttribute('href')==='#'+cur?'var(--white)':''});
},{passive:true});
var N=40,S=Math.ceil(N/2),cur=0,sp=0,single=false,prev=0;
var book=document.getElementById('book'),q=document.getElementById('q'),res=document.getElementById('res'),sheets=[],one;
function mk(p){if(p>=N)return '<div style="background:#fff;width:100%;height:100%"></div>';return '<img data-p="'+p+'" alt="Guidebook page '+(p+1)+'" src="images/pages/page-'+('0'+(p+1)).slice(-2)+'.jpg" draggable="false">'}
function build(){book.innerHTML='';sheets=[];
for(var k=0;k<S;k++){var s=document.createElement('div');s.className='sheet';s.innerHTML='<div class="face f">'+mk(2*k)+'</div><div class="face b">'+mk(2*k+1)+'</div>';
(function(k,s){s.onclick=function(e){var flipped=k<cur;if(flipped)flipTo(cur-1);else flipTo(cur+1)}})(k,s);book.appendChild(s);sheets.push(s)}
one=document.createElement('div');one.className='one';book.appendChild(one)}
function size(){var W=document.getElementById('fb').clientWidth-8,H=Math.max(380,Math.min(window.innerHeight-170,820));
single=W<420;var pw=single?Math.min(W,H*.707):Math.min(W/2,H*.707);
document.documentElement.style.setProperty('--pw',pw+'px');document.documentElement.style.setProperty('--ph',(pw/.707)+'px');
book.className='book'+(single?' single':'');render()}
function render(){
if(single){one.innerHTML=mk(sp);document.getElementById('bk').disabled=sp==0;document.getElementById('nx').disabled=sp>=N-1;document.getElementById('ct').textContent='Page '+(sp+1)+' of '+N;book.style.transform='none';return}
var pw=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--pw'));
sheets.forEach(function(s,k){var f=k<cur;s.style.transform=f?'rotateY(-180deg)':'none';
var z=f?k+1:S-k+1;if((k<cur)!=(k<prev)){s.style.zIndex=S+5;(function(s,z){setTimeout(function(){s.style.zIndex=z},450)})(s,z)}else s.style.zIndex=z});
prev=cur;book.style.transform=cur==0?'translateX('+(-pw/2)+'px)':(cur==S?'translateX('+(pw/2)+'px)':'none');
var l=2*cur,r=2*cur+1,t=cur==0?'Cover':(cur==S?'Page '+l:'Pages '+l+'–'+r);
if(cur>0&&cur<S&&r>N)t='Page '+l;
document.getElementById('ct').textContent=t+' of '+N;
document.getElementById('bk').disabled=cur==0;document.getElementById('nx').disabled=cur>=S}
function flipTo(n){n=Math.max(0,Math.min(S,n));if(n==cur)return;cur=n;render()}
function gotoPage(p){if(single){sp=p;render();return}
flipTo(Math.ceil(p/2));var im=book.querySelector('img[data-p="'+p+'"]');if(im){var f=im.parentNode;f.classList.add('hit');setTimeout(function(){f.classList.remove('hit')},2600)}}
document.getElementById('bk').onclick=function(){single?(sp=Math.max(0,sp-1),render()):flipTo(cur-1)};
document.getElementById('nx').onclick=function(){single?(sp=Math.min(N-1,sp+1),render()):flipTo(cur+1)};
document.addEventListener('keydown',function(e){if(e.target===q)return;if(e.key=='ArrowRight')document.getElementById('nx').click();if(e.key=='ArrowLeft')document.getElementById('bk').click()});
function hits(){var t=q.value.trim().toLowerCase(),o=[];if(!t)return o;TXT.forEach(function(x,n){var k=x.toLowerCase().indexOf(t);if(k>-1)o.push([n,x.slice(Math.max(0,k-35),k+70)])});return o}
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;')}
q.oninput=function(){var t=q.value.trim(),h=hits();res.innerHTML='';
if(t&&!h.length)res.innerHTML='<button disabled>No results for “'+esc(t)+'”. Try another word.</button>';
h.forEach(function(r){var b=document.createElement('button');b.innerHTML='<b>Page '+(r[0]+1)+'</b><span>…'+esc(r[1])+'…</span>';b.onclick=function(){res.style.display='none';gotoPage(r[0]);document.getElementById('book').scrollIntoView({behavior:'smooth',block:'center'})};res.appendChild(b)});
res.style.display=t?'block':'none'};
q.onkeydown=function(e){if(e.key=='Enter'){var h=hits();if(h.length){res.style.display='none';gotoPage(h[0][0])}}if(e.key=='Escape')res.style.display='none'};
document.addEventListener('click',function(e){if(!e.target.closest('.sb'))res.style.display='none'});
document.getElementById('fs').onclick=function(){try{var e=document.getElementById('fb').parentNode;if(document.fullscreenElement)document.exitFullscreen();else e.requestFullscreen()}catch(x){}};
build();size();window.addEventListener('resize',size);

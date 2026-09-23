// Progressive enhancement: reading and navigation do not depend on motion.
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const root = document.documentElement;
const art = document.querySelector('.workflow-art');
const motionButton = document.querySelector('.motion-toggle');
let userPaused = false;
let revealObserver;

function updateMotion() {
  const paused = userPaused || reducedMotion.matches;
  root.classList.toggle('motion-paused', paused);
  motionButton.setAttribute('aria-pressed', String(paused));
  motionButton.disabled = reducedMotion.matches;
  motionButton.setAttribute('aria-label', reducedMotion.matches ? 'Animations disabled by reduced motion preference' : paused ? 'Resume animations' : 'Pause animations');
  motionButton.title = reducedMotion.matches ? 'Reduced motion is enabled in your device settings' : paused ? 'Resume animations' : 'Pause animations';
  if (paused) {
    document.querySelectorAll('.reveal-pending').forEach(el=>el.classList.remove('reveal-pending'));
    revealObserver?.disconnect();
  }
}
motionButton.addEventListener('click',()=>{userPaused=!userPaused;updateMotion();});
reducedMotion.addEventListener('change',updateMotion);
updateMotion();

if ('IntersectionObserver' in window) {
  const heroVisibility=new IntersectionObserver(entries=>{
    art.classList.toggle('art-offscreen',!entries[0].isIntersecting);
  },{threshold:0});
  heroVisibility.observe(art);
  if (!reducedMotion.matches) {
    revealObserver=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        entry.target.classList.remove('reveal-pending');
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      });
    },{threshold:0.08,rootMargin:'0px 0px -22px 0px'});
    const targets=document.querySelectorAll('.section-head,.problem-card,.service-card,.service-prompt,.process-heading,.process-grid li,.example-card,.calculator-panel,.trust-grid>div,.faq-grid>div,.final-inner,.contact-grid>div,.contact-form');
    targets.forEach((el,i)=>{
      el.classList.add('reveal-item');
      el.style.setProperty('--reveal-delay',`${Math.min(i%3,2)*65}ms`);
      if(el.getBoundingClientRect().top>innerHeight+20){el.classList.add('reveal-pending');revealObserver.observe(el);}
    });
  }
}
document.addEventListener('visibilitychange',()=>root.classList.toggle('page-hidden',document.hidden));
// The keyboard focus must never land on an item waiting to be revealed.
document.addEventListener('focusin',event=>event.target.closest('.reveal-pending')?.classList.remove('reveal-pending'));

const workflows={
  intake:{sources:['Manual|handoffs','Duplicate|data entry','Scattered|approvals'],result:'Connected workflows',description:'Capture the request. Validate the details. Assign an owner.'},
  approvals:{sources:['Scattered|requests','Unclear|ownership','Manual|follow-up'],result:'A clear approval path',description:'Route the request. Keep human review. Record the decision.'},
  reporting:{sources:['Scattered|data','Repeated|exports','Manual|formatting'],result:'Reporting that connects',description:'Bring the data together. Check consistency. Share the report.'}
};
document.querySelectorAll('[data-flow]').forEach(button=>{
  button.addEventListener('click',()=>{
    const selected=button.dataset.flow;
    if(art.dataset.workflow===selected)return;
    const workflow=workflows[selected];
    art.dataset.workflow=selected;
    document.querySelectorAll('[data-flow]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
    document.querySelectorAll('.source-card>span').forEach((label,i)=>{
      const [first,second]=workflow.sources[i].split('|');
      label.replaceChildren(document.createTextNode(first),document.createElement('br'),document.createTextNode(second));
    });
    document.querySelector('.output-heading strong').textContent=workflow.result;
    document.querySelector('#workflow-description').textContent=workflow.description;
    if(!reducedMotion.matches&&!userPaused)document.querySelector('.output-card').animate([{opacity:.35,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:280,easing:'ease-out'});
  });
});

let scheduled=false;
const header=document.querySelector('.site-header');
const navSections=[...document.querySelectorAll('main section[id]')];
function onScroll() {
  if(scheduled)return;
  scheduled=true;
  requestAnimationFrame(()=>{
    header.classList.toggle('is-scrolled',scrollY>24);
    const scrollable=document.documentElement.scrollHeight-innerHeight;
    root.style.setProperty('--reading-progress',String(scrollable>0?Math.min(1,Math.max(0,scrollY/scrollable)):0));
    const current=navSections.filter(section=>section.getBoundingClientRect().top<=180).at(-1)?.id;
    document.querySelectorAll('.desktop-nav a').forEach(link=>{
      if(link.hash===`#${current}`)link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
    scheduled=false;
  });
}
addEventListener('scroll',onScroll,{passive:true});
addEventListener('resize',onScroll,{passive:true});
onScroll();

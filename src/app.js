import {calculate, hoursFormat, moneyFormat, estimateMessage, appendEstimate} from './calculator.mjs';
import './motion.js';

const toggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function setMenu(open, returnFocus=false) {
  mobileNav.hidden = !open;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  document.body.classList.toggle('menu-open', open);
  if (open) mobileNav.querySelector('a').focus();
  else if (returnFocus) toggle.focus();
}
toggle.addEventListener('click', () => setMenu(mobileNav.hidden));
document.addEventListener('keydown', event => {
  if (mobileNav.hidden) return;
  if (event.key === 'Escape') {event.preventDefault();setMenu(false,true);}
  if (event.key === 'Tab') {
    const links = [toggle, ...mobileNav.querySelectorAll('a')];
    if (event.shiftKey && document.activeElement === links[0]) {event.preventDefault();links.at(-1).focus();}
    if (!event.shiftKey && document.activeElement === links.at(-1)) {event.preventDefault();toggle.focus();}
  }
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  setMenu(false);
  const target = document.querySelector(link.getAttribute('href').startsWith('#') ? link.getAttribute('href') : '#contact');
  if (target) {target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}
}));
window.matchMedia('(min-width: 1001px)').addEventListener('change', e => {if (e.matches) setMenu(false);});
document.addEventListener('click', event => {if (!mobileNav.hidden && !event.target.closest('.site-header')) setMenu(false);});
const calcForm = document.querySelector('#calculator-form');
const inputs = ['monthly-volume','minutes-per-task','hourly-cost','reduction'].map(id=>document.getElementById(id));
const range = document.querySelector('#reduction-range');
const validate = document.querySelector('#validate-estimate');
const error = document.querySelector('#calc-error');
const announcement = document.querySelector('#calc-announcement');
let result;
function update(showError=false) {
  const [volume,minutes,hourlyCost,reduction] = inputs.map(input => input.value === '' ? NaN : Number(input.value));
  result = calculate({volume,minutes,hourlyCost,reduction});
  validate.disabled = !result;
  if (showError) error.hidden = !!result;
  if (!result) {
    for (const id of ['manual-hours','recovered-hours','monthly-value','annual-value']) document.getElementById(id).textContent = '—';
    return;
  }
  error.hidden = true;
  document.querySelector('#manual-hours').textContent=hoursFormat.format(result.manualHours);
  document.querySelector('#recovered-hours').textContent=hoursFormat.format(result.recoveredHours);
  document.querySelector('#recovered-hours').dataset.large=String(hoursFormat.format(result.recoveredHours).length>7);
  document.querySelector('#monthly-value').textContent=moneyFormat.format(result.monthlyValue);
  document.querySelector('#annual-value').textContent=moneyFormat.format(result.annualValue);
  document.querySelector('#capacity-bar').style.width=`${reduction}%`;
}
inputs.forEach(input=>{
  input.addEventListener('input',()=>{if(input.id==='reduction' && input.validity.valid)range.value=input.value;update();});
  input.addEventListener('blur',()=>update(true));
});
range.addEventListener('input',()=>{inputs[3].value=range.value;update();});
calcForm.addEventListener('submit',event=>{event.preventDefault();update(true);if(result)announcement.textContent=`Potential capacity recovered: ${hoursFormat.format(result.recoveredHours)} hours per month. Estimated monthly capacity value: ${moneyFormat.format(result.monthlyValue)}.`;});
validate.addEventListener('click',()=>{
  update(true);if(!result)return;
  const message=document.querySelector('#message');
  const next=appendEstimate(message.value,estimateMessage(result));
  document.querySelector('#message-help').textContent=next===null?'There is not enough room to add the estimate. Shorten your message and try again. Your existing text has been kept.':'Estimate added. Preview only: this message is not sent or saved.';
  if(next!==null)message.value=next;
  document.querySelector('#estimated-hours').value=result.manualHours.toFixed(1);
  document.querySelector('#contact').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  message.focus({preventScroll:true});
});
document.querySelector('#contact-form').addEventListener('submit', event=>event.preventDefault());
update();

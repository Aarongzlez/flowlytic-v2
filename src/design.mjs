// Code-native illustration: no generated client data, vendor logos or external assets.
export function renderHero({mark,icon,button,ctaLabel,ctaDest,copy}) {
  return `<section class="hero" id="top">
    <div class="hero-ambient" aria-hidden="true"><span></span><span></span></div>
    <div class="container hero-grid">
      <div class="hero-copy">
        <p class="eyebrow"><span class="live-dot" aria-hidden="true"></span>${copy(3,0)}</p>
        <h1>Turn Operational<br>Friction Into<br><span class="capacity">Capacity<svg viewBox="0 0 440 18" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M4 12C125 1 282 1 435 9"/></svg></span><span class="headline-dot" aria-hidden="true">.</span></h1>
        <p class="hero-description">${copy(3,2)}</p>
        <div class="button-row">${button(ctaLabel,ctaDest)}${button(copy(3,4),'#process','secondary')}</div>
        <p class="hero-note"><span aria-hidden="true">↳</span>${copy(3,5)}</p>
      </div>
      <div class="workflow-art" data-workflow="intake">
        <div class="art-header"><span class="tiny-label">LESS FRICTION. MORE FORWARD.</span><button class="motion-toggle" type="button" aria-label="Pause animations" aria-pressed="false"><svg viewBox="0 0 20 20" aria-hidden="true"><path class="pause-symbol" d="M7 5v10m6-10v10"/><path class="play-symbol" d="m7 5 7 5-7 5Z"/></svg></button></div>
        <div class="flow-scene" aria-label="Examples of operational friction and improved workflow outcomes">
          <div class="scene-heading"><span class="tiny-label">FROM FRICTION</span><span class="illustration-label">Illustrative workflow</span></div>
          <div class="source-cards"><div class="source-card">${icon(1)}<span>Manual<br>handoffs</span></div><div class="source-card">${icon(0)}<span>Duplicate<br>data entry</span></div><div class="source-card">${icon(3)}<span>Scattered<br>approvals</span></div></div>
          <div class="connector-stage" aria-hidden="true"><svg viewBox="0 0 480 190" preserveAspectRatio="none"><defs><linearGradient id="flow-stroke" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#b8d1bf"/><stop offset="1" stop-color="#1b7f68"/></linearGradient></defs><g class="flow-tracks"><path d="M80 0v28Q80 57 120 57H208Q240 57 240 90v100"/><path d="M240 0v190"/><path d="M400 0v28Q400 57 360 57H272Q240 57 240 90v100"/></g><g class="flow-travel"><path pathLength="1" d="M80 0v28Q80 57 120 57H208Q240 57 240 90v100"/><path pathLength="1" d="M240 0v190"/><path pathLength="1" d="M400 0v28Q400 57 360 57H272Q240 57 240 90v100"/></g></svg><div class="hub-orbit"></div><div class="flow-hub"><div class="hub-face">${mark}</div></div><span class="hub-caption">The right steps. Connected.</span></div>
          <div class="output-card"><div class="output-heading"><span class="outcome-icon">${icon(7)}</span><div><span class="tiny-label">TO CAPACITY</span><strong>Connected workflows</strong></div><span class="output-check" aria-hidden="true">✓</span></div><div class="outcome-details"><span>Consistent data</span><span>Visible ownership</span><span>More team capacity</span></div></div>
        </div>
        <div class="workflow-switcher" role="group" aria-label="Explore an illustrative workflow"><button type="button" data-flow="intake" aria-pressed="true">Intake<span aria-hidden="true">↗</span></button><button type="button" data-flow="approvals" aria-pressed="false">Approvals<span aria-hidden="true">↗</span></button><button type="button" data-flow="reporting" aria-pressed="false">Reporting<span aria-hidden="true">↗</span></button></div>
        <p class="workflow-description" id="workflow-description" aria-live="polite">Capture the request. Validate the details. Assign an owner.</p>
      </div>
    </div>
    <div class="container hero-bottom"><span>Designed around your business.<br><strong>Built for the way work actually moves.</strong></span><a href="#services">Explore what’s possible<span aria-hidden="true">↓</span></a><span class="hero-edition">PROCESS FIRST.<br>TECHNOLOGY SECOND.</span></div>
  </section>`;
}

export const approachArtwork = `<div class="approach-art" aria-hidden="true"><svg viewBox="0 0 600 600" fill="none"><g stroke="currentColor"><rect x="75" y="75" width="450" height="450" rx="120"/><rect x="120" y="120" width="360" height="360" rx="100"/><rect x="165" y="165" width="270" height="270" rx="80"/><rect x="210" y="210" width="180" height="180" rx="60"/></g></svg></div>`;

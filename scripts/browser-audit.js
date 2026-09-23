window.addEventListener('load', async () => {
  await document.fonts.ready;
  // Reveal all content before auditing; the public pause control also stops decorative motion.
  const motionToggle = document.querySelector('.motion-toggle');
  if (motionToggle?.getAttribute('aria-pressed') === 'false') motionToggle.click();
  const result = await axe.run(document, {runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa','best-practice']}});
  const panel=document.createElement('pre');
  panel.id='audit-results';
  panel.textContent=JSON.stringify({violations:result.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),passes:result.passes.length},null,2);
  document.body.append(panel);
});

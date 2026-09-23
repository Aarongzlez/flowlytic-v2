import test from 'node:test';
import assert from 'node:assert/strict';
import {calculate,hoursFormat,moneyFormat,estimateMessage,appendEstimate} from '../src/calculator.mjs';
const defaults={volume:200,minutes:10,hourlyCost:35,reduction:60};
test('brief default inputs produce the expected hours and USD values',()=>{
  const r=calculate(defaults);
  assert.equal(hoursFormat.format(r.manualHours),'33.3');
  assert.equal(hoursFormat.format(r.recoveredHours),'20.0');
  assert.equal(moneyFormat.format(r.monthlyValue),'$700');
  assert.equal(moneyFormat.format(r.annualValue),'$8,400');
});
test('upper and lower input boundaries remain finite and preserve the exact formulas',()=>{
  const max=calculate({volume:100000,minutes:480,hourlyCost:1000,reduction:95});
  assert.deepEqual(max,{manualHours:800000,recoveredHours:760000,monthlyValue:760000000,annualValue:9120000000});
  const min=calculate({volume:1,minutes:1,hourlyCost:1,reduction:5});
  assert.equal(min.manualHours,1/60);
  assert.equal(min.recoveredHours,1/60*5/100);
});
test('empty, non-finite, out-of-range and invalid increment values never yield an estimate',()=>{
  for(const patch of [{volume:NaN},{volume:0},{minutes:481},{hourlyCost:Infinity},{hourlyCost:1001},{reduction:0},{reduction:96},{reduction:61},{minutes:1.5}])assert.equal(calculate({...defaults,...patch}),null);
});
test('estimate transfer preserves user text, is idempotent and refuses to truncate user input',()=>{
  const msg=estimateMessage(calculate(defaults));
  const result=appendEstimate('Please review our intake process.',msg);
  assert.ok(result.startsWith('Please review our intake process.\n\n'));
  assert.ok(result.includes('33.3 manual hours per month and 20.0 potential hours recovered'));
  assert.equal(appendEstimate(result,msg),result);
  assert.equal(appendEstimate('A'.repeat(1999),msg),null);
});

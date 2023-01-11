#!/usr/bin/env node
import { diffAsXml } from 'diff-js-xml';
import { promises as fs } from 'fs';

const asisFileName = process.argv[2];
const tobeFileName = process.argv[3];

const asis = await fs.readFile(asisFileName, { encoding: 'utf8' });
const tobe = await fs.readFile(tobeFileName, { encoding: 'utf8' });
const tobeprocessed = tobe.replace(new RegExp("<(/?)[-A-Za-z0-9]+:",'g'),'<$1').replace(new RegExp('xmlns:.*"','g'),'')
const schema = {};
const options = {ignoreDoctype:true};

const filterAndPrintNotPresent = (filter, fileName, result)=>{
    console.log('\n>>>',filter.toUpperCase(), fileName, '\n');
    result.filter(r=>r.message.endsWith(filter)).map(a=>a.path).forEach(a=>console.log(a));
}

const filterAndPrintDifferenceInValue = (filter, result) =>{
    console.log('\n>>>',filter.toUpperCase(), '(LHS value   RHS value)','\n');
    result.filter(a => a.resultType === filter).map(a => a.message.replace('field ', '').replace('has lhs value ', '\t').replace('and rhs value ', '\t')).forEach(a => console.log(a));
}

diffAsXml(asis, tobeprocessed, schema, options, (result) => {
    filterAndPrintNotPresent('not present in rhs', tobeFileName, result);
    filterAndPrintNotPresent('not present in lhs', asisFileName, result);
    filterAndPrintDifferenceInValue('difference in element value', result);
});


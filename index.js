import { diffAsXml } from 'diff-js-xml';
import { promises as fs } from 'fs';

const asisFileName = process.argv[2];
const tobeFileName = process.argv[3];

const asis = await fs.readFile(asisFileName, { encoding: 'utf8' });
const tobe = await fs.readFile(tobeFileName, { encoding: 'utf8' });
const tobeprocessed = tobe.replace(new RegExp("<(/?)[-A-Za-z0-9]+:",'g'),'<$1').replace(new RegExp('xmlns:.*"','g'),'')
const schema = {};
const options = {ignoreDoctype:true};

const filterAndPrint = (filter, result)=>{
    console.log('\n',filter.toUpperCase())
    result.filter(r=>r.message.endsWith(filter)).map(a=>a.path).forEach(a=>console.log(a))
}

diffAsXml(asis, tobeprocessed, schema, options, (result) => {

    filterAndPrint('not present in rhs', result)
    filterAndPrint('not present in lhs', result)

    console.log('\n','different lhs rhs')
    result.filter(a=>a.resultType==='difference in element value').map(a=>a.message.replace('field ','').replace('has lhs value ', '\t').replace('and rhs value ', '\t')).forEach(a=>console.log(a))
});


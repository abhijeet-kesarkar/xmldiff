import { diffAsXml } from 'diff-js-xml';
import { promises as fs } from 'fs';


const asis = await fs.readFile('/Users/kersarkaa/work/auspost/postlpus/Secure Collect/services/1200/logs/ASIS-POSLOG-TC1200-ReceivedAtPO.xml', { encoding: 'utf8' });
const tobe = await fs.readFile('/Users/kersarkaa/work/auspost/postlpus/Secure Collect/services/1200/logs/TOBE-POSLOG-TC1200-ReceivedAtPO-20230111.xml', { encoding: 'utf8' });
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


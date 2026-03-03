const fs=require('fs');
const parser=require('@babel/parser');
const code=fs.readFileSync('app/my-library/page.tsx','utf8');
try {
  parser.parse(code,{sourceType:'module',plugins:['typescript','jsx']});
  console.log('parsed OK');
} catch(e){
  console.error('parse error', e.message);
  console.error(e);
}

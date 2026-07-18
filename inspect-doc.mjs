import mammoth from 'mammoth'

const result = await mammoth.extractRawText({ path: 'data/Nova_Case_V4-262664.docx' })
console.log(result.value)

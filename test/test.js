const musta = require('../mustache-simple')
const config = {
  "source_dir": "site",
  "target_dir": "dist",
  "build": {
    "host": 0,
  },
  "collections": {
    "pages": {
      "type": "page",
      "type2": "page2",
    }
  }
}

let str = `
this is string with {{ source_dir }}
this is should be dist: {{target_dir}}
this is should be host: {{build.host}}
this is page: {{collections.pages.type}}
this is page2: {{collections.pages.type2}}
this is page: {{collections.pageds.type}}
`
console.log('## test1')
console.log(musta.compileMatch(config)(str))
console.log('## test1')
console.log(musta.compileMatch(config,[
    'source_dir',
    'target_dir',
    'collections.pages.type2'
])(str))
console.log('## test1')
console.log(musta.compileAll(config)(str))
console.log('## test1')
console.log(musta.compileAll(config,[
    'source_dir',
    'target_dir',
    'collections.pages.type2'
])(str))


str = str.repeat(1000)
N = 100
let start

start = Date.now()
for (let i=0; i<N; i++)
  res1 = musta(str, config)
console.log(Date.now()-start)

start = Date.now()
for (let i=0; i<N; i++)
  res1 = musta(str, config, [
    'source_dir',
    'target_dir',
    'build.host',
    'collections.pages.type'
  ])
console.log(Date.now()-start)

start = Date.now()
for (let i=0; i<N; i++)
  res1 = musta.compileAll(config)(str)
console.log(Date.now()-start)

start = Date.now()
for (let i=0; i<N; i++)
  res1 = musta.compileAll(config, [
    'source_dir',
    'target_dir',
    'build.host',
    'collections.pages.type'
  ])(str)
console.log(Date.now()-start)

/*
start = Date.now()
for (let i=0; i<N; i++)
  res2 = handle.compile(str)(config)
console.log(Date.now()-start)

console.log(res1 === res2)
*/

const app = require('express')()
    , fs = require('fs')
    , config = require('./config')
    ;
require('@babel/polyfill');
require('@babel/register')(JSON.parse(fs.readFileSync('.babelrc')));

const { EXPRESS_PORT } = config;

require('./middleware')(app);
require('./routes')(app);
require('./module')(app);
app.listen(EXPRESS_PORT, () => console.log(`already listened on ${EXPRESS_PORT}`));

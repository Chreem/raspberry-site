const rpio = require('rpio')
    , response = require('../service/response');

rpio.init({ mapping: 'gpio' });

module.exports = async (req, res) => {
    const { option } = req.params;
    switch (option) {
        case 'open':
            rpio.open(26, rpio.OUTPUT, rpio.HIGH);
            return res.send(response.message('开启 26'));
        case 'close':
            rpio.close(26);
            return res.send(response.message('关闭 26'));
        default:
            return res.send(response.message('无操作'));
    }

};

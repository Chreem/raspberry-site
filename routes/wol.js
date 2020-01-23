const wol = require('../service/wol')
    , response = require('../service/response')
    , { PC_MAC } = require('../config');

module.exports = async (req, res) => {
    const { option } = req.params;
    switch (option) {
        case 'open':
            const result = await wol(PC_MAC);
            return res.send(response.data(result ? '打开失败' : '打开PC'));
        default: return res.send(response.data('无操作'));
    }
};
const ping = require('ping')
    , axios = require('axios')
    , Timer = require('../service/timer')
    , { EXPRESS_PORT, RASPBERRY_IP, PHONE_IP } = require('../config')
    ;

module.exports = () => {
    const timer = new Timer();
    timer.startListen(async () => {
        const result = await ping.promise.probe(PHONE_IP);
        if (!result.alive) return;
        axios.get(`http://${RASPBERRY_IP}:${EXPRESS_PORT}/light/open`);
        axios.get(`http://${RASPBERRY_IP}:${EXPRESS_PORT}/pc/open`);
        timer.stop();
    });
};
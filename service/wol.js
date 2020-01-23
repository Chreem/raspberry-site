const dgram = require('dgram');

const formatMac = mac => {
    let res = '';
    mac.split(':').map(byte => { res += byte });
    return res;
}

module.exports = mac => {
    mac = formatMac(mac);
    let pkg = '';
    if (!mac) { throw new Error('mac is required') }
    for (let i = 0; i < 12; i++) { pkg += 'F' }
    for (let i = 0; i < 16; i++) { pkg += mac }
    pkg = Buffer.from(pkg, 'hex');
    const socket = dgram.createSocket('udp4');
    socket.bind(function () { socket.setBroadcast(true); });
    return new Promise(r => {
        socket.send(pkg, 0, pkg.length, 9, '255.255.255.255', err => {
            socket.close();
            r(err);
        })
    })
};
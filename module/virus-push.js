const getHtml = require('../service/get-html')
    , moment = require('moment')
    , Timer = require('../service/timer')
    , sendEmail = require('../service/send-email')
    ;


const formatContent = ({ title, summary, infoSource, sourceUrl, pubDate }, { countRemark, imgUrl }) => {
    // id: 102
    // pubDate: 1579754829000
    // provinceId: "36"
    // provinceName: "江西省"
    // createTime: 1579755170000
    // modifyTime: 1579755170000
    return `<html>
        <h1>${title}</h1>
        <div>时间：<span>${moment(pubDate).format('YYYY-MM-DD HH:mm')}</span></div>
        <div>${summary}</div>
        <div>消息来源：<a target="_blank" href="${sourceUrl}">${infoSource}</a></div>

        <div>当前人数：<span>${countRemark}</span></div>
        <div>
            <img src="${imgUrl}" style="width: 100%"/>
        </div>

        <div>数据来源：<a target="_blank" href="https://3g.dxy.cn/newh5/view/pneumonia">丁香园</a></div>
    </html>`;
}


const news = [];
module.exports = () => {
    const timer = new Timer({ apm: 10, ipm: 10, normalCallback: true });
    timer.startListen(async () => {
        const len = news.length;
        const result = await getHtml('https://3g.dxy.cn/newh5/view/pneumonia');
        const gettedNews = result.getTimelineService.result;
        gettedNews.map(item => {
            const newsItem = news.filter(i => i.id === item.id)[0];
            if (!newsItem) news.push(item);
        });
        const newLen = gettedNews.length;
        if (newLen <= len) return;


        try {
            const newest = gettedNews[0];
            await sendEmail({
                from: '病情推送',
                receiver: ['chreem@qq.com'],
                title: `【新型肺炎新闻】${newest.title}`,
                body: formatContent(newest, result.getStatisticsService)
            });
        } catch (e) {
            console.log(e.toString());
        }
    });
};
export const getTime = () => {
    const now = new Date();
    const hours = now.getHours();
    let timeOfDay: string;
    if (hours < 4 || hours > 19) {
        timeOfDay = '晚上';
    } else if (hours < 11) {
        timeOfDay = '早上';
    } else if (hours < 14) {
        timeOfDay = '中午';
    } else {
        timeOfDay = '下午';
    }
    return timeOfDay;
}
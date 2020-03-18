import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'

TimeAgo.addLocale(en);

export function GetTimeAgo(unixDate: number) {
    const timeAgo = new TimeAgo('en-US');
    return timeAgo.format(new Date(1000 * unixDate));
}
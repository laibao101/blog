import moment from "moment/moment";

export default class Time {
    static formatTime(time) {
        moment(Number(time)).format('YYYY-MM-DD HH:mm:ss');
    }
}

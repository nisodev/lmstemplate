import Vue from "vue";
import moment from "moment";

export default function () {
  Vue.filter("DateTimeParse", function (date, format) {
    if (!date) {
      return "";
    }
    let parsed;
    parsed = moment(date).format(format);
    return parsed;
  });
}

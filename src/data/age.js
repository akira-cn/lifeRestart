import {map} from '../functions/util.js';

const evtStartWork = [
  "100003*100",
  "100004*100",
  "100005*100",
  "100006*100",
  "100007*100",
  "100008*100",
  "100009*100",
  "100010*100",
  "100011*100",
  // "100012*99999999", // 智商太低，传销分支
  "100013*300",  // 智商太低，简历无人问津
  "100014*300",  // 智商太低，简历无人问津
  "100015*300",  // 智商太低，简历无人问津
  "100021*100",  // 互联网金融
];

const evtBootCamp = [
  "110001*100",
  "110002*100",
];

// 每年三月份触发
const evtAcceptTask = [
  120007,
  120008,
  120009,
  120010,
  120011,
  120012,
  120013,
  120014,
  120015,
  120016,
];

// 月饼事件，每年九月份触发
const evtMooncake = [
  130000,
  130001,
  130002,
];

// 一些无聊的随机事件
const evtUseless = [
  140001,
  140002,
  140003,
  140004,
  140005,
  140006,
  140007,
  140008,
  140009,
  140010,
];

const ageList = [
  {
    age: 0,
    event: [
      "100001*110",
      "100002*100"
    ]
  }, {
    age: 1,
    event: [
      ...evtStartWork,
    ]
  }, {
    age: 2,
    event: [
      ...evtStartWork,
      ...evtBootCamp,
    ]
  }, {
    age: 3,
    event: [
      ...evtStartWork,
      ...evtBootCamp,
      ...evtAcceptTask
    ]
  }, {
    age: 4,
    event: [
      ...evtStartWork,
      ...evtBootCamp,
      ...evtUseless,
      120001,
      120002,
      120003
    ]
  }, {
    age: 5,
    event: [
      ...evtStartWork,
      ...evtBootCamp,
      ...evtUseless,
      120001,
      120002,
      120003
    ]
  }, {
    age: 6,
    event: [
      ...evtStartWork,
      ...evtBootCamp,
      ...evtUseless,
      120001,
      120002,
      120003
    ]
  }, {
    age: 7,
    event: [
      ...evtStartWork,
      ...evtBootCamp,
      ...evtUseless,
      120001,
      120002,
      120003
    ]
  }, {
    age: 8,
    event: [
      ...evtStartWork,
      ...evtBootCamp,
      ...evtUseless,
      120001,
      120002,
      120003
    ]
  }, {
    age: 9,
    event: [
      ...evtStartWork,
      ...evtBootCamp,
      ...evtUseless,
      120001,
      120002,
      120003,
      130000
    ]
  }, {
    age: 10,
    event: [
      ...evtStartWork,
      ...evtBootCamp,
      ...evtUseless,
      120001,
      120002,
      120003,
    ]
  }, {
    age: 11,
    event: [
      ...evtStartWork,
      ...evtBootCamp,
      ...evtUseless,
      120001,
      120002,
      120003,
    ]
  }, {
    age: 12,
    event: [
      ...evtStartWork,
      ...evtBootCamp,
      ...evtUseless,
      120001,
      120002,
      120003,
    ]
  }, 
  // 第二年
  {
    age: 13,
    event: [
      ...evtStartWork,
      ...evtBootCamp,
      ...evtUseless,
      120001,
      120002,
      120003,
    ]
  }, {
    age: 600,
    event: [
      999999,
      800004
    ]
  }
];

export const age = map(ageList);
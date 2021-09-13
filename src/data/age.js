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
  140011,
  140012,
  140013,
  140014,
  140015,
];

// 颜值事件
const evtCHR = [
  150000,
  150001,
  150002,
  150003,
  150004,
  150005,
  150006,
  150007,
  150008,
  150009,
  150010,
  150011,
  150012,
  150013,
  150014,
  150015,
  150016,
  150017,
  150018,
  150019,
  150020,
  150021,
  150022,
  150023,
  "150024*5",
];

// 家庭事件
const evtFamily = [
  220000,
  220001,
  220002,
  "220003*10000",
  "220004*10000",
  220005,
  220006,
  220007,
  220008,
  "220009*10000",
  "220010*10000", // 休产假
  220015,
  220016,
  220017,
];

// 跳槽事件
const evtJump = [
  230000,
  230001,
  230002,
  230003,
  230004,
  230005,
];

// 工作事件
const evtWork = [
  300000,
  300001,
  300002,
  300003,
  300004,
  300005,
  300006,
  300007,
  300008,
  300009,
];

const evtNormal = [
  ...evtStartWork,
  ...evtBootCamp,
  ...evtUseless,
  ...evtCHR,
  ...evtFamily,
  ...evtJump,
  ...evtWork,
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
      ...evtAcceptTask,
    ]
  }, {
    age: 4,
    event: [
      ...evtNormal,
      120001,
      120002,
      120003
    ]
  }, {
    age: 5,
    event: [
      ...evtNormal,
      120001,
      120002,
      120003
    ]
  }, {
    age: 6,
    event: [
      ...evtNormal,
      120001,
      120002,
      120003
    ]
  }, {
    age: 7,
    event: [
      ...evtNormal,
      120001,
      120002,
      120003
    ]
  }, {
    age: 8,
    event: [
      ...evtNormal,
      120001,
      120002,
      120003
    ]
  }, {
    age: 9,
    event: [
      ...evtNormal,
      ...evtMooncake,
      120001,
      120002,
      120003,
    ]
  }, {
    age: 10,
    event: [
      ...evtNormal,
      120001,
      120002,
      120003,
    ]
  }, {
    age: 11,
    event: [
      ...evtNormal,
      120001,
      120002,
      120003,
    ]
  }, {
    age: 12,
    event: [
      ...evtNormal,
      120001,
      120002,
      120003,
    ]
  }, 
  ...generateEachYear(30),
  // 结束
  {
    age: 600,
    event: [
      999999,
      800004
    ]
  }
];

function generateEachYear(n = 10) {
  const ret = [];
  for(let i = 1; i < n; i++) {
    ret.push(...[
      // 第二年
      {
        age: i * 12 + 1,
        event: [
          ...evtNormal,
          120001,
          120002,
          120003,
        ]
      }, {
        age: i * 12 + 2,
        event: [
          ...evtNormal,
          120001,
          120002,
          120003,
        ]
      },{
        age: i * 12 + 3,
        event: [
          ...evtNormal,
          ...evtAcceptTask,
          120001,
          120002,
          120003,
        ]
      },{
        age: i * 12 + 4,
        event: [
          ...evtNormal,
          120001,
          120002,
          120003,
        ]
      },{
        age: i * 12 + 5,
        event: [
          ...evtNormal,
          120001,
          120002,
          120003,
        ]
      },{
        age: i * 12 + 6,
        event: [
          ...evtNormal,
          120001,
          120002,
          120003,
        ]
      },{
        age: i * 12 + 7,
        event: [
          ...evtNormal,
          120001,
          120002,
          120003,
        ]
      },{
        age: i * 12 + 8,
        event: [
          ...evtNormal,
          120001,
          120002,
          120003,
        ]
      },{
        age: i * 12 + 9,
        event: [
          ...evtNormal,
          ...evtMooncake,
          120001,
          120002,
          120003,
        ]
      },{
        age: i * 12 + 10,
        event: [
          ...evtNormal,
          120001,
          120002,
          120003,
        ]
      },{
        age: i * 12 + 11,
        event: [
          ...evtNormal,
          120001,
          120002,
          120003,
        ]
      },{
        age: i * 12 + 12,
        event: [
          ...evtNormal,
          120001,
          120002,
          120003,
        ]
      },
    ]);
  }
  return ret;
}

export const age = map(ageList);
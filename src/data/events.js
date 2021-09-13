import {map} from '../functions/util.js';

const conAlreadyHaveJob = 'EVT?[100003,100004,100005,100006,100007,100008,100009,100010,100011,100012,100021]';
const conFemale = 'EVT?[100002]'; // 妹纸
const conFemale2 = '(EVT?[100002])|(TLT?[2024])'; // 妹纸和女装大佬
const conMale = 'EVT?[100001]';

const eventList = [
  {
    id: 700000,
    event: "你在好心人的帮助下从传销组织脱身，进了家小公司。",
  },
  {
    id: 700001,
    event: "生活开销有点大，你觉得手头拮据",
    effect: {
      MNY: -1,
    }
  },
  {
    id: 700002,
    event: "你一边打工，一边继续投简历",
    effect: {
      MNY: 1,
    }
  },{
    id: 700003,
    event: "迟迟找不到工作，你觉得有点丧",
    effect: {
      SPR: -2,
    }
  },{
    id: 700004,
    event: "你放弃了，决定去工地搬砖",
    NoRandom: 1,
    effect: {
      LIF: -1,
    },
    branch: [
      "STR<4:800000"
    ]
  },
  {
    id: 800000,
    event: "身体不好，搬砖时出了意外，死了",
    NoRandom: 1,
  },
  {
    id: 800001,
    event: "刚办完入职手续，警察来了，公司涉及非法贷款，所有人都被带走了，包括你。",
    effect: {
      LIF: -1,
    },
    NoRandom: 1,
  },
  {
    id: 900000,
    event: "你不做程序员了，成为一名快递员。",
    effect : {
        LIF: -1
    },
    NoRandom: 1
  }, {
    id: 900001,
    event: "你不做程序员了，成为公务员。",
    effect : {
        LIF: -1
    },
    NoRandom: 1
  }, {
    id: 900002,
    event: "你继承了一大笔遗产，潇洒去了。",
    effect : {
        LIF: -1
    },
    NoRandom: 1
  }, {
    id: 900003,
    event: "你看破红尘，出家了。",
    effect : {
        LIF: -1
    },
    NoRandom: 1
  }, {
    id: 900004,
    event: "你不幸猝死了。",
    effect : {
        LIF: -1
    },
    NoRandom: 1
  }, {
    id: 900005,
    event: "你发现了这个世界的bug，成为了神。",
    effect : {
        LIF: -1
    },
    NoRandom: 1
  }, {
    id: 900006,
    event: "你被公司告了，锒铛入狱。",
    effect : {
        LIF: -1
    },
    NoRandom: 1
  }, {
    id: 900007,
    event: "你被老板买凶杀了。",
    effect : {
        LIF: -1
    },
    NoRandom: 1
  }, {
    id: 900008,
    event: "你在走路的时候不小心摔了一跤，死了。",
    effect : {
        LIF: -1
    },
    NoRandom: 1
  }, {
    id: 900009,
    event: "你不做程序员了，成了一名美颜主播。",
    effect : {
        LIF: -1
    },
    NoRandom: 1
  }, {
    id: 900010,
    event: "你不做程序员了，成为了一名网约车司机。",
    effect : {
        LIF: -1
    },
    NoRandom: 1
  }, {
    id: 900011,
    event: "你发现了这个世界的bug，穿越了，在异世界留下传说。",
    effect : {
        LIF: -1
    },
    NoRandom: 1
  }, {
    id: 100000,
    event: "你离开了程序员这个行业，成为一名快递员。",
    effect : {
        LIF: -1
    },
    NoRandom: 1
  }, {
    id: 100001,
    event: "你毕业了，成为一名程序猿。",
    exclude: "TLT?[1004, 1047]",
    // effect: {
    //   SPR: '1000!',
    // },
    // hook(property) {
    //   console.log(property);
    // }
  }, {
    id: 100002,
    event: "你毕业了，成为一名程序媛。",
    exclude:  "TLT?[1003,2024,1054]",
    // hook(property) {
    //   console.log(property);
    // }
  }, {
    id: 100003,
    event: "你加入了一家preA轮创业公司。",
    postEvent: "开始适应快节奏的工作。",
    include: "SPR>7", // 心态>7 才能加入
    effect: {
        MNY: 0,
    },
    exclude: conAlreadyHaveJob,
  }, {
    id: 100004,
    event: "你加入了一家A轮创业公司。",
    postEvent: "开始适应快节奏的工作。",
    include: "SPR>7", // 心态>7 才能加入
    effect: {
      MNY: 1,
    },
    exclude: conAlreadyHaveJob,
  }, {
    id: 100005,
    event: "你加入了一家B轮创业公司。",
    postEvent: "开始适应快节奏的工作。",
    include: "SPR>6", // 心态>6 才能加入
    effect: {
      MNY: 1,
    },
    exclude: conAlreadyHaveJob,
  }, {
    id: 100006,
    event: "你加入了一家C轮创业公司。",
    postEvent: "开始适应快节奏的工作。",
    include: "(SPR>5)&(INT>4)", // 心态>5，智商>4 才能加入
    effect: {
      MNY: 2,
    },
    exclude: conAlreadyHaveJob,
  }, {
    // 大厂要求高智商
    id: 100007,
    event: "你加入了一家大型互联网公司。",
    postEvent: "开始适应快节奏的工作。",
    include: "INT>5",
    effect: {
      MNY: 3,
    },
    exclude: conAlreadyHaveJob,
  }, {
    // 国企看智商和形象
    id: 100008,
    event: "你加入了一家大型国企。",
    postEvent: "开始工作。",
    include: "(INT>4)&(CHR>4)",
    effect: {
      MNY: 2,
      SPR: 1
    },
    exclude: conAlreadyHaveJob,
  }, {
    id: 100009,
    event: "你加入了一家小公司，给大厂做外包。",
    postEvent: "开始工作。",
    exclude: conAlreadyHaveJob,
  }, {
    id: 100010,
    event: "你加入了一家小公司，给客户定制沙发。",
    postEvent: "开始工作。",
    exclude: conAlreadyHaveJob,
  }, {
    id: 100011,
    event: "你加入了一家私人作坊。",
    postEvent: "开始工作。",
    exclude: conAlreadyHaveJob,
    effect: {
      MNY: -1,
      SPR: -1
    }
  }, {
    id: 100021,
    event: "你加入了一家小公司，做互联网金融。",
    postEvent: "开始工作。",
    exclude: conAlreadyHaveJob,
    effect: {
      MNY: 1,
      SPR: 1
    },
    branch: [
      "(EVT?[100001,100002])&(LCK<-3):800001"
    ]
  }, {
    // 智商太低会被骗入传销组织
    id: 100012,
    event: "你被骗入了传销组织。",
    postEvent: "开始工作。",
    effect: {
      MNY: -1,
      SPR: -1,
    },
    exclude: `(INT>3)|${conAlreadyHaveJob}`,
    branch: [
      "EVT?[100001,100002]:700000"
    ]
  }, {
    // 智商太低，无人问津
    id: 100013,
    event: "你投了简历，但是无人问津",
    exclude:  `(INT>3)|(${conAlreadyHaveJob})`,
    branch: [
      "(NMY<-3|SPR<0):700004",
      "EVT?[100001,100002]:700001",
    ]
  }, {
    // 智商太低，无人问津
    id: 100014,
    event: "你投了简历，但是无人问津",
    exclude:  `(INT>3)|(${conAlreadyHaveJob})`,
    branch: [
      "(NMY<-3|SPR<0):700004",
      "EVT?[100001,100002]:700002",
    ]
  }, {
    // 智商太低，无人问津
    id: 100015,
    event: "你投了简历，但是无人问津",
    exclude:  `(INT>3)|(${conAlreadyHaveJob})`,
    branch: [
      "(NMY<-3|SPR<0):700004",
      "EVT?[100001,100002]:700003",
    ]
  }, {
    id: 800004,
    event: "这是测试结局，不是真实结局！",
    effect: {
        MNY: -1,
        SPR: -1
    },
    branch: [
        "EVT?[100001,100002]:900000"
    ]
  }, {
    id: 999999,
    event: "工作强度太大，猝死了。",
    exclude: "STR>6",
    effect : {
        LIF: -1
    },
    NoRandom: 1
  }, {
    id: 110001,
    event: "你接受了新员工培训。",
    exclude: "EVT?[110001,110002]",
    include: conAlreadyHaveJob,
  }, {
    id: 110002,
    event: "你接受了新员工培训。",
    postEvent: "学会了新的技能。",
    effect : {
        INT: 1
    },
    exclude: "EVT?[110001,110002]",
    include: `(INT>4)&${conAlreadyHaveJob}`,
  }, {
    id: 120001,
    event: "LD欣赏你的能力，给你涨了点工资。",
    effect : {
        MNY: 1
    },
    include: "INT>5",
    exclude: "EVT?[100006, 100007, 100008]" // 大厂不会随便给人涨工资
  }, {
    id: 120002,
    event: "你努力工作"
  }, {
    id: 120003,
    event: "注册了稀土掘金社区账号。",
    postEvent: "学习掘金文章，能力提升了。",
    effect : {
      INT: 1
    },
    exclude: "EVT?[120003]"
  }, {
    id: 120004,
    event: "总结工作经验，你的能力提升了。",
    effect: {
      INT: 1,
    },
    exclude: "INT>5",
  }, {
    id: 120005,
    event: "你接了一个紧急需求，连续加班一个月。",
    effect: {
      STR: -1,
    },
  }, {
    id: 120006,
    event: "最近工作压力太大，你觉得自己的学习跟不上。",
    effect: {
      INT: -1,
    },
  }, {
    id: 120007,
    event: "你接到任务，开发一个叫慢手的产品。"
  }, {
    id: 120008,
    event: "你接到任务，开发一个叫抖乐的产品。"
  }, {
    id: 120009,
    event: "你接到任务，开发一个叫小信的产品。"
  }, {
    id: 120010,
    event: "你接到任务，开发一个叫有啊的电商网站。"
  }, {
    id: 120011,
    event: "你接到任务，开发一个叫并汐汐的产品。"
  }, {
    id: 120012,
    event: "你接到任务，开发一个叫冬瓜视频的产品。"
  }, {
    id: 120013,
    event: "你接到任务，开发一个叫扣扣的聊天工具。"
  }, {
    id: 120014,
    event: "你接到任务，开发一个叫三体的游戏。"
  }, {
    id: 120015,
    event: "你接到任务，开发一个叫哒哒的打车软件。"
  }, {
    id: 120016,
    event: "你接到任务，开发一个叫嘿嘿的匿名社交软件。"
  }, {
    id: 130000,
    event: "中秋节到了，你用代码抢了两盒月饼。",
    effect : {
        MNY: 1
    },
    include: "INT>6",
    branch: [
        "CHR<7:130001",
        "CHR>6:130002"
    ]
  }, {
    id: 130001,
    event: "你因为抢月饼，被开除了。",
    effect : {
        LIF: -1
    }
  }, {
    id: 130002,
    event: "公司决定要开除你，但因为你长得好看，被保下来了。"
  }, 
  // ----------- 一些比较无聊的事件 --------------
  {
    id: 140001,
    event: "新买的桶丢了。"
  }, {
    id: 140002,
    event: "你左眼不停地跳，觉得可能有财运降临。",
    effect: {
      LCK: 1
    }
  }, {
    id: 140003,
    event: "你右眼不停地跳，最近可能得小心一些。",
    effect: {
      LCK: -1,
    }
  }, {
    id: 140004,
    event: "你觉得有点无聊。",
  }, {
    id: 140005,
    event: "你买了一辆自行车。",
  }, {
    id: 140006,
    event: "你买了一条毛巾。",
  }, {
    id: 140007,
    event: "国家宣布加强个人隐私保护。",
    exclude: "EVT?[140007]",
  }, {
    id: 140008,
    event: "你听说新来的菜狗同事比你总包多5W。",
    effect: {
      SPR: -1
    }
  }, {
    id: 140009,
    event: "这个月一直下雨，你考虑买一条独木船。",
  }, {
    id: 140010,
    event: "月末了，没什么事，今天摸鱼。",
  }, {
    id: 140011,
    event: "需求延期了，但没什么关系，因为产品妹子离职了。",
  }, {
    id: 140012,
    event: "这个月经常上班迟到，被LD批评了好几次。",
    effect: {
      SPR: -1
    }
  }, {
    id: 140013,
    event: "你觉得LD似乎很看中你。",
    effect: {
      SPR: 1
    }
  }, {
    id: 140014,
    event: "大家都很喜欢你，除了一个人，你的LD",
  }, {
    id: 140015,
    event: "你写的一个bug导致一个小的线上问题，幸好及时解决了",
  }, 
  // --------- 颜值事件 ----------------------
  {
    id: 150000,
    event: "你由于高颜值，在公司成为万众瞩目的焦点",
    include: "CHR>6",
    effect: {
      SPR: 1,
    }
  }, {
    id: 150001,
    event: "你今天精心画了一个仙女妆，心情超好。",
    include: `(CHR>6)&(${conFemale2})`,
    branch: [
      "TLT?[2024]:151000"
    ],
    effect: {
      SPR: 1,
    }
  },
  {
    id: 151000,
    event: "身边的同事惊呆了。"
  },
  {
    id: 150002,
    event: "你的颜值让同性都忍不住多看几眼。",
    include: "CHR>7",
  }, {
    id: 150003,
    event: "你的同事夸你妆容好看。",
    include: `(CHR>5)&(${conFemale2})`,
  }, {
    id: 150004,
    event: "越来越多的同事把你当做女生来对待。",
    include: `(CHR>5)&(TLT?[2024])`,
  }, {
    id: 150005,
    event: "你身边的同事怀疑并私下讨论你的真实性别。",
    include: `(CHR>6)&(TLT?[2024])`,
  }, {
    id: 150006,
    event: "你身边的同事打赌你其实是女扮男装，赔率已经接近1比100。",
    include: `(CHR>7)&(TLT?[2024])`,
  }, {
    id: 150007,
    event: "有男同事频频对你献殷勤。",
    include: `(CHR>7)&(TLT?[2024])`,
  }, {
    id: 150008,
    event: "你的化妆技术越来越好了",
    include: conFemale2,
    exclude: "CHR>7",
    effect: {
      CHR: 1,
    }
  }, {
    id: 150009,
    event: "你开始兼职做颜值主播",
    include: "CHR>6",
  }, {
    id: 150010,
    event: "你做颜值主播粉丝增长迅速",
    include: "(CHR>7)&(EVT?[150009])",
  }, {
    id: 150011,
    event: "你觉得自己越来越喜欢颜值主播这个行业",
    include: "(CHR>7)&(EVT?[150009])",
    effect: {
      SPR: 1,
    }
  }, {
    id: 150012,
    event: "你是平台当红主播，粉丝打赏收入超过你的薪水",
    include: "(CHR>8)&(EVT?[150009])",
    effect: {
      MNY: 2,
    }
  }, {
    id: 150013,
    event: "你觉得自己更适合做主播，决定转行全职做主播",
    include: "(CHR>8)&(INT<5)&(EVT?[150012])",
    branch: [
      "EVT?[150012]: 900009"
    ]
  }, {
    id: 150014,
    event: "有女同事频频对你献殷勤。",
    include: `(CHR>7)&${conMale}`,
  }, {
    id: 150015,
    event: "你去整容，颜值进一步提升",
    include: "(CHR>5)&(MNY>5)",
    effect: {
      CHR: 1
    }
  }, {
    id: 150016,
    event: "你画了一个桃花妆，美美哒",
    include: `(CHR>4)&(${conFemale2})`,
  }, {
    id: 150017,
    event: "你画了一个嫦娥妆，美美哒",
    include: `(CHR>4)&(${conFemale2})`,
  }, {
    id: 150018,
    event: "因为长期穿高跟鞋，你的脚踝受了伤",
    include: `(CHR>4)&(${conFemale2})`,
    exclude: "EVT?[150018]",
    effect: {
      STR: -1,
    }
  },
  // ---- 智商事件 -----

  // ---- 收入事件 -----

  // ---- 健康事件 -----

  // ---- 心态事件 -----

  // -------- 婚姻，爱情 ----------------------
  {
    id: 220000,
    event: "你结婚了，有了自己的家庭。", 
    include: "AGE<25",
    exclude: "EVT?[220000]",
  }, {
    id: 220001,
    event: "你的妻子告诉你她怀孕了。",
    include: "(EVT?[100001])&(EVT?[220000])",
    exclude: "(PRG>0)|(PRG<0)|(EVT?[220001])",
    effect: {
      PRG: 1
    }
  }, {
    id: 220002,
    event: "你发现自己怀孕了。",
    include: "(EVT?[100002])&(EVT?[220000])",
    exclude: "(PRG>0)|(PRG<0)|(EVT?[220002])",
    effect: {
      PRG: 1
    }
  }, {
    id: 220003,
    event: "你的女儿出生了。",
    include: "(EVT?[220000])&(PRG>9)",
    exclude: "EVT?[220003, 220004]",
    effect: {
      PRG: "-2!",
      SPR: 1,
    }
  }, {
    id: 220004,
    event: "你的儿子出生了。",
    include: "(EVT?[220000])&(PRG>9)",
    exclude: "EVT?[220003, 220004]",
    effect: {
      PRG: "-2!",
      SPR: 1,
    }
  }, {
    id: 220005,
    event: "因为怀孕，你觉得有点累。",
    include: "(EVT?[100002])&(PRG>0)",
    effect: {
      STR: -1,
    }
  }, {
    id: 220006,
    event: "因为怀孕心情不好，你和另一半吵架了。",
    include: "(EVT?[100002])&(PRG>0)",
    effect: {
      SPR: -1,
    }
  }, {
    id: 220007,
    event: "因为怀孕，胃口有点差。",
    include: "(EVT?[100002])&(PRG>0)",
    effect: {
      STR: -1,
    }
  }, {
    id: 220008,
    event: "想到小生命即将出生，你觉得自己充满干劲。",
    include: "PRG>0",
    effect: {
      SPR: 1,
    }
  }, {
    id: 220009,
    event: "你向公司申请了产假。",
    include: "PRG=8",
    effect: {
      SPR: 1,
    }
  }, {
    id: 220010,
    event: "休产假中...",
    include: "(PRG>8)|(PRG<0)",
    effect: {
      SPR: 1,
    },
    branch: [
      "LCK<0:221000"
    ]
  },
  {
    id: 220015,
    event: "工作不顺，你的家庭矛盾不断。",
    include: "(EVT?[220000])&(SPR<4)",
    effect: {
      SPR: -1
    }
  },{
    id: 220016,
    event: "你的另一半很爱你，你觉得很幸福。",
    include: "(EVT?[220000])&(SPR>5)",
    effect: {
      SPR: 1
    }
  },{
    id: 220017,
    event: "你的另一半非常尊重你，家里的大小事情都让你做主。",
    include: "(EVT?[220000])&(INT>5)",
  },
  {
    id: 221000,
    event: "你听说同事接手了原本你负责的比较重要的工作。",
    effect: {
      SPR: -1
    }
  }
];

export const events = map(eventList);
import {map} from '../functions/util.js';

const conAlreadyHaveJob = 'EVT?[100003,100004,100005,100006,100007,100008,100009,100010,100011,100012,100021]';
const conFemale = 'EVT?[100002,150023, 510004]'; // 妹纸
const conFemale2 = 'EVT?[100002,150023, 510004, 150024]'; // 妹纸和女装大佬
const conMale = 'EVT?[100001]';
const conMale2 = 'EVT?[100001, 150024]';

const conWorkInGQ = 'EVT?[100008,231001,241001]'; // 国企
const conWorkInGrant = 'EVT?[100007,231000,231004,241001,241004]';  // 大厂
const conWorkInGood = 'EVT?[100005,100006,231002,231003,241002,241003]'; // 小厂
const conWorkINSmall = 'EVT?[100003,100004,100009,100010,100021,700000,231005,241005]'; // 小小厂

// 跳槽分支
const jump1 = [
  "LCK>7:241000",
  "LCK>5:241001",
  "LCK>3:241002",
  "(INT>5)&(LCK>0):241009", // 老板挽留
  "LCK>0:241003", // 不加薪
  "LCK>-3:241004",  // 降薪
  "LCK>-5:241005",  // 降薪
  "(INT<4)&(LCK>-7):241006",  // 降薪
  "(INT<4)&(LCK<-6):241007", // 找不到工作
  "LCK<-4:241008",  // 不跳槽
];

const jump2 = [
  "LCK>7:231000",
  "LCK>5:231001",
  "LCK>3:231002",
  "(INT>5)&(LCK>0):231009", // 老板挽留
  "LCK>0:231003",
  "LCK>-3:231004",
  "LCK>-5:231005",
  "(INT<4)(LCK>-7):231006",  // 降薪
  "(INT<4)&(LCK<-6):231007", // 找不到工作
  "LCK<-4:241008",  // 不跳槽
];

// 结局分支
const gameOver = [
  "STR<-3:900008", // 猝死
  "SPR<-3:900011", // 抑郁自杀
  "(CHR>6)&(MNY<-7):900016", // 举债结局2
  "MNY<-3:900015", // 举债结局
  "(EVT?[150024])&(EVT?[150023]):900006", // 女装大佬真爱结局
  "(EVT?[150024])&(EVT?[150020]):900007", // 女装大佬真爱结局2
  "(MNY>7)&(LCK>5)&(SPR>5):900002", // 意外继承了一大笔遗产
  "(MNY>7)&(LCK>5):900003", // 意外继承了一大笔遗产2
  `(CHR>10)&(${conFemale}):900013`, // 霸道总裁结局1
  `(CHR>10)&(EVT?[150024]}):900014`, // 霸道总裁结局2
  "(CHR>7)&(EVT?[150009]):900005", //主播结局
  "(CHR>7):900012", // 明星结局
  "(MNY>7)&(CHR>5):900004", // 演艺圈结局
  "INT>9:900009", // 博士结局
  "INT>7:900010", // 老师结局
  "STR<0:900001", // 工地搬砖累死
  "LCK<1000:900000", // 普通结局，去工地搬砖
];

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
    event: "为了生活，你去工地搬砖了。",
    effect : {
        LIF: -1
    },
    NoRandom: 1
  }, {
    id: 900001,
    event: "为了生活，你在工地搬砖，但是身体不好，出意外死了。",
    effect : {
        LIF: -1
    },
    NoRandom: 1
  }, {
    id: 900002,
    event: "你意外继承了一大笔遗产，潇洒去了。",
    effect : {
        LIF: -1
    },
    NoRandom: 1
  }, {
    id: 900003,
    event: "你意外继承了一大笔遗产，收购了公司，天天PUA你原来的LD。",
    effect : {
        LIF: -1
    },
    NoRandom: 1
  }, {
    id: 900004,
    event: "你离职后用钱整容，进军演艺界，成为了三线明星。",
    effect : {
        LIF: -1
    },
    NoRandom: 1
  }, {
    id: 900005,
    event: "你离职后，继续做主播，成为了著名网红。",
    effect : {
        LIF: -1
    },
    NoRandom: 1
  }, {
    id: 900006,
    event: "你辞去工作，陪伴着深爱的他，一边做美妆主播，一边做家庭主妇。",
    effect : {
        LIF: -1
    },
    NoRandom: 1
  }, {
    id: 900007,
    event: "你离职后，为了爱情，义无反顾地去了泰国，成为真正的女人，嫁给了他，婚后过上了幸福的生活。",
    effect : {
        LIF: -1
    },
    NoRandom: 1
  }, {
    id: 900008,
    event: "还没等离职流程走完，就猝死在了公司。",
    effect : {
        LIF: -1
    },
    NoRandom: 1
  }, {
    id: 900009,
    event: "你回学校去继续深造，攻读了博士学位，成为了科学家。",
    effect : {
        LIF: -1
    },
    NoRandom: 1
  }, {
    id: 900010,
    event: "家里人托关系，介绍你去一所民办学校当了老师。",
    effect : {
        LIF: -1
    },
    NoRandom: 1
  }, {
    id: 900011,
    event: "离开公司，你挣扎了几个月，抑郁症越来越严重，自杀了。",
    effect : {
        LIF: -1
    },
    NoRandom: 1
  }, {
    id: 900012,
    event: "你凭借着高颜值，通过明星选秀，成为了影视明星。",
    effect : {
        LIF: -1
    },
    NoRandom: 1
  }, {
    id: 900013,
    event: "你的颜值实在太高了，一位霸道总裁看上你，在他猛烈追求下，你最终以身相许。",
    effect : {
        LIF: -1
    },
    NoRandom: 1
  },{
    id: 900014,
    event: "你的颜值实在太高了，一位霸道总裁看上你，在他猛烈追求下，你做了手术，最终以身相许。",
    effect : {
        LIF: -1
    },
    NoRandom: 1
  }, {
    id: 900015,
    event: "你欠了一堆外债，只能去给债主打工偿还。",
    effect : {
      LIF: -1
    },
    NoRandom: 1
  }, {
    id: 900016,
    event: "你欠下了这辈子都还不起的外债，只能靠颜值肉偿了。",
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
        ENV: "2!",
    },
    exclude: conAlreadyHaveJob,
  }, {
    id: 100004,
    event: "你加入了一家A轮创业公司。",
    postEvent: "开始适应快节奏的工作。",
    include: "SPR>7", // 心态>7 才能加入
    effect: {
      MNY: 1,
      ENV: "2!",
    },
    exclude: conAlreadyHaveJob,
  }, {
    id: 100005,
    event: "你加入了一家B轮创业公司。",
    postEvent: "开始适应快节奏的工作。",
    include: "SPR>6", // 心态>6 才能加入
    effect: {
      MNY: 1,
      ENV: "3!",
    },
    exclude: conAlreadyHaveJob,
  }, {
    id: 100006,
    event: "你加入了一家C轮创业公司。",
    postEvent: "开始适应快节奏的工作。",
    include: "(SPR>5)&(INT>4)", // 心态>5，智商>4 才能加入
    effect: {
      MNY: 2,
      ENV: "3!",
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
      ENV: "4!",
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
      SPR: 1,
      ENV: "5!",
    },
    exclude: conAlreadyHaveJob,
  }, {
    id: 100009,
    event: "你加入了一家小公司，给大厂做外包。",
    postEvent: "开始工作。",
    exclude: conAlreadyHaveJob,
    effect: {
      ENV: "1!",
    }
  }, {
    id: 100010,
    event: "你加入了一家小公司，给客户定制沙发。",
    postEvent: "开始工作。",
    exclude: conAlreadyHaveJob,
    effect: {
      ENV: "1!",
    }
  }, {
    id: 100011,
    event: "你加入了一家私人作坊。",
    postEvent: "开始工作。",
    exclude: conAlreadyHaveJob,
    effect: {
      MNY: -1,
      SPR: -1,
      ENV: "1!",
    }
  }, {
    id: 100021,
    event: "你加入了一家小公司，做互联网金融。",
    postEvent: "开始工作。",
    exclude: conAlreadyHaveJob,
    effect: {
      MNY: 1,
      SPR: 1,
      ENV: "1!",
    },
    branch: [
      "LCK<-5:800001"
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
    branch: gameOver
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
    exclude: "(ENV>2)|(LCK<1)" // 大厂不会随便给人涨工资
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
    // 特殊结局，抢月饼
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
      BLCK: 1
    }
  }, {
    id: 140003,
    event: "你右眼不停地跳，最近可能得小心一些。",
    effect: {
      BLCK: -1,
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
  }, {
    id: 150001,
    event: "你今天精心画了一个仙女妆，心情超好。",
    include: `(CHR>6)&(${conFemale2})`,
    exclude: 'EVT?[150001]',
    branch: [
      "EVT?[150024]:153000"
    ],
    effect: {
      SPR: 1,
    }
  },
  {
    id: 153000,
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
    include: `(CHR>5)&(EVT?[150024])`,
    exclude: 'EVT?[150023]'
  }, {
    id: 150005,
    event: "你身边的同事怀疑并私下讨论你的真实性别。",
    include: `(CHR>6)&(EVT?[150024])`,
    exclude: 'EVT?[150023]'
  }, {
    id: 150006,
    event: "你身边的同事打赌你其实是女扮男装，赔率已经接近1比100。",
    include: `(CHR>7)&(EVT?[150024])`,
    exclude: 'EVT?[150023]'
  }, {
    id: 150007,
    event: "有男同事频频对你献殷勤。",
    include: `(CHR>7)&(EVT?[150024,100002])`,
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
    exclude: "EVT?[150009]"
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
    exclude: "EVT?[150012]",
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
    exclude: 'EVT?[150023]'
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
    event: "因为你的高跟鞋磨脚，脚踝受了伤",
    include: `(CHR>4)&(${conFemale2})`,
    exclude: "EVT?[150018]",
    effect: {
      STR: -1,
    }
  },
  {
    id: 150019,
    event: "一位风度翩翩，家境优越的男子向你发起猛烈追求。",
    include: `(CHR>4)&(${conFemale2})`,
    exclude: "EVT?[150019, 510004]",
    branch: [
      "LCK>5:151002",
      "LCK>0:151001",
      "LCK<1:151000",
    ],
    // hook(prop) {
    //   console.log('>', prop.get('LCK'));
    // }
  },
  {
    id: 150020,
    event: "经过一段时间的交往，你和他的感情加深了。",
    include: "EVT?[151002]",
    exclude: "EVT?[150020,220000]",
  },
  {
    id: 150021,
    event: "你爱他已经爱得轰轰烈烈，难舍难分。",
    include: "EVT?[150020]",
    exclude: "EVT?[150021,220000]",
  },
  {
    id: 150022,
    event: "为了爱情，你犹豫着要不要做一个大胆的决定。",
    include: "(EVT?[150024])&(EVT?[150021])",
    exclude: "EVT?[150022,220000]",
  },
  {
    id: 150023,
    event: "你终于义无反顾，去了泰国，成为完整的女人，嫁给了爱你的那个人。",
    postEvent: "你的几个好闺蜜支持你做出这个决定。",
    include: "(EVT?[150024])&(EVT?[150022])",
    exclude: "EVT?[150023,220000]",
  },
  {
    id: 151000,
    event: "不是你喜欢的类型，你婉拒了他。"
  },
  {
    id: 151001,
    event: "你有点心动，但还是拒绝了他。"
  },
  {
    id: 151002,
    event: "你有点小窃喜，打算交往一段时间看看。"
  },
  {
    id: 150024,
    event: "你决定出柜，日常穿女装上班。",
    include: "(CHR>5)&(TLT?[2024])",
    exclude: "EVT?[150024]",
    effect: {
      SPR: 1,
    }
  },
  // ---- 智商事件 -----
  {
    id: 160000,
    event: "你的工作能力让同事感到敬佩。",
    exclude: "EVT?[160000]",
    include: "INT>6",
  },

  // ---- 收入事件 -----

  // ---- 健康事件 -----

  // ---- 心态事件 -----

  // -------- 婚姻，爱情 ----------------------
  {
    id: 220000,
    event: "你结婚了，有了自己的家庭。", 
    exclude: "EVT?[220000,150021]",
  }, {
    id: 220001,
    event: "你的妻子告诉你她怀孕了。",
    include: "(EVT?[100001])&(EVT?[220000])",
    exclude: "(PRG>0)|(PRG<0)|(EVT?[220001])|(EVT?[150023])",
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
    include: "(EVT?[100002])&(PRG=8)",
  }, {
    id: 220010,
    event: "休产假中...",
    include: "(EVT?[100002])&(PRG>8|PRG<0)",
    exclude: "PRG>9",
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
    exclude: "EVT?[221000]",
    effect: {
      SPR: -1
    }
  },
  // 跳槽 && 结局
  {
    id: 230000,
    event: "你觉得在这家公司干得实在太累了，打算跳槽。",
    include: "(WRK>3)&(STR<3)",
    branch: jump2,
  },
  {
    id: 230001,
    event: "你觉得在这家公司干得不开心，打算跳槽。",
    include: "(WRK>3)&(SPR<3)",
    branch: jump1,
  },
  {
    id: 230002,
    event: "你入不敷出，干不下去了。",
    include: "(WRK>3)&(MNY<-3)",
    branch: gameOver,
  },
  {
    id: 230003,
    event: "你的身体实在受不了，干不下去了。",
    include: "(WRK>3)&(STR<-3)",
    branch: gameOver,
  },
  {
    id: 230004,
    event: "你精神抑郁，不想干了。",
    include: "(WRK>3)&(SPR<-3)",
    branch: gameOver,
  },
  {
    id: 230005,
    event: "你在这家公司呆久了，觉得无聊，准备跳槽。",
    include: "WRK>30",
    branch: jump1,
  },
  {
    id: 230006,
    event: "你的颜值实在太逆天了，这家公司已经承受不起。",
    include: "(WRK>30)&(CHR>12)",
    branch: jump1,
  },
  {
    id: 231000,
    event: "你换到一家大公司，涨了薪水，也不那么累了。",
    effect: {
      STR: 2,
      MNY: 1,
      WRK: "0!",
      ENV: "3!",
      JMP: 1,
    }
  }, {
    id: 231001,
    event: "你换到一家国企，钱虽然少了，但轻松了不少。",
    effect: {
      STR: 3,
      MNY: -1,
      WRK: "0!",
      ENV: "5!",
      JMP: 1,
    }
  }, {
    id: 231002,
    event: "你换到一家C轮公司，涨了一点薪水。",
    effect: {
      STR: 1,
      MNY: 1,
      WRK: "0!",
      ENV: "3!",
      JMP: 1,
    }
  }, {
    id: 231003,
    event: "你换到一家B轮公司，薪水基本没涨。",
    effect: {
      STR: 1,
      WRK: "0!",
      ENV: "2!",
      JMP: 1,
    }
  }, {
    id: 231004,
    event: "为了发展，你降薪去了一家大公司。",
    effect: {
      STR: 1,
      MNY: -1,
      WRK: "0!",
      ENV: "3!",
      JMP: 1,
    }
  }, {
    id: 231005,
    event: "你发现工作没那么好找，你被迫降薪去了一家小公司。",
    effect: {
      STR: 1,
      MNY: -2,
      WRK: "0!",
      ENV: "1!",
      JMP: 1,
    }
  }, {
    id: 231006,
    event: "你没找到满意的工作，只好又回到原公司，还被降薪了。",
    effect: {
      STR: 1,
      MNY: -2,
      WRK: "0!",
      JMP: 1,
    }
  }, {
    id: 231007,
    event: "你找不到工作，原公司也不要你，无奈离开了软件行业。",
    branch: gameOver,
  },{
    id: 231008,
    event: "你没找到新工作，放弃跳槽。",
  }, {
    id: 231009,
    event: "听说你在找工作，老板给你加薪，挽留了你。",
    effect: {
      STR: 1,
      MNY: 1,
    }
  },
  {
    id: 241000,
    event: "你换到一家大公司，涨了薪水，也不那么累了。",
    effect: {
      SPR: 2,
      MNY: 1,
      WRK: "0!",
      ENV: "4!",
      JMP: 1,
    }
  }, {
    id: 241001,
    event: "你换到一家国企，钱虽然少了，但轻松了不少。",
    effect: {
      SPR: 3,
      MNY: -1,
      WRK: "0!",
      ENV: "5!",
      JMP: 1,
    }
  }, {
    id: 241002,
    event: "你换到一家C轮公司，涨了一点薪水。",
    effect: {
      SPR: 1,
      MNY: 1,
      WRK: "0!",
      ENV: "3!",
      JMP: 1,
    }
  }, {
    id: 241003,
    event: "你换到一家B轮公司，薪水基本没涨。",
    effect: {
      SPR: 1,
      WRK: "0!",
      ENV: "2!",
      JMP: 1,
    }
  }, {
    id: 241004,
    event: "为了发展，你降薪去了一家大公司。",
    effect: {
      SPR: 1,
      MNY: -1,
      WRK: "0!",
      ENV: "3!",
      JMP: 1,
    }
  }, {
    id: 241005,
    event: "你发现工作没那么好找，你被迫降薪去了一家小公司。",
    effect: {
      SPR: 1,
      MNY: -2,
      WRK: "0!",
      ENV: "1!",
      JMP: 1,
    }
  }, {
    id: 241006,
    event: "你没找到满意的工作，只好又回到原公司，还被降薪了。",
    effect: {
      SPR: 1,
      MNY: -2,
      WRK: "0!",
      JMP: 1,
    }
  }, {
    id: 241007,
    event: "你找不到工作，原公司也不要你，无奈离开了软件行业。",
    branch: gameOver
  }, {
    id: 241008,
    event: "你没找到新工作，放弃跳槽。",
  }, {
    id: 241009,
    event: "听说你在找工作，老板给你加薪，挽留了你。",
    effect: {
      SPR: 1,
      MNY: 1,
    }
  },
  // --------------- 工作相关 ---------------
  {
    id: 300000,
    event: "LD通知你周六加班。",
    exclude: "ENV=5",
    effect: {
      SPR: -1,
    }
  }, {
    id: 300001,
    event: "连续通宵了三个晚上，身体有些吃不消。",
    exclude: "ENV=5",
    effect: {
      STR: -1,
    }
  }, {
    id: 300002,
    event: "工作之余去健身。",
    exclude: "ENV=1",
    effect: {
      STR: 1,
    }
  }, {
    id: 300003,
    event: "LD组织团建，去做了全套SPA。",
    exclude: "ENV=1",
    effect: {
      SPR: 1,
    }
  }, {
    id: 300004,
    event: "公司里有许多好看的妹纸，每天工作心情愉悦。",
    effect: {
      SPR: 1,
    }
  }, {
    id: 300005,
    event: "和PM大吵了一架。",
    effect: {
      SPR: -1,
    }
  },  {
    id: 300006,
    event: "新需求的文档乱得很，看得你头昏脑胀。",
    exclude: "ENV>3",
    effect: {
      SPR: -1,
    }
  }, {
    id: 300007,
    event: "这周要集体加班，你推掉了周末的约会。",
    exclude: "ENV=5",
    effect: {
      SPR: -1,
    }
  }, {
    id: 300008,
    event: "你写出了一个严重bug，被扣掉了一部分奖金。",
    effect: {
      MNY: -1,
    }
  }, {
    id: 300009,
    event: "这个月项目完成得不错，LD给了你额外奖金。",
    effect: {
      MNY: 1,
    }
  }, {
    id: 300010,
    event: "你写错了一个逻辑分支，歪打正着解决了一个陈年的bug。",
    effect: {
      SPR: 1,
    }
  }, {
    id: 300011,
    event: "每天有开不完的会，你觉得很烦。",
    include: "ENV>3",
    effect: {
      SPR: -1,
    }
  }, {
    id: 300012,
    event: "你的LD没什么本事，却经常PUA你。",
    effect: {
      SPR: -1,
    }
  }, {
    id: 300013,
    event: "你觉得在这家公司里学不到什么东西了。",
    include: "WRK>15",
    effect: {
      SPR: -1,
    }
  },

  // 健康、头发量
  {
    id: 500000,
    event: "你拼命工作，经常觉得睡眠不足。",
    exclude: "(ENV=5)|(EVT?[510001])",
    include: "AGE>12",
    branch: [
      `(${conMale2})&(LCK<3)&(AGE>18)&(EVT?[510000]):510001`,
      `(${conFemale2})&(LCK<-5)&(AGE>18)&(EVT?[510000]):510001`,
      `(${conMale2})&(LCK<3)&(AGE>18):510000`,
      `(${conFemale2})&(LCK<-5)&(AGE>18):510000`, // 女性掉发的情况少一些
    ]
  },
  {
    id: 510000,
    event: "你的发际线越来越高，颜值不再。",
    effect: {
      CHR: -1,
    }
  },
  {
    id: 510001,
    event: "你的头发越来越少了",
    effect: {
      CHR: -1
    }
  },
  {
    id: 500001,
    event: "你花大笔钱去植发，以拯救有点绷不住的颜值。",
    include: "(EVT?[510001])&(MNY>4)",
    exclude: "EVT?[500002]",
    effect: {
      CHR: 1,
      MNY: -2,
    }
  }, {
    id: 500002,
    event: "你谢顶了。",
    include: "EVT?[510001]",
    exclude: "(TLT?[1017])|(EVT?[500002])",
    effect: {
      CHR: -2,
    },
    branch: [
      `${conFemale2}:510002`,
    ]
  },
  {
    id: 510002,
    event: "不得不戴假发上班。",
    effect: {
      SPR: -1,
      CHR: 1,
    }
  }, {
    id: 500003,
    event: "自媒体的砖家说，服用雌激素可以增加发量。",
    include: "EVT?[500002]",
    exclude: "EVT?[500003]",
    branch: [
      `(INT<5)&(${conFemale2}):510003`
    ]
  },
  {
    id: 510003,
    event: "你决定试一试效果。",
  },
  {
    id: 500004,
    event: "雌激素果然有效果。",
    postEvent: "你加大了药量。",
    include: "EVT?[510003]",
    exclude: "EVT?[500004]",
    effect: {
      CHR: 1,
    }
  }, {
    id: 500005,
    event: "外来激素破坏了身体的内分泌平衡。",
    postEvent: "你觉得自己身体越来越差。",
    include: "EVT?[500004]",
    exclude: "EVT?[500005]",
    effect: {
      STR: -2,
    },
    branch: [
      `EVT?[150024]:510004`
    ]
  },
  {
    id: 510004,
    event: "医生说激素破坏了你的男性功能，建议你做手术。",
    postEvent: "你无奈做了性别纠正手术，成为了女性。",
  },
  // 周年 
  {
    id: 600000,
    event: "今天是你入职一周年，周围同事向你表示了祝贺。",
    exclude: "ENV<2",
    include: "WRK=13",
  },
  {
    id: 600001,
    event: "今天是你入职两周年，周围同事向你表示了祝贺。",
    exclude: "ENV<2",
    include: "WRK=25",
  },
  {
    id: 600002,
    event: "今天是你入职三周年，公司为你准备了一份礼物。",
    exclude: "ENV<2",
    include: "WRK=37",
    effect: {
      SPR: 1,
    }
  },
  {
    id: 600003,
    event: "今天是你入职四周年，公司为你准备了一份礼物。",
    exclude: "ENV<2",
    include: "WRK=49",
  },
  {
    id: 600004,
    event: "今天是你入职五周年，公司为你准备了一份礼物。",
    exclude: "ENV<2",
    include: "WRK=61",
  },
  // 晋升

  // 工资、经济
  {
    id: 400000,
    event: "公司普调，给你涨了一点薪水。",
    exclude: "(WRK<6)|(ENV<3)",
    branch: [
      "LCK>6:410006",
      "LCK>3:410001",
      "LCK>1:410002",
      "LCK>-1:410003",
      "LCK>-4:410004",
      "LCK<-3:410005",
    ],
  }, {
    id: 400001,
    event: "你今年的绩效不错，公司给你涨了许多薪水。",
    exclude: "(WRK<6)|(ENV<3)|(INT<4)",
    effect: {
      MNY: 2,
    },
  }, {
    id: 400002,
    event: "你今年的绩效不理想，但是公司还是你涨了一点薪水。",
    exclude: "(WRK<6)|(ENV<3)",
    branch: [
      "LCK>6:410006",
      "LCK>3:410001",
      "LCK>1:410002",
      "LCK>-1:410003",
      "LCK>-4:410004",
      "LCK<-3:410005",
    ],
  }, {
    id: 400003,
    event: "你今年的绩效不理想，公司没有给你涨薪水。",
    exclude: "(WRK<6)|(ENV<3)",
  },
  {
    id: 410001,
    event: "你的房东把房租提高了，基本上等于没涨。",
  },
  {
    id: 410002,
    event: "扣完税，基本上等于没涨。",
  },
  {
    id: 410003,
    event: "但你养了一只猫，开支增大了。",
  },
  {
    id: 410004,
    event: "物价上涨了，基本上等于没涨。",
  },
  {
    id: 410005,
    event: "你购买了懒投资，结果被坑惨了。",
    effect: {
      MNY: -1,
    }
  },{
    id: 410006,
    event: "你到手的钱稍微多了一些，手头宽裕了。",
    effect: {
      MNY: 1,
    }
  },
  // TODO: 结婚后开销越来越大，有孩子后开销越来越大
  // 趣味---
  {
    id: 850000,
    event: 'LD夸你长得好看。',
    postEvent: '对你说，你那么好看，为什么不转前端？',
    exclude: 'CHR<6',
  },
  {
    id: 850001,
    event: 'LD夸你长得好看。',
    postEvent: '对你说，你那么好看，为什么不转后端？',
    exclude: 'CHR<6',
  },
  {
    id: 850002,
    event: '你参与了一个大型项目，用火星文写一个论坛。',
  },
  {
    id: 850003,
    event: 'LD对你说，上一个不写需求文档的产品经理被枪毙了。',
  },
  {
    id: 850004,
    event: '同事对你说，写代码不写注释会倒霉的。',
  },
  {
    id: 850005,
    event: '听说隔壁小公司把人骗去东南亚，',
    postEvent: '程序员被枪顶着头开发菠菜网站。'
  },
  {
    id: 850006,
    event: '你接了一个秘密项目，给钢铁侠开发一款战衣。',
    exclude: 'ENV<3'
  }, {
    id: 850007,
    event: '同事找你合代码，合进去6个bug。',
  }, {
    id: 850008,
    event: '睡觉没接到报警电话，但组长、LD、LD+1全被叫醒了。',
  }, {
    id: 850009,
    event: '你在Review代码时痛骂作者，但发现作者是去年的自己。',
    exclude: 'AGE<13',
  }, {
    id: 850010,
    event: '你成为了A-SOUL第六人。',
  }, {
    id: 850011,
    event: '你打王者农药的时候和人对骂。',
  }, {
    id: 850012,
    event: '你梦见了小时候的自己。',
  }, {
    id: 850013,
    event: '领导让你开发页面，键盘cv还不好用。',
  }, {
    id: 850014,
    event: '隔壁公司小张听说因为抢月饼被公司开除了。',
  }, {
    id: 850015,
    event: '每天给用户发钱，但是自己账号被风控了。',
  }, {
    id: 850016,
    event: '你发现领导头发比你多。'
  }, {
    id: 850017,
    event: '接了个紧急项目的，你坐在工位上一个月没有和人说话。'
  }, {
    id: 850018,
    event: '这个月每天只睡4个小时。',
    exclude: 'ENV=5',
  }, {
    id: 850019,
    event: '你发现别人都是16寸mbp，到你这只剩13寸。',
    exclude: 'WRK>4',
  }, {
    id: 850020,
    event: '你入职了新公司，认识了可爱的同事们，于是吟诗一首。',
    exclude: 'WRK=1',
  }, {
    id: 850021,
    event: '这个月前后改了10次需求，最后项目关停了。'
  }, {
    id: 850022,
    event: '你好喜欢嘉然啊，为了嘉然，你要看《机器学习：从入门到精通》。',
  }, {
    id: 850023,
    event: '你在看传说中的SICP，但是发现看不懂。',
  }, {
    id: 850024,
    event: '你在津津有味地看犀牛书，但是忽然想起自己并不是前端。',
  }, {
    id: 850025,
    event: '同事问你0.1+0.2是多少，',
    postEvent: '果断回答是0.30000000000000004。'
  }, {
    id: 850026,
    event: '你不小心把祖传的木雕树人给丢在家门口的河里了，那可是唐朝文物。',
    exclude: 'EVT?[850026]',
  }, {
    id: 850027,
    event: '在家门口的河边，河神拿出三个树人，问你，',
    postEvent: '年轻的程序员哟~，你丢的是这个夏树人，还是这个商树人，还是这个鲁迅呢？',
    include: 'EVT?[850026]',
    exclude: 'EVT?[850027]',
  }
];

export const events = map(eventList);
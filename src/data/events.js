import {map} from '../functions/util.js';

const eventList = [
  {
    id: 700000,
    event: "你在好心人的帮助下从传销组织脱身。",
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
    event: "你的颜值越来越高，美死了。",
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
    exclude: "TLT?[1004, 1047]"
  }, {
    id: 100002,
    event: "你毕业了，成为一名程序媛。",
    exclude:  "TLT?[1003,2024, 1054]"
  }, {
    id: 100003,
    event: "你加入了一家preA轮创业公司。",
    postEvent: "开始适应快节奏的工作。",
    include: "SPR>7", // 心态>7 才能加入
    effect: {
        MNY: 0,
    }
  }, {
    id: 100004,
    event: "你加入了一家A轮创业公司。",
    postEvent: "开始适应快节奏的工作。",
    include: "SPR>7", // 心态>7 才能加入
    effect: {
      MNY: 1,
    }
  }, {
    id: 100005,
    event: "你加入了一家B轮创业公司。",
    postEvent: "开始适应快节奏的工作。",
    include: "SPR>6", // 心态>6 才能加入
    effect: {
      MNY: 1,
    }
  }, {
    id: 100006,
    event: "你加入了一家C轮创业公司。",
    postEvent: "开始适应快节奏的工作。",
    include: "(SPR>5)&(INT>4)", // 心态>5，智商>4 才能加入
    effect: {
      MNY: 2,
    }
  }, {
    id: 100007,
    event: "你加入了一家大型互联网公司。",
    postEvent: "开始适应快节奏的工作。",
    include: "INT>5",
    effect: {
      MNY: 3,
    }
  }, {
    id: 100008,
    event: "你加入了一家大型国企。",
    postEvent: "开始工作。",
    include: "(INT>4)&(CHR>4)",
    effect: {
      MNY: 2,
      SPR: 1
    }
  }, {
    id: 100009,
    event: "你加入了一家小公司，给大厂做外包。",
    postEvent: "开始工作。",
  }, {
    id: 100010,
    event: "你加入了一家小公司，给客户定制沙发。",
    postEvent: "开始工作。",
  }, {
    id: 100011,
    event: "你加入了一家私人作坊。",
    postEvent: "开始工作。",
    effect: {
      MNY: -1,
    }
  }, {
    id: 100012,
    event: "你被骗入了传销组织。",
    postEvent: "开始工作。",
    effect: {
      MNY: -1,
      SPR: -1,
    },
    exclude: "INT>3",
    branch: [
      "EVT?[100001,100002]:700000"
    ]
  }, {
    id: 100013,
    event: "你投了简历，但是无人问津",
    exclude:  "EVT?[100003,100004,100005,100006,100007,100008,100009,100010,100011,100012]"
  }, {
    id: 800004,
    event: "你不想呆下去了。",
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
    event: "你接受了新员工培训。"
  }, {
    id: 110002,
    event: "你接受了新员工培训。",
    postEvent: "学会了新的技能。",
    effect : {
        INT: 1
    },
    include: "INT>5"
  }, {
    id: 120001,
    event: "LD欣赏你的能力，给你涨了点工资。",
    effect : {
        MNY: 1
    },
    include: "INT>5"
  }, {
    id: 120002,
    event: "努力工作中。。。"
  }, {
    id: 120003,
    event: "注册了稀土掘金社区账号。",
    postEvent: "学习掘金文章，能力提升了。",
    effect : {
        INT: 1
    },
    exclude: "EVT?[120003]"
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
    event: "你因为抢月饼，被开除了",
    effect : {
        LIF: -1
    }
  }, {
    id: 130002,
    event: "公司决定要开除你，但因为你长得好看，被保下来了"
  }
];

export const events = map(eventList);
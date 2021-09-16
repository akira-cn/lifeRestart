import {map} from '../functions/util.js';

const achievementList = [
  {
    id: 101,
    name: "既视感",
    description: "重开10次",
    grade: 0,
    condition: "TMS>9",
    hide: 0,
    opportunity: "END"
  },
  {
    id: 102,
    name: '渣男一枚',
    description: '出轨',
    grade: 1,
    condition: 'EVT?[131102]',
    hide: 0,
    opportunity: 'TRAJECTORY',
  },
  {
    id: 103,
    name: '出柜',
    description: '女装大佬出柜',
    grade: 0,
    condition: 'EVT?[150024]',
    hide: 0,
    opportunity: 'TRAJECTORY',
  },
  {
    id: 104,
    name: '跨性别',
    description: '为了爱情...',
    grade: 2,
    condition: 'EVT?[150023]',
    hide: 1,
    opportunity: 'TRAJECTORY',
  },
  {
    id: 105,
    name: "契而不舍",
    description: "重开50次",
    grade: 1,
    condition: "TMS>49",
    hide: 0,
    opportunity: "END"
  },
  {
    id: 106,
    name: '钢铁直男',
    description: '拒绝恋爱...',
    grade: 1,
    condition: '(EVT?[131101])&(TLT?[1054])',
    hide: 0,
    opportunity: 'TRAJECTORY',
  },
  {
    id: 107,
    name: "码农强迫症",
    description: "重开200次",
    grade: 2,
    condition: "TMS>199",
    hide: 0,
    opportunity: "END"
  },
  {
    id: 108,
    name: "真爱不用说",
    description: "重开500次",
    grade: 3,
    condition: "TMS>499",
    hide: 0,
    opportunity: "END"
  },
  {
    id: 109,
    name: "高工",
    description: "晋升到P7",
    grade: 1,
    condition: "EVT?[391007]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 110,
    name: "技术专家",
    description: "晋升到P8",
    grade: 1,
    condition: "EVT?[391008]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 111,
    name: "架构师",
    description: "晋升到P9",
    grade: 2,
    condition: "EVT?[391009]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 112,
    name: "架构师II",
    description: "晋升到P10",
    grade: 2,
    condition: "EVT?[391010]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 113,
    name: "CTO-1",
    description: "晋升到P11",
    grade: 3,
    condition: "EVT?[391011]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 114,
    name: "CTO",
    description: "晋升到P12",
    grade: 3,
    condition: "EVT?[391012]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 115,
    name: "嫁给他",
    description: "性别而已，不要卡那么死~",
    grade: 2,
    condition: "EVT?[900014]",
    hide: 1,
    opportunity: "TRAJECTORY"
  },
  {
    id: 116,
    name: "颜如玉",
    description: "颜值>10",
    grade: 0,
    condition: "CHR>10",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 117,
    name: "天生我才",
    description: "智商>10",
    grade: 0,
    condition: "INT>10",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 118,
    name: "四肢发达",
    description: "健康>10",
    grade: 0,
    condition: "STR>10",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 119,
    name: "看破红尘",
    description: "心态>10",
    grade: 0,
    condition: "SPR>10",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 120,
    name: "福星高照",
    description: "幸运>3",
    grade: 1,
    condition: "BLCK>3",
    hide: 1,
    opportunity: "TRAJECTORY"
  },
  {
    id: 121,
    name: "天道之子",
    description: "幸运>4",
    grade: 2,
    condition: "BLCK>4",
    hide: 1,
    opportunity: "TRAJECTORY"
  },
  {
    id: 122,
    name: "位面之子",
    description: "幸运>5",
    grade: 3,
    condition: "BLCK>5",
    hide: 1,
    opportunity: "TRAJECTORY"
  },
];

export const achievements = map(achievementList);
/*//우울 증상 분류
흥미없음, 무기력, 수면장애, 감정굴곡, 식욕 이상, 자책감, 우울감
{ name: '흥미없음', value: 0, key: 0 },
{ name: '무기력', value: 0, key: 1 },
{ name: '수면장애', value: 0, key: 2 },
{ name: '감정굴곡', value: 0, key: 3 },
{ name: '식욕이상', value: 0, key: 4 },
{ name: '자책감', value: 0, key: 5 },
{ name: '우울감', value: 0, key: 6 },
//불안 증상 분류
{ name: '초조함', value: 0, key: 0 },
{ name: '예민함', value: 0, key: 1 },
{ name: '걱정', value: 0, key: 2 }
*/

const PHQ = [
  {
    q: '지난 2주간, 기분이 가라앉거나, 우울하거나, 희망이 없다고 느꼈나요?',
    a: [
      { answer: '아니다', type: []},
      { answer: '2-6일간 그랬다', type: ['6']},
      { answer: '7-12일간 그랬다', type: ['6']},
      { answer: '거의 매일 그랬다', type: ['6']}
    ]
  },
  {
    q: '지난 2주간, 평소 하던 일에 대한 흥미가 없어지거나 즐거움을 느끼지 못했나요?',
    a: [
      { answer: '아니다', type: []},
      { answer: '2-6일간 그랬다', type: ['0']},
      { answer: '7-12일간 그랬다', type: ['0']},
      { answer: '거의 매일 그랬다', type: ['0']}
    ]
  },
  {
    q: '지난 2주간, 잠들기가 어렵거나 자주 깨거나 너무 많이 잤나요?',
    a: [
      { answer: '아니다', type: []},
      { answer: '2-6일간 그랬다', type: ['2']},
      { answer: '7-12일간 그랬다', type: ['2']},
      { answer: '거의 매일 그랬다', type: ['2']}
    ]
  },
  {
    q: '지난 2주간, 평소보다 식욕이 줄었거나 평소보다 많이 먹었나요?',
    a: [
      { answer: '아니다', type: []},
      { answer: '2-6일간 그랬다', type: ['4']},
      { answer: '7-12일간 그랬다', type: ['4']},
      { answer: '거의 매일 그랬다', type: ['4']}
    ]
  },
  {
    q: '지난 2주간, 다른 사람들이 눈치 챌 정도로 평소보다 말과 행동이 느려지거나 너무 안절부절 못해서 가만히 앉아 있을 수 없었나요?',
    a: [
      { answer: '아니다', type: []},
      { answer: '2-6일간 그랬다', type: ['3']},
      { answer: '7-12일간 그랬다', type: ['3']},
      { answer: '거의 매일 그랬다', type: ['3']}
    ]
  },
  {
    q: '지난 2주간, 피곤하고 기운이 없었나요?',
    a: [
      { answer: '아니다', type: []},
      { answer: '2-6일간 그랬다', type: ['1']},
      { answer: '7-12일간 그랬다', type: ['1']},
      { answer: '거의 매일 그랬다', type: ['1']}
    ]
  },
  {
    q: '지난 2주간, 내가 잘못 했거나, 실패했다는 생각이 들었거나 자신과 가족을 실망시켰다고 생각했나요?',
    a: [
      { answer: '아니다', type: []},
      { answer: '2-6일간 그랬다', type: ['5']},
      { answer: '7-12일간 그랬다', type: ['5']},
      { answer: '거의 매일 그랬다', type: ['5']}
    ]
  },
  {
    q: '지난 2주간, 신문을 읽거나 TV를 보는 것과 같은 일상적인 일에도 집중 할 수가 없었나요?',
    a: [
      { answer: '아니다', type: []},
      { answer: '2-6일간 그랬다', type: ['1']},
      { answer: '7-12일간 그랬다', type: ['1']},
      { answer: '거의 매일 그랬다', type: ['1']}
    ]
  },
  {
    q: '지난 2주간, 차라리 죽는 것이 더 낫겠다고 생각하거나 자해할 생각을 했나요?',
    a: [
      { answer: '아니다', type: []},
      { answer: '2-6일간 그랬다', type: ['6']},
      { answer: '7-12일간 그랬다', type: ['6']},
      { answer: '거의 매일 그랬다', type: ['6']}
    ]
  },
]

const GAD = [
  {
    q: '지난 2주간, 초조하거나 불안하거나 조마조마하게 느꼈나요?',
    a: [
      { answer: '아니다', type: []},
      { answer: '2-6일간 그랬다', type: ['0']},
      { answer: '7-12일간 그랬다', type: ['0']},
      { answer: '거의 매일 그랬다', type: ['0']}
    ]
  },
  {
    q: '지난 2주간, 걱정하는 것을 멈추거나 조절할 수가 없었나요?',
    a: [
      { answer: '아니다', type: []},
      { answer: '2-6일간 그랬다', type: ['2']},
      { answer: '7-12일간 그랬다', type: ['2']},
      { answer: '거의 매일 그랬다', type: ['2']}
    ]
  },
  {
    q: '지난 2주간, 여러 가지 것들에 대해 걱정을 너무 많이 했나요?',
    a: [
      { answer: '아니다', type: []},
      { answer: '2-6일간 그랬다', type: ['2']},
      { answer: '7-12일간 그랬다', type: ['2']},
      { answer: '거의 매일 그랬다', type: ['2']}
    ]
  },
  {
    q: '지난 2주간, 편하게 있기가 어려웠나요?',
    a: [
      { answer: '아니다', type: []},
      { answer: '2-6일간 그랬다', type: ['0']},
      { answer: '7-12일간 그랬다', type: ['0']},
      { answer: '거의 매일 그랬다', type: ['0']}
    ]
  },
  {
    q: '지난 2주간, 너무 안절부절못해서 가만히 있기가 힘들었나요?',
    a: [
      { answer: '아니다', type: []},
      { answer: '2-6일간 그랬다', type: ['0']},
      { answer: '7-12일간 그랬다', type: ['0']},
      { answer: '거의 매일 그랬다', type: ['0']}
    ]
  },
  {
    q: '지난 2주간, 쉽게 짜증이 나거나 쉽게 성을 내게 되었나요?',
    a: [
      { answer: '아니다', type: []},
      { answer: '2-6일간 그랬다', type: ['1']},
      { answer: '7-12일간 그랬다', type: ['1']},
      { answer: '거의 매일 그랬다', type: ['1']}
    ]
  },
  {
    q: '지난 2주간, 마치 끔찍한 일이 생길 것처럼 두렵게 느껴졌나요?',
    a: [
      { answer: '아니다', type: []},
      { answer: '2-6일간 그랬다', type: ['2']},
      { answer: '7-12일간 그랬다', type: ['2']},
      { answer: '거의 매일 그랬다', type: ['2']}
    ]
  },
]

const RSES = [
  {
    q: '내가 남들만큼은 가치있는 사람이라고 생각하나요?',
    a: [
      { answer: '매우 그렇지 않다', type: []},
      { answer: '대체로 그렇지 않다', type: []},
      { answer: '보통이다', type: []},
      { answer: '대체로 그렇다', type: []},
      { answer: '항상 그렇다', type: []}
    ]
  },
  {
    q: '나에게는 좋은 점이 많이 있다고 생각하나요?',
    a: [
      { answer: '매우 그렇지 않다', type: []},
      { answer: '대체로 그렇지 않다', type: []},
      { answer: '보통이다', type: []},
      { answer: '대체로 그렇다', type: []},
      { answer: '항상 그렇다', type: []}
    ]
  },
  {
    q: '대체로 봐서 나는 성공한 사람이라고 생각하나요?',
    a: [
      { answer: '매우 그렇지 않다', type: []},
      { answer: '대체로 그렇지 않다', type: []},
      { answer: '보통이다', type: []},
      { answer: '대체로 그렇다', type: []},
      { answer: '항상 그렇다', type: []}
    ]
  },
  {
    q: '나는 남들만큼 일을 해낼 수 있다고 생각하나요?',
    a: [
      { answer: '매우 그렇지 않다', type: []},
      { answer: '대체로 그렇지 않다', type: []},
      { answer: '보통이다', type: []},
      { answer: '대체로 그렇다', type: []},
      { answer: '항상 그렇다', type: []}
    ]
  },
  {
    q: '내게는 자랑으로 여길만한 것이 많다고 생각하나요?',
    a: [
      { answer: '매우 그렇지 않다', type: []},
      { answer: '대체로 그렇지 않다', type: []},
      { answer: '보통이다', type: []},
      { answer: '대체로 그렇다', type: []},
      { answer: '항상 그렇다', type: []}
    ]
  },
  {
    q: '나 자신에 대해 괜찮게 생각하나요?',
    a: [
      { answer: '매우 그렇지 않다', type: []},
      { answer: '대체로 그렇지 않다', type: []},
      { answer: '보통이다', type: []},
      { answer: '대체로 그렇다', type: []},
      { answer: '항상 그렇다', type: []}
    ]
  },
  {
    q: '대체로 나에 대해 만족스럽게 생각하나요?',
    a: [
      { answer: '매우 그렇지 않다', type: []},
      { answer: '대체로 그렇지 않다', type: []},
      { answer: '보통이다', type: []},
      { answer: '대체로 그렇다', type: []},
      { answer: '항상 그렇다', type: []}
    ]
  },
  {
    q: '나 자신을 많이 존중한다고 생각하나요?',
    a: [
      { answer: '매우 그렇지 않다', type: []},
      { answer: '대체로 그렇지 않다', type: []},
      { answer: '보통이다', type: []},
      { answer: '대체로 그렇다', type: []},
      { answer: '항상 그렇다', type: []}
    ]
  },
  {
    q: '내가 정말 가치있는 사람이라고 생각하나요?',
    a: [
      { answer: '매우 그렇지 않다', type: []},
      { answer: '대체로 그렇지 않다', type: []},
      { answer: '보통이다', type: []},
      { answer: '대체로 그렇다', type: []},
      { answer: '항상 그렇다', type: []}
    ]
  },
  {
    q: '나에게 좋은 점이 있다고 생각하나요?',
    a: [
      { answer: '매우 그렇지 않다', type: []},
      { answer: '대체로 그렇지 않다', type: []},
      { answer: '보통이다', type: []},
      { answer: '대체로 그렇다', type: []},
      { answer: '항상 그렇다', type: []}
    ]
  },
]
//qnalist 신형
const qnaList = [
  PHQ[0], GAD[0], RSES[0],
  PHQ[1], GAD[1], RSES[1],
  PHQ[2], GAD[2], RSES[2],
  PHQ[3], GAD[3], RSES[3],
  PHQ[4], GAD[4], RSES[4],
  PHQ[5], GAD[5], RSES[5],
  PHQ[6], GAD[6], RSES[6],
  PHQ[7], RSES[7],
  PHQ[8], RSES[8],
  RSES[9]
]

const infoListExplain = [
  // 0 : 우울 아님, 1 : 가벼운 우울, 2 : 중간정도의 우울, 3 : 심한 우울
  [
    '우울 아님',
    '가벼운 우울',
    '중간정도의 우울',
    '심한 우울'
  ],
  // 0 : 불안 아님, 1 : 불안 시사됨
  [
    '불안 아님',
    '불안 시사됨'
  ],
  // 0 : 자존감 매우 낮음, 1 : 자존감 낮음, 2 : 자존감 보통, 3 : 자존감 높음, 4 : 자존감 매우 높음
  [
    '자존감 매우 낮음',
    '자존감 낮음',
    '자존감 보통',
    '자존감 높음',
    '자존감 매우 높음'
  ],
]

/*//우울 증상 분류
흥미없음, 무기력, 수면장애, 감정굴곡, 식욕 이상, 자책감, 우울감
{ name: '흥미없음', value: 0, key: 0 },
{ name: '무기력', value: 0, key: 1 },
{ name: '수면장애', value: 0, key: 2 },
{ name: '감정굴곡', value: 0, key: 3 },
{ name: '식욕이상', value: 0, key: 4 },
{ name: '자책감', value: 0, key: 5 },
{ name: '우울감', value: 0, key: 6 },
//불안 증상 분류
{ name: '초조함', value: 0, key: 0 },
{ name: '예민함', value: 0, key: 1 },
{ name: '걱정', value: 0, key: 2 }
*/

const infoListDepression = [
  '재밌는 게 없는',
  '아무것도 하기 싫은',
  '잠을 뒤척이는',
  '감정이 들끓는',
  '다 먹거나 아무것도 안 먹는',
  '모든게 내 탓 같은',
  '축 처져 있는'
]

const infoListAnxiety = [
  '래서판다',
  '미어캣',
  '보더콜리'
]
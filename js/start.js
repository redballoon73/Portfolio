
const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const result2 = document.querySelector("#result2");
const result3 = document.querySelector("#result3");
//***중요 꼭 바꿔야 됨***전체 질문 개수 = 19개
const endPoint = 19;
const select = [];
//qnaList 중에서 phq, gad, rses의 값을 각각 따로 빼내는 코드 짜기
const selectedPHQ = [];
const selectedGAD = [];
const selectedRSES = [];
// 그룹화된 결과를 저장할 변수
let Depression = '';

//랜덤 숫자 형성
function getRandomNumbers(min, max, count) {
  const randomNumbers = [];

  for (let i = 0; i < count; i++) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      randomNumbers.push(randomNumber);
  }

  return randomNumbers;
}

//우울과 불안 증상중 가장 심한 증상 표현, 그런데, 우울과 불안을 따로 대상화해야 됨.
//이 블럭의 목적 : 배열중 최대값 찾아서 인덱스 표현하는 것.
function GroupingResult(){
  //select 배열에서 PHQ, GAD, RSES의 응답을 따로 모아주기

    // select 배열을 반복하면서 type에 따라 분류
  for (let i = 0; i < select.length; i++) {
    const response = select[i];

    if (qnaList[i].type === 'PHQ') {
      selectedPHQ.push(response);
    } else if (qnaList[i].type === 'RSES') {
      selectedRSES.push(response);
    }
  }

  console.log('selectedPHQ:', selectedPHQ);
  console.log('selectedRSES:', selectedRSES);

    //PHQselect 리스트 중에서 최대 값과 그 값의 인덱스 찾기
    function findMax(arr) {
      let max = arr[0];
      let maxIndices = [0];
    
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
          max = arr[i];
          maxIndices = [i];
        } else if (arr[i] === max) {
          maxIndices.push(i);
        }
      }
    
      // 최댓값을 가진 인덱스 중에서 랜덤으로 선택
      const randomIndex = Math.floor(Math.random() * maxIndices.length);
      const selectedMaxIndex = maxIndices[randomIndex];
    
      return { max, selectedMaxIndex };
    }

    const numbersPHQ = selectedPHQ;
    const resultingPHQ = findMax(numbersPHQ);
    // 랜덤으로 선택된 최댓값을 가진 인덱스
    const selectedPHQIndex = resultingPHQ.selectedMaxIndex;
    // qnaList 배열에서 해당 질문 인덱스 찾기
    const phqIndex = qnaList.findIndex((item) => item.q === PHQ[selectedPHQIndex].q);
    Depression = PHQ[selectedPHQIndex].a[resultingPHQ.max].type[0];  

  console.log("우울 증상:", Depression);
  }


//PHQ, RSES 각각 더한 값 표시해주는 함수
function calResult(){
    // 배열의 각 항목을 더하는 함수
    // 배열의 각 항목을 숫자로 바꾸고 숫자가 아닌 항목은 제거하여 더하는 함수
    function sumNumericArray(arr) {
      return arr.reduce((total, current) => {
        const num = parseFloat(current);
        if (!isNaN(num)) {
          return total + num;
        } else {
          return total;
        }
      }, 0);
    }
    
  // 함수를 사용하여 배열의 합을 계산
  conclusionPHQ = sumNumericArray(selectedPHQ);
  conclusionRSES = sumNumericArray(selectedRSES);

  // 결과 출력
  console.log('PHQ의 합:', conclusionPHQ);
  console.log('RSES의 합:', conclusionRSES);
}

//PHQ, RSES를 점수 별로 분류
function classifyData(conclusionPHQ, conclusionRSES) {
  // Conclusion PHQ classification
  // 0 : 우울 아님, 1 : 가벼운 우울, 2 : 중간정도의 우울, 3 : 심한 우울
  let phqCategory;
  if (0 <= conclusionPHQ && conclusionPHQ <= 4) {
      phqCategory = 0;
  } else if (5 <= conclusionPHQ && conclusionPHQ <= 9) {
      phqCategory = 1;
  } else if (10 <= conclusionPHQ && conclusionPHQ <= 19) {
      phqCategory = 2;
  } else if (20 <= conclusionPHQ && conclusionPHQ <= 27) {
      phqCategory = 3;
  }

  // Conclusion RSES classification
  // 0 : 자존감 매우 낮음, 1 : 자존감 낮음, 2 : 자존감 보통, 3 : 자존감 높음, 4 : 자존감 매우 높음
  let rsesCategory;
  if (1 <= conclusionRSES + 10 && conclusionRSES + 10 <= 18) {
      rsesCategory = 0;
  } else if (19 <= conclusionRSES + 10 && conclusionRSES + 10 <= 24) {
      rsesCategory = 1;
  } else if (25 <= conclusionRSES + 10 && conclusionRSES + 10 <= 38) {
      rsesCategory = 2;
  } else if (39 <= conclusionRSES + 10 && conclusionRSES + 10 <= 44) {
      rsesCategory = 3;
  } else if (45 <= conclusionRSES + 10) {
      rsesCategory = 4;
  }

  // Create the Classified array
  Classified = [phqCategory, rsesCategory];
  console.log("분류 list:", Classified)
  return Classified;
}

//결과 창에 이미지와 설명글 넣기
function setResult(){

  let point1 = Classified[0]
  let point2 = Classified[1]
  const resultName = document.querySelector('.resultname');
  //우울과 불안의 증상에 따른 친근한 이미지(우울 + 불안)
  resultName.innerHTML = `<h2><strong>${infoListDepression[Classified[0]]} ${infoListSelfesteem[Classified[1]]}</strong></h2>`;


  var resultImg = document.createElement('img');
  const imgDiv = document.querySelector('#resultImg');
  //이미지 삽입하기
  if (imgDiv) {
    while(imgDiv.firstChild) {
      imgDiv.removeChild(imgDiv.firstChild);
    }
  }
  var imgURL = 'img/image-' + point1 + point2 + '.jfif';
  resultImg.src = imgURL;
  resultImg.alt = point1;
  resultImg.classList.add('img-fluid');
  imgDiv.appendChild(resultImg);

  //한 줄설명글 삽입하기
  const resultDesc = document.querySelector('.resultDesc');
  resultDesc.innerHTML = `
    <h3>${Describe[0][Classified[0]]}${Describe[1][Classified[1]]}<h3>
  `;

  //4줄 설명글 삽입하기
  const resultDesc1 = document.querySelector('.resultDesc1');
  function PHQCharacter() {
      if (Classified[0] <= 1) {
          return 0;
      } else {
          return 1;
      }
  }

  function RSESCharacter() {
      if (Classified[1] <= 1) {
          return 0;
      } else {
          return 1;
      }
  }

  let TextingPHQ = '';
  for (let i = 0; i < 2; i++) {
      TextingPHQ += Character[0][PHQCharacter()][getRandomNumbers(0, 3, 2)[i]] + '<br>';
  }
  
  let TextingRSES = '';
  for (let i = 0; i < 2; i++) {
      TextingRSES += Character[1][RSESCharacter()][getRandomNumbers(0, 4, 2)[i]] + '<br>';
  }
  resultDesc1.innerHTML = `
  <h3>${TextingPHQ}</h3>
  <h3>${TextingRSES}</h3>
  `
  // 팁 삽입하기
  const resultDesc2 = document.querySelector('.resultDesc2');
  resultDesc2.innerHTML = `
  <p>대한민국의 자살율이 OECD 1위인 이유는 우울증을 마치 개인의 문제라고 생각하는 사회적 분위기 때문입니다.</p>
  <p>한국에서는 통계적으로 매일 32명의 사람이 자살로 죽습니다.<br>여러분 주변의 사람에게 "우울은 너의 잘못이 아니야"라고 말해주세요.</p>
  <p>우울과 불안은 누구나 느낄 수 있습니다.<br>우울증은 마음의 감기와 같습니다.</p>
  <p>우울증이 오는 이유는 멘탈이 약해서가 아니라,<br>뇌에서 분비되는 호르몬 때문일 수 있습니다.</p>
  <p>우울증은 약물 치료를 통해서 80% 이상이 치유가 됩니다.<br>하지만, 스스로 우울증을 해결하는 것은 불가능한 경우도 있고, 더 심해지는 경우가 많습니다.</p>
  <p>우울증 약이 부작용이 있거나 중독성이 있다는,<br>정신과에 내원하면 진료 기록이 남는다는 오해가 있는데,<br>모두 거짓입니다.</p>
  `
}

//팁 삽입하기 resultDesc2에 <p>${Tip[getRandomNumbers(0,3,1)]}</p>
//이 블럭의 목표 : 설문 끝내고 결과 페이지 넘어가기
function goResult(){
  qna.style.WebkitAnimation = "fadeOut 1s";
  qna.style.animation = "fadeOut 1s";
  setTimeout(() => {
    result.style.WebkitAnimation = "fadeIn 1s";
    result.style.animation = "fadeIn 1s";
    setTimeout(() => {
      qna.style.display = "none";
      result.style.display = "block"
      setResult();
    },450)})
    
    console.log(select);
    //여기서 결과값을 표현해야됨
    GroupingResult();
    calResult();
    classifyData(conclusionPHQ, conclusionRSES);
}

//이 블럭의 목표 : "선택지를 버튼으로 만들고, 눌렀을 때 사라지도록"
// index.html 파일에서 answerBox라는 이름을 가진 class의 div 공간을 "선택"하고, 버튼을 만드는 것
function addAnswer(answerText, qIdx, idx){
  var a = document.querySelector('.answerBox');
  var answer = document.createElement('button');
  //버튼에 class, id 값을 지정('answerList')해줘서 queryselector 사용 할 수 있게 함 + 버튼 꾸미기
  answer.classList.add('answerList');
  answer.classList.add('my-3');
  answer.classList.add('py-3');
  answer.classList.add('mx-auto');
  answer.classList.add('fadeIn');
  //answer라는 버튼이 a 공간에 "소속"될 수 있게 관계 만들어주기
  a.appendChild(answer);
  //answer 버튼에 들어갈 문장(answerText)을 넣어주기
  answer.innerHTML = answerText;
  //버튼 눌렀을 때 문항이 사라지도록 만들기
  answer.addEventListener("click",function(){
    var children = document.querySelectorAll('.answerList');
    for(let i = 0; i < children.length; i++){
      children[i].disabled = true;
      children[i].style.WebkitAnimation = "fadeOut 0.5s";
      children[i].style.animation = "fadeOut 0.5s";
    }
    setTimeout(() => {
      //사용자가 몇번째 질문에서 몇번째 버튼을 클릭했는지 select 배열에 담김
      select[qIdx] = idx;
      for(let i = 0; i < children.length; i++){
        children[i].style.display = 'none';
      }
    //다음 문제 나오도록 만들기
      goNext(++qIdx);
    }, 450)
  },false);
}

//이 부분이 잘 이해 안됨. var의 의미, querySelector가 index.html 파일에서 qBox라는 class를 선택한 것이 q가 되고,
//data.js 파일에서 qnaList의 첫번째 값중 q에 해당하는 값이 q.innerHTML이 된다.
//어쨋든 이 블럭의 목표는 "질문과 선택지를 띄워주는 것", "그리고 선택지를 버튼으로 만드는것"
function goNext(qIdx){
  //맨 마지막 문제 끝나고 결과 페이지 넘어갈 때
  if(qIdx === endPoint){
    goResult();
    return;
  }

  var q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q.q;
  for(let i in qnaList[qIdx].q.a){
    //문제 넘길때마다 다음문제가 나와야 하므로 변수 qIdx(문제 번호)와 i를 추가함
    addAnswer(qnaList[qIdx].q.a[i].answer, qIdx, i);
  }
  var status = document.querySelector('.statusBar');
  status.style.width = (100/endPoint) * (qIdx+1) + '%';
  
}

function begin(){
  main.style.WebkitAnimation = "fadeOut 1s";
  main.style.animation = "fadeOut 1s";
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 1s";
    qna.style.animation = "fadeIn 1s";
    setTimeout(() =>{
      main.style.display = "none";
      qna.style.display = "block"
    },450)
    let qIdx = 0;
    goNext(qIdx);
  }, 450)
}

//   // Kakao Link API 초기화
// Kakao.init('YOUR_KAKAO_APP_KEY');

// function shareOnKakao() {
//   // 웹페이지 공유 메시지 설정
//   Kakao.Link.sendDefault({
//     objectType: 'web',
//     templateId: YOUR_TEMPLATE_ID,
//     templateArgs: {
//       'title': '웹페이지 제목',
//       'description': '웹페이지 설명',
//       'url': 'https://example.com',
//       'image': {
//         'src': 'https://example.com/image.jpg',
//         'width': '640',
//         'height': '480'
//       }
//     }
//   });
// }


//----------------------2페이지---------------------------------//

function goResult2(){
  result.style.WebkitAnimation = "fadeOut 1s";
  result.style.animation = "fadeOut 1s";
  setTimeout(() => {
    result2.style.WebkitAnimation = "fadeIn 1s";
    result2.style.animation = "fadeIn 1s";
    setTimeout(() => {
      result.style.display = "none";
      result2.style.display = "block"
    },450)})
    drawResultTable();
    drawResultGraph();
    setResult2();
}

//우울과 자존감 표로 나타내주기
function drawResultTable(){
  // 첫 번째 표 데이터 배열 정의
  const tableData1 = [
    ['우울점수','분류'],
    ['0-4점', '우울아님'],
    ['5-9점', '가벼운 우울'],
    ['10-19점', '중간정도의 우울'],
    ['20-27점', '심한 우울'],
  ];

  // 두 번째 표 데이터 배열 정의
  const tableData2 = [
    ['자존감점수', '분류'],
    ['1-18점', '매우 낮음'],
    ['19-24점', '낮음'],
    ['25-38점', '보통'],
    ['39-44점', '높음'],
    ['45점 이상', '매우 높음']
  ];
  
  let parentTableContainer = document.body.querySelector('.table-container');

  // 표 생성 함수
  function createTable(Tabledata, containerId) {
    const childTableContainer = document.createElement('div');
    childTableContainer.className = containerId;

    const table = document.createElement('table');

    // 내용 추가
    for (const rowData of Tabledata) {
      const row = table.insertRow();
      for (const cellData of rowData) {
        const cell = row.insertCell();
        cell.textContent = cellData;
      }
    }

    childTableContainer.appendChild(table);
    parentTableContainer.child
    parentTableContainer.appendChild(childTableContainer);
  }

  while(parentTableContainer.firstChild) {
    parentTableContainer.removeChild(parentTableContainer.firstChild)
  }

  // 두 개의 표 생성 함수 호출
  createTable(tableData1, 'table-container-1');
  createTable(tableData2, 'table-container-2');
}


//결과 두번째 페이지 값 입력
function setResult2(){
  const Explain = document.querySelector('.explain');
  //우울과 불안의 증상에 따른 친근한 이미지(우울 + 불안)
  Explain.innerHTML = `
  <h3 class = "text-center">당신의 <strong>우울 점수는 ${conclusionPHQ}점</strong>입니다.<h3>
  <p class = "text-center">${infoListExplain[0][window.Classified[0]]}</p>
  <br>
  <h3 class = "text-center">당신의 <strong>자존감 점수는 ${conclusionRSES+10}점</strong>입니다.
  <p class = "text-center">${infoListExplain[1][window.Classified[1]]}</p>
  <br>
  <hr>
  <br>
  <h3>${maxim[0][getRandomNumbers(0,maxim[0].length-1,1)]}</h3>
  <h3>${maxim[1][getRandomNumbers(0,maxim[1].length-1,1)]}</h3>
  <br>
  `;
}

function goBacktoResult(){
  result2.style.WebkitAnimation = "fadeOut 1s";
  result2.style.animation = "fadeOut 1s";
  setTimeout(() => {
    result.style.WebkitAnimation = "fadeIn 1s";
    result.style.animation = "fadeIn 1s";
    setTimeout(() => {
      result2.style.display = "none";
      result.style.display = "block"
    },450)})
    setResult();
}

// 결과 그래프를 그리는 함수
function drawResultGraph() {

  // 그래프 데이터
  var data = {
    labels: ['우울 점수', '자존감 점수'],
    datasets: [{
      backgroundColor: ['rgba(255, 99, 132, 0.7)', 'rgba(255, 206, 86, 0.7)'],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(255, 206, 86, 1)'],
      borderWidth: 1,
      data: [window.conclusionPHQ, window.conclusionRSES+10],
    }]
  };

  // 그래프 옵션
  var options = {
    indexAxis: 'y',
    responsive: false,
    legend : {
      display : false,
    },
    scales: {
      x: {
        beginAtZero: true,
        max : 50,
        },
      y: {
        beginAtZero: true
      }
    }
  };
  
  // 캔버스에 그래프 그리기
  var ctx = document.getElementById('resultChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options
  });

}
//-----------------------3페이지----------------------------//
function goResult3(){
  result2.style.WebkitAnimation = "fadeOut 1s";
  result2.style.animation = "fadeOut 1s";
  setTimeout(() => {
    result3.style.WebkitAnimation = "fadeIn 1s";
    result3.style.animation = "fadeIn 1s";
    setTimeout(() => {
      result2.style.display = "none";
      result3.style.display = "block"
    },450)})
    setResult3();
}

//결과 세번째 페이지 값 입력
function setResult3(){
  for (let i = 0; i < 4; i++) {
    const imgDiv = document.querySelector('#resultImg' + i);

    // imgDiv가 null이 아닌지 확인
    if (imgDiv) {
      while(imgDiv.firstChild) {
        imgDiv.removeChild(imgDiv.firstChild);
      }

      var resultImg = document.createElement('img');
      var imgURL = 'img/우울증 오해-' + i + '.jpg';
      resultImg.src = imgURL;
      resultImg.alt = i;
      resultImg.classList.add('img-fluid');
      imgDiv.appendChild(resultImg);
    } else {
      console.error(`Element with id 'resultImg${i}' not found.`);
    }
  }

  }

function goBacktoResult2(){
  result3.style.WebkitAnimation = "fadeOut 1s";
  result3.style.animation = "fadeOut 1s";
  setTimeout(() => {
    result2.style.WebkitAnimation = "fadeIn 1s";
    result2.style.animation = "fadeIn 1s";
    setTimeout(() => {
      result3.style.display = "none";
      result2.style.display = "block"
    },450)})
    setResult3();
}

/*  const Explain2 = document.querySelector('.explain2');
  //우울과 불안의 증상에 따른 친근한 이미지(우울 + 불안)
  Explain2.innerHTML = `
  <p>대한민국의 자살율이 OECD 1위인 이유는 우울증을 마치 개인의 문제라고 생각하는 사회적 분위기 때문입니다.</p>
  <p>한국에서는 통계적으로 매일 32명의 사람이 자살로 죽습니다.<br>여러분 주변의 사람에게 "우울은 너의 잘못이 아니야"라고 말해주세요.</p>
  <p>우울과 불안은 누구나 느낄 수 있습니다.<br>우울증은 마음의 감기와 같습니다.</p>
  <p>우울증이 오는 이유는 멘탈이 약해서가 아니라,<br>뇌에서 분비되는 호르몬 때문일 수 있습니다.</p>
  <p>우울증은 약물 치료를 통해서 80% 이상이 치유가 됩니다.<br>하지만, 스스로 우울증을 해결하는 것은 불가능한 경우도 있고, 더 심해지는 경우가 많습니다.</p>
  <p>우울증 약이 부작용이 있거나 중독성이 있다는,<br>정신과에 내원하면 진료 기록이 남는다는 오해가 있는데,<br>모두 거짓입니다.</p>
  <p>아래 링크들을 통해서 온라인 심리상담을 받아볼 수 있어요!<p>
  `;*/





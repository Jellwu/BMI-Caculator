//DOM宣告
var hnum = document.querySelector('.height');
var wnum = document.querySelector('.weight');
var resultbtn = document.querySelector('.result');
var recordlist = document.querySelector('.recorder');
//宣告local取到的字串轉陣列放到data
var data = JSON.parse(localStorage.getItem('Usernum')) || []
var newdt = new Date();
updatepage();

//函式庫
//1.計算BMI並把等級與值塞到陣列
function insertdata(){
  var height = parseInt(hnum.value);
  var weight = parseInt(wnum.value);
  var BMI = (weight) / ((height/100) * (height/100));
  var showBMI = (Math.round(BMI*100)/100);
  var level="";

  var fulldate = ''+ newdt.getFullYear() +'-'+ parseInt(newdt.getMonth()+1) +'-' + newdt.getDate() +''
  if(BMI < 18.5){
    level="過輕";
    data.push({height,weight,showBMI,level,fulldate});
  }else if (showBMI >= 18.5 && showBMI < 24){
    level="理想";
    data.push({height,weight,showBMI,level,fulldate});
  }else if (showBMI >= 24 && showBMI < 27){
    level="肥胖";
    data.push({height,weight,showBMI,level,fulldate});
  }else if (showBMI >= 27 && showBMI < 32){
    level="中度肥胖";
    data.push({height,weight,showBMI,level,fulldate});
  }else if (showBMI >= 32){
    level="過度肥胖";
    data.push({height,weight,showBMI,level,fulldate});
  }
  updatepage();
  localStorage.setItem('Usernum',JSON.stringify(data));
}

//2.字串串接函式
function joinstr(){
  var str ="";
  var str2 =""
  for (var i = 0; i < data.length; i++) {
    //累加html
    str += '<li data-num="'+ (i+1) +'"><span class="Listtitle">'+ data[i].level+'</span><span><small>BMI</small>'
    + data[i].showBMI +'</span><span><small>weight</small>'+ data[i].weight +'KG</span><span><small>height</small>'
    + data[i].height +'CM</span><span><small>Date</small>'+ data[i].fulldate+'</span></li>';
    }
  return str;
}

//3.頁面更新函示:呼叫串接字串函式同時更新HTML的Listtitle的顏色
function updatepage(){
  recordlist.innerHTML = joinstr();
  //宣告欲修改樣式的DOM
  var titlecolor = document.querySelectorAll('.Listtitle');
  var liborder = document.querySelectorAll('.recorder li');
  //修改樣式迴圈(抓.Listtile的陣列數量)
  for (var i = 0; i < titlecolor.length; i++) {
    switch(titlecolor[i].textContent){
     case "過輕":
     titlecolor[i].style.color='#6C93DB';
     titlecolor[i].style.marginRight='45px';
     liborder[i].style.borderLeft='10px solid #6C93DB';
     break;
     case "理想":
     titlecolor[i].style.color='#9BBF63';
     titlecolor[i].style.marginRight='45px';
     liborder[i].style.borderLeft='10px solid #9BBF63';
     break;
     case "肥胖":
     titlecolor[i].style.color='#F2CB05';
     titlecolor[i].style.marginRight='45px';
     liborder[i].style.borderLeft='10px solid #F2CB05';
     break;
     case "中度肥胖":
     titlecolor[i].style.color='#BF1140';
     liborder[i].style.borderLeft='10px solid #BF1140';
     break;
     case "過度肥胖":
     titlecolor[i].style.color='#D93B3B';
     liborder[i].style.borderLeft='10px solid #D93B3B';
    }
   }
  }

//4.按鈕更新函式:點下btn後改寫btn樣式與div內容
  function refreshbtn(e){
    //宣告要用到的DOM元素
    var resultbtn = document.querySelector('.result');
    var resulttext = document.querySelector('.condition');
    var baninput = document.querySelector('input')
    var inputimg = document.querySelector('.circlepic');
    //宣告變數
    var Len = data.length;
    var btndata = [];
    //console.log(data[(Len-1)]);
    //判斷:除非點到INPUT與Input裡面有值，才做
    if(baninput.value === ''){return}
    //抓陣列最後一筆資料並將值塞到對應的地方
    for (var i = 0; i < Len; i++) {
      btndata = data[(Len-1)]
      resultbtn.value = btndata.showBMI;
      resulttext.textContent = btndata.level;
      resultbtn.style.background="rgba(255,255,255,0)";
      inputimg.innerHTML = '<img src="images/icons_loop.png" alt=""><div class="bmitext">BMI</div>'
    //先將資料inner到img裡面才能給下面抓，這邊宣告不能拿到上面
      var changetext = document.querySelector('.bmitext');
      console.log(btndata);
      //修改樣式
      switch(btndata.level){
        case "過輕":
        resulttext.style.color="#6C93DB";
        resultbtn.style.border="5px solid #6C93DB";
        resultbtn.style.color="#6C93DB";
        inputimg.style.background="#6C93DB";
        changetext.style.color="#6C93DB";
        break;
        case "理想":
        resulttext.style.color="#9BBF63";
        resultbtn.style.border="5px solid #9BBF63";
        resultbtn.style.color="#9BBF63";
        inputimg.style.background="#9BBF63";
        changetext.style.color="#9BBF63";
        break;
        case "肥胖":
        resulttext.style.color="#F2CB05";
        resultbtn.style.border="5px solid #F2CB05";
        resultbtn.style.color="#F2CB05";
        inputimg.style.background="#F2CB05";
        changetext.style.color="#F2CB05";
        break;
        case "中度肥胖":
        resulttext.style.color="#BF1140";
        resultbtn.style.border="5px solid #BF1140";
        resultbtn.style.color="#BF1140";
        inputimg.style.background="#BF1140";
        changetext.style.color="#BF1140";
        break;
        case "過度肥胖":
        resulttext.style.color="#D93B3B";
        resultbtn.style.border="5px solid #D93B3B";
        resultbtn.style.color="#D93B3B";
        inputimg.style.background="#D93B3B";
        changetext.style.color="#D93B3B";
      }
      break;
    }
  }

resultbtn.addEventListener('click',insertdata,false);
updatepage();
resultbtn.addEventListener('click',refreshbtn,false);
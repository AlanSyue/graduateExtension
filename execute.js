const countCredit = (grade) => {
 
  var result = document.getElementById('login');
  var resultCSS = "width:900px;height:auto;";
  resultCSS += "z-index:9999999;";
  resultCSS += "background: #fff;";
  resultCSS += "border-radius: 5px;"
  resultCSS += "margin: 70px auto;";
  resultCSS += "padding: 20px;";
  resultCSS += "width: 50%;";
  resultCSS += "border:5px #0066FF solid;";

  msg = "<h1 style='text-align:center;'>計算學分中，請稍後。。。</h1>";
  result.innerHTML = "<div style='"+resultCSS+"'>"+msg+"</div>";

  domainList = [
    "https://ep.cgu.edu.tw/webfolio/progression_1.aspx?RC_Level=1&RC_Semester=U",
    "https://ep.cgu.edu.tw/webfolio/progression_1.aspx?RC_Level=1&RC_Semester=D",
    "https://ep.cgu.edu.tw/webfolio/progression_1.aspx?RC_Level=2&RC_Semester=U",
    "https://ep.cgu.edu.tw/webfolio/progression_1.aspx?RC_Level=2&RC_Semester=D",
    "https://ep.cgu.edu.tw/webfolio/progression_1.aspx?RC_Level=2&RC_Semester=S",
    "https://ep.cgu.edu.tw/webfolio/progression_1.aspx?RC_Level=3&RC_Semester=U",
    "https://ep.cgu.edu.tw/webfolio/progression_1.aspx?RC_Level=3&RC_Semester=D",
    "https://ep.cgu.edu.tw/webfolio/progression_1.aspx?RC_Level=3&RC_Semester=S",
    "https://ep.cgu.edu.tw/webfolio/progression_1.aspx?RC_Level=4&RC_Semester=U",
    "https://ep.cgu.edu.tw/webfolio/progression_1.aspx?RC_Level=4&RC_Semester=D",
  ];

  var object = {};
  var count = 0;
  for (let url of domainList) {
    let ajax = new XMLHttpRequest();
    let api = url;
    ajax.onreadystatechange = function() {
      if(ajax.readyState == 4 && ajax.status == 200){
        count += 1;
        let result = ajax.responseText;
        let getCreditNum = /<td>(([0-9]*)|([A-Z]))<\/td>/gi;
        
        if ( result.search(getCreditNum) != -1 ) {
          let rows = result.match(getCreditNum);
          for(var i=0,len=rows.length;i<len;i+=3){
             let lessonData = rows.slice(i,i+3);
             if ( typeof lessonData[2] != 'undefined' ) {
               let split1 = lessonData[2].split("<td>");
               let credit = split1[1].split("</td>");
               if ( parseInt(credit[0]) >= 60 || credit[0] == 'P' || credit[0] == 'U') {
                let split2 = lessonData[0].split("<td>");
                let lessonCode = split2[1].split("</td>");
                let split3 = lessonData[1].split("<td>");
                let lessonCredit = split3[1].split("</td>");
                object[lessonCode[0]] = lessonCredit[0];
               }            
             }
          }       
        }
        
        countCreditResult(count, object); 
      }
    }

    //2.創建 post 請求
    ajax.open('get', api);
    // 設置 header
    ajax.setRequestHeader("content-type","application/json; charset=UTF-8");
    //3.送出請求
    ajax.send();  
};

const countCreditResult = (count, object) => {
  if (count == 10) {
    var data = JSON.stringify
    ({ 
      data: object,
    });

    let ajax = new XMLHttpRequest();
    let api = 'https://graduate-tool.herokuapp.com/api/count';

    ajax.onreadystatechange = function(){
      if(ajax.readyState == 4 && ajax.status == 200){
        msg = ajax.responseText;
        let h1 = "<h1>【 計算結果 】</h1>";
        let h5 = "<h5 style='color:red;'> * 若要返回原始頁面請重新整理</h5><br />";
        result.innerHTML = "<div style='"+resultCSS+"'>"+h1+msg+h5+"</div>";
      }
    }

    //2.創建 post 請求
    ajax.open('post', api);
    // 設置 header
    ajax.setRequestHeader("content-type","application/json; charset=UTF-8");

    //3.送出請求
    ajax.send(data);  
    }
  }
}

const onMessage = (message) => {
  switch (message.action) {
    case 'before':
      countCredit(1);
      break;
    case 'after':
      countCredit(2);
      break;
    default:
      break;
  }
}

chrome.runtime.onMessage.addListener(onMessage);

const countCredit = (grade) => {
  var cookie = JSON.stringify
  ({ 
    Cookie: document.cookie,
    Grade: grade
  });

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

  var ajax = new XMLHttpRequest()
  var api = 'https://graduate-tool.herokuapp.com/api/count';
  
  ajax.onreadystatechange = function(){
    if(ajax.readyState == 4 && ajax.status == 200){
      var msg = ajax.responseText;
      var h1 = "<h1>【 計算結果 】</h1>";
      var h5 = "<h5 style='color:red;'> * 若要返回原始頁面請重新整理</h5><br />";
      result.innerHTML = "<div style='"+resultCSS+"'>"+h1+msg+h5+"</div>";
    }
  }

  //2.創建 post 請求
  ajax.open('post', api);
  // 設置 header
  ajax.setRequestHeader("content-type","application/json; charset=UTF-8");
  
  //3.送出請求
  ajax.send(cookie);
};

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

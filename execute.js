const countCredit = (grade) => {
  var cookie = JSON.stringify
  ({ 
    Cookie: document.cookie,
    Grade: grade
  });

  var ajax = new XMLHttpRequest()
  var api = 'http://127.0.0.1:5000/api/count';
  var resultCSS = "width:900px;height:auto;z-index:9999999;background-color:white;border:5px #FFAC55 solid;"
  ajax.onreadystatechange = function(){
    if(ajax.readyState == 4 && ajax.status == 200){
      var msg = ajax.responseText;
      var result = document.getElementById('login');
      result.innerHTML = "<div style='"+resultCSS+"'>"+msg+"</div>";
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

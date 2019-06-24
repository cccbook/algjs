function H(procedure,Input) { 
  // 这里的H函数有两种返回值，會停(1) 或 不會停(0)
  // ... 不管你怎麼實作，假如你真的做出來了
}

// 那麼我們可以呼叫 H 來寫個函數，讓你的 H 永遠判斷錯誤。
function U(P) {
    if (H(P,P) == 1){ // 如果會停
      while(1) {} // 那麼就不停
    } else { // else 不會停 
      return 1 // 那麼就停      
    }
}

// H(U, U) = ?

/*
case 1 : 
  H(U, U) = 1 代表 H 判斷 U(U) 會停，
              但此時會進入 while 無窮迴圈而不停，
              所以 H 判斷錯誤。

case 2 : 
  H(U, U) = 0 代表 H 判斷 U(U) 不會停，
              但此時會進入 return 而停掉，
              所以 H 又判斷錯誤。

*/
// https://gist.github.com/mbitsnbites/a065127577ff89ff885dd0a932ec2477
// https://zh.wikipedia.org/wiki/%E5%BF%AB%E9%80%9F%E5%82%85%E9%87%8C%E5%8F%B6%E5%8F%98%E6%8D%A2
// 庫利-圖基演算法

// This is a tiny radix-2 FFT implementation in JavaScript.
// The function takes a complex valued input signal, and performs an in-place
// Fast Fourier Transform (i.e. the result is returned in x_re, x_im). The
// function arguments can be any Array type (including typed arrays).
// Code size: <300 bytes after Closure Compiler.
function FFT(x_re, x_im) {
  var m = x_re.length / 2, k, X_re = [], X_im = [], Y_re = [], Y_im = [],
      a, b, tw_re, tw_im;

  for (k = 0; k < m; ++k) {
    X_re[k] = x_re[2 * k];
    X_im[k] = x_im[2 * k];
    Y_re[k] = x_re[2 * k + 1];
    Y_im[k] = x_im[2 * k + 1];
  }

  if (m > 1) {
    FFT(X_re, X_im);
    FFT(Y_re, Y_im);
  }

  for (k = 0; k < m; ++k) {
    a = -Math.PI * k / m, tw_re = Math.cos(a), tw_im = Math.sin(a);
    a = tw_re * Y_re[k] - tw_im * Y_im[k];
    b = tw_re * Y_im[k] + tw_im * Y_re[k];
    x_re[k] = X_re[k] + a;
    x_im[k] = X_im[k] + b;
    x_re[k + m] = X_re[k] - a;
    x_im[k + m] = X_im[k] - b;
  }
}
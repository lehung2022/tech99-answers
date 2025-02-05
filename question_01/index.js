var sum_to_n_a = function(n) {
  // Mathematical Formula (Best Performance, O(1))
  return (n * (n + 1)) / 2;
};

var sum_to_n_b = function(n) {
  // Iterative Approach (Safe for Large n, O(n))
  let sum = 0;
  for (let i = 1; i <= n; i++) {
      sum += i;
  }
  return sum;
};

var sum_to_n_c = function(n) {
  // Functional Approach (Modern JS, O(n))
  return [...Array(n).keys()].map(i => i + 1).reduce((acc, num) => acc + num, 0);
};

console.log(sum_to_n_a(5)); // Expected: 15
console.log(sum_to_n_b(5)); // Expected: 15
console.log(sum_to_n_c(5)); // Expected: 15
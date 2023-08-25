function minCut(s) {
    const n = s.length;
    const isPalindrome = Array.from({ length: n }, () => Array(n).fill(false));
    
    // Create a helper function to check if a substring is a palindrome
    function isSubstrPalindrome(start, end) {
      if (start === end) {
        return true;
      }
      while (start < end) {
        if (s[start] !== s[end]) {
          return false;
        }
        start++;
        end--;
      }
      return true;
    }
    
    // Fill the isPalindrome matrix
    for (let end = 0; end < n; end++) {
      for (let start = 0; start <= end; start++) {
        if (s[start] === s[end] && (end - start <= 1 || isPalindrome[start + 1][end - 1])) {
          isPalindrome[start][end] = true;
        }
      }
    }
    
    // Initialize an array to store minimum cuts
    const minCuts = new Array(n).fill(0);
    
    // Calculate minimum cuts using dynamic programming
    for (let end = 0; end < n; end++) {
      let min = end; // Maximum possible cuts
      for (let start = 0; start <= end; start++) {
        if (isPalindrome[start][end]) {
          min = start === 0 ? 0 : Math.min(min, minCuts[start - 1] + 1);
        }
      }
      minCuts[end] = min;
    }
    
    return minCuts[n - 1];
  }
  
  const s = "aab";
  console.log(minCut(s)); // Output: 1
  
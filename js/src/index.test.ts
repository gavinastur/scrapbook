import {
  addTwoNumbers,
  convert,
  findMedianSortedArrays,
  fullJustify,
  isMatch,
  lengthOfLongestSubstring,
  longestValidParentheses,
  toArray,
  toList,
  twoSum,
} from './index.js';

describe('all', () => {
  describe('twoSum', () => {
    it('returns indices of the two numbers that add up to the target', () => {
      expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
    });

    it('returns indices of the two numbers that add up to the target', () => {
      expect(twoSum([2, 3, 11, 15], 5)).toEqual([0, 1]);
    });

    it('returns indices when the pair is not at the start of the array', () => {
      expect(twoSum([3, 2, 4], 6)).toEqual([1, 2]);
    });

    it('returns indices when the same element is used twice', () => {
      expect(twoSum([3, 3], 6)).toEqual([0, 1]);
    });

    it('returns indices for negative numbers', () => {
      expect(twoSum([-3, 4, 3, 90], 0)).toEqual([0, 2]);
    });

    it('returns indices when one number is zero', () => {
      expect(twoSum([0, 4, 3, 0], 0)).toEqual([0, 3]);
    });

    it('returns indices when the target is negative', () => {
      expect(twoSum([-1, -2, -3, -4], -6)).toEqual([1, 3]);
    });

    it('returns an empty array when no pair sums to the target', () => {
      expect(twoSum([1, 2, 3], 100)).toEqual([]);
    });

    it('returns an empty array for an empty input', () => {
      expect(twoSum([], 5)).toEqual([]);
    });

    it('returns an empty array when only one element is present', () => {
      expect(twoSum([5], 5)).toEqual([]);
    });
  });

  describe('addTwoNumbers', () => {
    it('adds two numbers represented as reversed linked lists', () => {
      expect(toArray(addTwoNumbers(toList([2, 4, 3]), toList([5, 6, 4])))).toEqual([7, 0, 8]);
    });

    it('handles carry that produces a new leading digit', () => {
      expect(toArray(addTwoNumbers(toList([9, 9]), toList([1])))).toEqual([0, 0, 1]);
    });

    it('handles carry propagating through all digits', () => {
      expect(toArray(addTwoNumbers(toList([9, 9, 9]), toList([1])))).toEqual([0, 0, 0, 1]);
    });

    it('handles lists of different lengths', () => {
      expect(toArray(addTwoNumbers(toList([1, 8]), toList([0])))).toEqual([1, 8]);
    });

    it('handles single digit addition without carry', () => {
      expect(toArray(addTwoNumbers(toList([3]), toList([4])))).toEqual([7]);
    });

    it('handles single digit addition with carry', () => {
      expect(toArray(addTwoNumbers(toList([5]), toList([5])))).toEqual([0, 1]);
    });

    it('returns zero when both numbers are zero', () => {
      expect(toArray(addTwoNumbers(toList([0]), toList([0])))).toEqual([0]);
    });

    it('returns null when both inputs are null', () => {
      expect(addTwoNumbers(null, null)).toBeNull();
    });

    it('returns the non-null list when one input is null', () => {
      expect(toArray(addTwoNumbers(toList([1, 2, 3]), null))).toEqual([1, 2, 3]);
    });

    it('returns ', () => {
      expect(
        toArray(
          addTwoNumbers(
            toList([1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]),
            toList([5, 6, 4]),
          ),
        ),
      ).toEqual([6, 8, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
    });
  });

  describe('isMatch', () => {
    it('returns true when pattern matches the full string exactly', () => {
      expect(isMatch('aa', 'aa')).toBe(true);
    });

    it('returns false when pattern does not match the string', () => {
      expect(isMatch('aa', 'a')).toBe(false);
    });

    it('returns true when dot matches any single character', () => {
      expect(isMatch('ab', 'a.')).toBe(true);
    });

    it('returns true when star allows zero occurrences of preceding element', () => {
      expect(isMatch('b', 'a*b')).toBe(true);
    });

    it('returns true when star allows multiple occurrences of preceding element', () => {
      expect(isMatch('aab', 'a*b')).toBe(true);
    });

    it('returns true when dot-star matches any sequence of characters', () => {
      expect(isMatch('anything', '.*')).toBe(true);
    });

    it('returns true when dot-star matches an empty string', () => {
      expect(isMatch('', '.*')).toBe(true);
    });

    it('returns true for empty string and empty pattern', () => {
      expect(isMatch('', '')).toBe(true);
    });

    it('returns false for non-empty string and empty pattern', () => {
      expect(isMatch('a', '')).toBe(false);
    });

    it('returns true for empty string matched by zero-occurrence pattern', () => {
      expect(isMatch('', 'a*')).toBe(true);
    });

    it('returns true for complex pattern with multiple stars', () => {
      expect(isMatch('aab', 'c*a*b')).toBe(true);
    });

    it('returns false when trailing characters are unmatched', () => {
      expect(isMatch('mississippi', 'mis*is*p*.')).toBe(false);
    });

    it('returns true for dot-star combined with literal characters', () => {
      expect(isMatch('abcd', '.*d')).toBe(true);
    });

    it('returns false when literal character does not match', () => {
      expect(isMatch('a', 'b')).toBe(false);
    });
  });

  describe('convert', () => {
    it('converts a string into zigzag pattern with 3 rows', () => {
      expect(convert('PAYPALISHIRING', 3)).toBe('PAHNAPLSIIGYIR');
    });

    it('converts a string into zigzag pattern with 4 rows', () => {
      expect(convert('PAYPALISHIRING', 4)).toBe('PINALSIGYAHRPI');
    });

    it('returns the string unchanged when numRows is 1', () => {
      expect(convert('ABCDE', 1)).toBe('ABCDE');
    });

    it('returns the string unchanged when numRows equals string length', () => {
      expect(convert('ABCDE', 5)).toBe('ABCDE');
    });

    it('returns the string unchanged when numRows exceeds string length', () => {
      expect(convert('AB', 10)).toBe('AB');
    });

    it('returns a single character string unchanged', () => {
      expect(convert('A', 3)).toBe('A');
    });

    it('returns an empty string when input is empty', () => {
      expect(convert('', 3)).toBe('');
    });

    it('converts correctly with 2 rows', () => {
      expect(convert('ABCDE', 2)).toBe('ACEBD');
    });
  });

  describe('lengthOfLongestSubstring', () => {
    it('returns the length of the longest substring without repeating characters', () => {
      expect(lengthOfLongestSubstring('abcabcbb')).toBe(3);
    });

    it('returns 1 when all characters are the same', () => {
      expect(lengthOfLongestSubstring('bbbbb')).toBe(1);
    });

    it('returns the correct length when the longest substring is at the end', () => {
      expect(lengthOfLongestSubstring('pwwkew')).toBe(3);
    });

    it('returns 0 for an empty string', () => {
      expect(lengthOfLongestSubstring('')).toBe(0);
    });

    it('returns 1 for a single character string', () => {
      expect(lengthOfLongestSubstring('a')).toBe(1);
    });

    it('returns the full length when all characters are unique', () => {
      expect(lengthOfLongestSubstring('abcde')).toBe(5);
    });

    it('handles strings with spaces', () => {
      expect(lengthOfLongestSubstring('a b c')).toBe(3);
    });

    it('handles strings with special characters', () => {
      expect(lengthOfLongestSubstring('a!b!c')).toBe(3);
    });

    it('returns the correct length when duplicate appears at the very start', () => {
      expect(lengthOfLongestSubstring('aab')).toBe(2);
    });

    it('returns the correct length when at the very start', () => {
      expect(lengthOfLongestSubstring('dvdf')).toBe(3);
    });

    it('returns the correct length when the duplicate is not adjacent', () => {
      expect(lengthOfLongestSubstring('ohvhjdml')).toBe(6);
    });

    it('returns the correct length when the window shifts mid-string', () => {
      expect(lengthOfLongestSubstring('anviaj')).toBe(5);
    });
  });

  describe('findMedianSortedArrays', () => {
    it('returns the median of two arrays of equal length', () => {
      expect(findMedianSortedArrays([1, 3], [2, 4])).toBe(2.5);
    });

    it('returns the median when the combined length is odd', () => {
      expect(findMedianSortedArrays([1, 3], [2])).toBe(2);
    });

    it('returns the median when one array is empty', () => {
      expect(findMedianSortedArrays([], [1, 2, 3])).toBe(2);
    });

    it('returns the median when the other array is empty', () => {
      expect(findMedianSortedArrays([1, 2, 3], [])).toBe(2);
    });

    it('returns the correct median for arrays of different lengths', () => {
      expect(findMedianSortedArrays([1, 2], [3, 4, 5, 6])).toBe(3.5);
    });

    it('returns the correct median when all elements are the same', () => {
      expect(findMedianSortedArrays([2, 2], [2, 2])).toBe(2);
    });

    it('returns the correct median when arrays contain negative numbers', () => {
      expect(findMedianSortedArrays([-5, -1], [-3, 0])).toBe(-2);
    });

    it('returns the correct median when arrays contain pos numbers', () => {
      expect(findMedianSortedArrays([5, 1], [3, 0])).toBe(2);
    });

    it('returns the correct median when one array has a single element', () => {
      expect(findMedianSortedArrays([5], [1, 2, 3, 4])).toBe(3);
    });

    it('returns the correct median when elements do not interleave', () => {
      expect(findMedianSortedArrays([1, 2], [3, 4])).toBe(2.5);
    });

    it('returns the correct median when both arrays contain duplicate values', () => {
      expect(findMedianSortedArrays([2, 2, 4, 4], [2, 2, 2, 4, 4])).toBe(2);
    });
  });

  describe('fullJustify', () => {
    it('justifies multiple words across one line', () => {
      expect(fullJustify(['This', 'is', 'an'], 16)).toEqual(['This    is    an']);
    });

    it('justifies multiple words across multiple lines', () => {
      expect(fullJustify(['This', 'is', 'an', 'example', 'of', 'text', 'justification.'], 16)).toEqual([
        'This    is    an',
        'example  of text',
        'justification.  ',
      ]);
    });

    it('justifies multiple words across multiple lines ..', () => {
      expect(fullJustify(['What', 'must', 'be', 'acknowledgment', 'shall', 'be'], 16)).toEqual([
        'What   must   be',
        'acknowledgment  ',
        'shall be        ',
      ]);
    });
  });

  describe('longestValidParentheses', () => {
    it('returns the length of the longest valid parentheses substring', () => {
      expect(longestValidParentheses('(()')).toBe(2);
    });

    it('returns the correct length when the valid substring is in the middle', () => {
      expect(longestValidParentheses(')()())')).toBe(4);
    });

    it('returns 0 for an empty string', () => {
      expect(longestValidParentheses('')).toBe(0);
    });

    it('returns 0 when there are no valid parentheses', () => {
      expect(longestValidParentheses('(((')).toBe(0);
    });

    it('returns 0 when all parentheses are closing', () => {
      expect(longestValidParentheses(')))')).toBe(0);
    });

    it('returns the full length when the entire string is valid', () => {
      expect(longestValidParentheses('()()')).toBe(4);
    });

    it('returns the correct length for nested valid parentheses', () => {
      expect(longestValidParentheses('(())')).toBe(4);
    });

    it('returns the correct length when valid substrings are separated by an invalid character', () => {
      expect(longestValidParentheses('()(())')).toBe(6);
    });

    it('returns the correct length when valid substrings are separated by an invalid character..', () => {
      expect(longestValidParentheses('()(()')).toBe(2);
    });

    it('returns the correct length when valid substrings are separated by an invalid character...', () => {
      expect(longestValidParentheses(')()())()()(')).toBe(4);
    });

    it('returns the correct length when valid substrings are separated by an invalid character....', () => {
      expect(longestValidParentheses('(()))())(')).toBe(4);
    });

    it('returns the correct length for a single valid pair', () => {
      expect(longestValidParentheses('()')).toBe(2);
    });

    it('returns 0 for a single opening parenthesis', () => {
      expect(longestValidParentheses('(')).toBe(0);
    });

    it('returns 0 for a single closing parenthesis', () => {
      expect(longestValidParentheses(')')).toBe(0);
    });
  });
});

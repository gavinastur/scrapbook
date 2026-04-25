export const twoSum = (nums: number[], match: number): number[] => {
  const output: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === match) {
        output.push(i, j);
        return output;
      }
    }
  }
  return output;
};

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export const toList = (digits: number[]): ListNode | null => {
  let head: ListNode | null = null;
  for (let i = digits.length - 1; i >= 0; i--) {
    head = new ListNode(digits[i], head);
  }
  return head;
};

export const toArray = (node: ListNode | null): number[] => {
  const result: number[] = [];
  while (node !== null) {
    result.push(node.val);
    node = node.next;
  }
  return result;
};

export const addTwoNumbers = (l1: ListNode | null, l2: ListNode | null): ListNode | null => {
  if (!l1 || !l2) {
    return l1 || l2;
  }
  const temp1 = BigInt(toArray(l1).reverse().join(''));
  const temp2 = BigInt(toArray(l2).reverse().join(''));
  const added = temp1 + temp2;
  return toList(added.toString().split('').reverse().map(Number));
};

export const isMatch = (s: string, p: string): boolean => {
  return new RegExp(`^${p}$`, 'i').test(s);
};

export const convert = (s: string, numRows: number): string => {
  if (numRows === 1) return s;
  const rows = new Array(numRows).fill('');
  const zigzag = s.split('');

  let row = 0;
  let dir = 'down';
  for (let i = 0; i < zigzag.length; i++) {
    if (dir === 'down') {
      rows[row] = rows[row] + zigzag[i];
    }

    if (dir === 'up') {
      rows[row] = rows[row] + zigzag[i];
    }

    if (row === 0 && dir !== 'down') {
      dir = 'down';
    }
    if (row + 1 === numRows && dir !== 'up') {
      dir = 'up';
    }

    if (dir === 'down') {
      row++;
    }
    if (dir === 'up') {
      row--;
    }
  }
  return rows.join('');
};

export const lengthOfLongestSubstring = (s: string): number => {
  if (!s) return 0;
  if (s.length === 1) return 1;
  let idenitcal = true;
  for (let i = 0; i < s.length; i++) {
    if (s[i + 1]) {
      const curr = s[i];
      if (curr === s[i + 1]) {
      } else {
        idenitcal = false;
        break;
      }
    }
  }

  if (idenitcal) return 1;

  let currMatch = '';
  let match = '';
  for (let i = 0; i < s.length; i++) {
    const curr = s[i];
    const next = s[i + 1];
    const currPos = currMatch.indexOf(next);
    if (curr && next && curr !== next && currPos === 0) {
      //do nothing
      console.log(currMatch);
    } else if (curr && next && curr !== next && currPos === -1) {
      if (currMatch) {
        currMatch = currMatch + next;
      } else {
        currMatch = curr + next;
      }
      console.log(currMatch);
    } else {
      if (currPos === 1) {
        // console.log(currMatch, currPos);
        currMatch = curr;
      }
      match = currMatch.length > match.length ? currMatch : match;
      currMatch = '';
    }
  }
  console.log(match);

  return match.length;
};

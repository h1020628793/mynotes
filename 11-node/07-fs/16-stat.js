const fs = require('fs')
const stats = fs.statSync('./01.txt')
console.log(stats)
/*
Stats {
  dev: 16777220,
  mode: 33188,
  nlink: 1,
  uid: 501,
  gid: 20,
  rdev: 0,
  blksize: 4096,
  ino: 12905156482,
  size: 4,
  blocks: 8,
  atimeMs: 1602813686648.3796,
  mtimeMs: 1602813685442.102,
  ctimeMs: 1602813685442.102,
  birthtimeMs: 1602806823562.4578,
  atime: 2020-10-16T02:01:26.648Z,
  mtime: 2020-10-16T02:01:25.442Z,
  ctime: 2020-10-16T02:01:25.442Z,
  birthtime: 2020-10-16T00:07:03.562Z }
*/
console.log(stats.isFile())//true
console.log(stats.isDirectory())//false
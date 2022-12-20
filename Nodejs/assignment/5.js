const fs = require("fs");
const path = require("path");
const srcPath = path.join(__dirname, "./src");
const target = path.join(__dirname, "./target");
const buf = Buffer.alloc(1024);
let restfilesize = 0;
let pos = 0;
let saveCount = 0;

console.log(`reading ${srcPath} directory`);
const files = fs.readdirSync(srcPath);
!fs.existsSync(target) && fs.mkdirSync(target);

for (const key in files) {
  const file = files[key];
  const filePath = path.join(srcPath, file);
  const targetPath = path.join(__dirname, "./target", file);
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  restfilesize = fileSize;

  console.log(fileSize); // byte
  console.log(16); // 64000 byte === 64kb
  const total_record = Math.ceil(fileSize / 16);
  console.log(total_record);

  const readStream = fs.createReadStream(filePath, {
    highWaterMark: 16,
  });

  const writeStream = fs.createWriteStream(targetPath);
  const data = [];

  readStream.on("data", (chunk) => {
    console.log(chunk);
  });

  readStream.on("end", (chunk) => {});

  //   const fd = fs.openSync(filePath, 6); // rwx 421

  // TODO : 조각하여 새로운 파일 만들기.

  //   fs.read(fd, buf, 0, buf.length, pos, (err, bytes, bf) => {
  //     if (err) throw err;
  //     const chunk = bf.toString("utf8", 0, bytes);
  //     console.log(chunk);
  //   });
}

// const fs = require('fs');
// var buf = Buffer.alloc(160);
// var restfilesize = 0;
// var pos = 0;
// var savCount = 0;

// console.log('reading current directory')
// fs.readdir('./', (err, files) => {
//     if (err) throw err;
//     var fileArr = []
//     files.forEach((x) => {
//         fileArr += x
//         console.log('current directory files : ', x);
//     })
//     if (fileArr.includes('target') == 0) {
//         fs.mkdir('./target', (err) => {
//             if (err) throw err;
//             console.log("created target directory")
//         })
//     }
//     else console.log("target directory already exists")
// })
// fs.readdir("./src", (err, files) => {
//     files.forEach((x) => {
//         console.log('src directory files : ', x);
//         if (x == "input.txt") {
//             fs.stat(`./src/${x}`, (err, stats) => {
//                 if (err) throw err;
//                 var fsize = stats.size;
//                 console.log('filesize : ', fsize);
//                 restfilesize = fsize;

//                 fs.open(`./src/${x}`, 'r+', (err, fd) => {
//                     if (err) throw err;

//                     console.log(`${x} open success~~`)

//                     console.log("reading file~")

//                     while (restfilesize > 0) {

//                         if (savCount == 0) {
//                             console.log('savecount = 0', pos)
//                             savCount += 1
//                             buf1 = Buffer.alloc(buf.length)
//                             fs.read(fd, buf1, 0, buf.length, pos, (err, bytes, bf) => {
//                                 if (err) throw err;
//                                 console.log(buf1.slice(0, bytes).toString())

//                                 var newFile = fs.openSync(`./target/${x}`, 'r+');
//                                 fs.writeSync(newFile, buf1, 0, buf.length, pos);
//                                 console.log(`data written ${savCount} times`)
//                                 fs.close(newFile);
//                                 console.log('savecount: ', savCount, 'position: ', pos)
//                             })

//                         }
//                         if (restfilesize > buf.length) {
//                             savCount += 1
//                             pos += buf.length
//                             restfilesize -= buf.length;
//                             console.log('restfilesize > buf.length', pos)
//                             // console.log(pos, restfilesize)
//                             var buf2 = Buffer.alloc(buf.length)
//                             fs.read(fd, buf2, 0, buf.length, pos, (err, bytes, bf2) => {
//                                 if (err) throw err;
//                                 // console.log('bytes', bytes)
//                                 console.log(buf2.slice(0, bytes).toString())

//                                 var newFile = fs.openSync(`./target/${x}`, 'r+');
//                                 fs.writeSync(newFile, buf2, 0, buf.length, pos);
//                                 console.log(`data written ${savCount} times`)
//                                 fs.close(newFile);
//                                 console.log('savecount: ', savCount, 'position: ', pos)
//                             })

//                             // console.log('pos2', pos, restfilesize)
//                             // break;
//                         }
//                         if (restfilesize < buf.length) {

//                             savCount += 1
//                             pos += restfilesize
//                             console.log('else', buf.length, restfilesize)
//                             var buflast = Buffer.alloc(restfilesize)
//                             // console.log('length', buflast.length)
//                             fs.read(fd, buflast, 0, buflast.length, pos, (err, bytes, bf3) => {
//                                 if (err) throw err;
//                                 // console.log(buflast)
//                                 console.log(buflast.slice(0, bytes).toString())
//                                 console.log('bb', bf3)
//                                 var newFile = fs.openSync(`./target/${x}`, 'r+');
//                                 fs.writeSync(newFile, buflast, 0, buflast.length, pos);
//                                 console.log(`data written ${savCount} times`)
//                                 fs.close(newFile);
//                                 console.log('savecount: ', savCount, 'position: ', pos)

//                             })
//                             // pos += buflast.length
//                             // restfilesize -= buflast.length;
//                             // console.log(pos, restfilesize)
//                             console.log('file closed~~~~~', 'restfilesize=0~~', fsize - pos)
//                             break;
//                         }
//                     }
//                 })
//             })//
//         }
//     })//
// })

/*
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-03-03 16:16:52
 * @LastEditors: ganbowen
 * @LastEditTime: 2020-03-03 19:20:54
 */
var fs = require('fs');
var readline = require('readline');
var path = require('path');
const HTTP_REG = /(((http[s]?|ftp):)?(:)?\/\/[A-Za-z0-9\-]+[.]{1}([A-Za-z0-9\-]+[.]?)+)/
var filePath1 = path.resolve('/Users/baiwang/work/mainsite');
var filePath2 = path.resolve('/Users/baiwang/work/HuanghePages');
const obj = {}
const arr = []
var fWriteName = './data.js';

function fileDisplay(filePath) {
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath, function (err, files) {
        if (err) {
            console.warn(err)
        } else {
            //遍历读取到的文件列表
            files.forEach(function (filename) {
                //获取当前文件的绝对路径
                var filedir = path.join(filePath, filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir, function (eror, stats) {
                    if (eror) {
                        console.warn('获取文件stats失败');
                    } else {
                        var isFile = stats.isFile();//是文件
                        var isDir = stats.isDirectory();//是文件夹
                        if (isFile) {
                            if (/\.(html|js)$/.test(filename)) {
                                var fRead = fs.createReadStream(filedir);
                                var objReadline = readline.createInterface({      // 按行读取
                                    input: fRead
                                });
                                objReadline.on('line', (line) => {
                                    if (HTTP_REG.test(line) && line.length < 300) {
                                        var s = line.match(HTTP_REG)
                                        if (!obj[s[0]]) {
                                            obj[s[0]] = true
                                            arr.push(s[0])
                                        }
                                    }
                                });
                                objReadline.on('close', () => {
                                    var fWrite = fs.createWriteStream(fWriteName);
                                    fWrite.write(arr.join('\n'));
                                });
                            }
                        }
                        if (isDir) {
                            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })

            });
        }
    })
}
fileDisplay(filePath1);
fileDisplay(filePath2);

setTimeout(function () {
    result()
}, 3000)



// --------------------------------------------------------------------------------------------
const resultObj = {}
const resultArr = []
const resultURl = './result.js'
const filterREG = /(cdn|org|tree|google|github|mozilla|jquery|ui|api|web|youtube|baidu|developer|layer|microsoft|window|this|oSpa|console|js)+/i
const filterREG1 = /^\/\/[A-Za-z0-9\-]+[.]{1}([A-Za-z0-9\-]+)?$/
function result() {
    var fRead = fs.createReadStream('/Users/baiwang/code-study/test/readFIle/data.js');
    var objReadline = readline.createInterface({      // 按行读取
        input: fRead
    });
    objReadline.on('line', (line) => {
        if (HTTP_REG.test(line) && line.length < 300) {
            var s = line.match(HTTP_REG)
            if (!resultObj[s[0]]) {
                resultObj[s[0]] = true
                if(!filterREG.test(s[0]) && !filterREG1.test(s[0])) resultArr.push(s[0])
            }
        }
    });
    objReadline.on('close', () => {
        var fWrite = fs.createWriteStream(resultURl);
        fWrite.write(resultArr.join('\n'));
    });
}



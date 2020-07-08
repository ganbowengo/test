/*
 * @Descripttion:
 * @Author: ganbowen
 * @Date: 2020-07-07 14:42:56
 * @LastEditors: ganbowen
 * @LastEditTime: 2020-07-07 16:09:23
 */

var fs = require('fs');
var readline = require('readline');
var path = require('path');
// var filePath = path.resolve('/Users/baiwang/work/ctims-admin/dist'); // 2.0
// var filePath = path.resolve('/Users/baiwang/work/UKey_Page/web/billing-software/src'); // 开票软件
var filePath = path.resolve('/Users/baiwang/code-study/test/readFIle'); // 开票软件

let sums = 0
function fileDisplay (filePath) {
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
                            if (/\.(html|js|vue)$/.test(filename)) {
                                var fRead = fs.createReadStream(filedir);
                                var objReadline = readline.createInterface({      // 按行读取
                                    input: fRead
                                });
                                objReadline.on('line', (line) => {
                                    console.log('sums++', sums)
                                    sums++
                                })
                                objReadline.on('close', () => {
                                    console.log('close-----sums++', sums)
                                });
                            }
                        }
                        if (isDir) {
                            fileDisplay(filedir) //递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })

            });
        }
    })
}


fileDisplay(filePath)

setTimeout(() => {
    console.log('sums', sums)
}, 2000)
/*
 * @Author       : ganbowen
 * @Date         : 2022-02-20 10:48:45
 * @LastEditors  : ganbowen
 * @LastEditTime : 2022-02-20 11:07:37
 * @Descripttion : 复制文件夹目标文件夹到指定目录下，当目录下存在相同文件名时直接覆盖
 */

// dist后没有/时，复制文件包含dist目录及下级  dist后有/时，复制文件不包含dist文件仅包含dist目录下级文件 
const H5_DIST_DIR = './dist'

// 纳税人端项目下的h5_static的绝对路径
const NSRD_PROJECT_DIR = '/Users/baiwang/code-study/test/copy-test1/h5_static'
const child_process = require('child_process');

function copyDir (src, dist) {
    child_process.spawn('cp', ['-r', src, dist]);
}

copyDir(H5_DIST_DIR, NSRD_PROJECT_DIR)
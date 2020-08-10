<!--
 * @Descripttion:
 * @Author: ganbowen
 * @Date: 2020-08-06 09:54:33
 * @LastEditors: ganbowen
 * @LastEditTime: 2020-08-06 09:57:47
-->

```bash
# 运行 index.js
node index.js

# 先后执行两次
kill -USR2 `pgrep -n node`

```

- 生成 heapdump 文件
- 在浏览器的 devtools 中比较

[参考了解](https://www.bookstack.cn/read/node-in-debugging/2.2heapdump.md)

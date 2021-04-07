const transTools = function (arr, left, right) {
    let temp = arr[left]
    arr[left] = arr[right]
    arr[right] = temp
}
const sort = {
    bubble(arr) {
        let l = arr.length
        let flag = null
        for (let i = 0; i < l; i++) {
            flag = false
            for (let j = i; j < l - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    transTools(arr, j, j + 1)
                    flag = true
                }
            }
            if (!flag) break
        }
    },
    selection(arr) {
        let l = arr.length
        for (let i = 0; i < l; i++) {
            let minIndex = i
            for (let j = i + 1; j < l; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j
                }
            }
            i !== minIndex && transTools(arr, i, minIndex)
        }
    },
    insertion(arr) {
        let l = arr.length
        for (let i = 0; i < l; i++) {
            for (let j = i + 1; j > 0; j--) {
                if (arr[j] < arr[j - 1]) {
                    transTools(arr, j, j - 1)
                } else {
                    break
                }
            }
        }
    },
    shell(arr) {
        let l = arr.length
        let step = l
        while (true) {
            step = Math.floor(step / 2)
            for (let i = 0; i < step; i++) {
                for (let j = i + step; j < l; j += step) {
                    for (let k = j + step; k > 0; k -= step) {
                        if (arr[k] < arr[k - step]) {
                            transTools(arr, k, k - step)
                        } else {
                            break
                        }
                    }
                }
            }
            if (step === 1) break
        }
    },
    merge(arr) {
        let temp = []
        // 拆
        function split(arr, left, right) {
            if (left >= right) return
            let middle = Math.floor((left + right) / 2)
            split(arr, left, middle)
            split(arr, middle + 1, right)
            merge(arr, left, middle, right)
        }
        // 合
        function merge(arr, left, middle, right) {
            let l = left
            let j = middle + 1
            let k = 0
            while (left <= middle && j <= right) {
                if (arr[left] < arr[j]) {
                    temp[k++] = arr[left++]
                } else {
                    temp[k++] = arr[j++]
                }
            }
            while (left <= middle) temp[k++] = arr[left++]
            while (j <= right) temp[k++] = arr[j++]
            let i = 0
            while (i < k) arr[i + l] = temp[i++]
        }
        split(arr, 0, arr.length - 1, [])
    },
    quick(arr) {
        function split(arr, left, right) {
            if (left >= right) return
            let l = left, r = right
            let temp = arr[left]
            while (l < r) {
                while (l < r && arr[r] >= temp) {
                    r--
                }
                if (l < r) {
                    arr[l] = arr[r]
                    l++
                }

                while (l < r && arr[l] <= temp) {
                    l++
                }
                if (l < r) {
                    arr[r] = arr[l]
                    r--
                }
            }
            arr[r] = temp
            split(arr, left, r - 1)
            split(arr, r + 1, right)
        }
        split(arr, 0, arr.length - 1)
    },
    heap(arr) {
        function creatHeap(arr, i, l) {
            let temp = arr[i]
            let k = 2 * i + 1
            while (k < l) {
                if (k + 1 < l && arr[k] < arr[k + 1]) {
                    k++
                }
                if (arr[k] > temp) {
                    arr[i] = arr[k]
                    i = k
                } else {
                    break
                }
                k = 2 * k + 1
            }
            arr[i] = temp
        }

        function sort(arr) {
            let l = arr.length
            let top = Math.floor((l / 2) - 1)
            while (top >= 0) {
                creatHeap(arr, top, l)
                top--
            }
            while (l--) {
                transTools(arr, 0, l)
                creatHeap(arr, 0, l)
            }
        }
        sort(arr)
    },
    radix(arr) {
        let l = arr.length
        let result = new Array(10)
        let j = 1
        while (true) {
            let flag = 0
            let i = 0
            while (i < l) {
                let current = Math.floor(arr[i] / j) % 10
                if (current === 0) flag++
                (result[current] || (result[current] = [])).push(arr[i])
                i++
            }

            let k = 0
            let h = 0
            while (k < 10) {
                let l = result[k] && result[k].length
                let g = 0
                if (l > 0) {
                    while (g < l) {
                        arr[h++] = result[k][g++]
                    }
                    result[k].length = 0
                }
                k++
            }
            j = j * 10
            if (flag === l) break
        }
    },
    count(arr) {
        let l = arr.length
        let min = arr[0]
        let max = arr[0]
        let i = 0
        while (i < l) {
            min = Math.min(min, arr[i])
            max = Math.max(max, arr[i])
            i++
        }
        let h = max - min + 1
        let result = new Array(h)
        i = 0
        while (i < l) {
            let current = arr[i] - min
            result[current] || (result[current] = 0)
            result[current]++
            i++
        }
        i = 0
        let g = 0
        while (i < h) {
            let k = 0
            while (k < result[i]) {
                arr[g++] = i + min
                k++
            }
            i++
        }
    }
}


let arr = [1, 2, 3, 1, 8, 6, 9, 4, 3]
console.time('sort')
sort.heap(arr)
console.timeEnd('sort')

console.log('arr', arr)
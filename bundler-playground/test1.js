export function add (arr) {
    return arr.reduce((sum, value) => {
        return sum + value
    }, 0)
}
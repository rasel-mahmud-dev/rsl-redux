// function sortBy<T>(arr: Array<T>, order: 1 | 0, cb: (arg: T) => any) {

function sortBy(arr, order = 1, cb) {
    if (!arr || !Array.isArray(arr)) return []
    return arr.sort((a, b) => {
        if (cb(a) > cb(b)) {
            return order === 1 ? 1 : -1
        } else if (cb(a) < cb(b)) {
            return order !== 1 ? 1 : -1
        } else {
            return 0
        }
    })
}


export default sortBy
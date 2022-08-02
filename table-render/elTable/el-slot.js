/*
 * @Author       : ganbowen
 * @Date         : 2022-05-31 17:48:14
 * @LastEditors  : ganbowen
 * @LastEditTime : 2022-05-31 17:48:32
 * @Descripttion :
 */
export default {
    functional: true,
    props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
            type: Object,
            default: null
        }
    },
    render: (h, data) => {
        const params = {
            row: data.props.row,
            index: data.props.index
        }
        if (data.props.column) params.column = data.props.column
        return data.props.render(h, params)
    }
}

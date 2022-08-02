<template>
    <el-table
        header-cell-class-name="el-table-header"
        v-bind="$attrs"
        v-on="$listeners">
        <template
            v-for="(column,index) in columns">
            <el-table-column
                v-if="column.type === 'selection'"
                :key="index"
                v-bind="column" />
            <el-table-column
                v-else
                :key="index"
                v-bind="column">
                <template slot-scope="scope">
                    <el-slot
                        v-if="column.render"
                        :render="column.render"
                        :row="scope.row"
                        :index="scope.$index"
                        :column="column" />
                    <span v-else>{{ scope.row[column.prop] || '-' }}</span>
                </template>
            </el-table-column>
        </template>
    </el-table>
</template>
<script>
import Vue from 'vue'
import ElSlot from './el-slot'
import { Table, TableColumn, Checkbox } from 'element-ui'
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Checkbox.name, Checkbox)
export default {
    components: {
        ElSlot
    },
    props: {
        columns: {
            type: Array,
            default: () => ({})
        }
    }
}
</script>
<style lang="scss">
.el-table th.el-table-header{
    background: #F3F5F8;
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #01081A;
    line-height: 22px;
    font-weight: 600;
    padding: 7px 0;
}
.el-table .sort-caret.ascending{
    border-bottom-color: #01081A;
}
.el-table .sort-caret.descending {
    border-top-color: #01081A;
}
.el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell {
    background: #F5F9FF;
}
.el-checkbox__inner {
    width: 16px;
    height: 16px;
    &::after{
        top: 2px;
        left: 5px;
    }
}
.el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
    top: 6px;
}
.el-checkbox__input.is-checked .el-checkbox__inner,.el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color:$blue-6;
    border-color: $blue-6;
}
</style>

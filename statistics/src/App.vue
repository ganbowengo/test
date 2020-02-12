<!--
 * @Descripttion: 
 * @Author: ganbowen
 * @Date: 2020-02-04 09:32:49
 * @LastEditors  : ganbowen
 * @LastEditTime : 2020-02-05 21:25:28
 -->
<template>
    <div class="main">
        <h1>{{title}}</h1>
        <Table size='small' :columns="columns11" :data="data10" border height="500"></Table>
    </div>
</template>

<script>
export default {
    name: "app",
    data() {
        return {
            title: '疫情防控期间人员在位情况统计表（2月X日）',
            columns11: [
                {
                    title: "单位",
                    key: "dw",
                    align: "center",
                    width: 100,
                    fixed: "left"
                },
                {
                    title: "确诊病例数量",
                    key: "dw",
                    align: "center",
                    width: 80
                },
                {
                    title: "疑似病例数量",
                    key: "dw",
                    align: "center",
                    width: 80
                },
                {
                    title: "隔离观察人数（不含确诊、疑似人员）",
                    align: "center",
                    children: [
                        {
                            title: "现役",
                            key: "age",
                            align: "center",
                            width: 80
                        },
                        {
                            title: "文职",
                            key: "age",
                            align: "center",
                            width: 80
                        },
                        {
                            title: "其他",
                            key: "age",
                            align: "center",
                            width: 80
                        }
                    ]
                },
                {
                    title: "驻湖北以外单位人员离开驻地市县出差休假人数",
                    align: "center",
                    children: [
                        {
                            title: "现在位人数",
                            key: "age",
                            align: "center",
                            width: 80,
                        },
                        {
                            title: "前往湖北地区出差休假人数",
                            key: "age",
                            align: "center",
                            width: 80,
                        },
                        {
                            title: "前往其他地区出差休假人数",
                            key: "age",
                            align: "center",
                            width: 80,
                        },
                        {
                            title: "归队人数",
                            align: "center",
                            children: [
                                {
                                    title: "从湖北",
                                    align: "center",
                                    children: [
                                        {
                                            title: "当日",
                                            key: "building",
                                            align: "center",
                                            width: 80,
                                        },
                                        {
                                            title: "累计",
                                            key: "door",
                                            align: "center",
                                            width: 80
                                        }
                                    ]
                                },
                                {
                                    title: "从其他地区",
                                    align: "center",
                                    children: [
                                        {
                                            title: "当日",
                                            key: "building",
                                            align: "center",
                                            width: 80,
                                        },
                                        {
                                            title: "累计",
                                            key: "door",
                                            align: "center",
                                            width: 80
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    title: "驻湖北人员出差休假数",
                    align: "center",
                    children: [
                        {
                            title: "现在位人数",
                            key: "age",
                            align: "center",
                            width: 80
                        },
                        {
                            title: "到其他地区出差休假人数",
                            key: "age",
                            align: "center",
                            width: 80
                        },
                        {
                            title: "当日归队人数",
                            key: "age",
                            align: "center",
                            width: 80
                        },
                        {
                            title: "累计归队人数",
                            key: "age",
                            align: "center",
                            width: 80
                        }
                    ]
                },
                {
                    title: "驻京单位人数在位情况",
                    align: "center",
                    children: [
                        {
                            title: "在京人数",
                            align: "center",
                            children: [
                                {
                                    title: "现有人数",
                                    key: "building",
                                    align: "center",
                                    width: 80
                                },
                                {
                                    title: "隔离人数",
                                    key: "door",
                                    align: "center",
                                    width: 80
                                }
                            ]
                        },
                        {
                            title: "京外人数",
                            align: "center",
                            children: [
                                {
                                    title: "现有人数",
                                    key: "building",
                                    align: "center",
                                    width: 80
                                },
                                {
                                    title: "当日归队人数",
                                    key: "door",
                                    align: "center",
                                    width: 80
                                },
                                {
                                    title: "当日归队人数",
                                    key: "door",
                                    align: "center",
                                    width: 80
                                }
                            ]
                        }
                    ]
                },
                {
                    title: "1月10日后非本单位人员从湖北地区来队人数",
                    align: "center",
                    children: [
                        {
                            title: "当日",
                            key: "caddress",
                            align: "center",
                            width: 80
                        },
                        {
                            title: "累计",
                            key: "cname",
                            align: "center",
                            width: 80
                        }
                    ]
                }
            ],
            data10: [{}]
        };
    },
    methods: {
        goto(e) {
            let a = e.split("/");
            window.history.pushState({}, `${a} app`, `/${e}`);
        }
    }
};
</script>

<style>
h1 {
    text-align: center;
}
</style>

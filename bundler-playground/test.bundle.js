/*
 * @Author       : ganbowen
 * @Date         : 2021-03-23 19:17:51
 * @LastEditors  : ganbowen
 * @LastEditTime : 2021-03-23 19:20:47
 * @Descripttion : 
 */
(function(modules){
    const require = id => {
        const {factory, map} = modules[id];
        const localRequire = requireDeclarationName => require(map[requireDeclarationName]); 
        const module = {exports: {}};
        factory(module.exports, localRequire); 
        return module.exports; 
    }
    require(0);
    })({
        0: {
            factory: (exports, require) => {
                "use strict";
                var _test = require("./test1");
                console.log('add([1, 2, 3, 4])', (0, _test.add)([1, 2, 3, 4]));
            },
            map: {"./test1":1}
        },
        1: {
            factory: (exports, require) => {
                "use strict";

                Object.defineProperty(exports, "__esModule", {
                    value: true
                });
                exports.add = add;
                function add(arr) {
                    return arr.reduce(function (sum, value) {
                        return sum + value;
                    }, 0);
                }
            },
            map: {}
        }
    }
)
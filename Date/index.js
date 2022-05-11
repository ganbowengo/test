/*
 * @Author       : ganbowen
 * @Date         : 2022-05-11 10:34:11
 * @LastEditors  : ganbowen
 * @LastEditTime : 2022-05-11 10:34:13
 * @Descripttion : 
 */
function reg () {
    // 日期正则 校验闰年及日期的正确性
    const s = /((?<year1>[0-9]{2}(0[48]|[2468][048]|[13579][26])|(0[48]|[2468][048]|[13579][26])00)[\D.\n]*(?<month4>0?2)[\D.\n]*(?<day4>29)|(?<year>[12]{1}[0-9]{3})[\D.\n]*((?<month1>1[0-2]|0?[1-9])[\D.\n]*(?<day1>2[0-8]|1[0-9]|0?[1-9])|(?<month2>0?[13-9]|1[0-2])[\D.\n]*(?<day2>29|30)|(?<month3>0?[13578]|1[02])[\D.\n]*(?<day3>31)))[\D\n]*?$/

    console.log('20000229', consoleTime(s.exec('20000229')))
    console.log('202291', consoleTime(s.exec('202291')))
    console.log('2022901', consoleTime(s.exec('2022901')))
    console.log('20221001', consoleTime(s.exec('20221001')))
    console.log('20221201', consoleTime(s.exec('20221201')))
    console.log('2022121', consoleTime(s.exec('2022121')))
    console.log('20221211', consoleTime(s.exec('20221211')))
    console.log('20221221', consoleTime(s.exec('20221221')))
    console.log('20221230', consoleTime(s.exec('20221230')))
    console.log('20221231', consoleTime(s.exec('20221231')))

    console.log('2022----9-1', consoleTime(s.exec('2022----9-1')))
    console.log('2022-9----01', consoleTime(s.exec('2022-9----01')))
    console.log('2022-10---01', consoleTime(s.exec('2022-10---01')))
    console.log('2022-12-01', consoleTime(s.exec('2022-12-01')))
    console.log('2022/12/1', consoleTime(s.exec('2022/12/1')))
    console.log('2022,,12,,11', consoleTime(s.exec('2022,,12,,11')))
    console.log('2022==12==21', consoleTime(s.exec('2022==12==21')))
    console.log('2022,,12,,30', consoleTime(s.exec('2022,,12,,30')))
    console.log('2022,,12==31', consoleTime(s.exec('2022,,12==31')))

    console.log('2022----9-1++', consoleTime(s.exec('2022----9-1++')))
    console.log('2022-9----01++', consoleTime(s.exec('2022-9----01++')))
    console.log('2022-10---01++', consoleTime(s.exec('2022-10---01++')))
    console.log('20221201', consoleTime(s.exec('2022-12-01++')))
    console.log('2022-12-01++', consoleTime(s.exec('2022/12/1/')))
    console.log('2022,,12,,11/', consoleTime(s.exec('2022,,12,,11/')))
    console.log('2022==12==21.', consoleTime(s.exec('2022==12==21.')))
    console.log('2022,,12,,30,', consoleTime(s.exec('2022,,12,,30,')))
    console.log('2022,,12==31,', consoleTime(s.exec('2022,,12==31,')))
}
function consoleTime (regResult) {
    const { year, year1, month1, month2, month3, month4, day1, day2, day3, day4 } = (regResult && regResult.groups) || {}
    const newValue = `${year || year1}-${month1 || month2 || month3 || month4}-${day1 || day2 || day3 || day4}`
    return newValue
}
reg()
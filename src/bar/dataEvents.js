
var commonOpt;
var data;
var key = [];
var value = [];

function handleBarData(opt) {
    commonOpt = opt;
    // 绑定数据
    data = commonOpt.data;
    // 检验数据正确性及完整性
    // 功能待开发

    for (var i = 0; i < data.length; i++) {
        key.push(data[i].key);
    }
    for (var i = 0; i < data.length; i++) {
        value.push(data[i].value);
    }
    return { "key": key, "value": value };
}

function handleGroupedBarData(opt) {
    commonOpt = opt;
    // 绑定数据
    data = commonOpt.data;
    // 检验数据正确性及完整性
    // 功能待开发

    var primaryItem, secondaryItem;
    primaryItem = data.map(function (d) { return d.State });
    var secondaryItem = Object.keys(data[0]);
    secondaryItem.splice(0, 1);
    return { "primary": primaryItem, "secondary": secondaryItem };
}


export { handleBarData, handleGroupedBarData }
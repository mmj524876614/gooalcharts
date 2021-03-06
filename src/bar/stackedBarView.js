import * as d3 from 'd3'

let width = 800
let height = 400
let columnSVG
let tooltip
let xScale, yScale
let dataset
let commonOpt = {}, axisBox = {}, dataBox = {}

// 读取配置文件
function readConfig(options) {
    commonOpt = options
    axisBox = options.axisBox
    dataBox = options.dataBox
}


function drawStackedBar(dom, data, opt, layout) {
    let margin = layout.margin
    width = layout.data.width
    height = layout.data.height

    columnSVG = dom
    readConfig(opt)

    axisBox.xAxis.title != "" ? margin.bottom = margin.bottom + 20 : {}
    axisBox.yAxis.title != "" ? margin.left = margin.left + 20 : {}
    // 比例尺
    let primaryItem, secondaryItem
    primaryItem = data.categoryList
    secondaryItem = data.keyList
    dataset = data.value

    let stackMax = d3.max(dataset, function (d) {
        return d3.max(d, function (d) { return d[1] })
    })

    let stackMin = d3.min(dataset, function (d) {
        return d3.min(d, function (d) { return d[0] })
    })
    // 比例尺
    let yScale = d3.scaleLinear()
        .domain([stackMin, stackMax])
        .range([height - margin.bottom - margin.top, 0])
        .nice()

    let zScale = d3.scaleOrdinal()
        .range(dataBox.normalColor)


    drawFakeDataBox(commonOpt)
    let fakeAxis = d3.select("." + opt.type + "FakeAxisBox" + opt.id)

    //隐形坐标轴测坐标宽度 
    let hideYAxis = fakeAxis.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .style("opacity", 0)
        .call(d3.axisLeft().scale(yScale))
    hideYAxis.selectAll("text")
        .attr("font-size", "12px")
    hideYAxis.selectAll("text")
        .each(function (d, i) {
            if (d.length > commonOpt.axisBox.yAxis.maxStringLength) {
                this.innerHTML = String(d).slice(0, commonOpt.axisBox.yAxis.maxStringLength) + "..."
            }
        })
    let yAxisBBox = hideYAxis.node().getBBox()
    margin.left = yAxisBBox.width + margin.left

    xScale = d3.scaleBand()
        .domain(primaryItem)
        .range([0, width - margin.right - margin.left])
        .paddingInner(0.2)
        .paddingOuter(0.1)

    let bandwidth = xScale.bandwidth() > commonOpt.dataBox.maxBandWidth ? commonOpt.dataBox.maxBandWidth : xScale.bandwidth()
    columnSVG.append("svg")
        .selectAll("g")
        .data(dataset)
        .enter().append("g")
        .attr("fill", function (d) { return zScale(d.key) })
        .attr("normalColor", function (d) { return zScale(d.key) })
        .selectAll("rect")
        .data(function (d) { return d })
        .enter()
        .append("rect")
        .attr("class", commonOpt.type + "Element" + commonOpt.id)
        .attr("width", function () {
            return bandwidth
        })
        .attr("transform", function () {
            return "translate(" + (xScale.bandwidth() / 2 - bandwidth / 2) + "," + 0 + ")"
        })
        .attr("x", function (d, i) { return margin.left + xScale(d.key) })
        .attr("y", function (d, i) { return height - margin.bottom })
        .transition()
        .duration(500)
        .attr("y", function (d, i) { return margin.top + yScale(d[1]) })
        .attr("height", function (d) { return (yScale(d[0]) - yScale(d[1])) })

    d3.select(".deletesoon").remove()

    return { "svg": columnSVG, "margin": margin, "xScale": xScale, "yScale": yScale }
}

function drawFakeDataBox(opt) {
    let fake = d3.select("body")
        .append("svg")
        .attr("class", "deletesoon")
        .attr("width", 0)
        .attr("height", 0)
        .append("svg")
        .attr("class", opt.type + "FakeAxisBox" + opt.id)
        .attr("width", opt.layout.data.width)
        .attr("height", opt.layout.data.height)
    // .attr("opacity", 0)
}

export default function (dom, data, opt, layout) {
    return drawStackedBar(dom, data, opt, layout)
}
import * as d3 from 'd3'

let width = 800
let height = 400
let columnSVG
let xScale, yScale
let commonOpt = {}, axisBox = {}, dataBox = {}

// 读取配置文件
function readConfig(options) {
    commonOpt = options
    axisBox = options.axisBox
    dataBox = options.dataBox
}

function drawBar(dom, data, opt, layout) {
    let margin = layout.margin
    width = layout.data.width
    height = layout.data.height

    columnSVG = dom
    readConfig(opt)

    axisBox.xAxis.title != "" ? margin.bottom = margin.bottom + 20 : {}
    axisBox.yAxis.title != "" ? margin.left = margin.left + 20 : {}

    // 比例尺
    let xMaxScale, yMaxScale
    if ("xAxis" in axisBox && "maxScale" in axisBox.xAxis) {
        xMaxScale = axisBox.xAxis.maxScale
    }
    if ("yAxis" in axisBox && "maxScale" in axisBox.yAxis) {
        yMaxScale = axisBox.yAxis.maxScale
    }

    yScale = d3.scaleLinear()
        .domain([0, yMaxScale || d3.max(data.value)])
        .range([height - margin.bottom - margin.top, 0])
        .nice()


    drawFakeDataBox(commonOpt)
    let fakeAxis = d3.select("." + opt.type + "FakeAxisBox" + opt.id)

    //隐形坐标轴测坐标宽度
    let hideYAxis = fakeAxis.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("class", commonOpt.type + "HideYAxis" + commonOpt.id)
        .style("opacity", 0)
        .call(d3.axisLeft().scale(yScale))
    hideYAxis.selectAll("text")
        .each(function (d, i) {
            if (d.length > commonOpt.axisBox.yAxis.maxStringLength) {
                this.innerHTML = String(d).slice(0, commonOpt.axisBox.yAxis.maxStringLength) + "..."
            }
        })
    hideYAxis.selectAll("text")
        .attr("font-size", "12px")
    let yAxisBBox = hideYAxis.node().getBBox()
    // let yAxisBBox = d3.select("." + commonOpt.type + "HideYAxis" + commonOpt.id)._groups[0][0].getBoundingClientRect()
    margin.left = yAxisBBox.width + margin.left

    xScale = d3.scaleBand()
        .domain(data.key)
        .range([0, width - margin.right - margin.left])
        .paddingInner(0.2)
        .paddingOuter(0.1)

    let bandwidth = xScale.bandwidth() > commonOpt.dataBox.maxBandWidth ? commonOpt.dataBox.maxBandWidth : xScale.bandwidth()
    // 绘制数据
    columnSVG.selectAll("rect")
        .data(opt.data)
        .enter()
        .append("rect")
        .attr("class", commonOpt.type + "Element" + commonOpt.id)
        .attr("x", function (d, i) { return margin.left + xScale(d.key) })
        .attr("y", function (d, i) { return height - margin.bottom })
        .attr("width", function () {
            return bandwidth
        })
        .attr("transform", function () {
            return "translate(" + (xScale.bandwidth() / 2 - bandwidth / 2) + "," + 0 + ")"
        })
        .transition()
        .duration(500)
        .attr("y", function (d, i) { return margin.top + yScale(d.value) })
        .attr("height", function (d) { return height - yScale(d.value) - margin.bottom - margin.top })
        .attr("fill", function (d) { return dataBox.normalColor[0] })
        .attr("normalColor", dataBox.normalColor[0])

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
    return drawBar(dom, data, opt, layout)
}
import * as d3 from 'd3'
import { getObjValue } from '../tools/gooalArray';
import { getObjFirstValue as first, getObjKey } from '../tools/gooalArray'

let width = 800
let height = 400
let lineSVG
let tooltip
let xScale, yScale
let xMaxScale, yMaxScale
let xMinScale, yMinScale
let commonOpt = {}, axisBox = {}, dataBox = {}

// 读取配置文件
function readConfig(options) {
    commonOpt = options
    axisBox = options.axisBox
    dataBox = options.dataBox
    xMaxScale = axisBox.xAxis.maxScale
    yMaxScale = axisBox.yAxis.maxScale
    xMinScale = axisBox.xAxis.minScale
    yMinScale = axisBox.yAxis.minScale
}

function drawLineHori(dom, data, opt, layout) {
    let margin = layout.margin
    width = layout.data.width
    height = layout.data.height
    lineSVG = dom
    readConfig(opt)

    axisBox.xAxis.title != "" ? margin.bottom = margin.bottom + 20 : {}
    axisBox.yAxis.title != "" ? margin.left = margin.left + 20 : {}

    // 比例尺
    yScale = d3.scaleBand()
        .domain(data.key)
        .range([0, height - margin.bottom - margin.top])
        .paddingInner(0.2)
        .paddingOuter(0.1)

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

    xScale = d3.scaleLinear()
        .domain([xMinScale || 0, xMaxScale || d3.max(data.value)])
        .range([0, width - margin.right - margin.left])

    // 坐标轴
    let xAxis = lineSVG.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("class", commonOpt.type + "xAxis" + commonOpt.id)
        .attr("id", commonOpt.type + "xAxis" + commonOpt.id)
        .call(d3.axisTop().scale(xScale).ticks(5))

    xAxis.selectAll("text")
        .attr("font-size", "12px")

    // 坐标轴标题
    if ("title2" in axisBox.xAxis) {
        let xtitle = axisBox.xAxis.title2
        lineSVG.append("text")
            .attr("class", "groupchart" + "xTitle" + opt.id + " " + "groupchart" + "title" + opt.id)
            .attr("transform", "translate(" + ((width - margin.left - margin.right) / 2 + margin.left) + "," + 15 + ")")
            .attr("text-anchor", "middle")
            .attr("font-size", "14px")
            .text(xtitle)
    }

    // 线生成器
    let lineGenerator = d3.line()
        .x(function (d) {
            return xScale(getObjValue(1, d))
        })
        .y(function (d) {
            return yScale(getObjValue(0, d))
        })


    // 绘制数据
    lineSVG.append("path")
        .attr("class", commonOpt.type + "Path" + commonOpt.id)
        .attr("d", lineGenerator(opt.data))
        .attr("fill", "none")
        .attr("normalColor", dataBox.normalColor[1])
        .attr("stroke", function () {
            return dataBox.normalColor[1]
        })
        .attr("stroke-width", "2px")
        .attr("transform", "translate(" + margin.left + ", " + (margin.top + yScale.bandwidth() / 2) + ")")

    // 添加圆点
    lineSVG.selectAll("circle")
        .data(opt.data)
        .enter()
        .append("svg:circle")
        .attr("class", commonOpt.type + "Element" + commonOpt.id)
        .attr("cx", function (d, i) {
            let cx = getObjValue(1, d)
            return xScale(cx)
        })
        .attr("cy", function (d) {
            let cy = getObjValue(0, d)
            return yScale(cy)
        })
        .attr("transform", "translate(" + margin.left + ", " + (margin.top + yScale.bandwidth() / 2) + ")")
        .attr("r", commonOpt.dataBox.radius)
        .attr("normalColor", function (d) {
            return dataBox.normalColor[1]
        })
        .attr("fill", function (d) {
            return dataBox.normalColor[1]
        })

    d3.select(".deletesoon").remove()

    return { 'svg': lineSVG, "margin": margin, "xScale": xScale, "yScale": yScale }
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
    return drawLineHori(dom, data, opt, layout)
}
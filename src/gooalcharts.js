import * as d3 from 'd3'
import GooalOptions from './tools/gooalOptions'
import GooalLayout from './tools/gooalLayout'
// Initialize container 
export default class GooalCharts {
    constructor(dom, options) {
        // options
        this.dom = dom
        this.gooalOptions = new GooalOptions(options)
        this.options = options
        this.id = options.id
        if (options.width > 0) {

            if (options.height < options.minHeight)
                options.height = options.minHeight

            if (options.width < options.minWidth)
                options.width = options.minWidth

            if (options.type == "bubble" && options.height <= 550)
                options.height = 550

            this.width = options.width
            this.height = options.height
            this.titleOpt = options.titleBox
            this.legendOpt = options.legendBox
            this.dataOpt = options.dataBox

            // initialize container & ...Box & ...BBox
            this.container = this.setContainer(dom)
            this.titleBox = this.setTitleBox(options.titleBox)
            this.dataBox = this.setDataBox(options.dataBox)
            this.legendBox = this.setLegendBox(options.legendBox)

            this.layout = new GooalLayout(this.getOptions(), this.getTitleBox(), this.getDataBox(), this.getLegendBox())
            this.draw()
            this.titleBBox = this.titleBox.node().getBBox()
            this.dataBBox = this.dataBox.node().getBBox()
            this.legendBBox = this.legendBox.node().getBBox()
            // this.redraw(this.width)
        }

        // window.addEventListener('resize', this.resize(this, 500))
    }

    // 设置刷新定时器
    resize(chart, delay) {
        let timer = null
        return function () {
            clearTimeout(timer)
            timer = setTimeout(function () { chart.redraw() }, delay)
        }
    }

    // dom
    getDom() {
        return this.dom
    }

    // id
    getId() {
        return this.id
    }
    // width
    getWidth() {
        return this.width
    }

    setWidth(value) {
        this.width = value
    }

    // height
    getHeight() {
        return this.height
    }

    setHeight(value) {
        this.height = value
    }

    // options
    getOptions() {
        return this.options
    }

    getTitleOpt() {
        return this.titleOpt
    }

    getLegendOpt() {
        return this.legendOpt
    }

    getDataOpt() {
        return this.dataOpt
    }

    getAxisOpt() {
        return this.axisOpt
    }

    // layout

    getLayout() {
        return this.getOptions().layout
    }

    setLayout(layout) {
        this.layout = layout
    }
    // BBox
    getTitleBBox() {
        return this.titleBBox
    }

    getLegendBBox() {
        return this.legendBBox
    }

    getDataBBox() {
        return this.dataBBox
    }

    getAxisBBox() {
        return this.axisBBox
    }

    // container
    getContainer() {
        return this.container
    }

    setContainer(dom) {
        let container = d3.select(dom)
            .append("svg")
            .attr("class", this.getOptions().realType + " Container")
            .attr("id", this.getOptions().realType + "Container" + this.getId())
            .attr("width", this.getWidth())
            .attr("height", this.getHeight())
        return container
    }

    // titlebox
    getTitleBox() {
        return this.titleBox
    }

    setTitleBox(titleOpt) {
        let titleBox = this.container
            .append("svg")
            .attr("class", function () {
                if (titleOpt.position == "top" || titleOpt.position == "") { return "topTitleBox" }
                else if (titleOpt.position == "bottom") { return "bottomTitleBox" }
                else { return "topTitleBox" }
            })
            .attr("width", this.options.width)
            .attr("id", this.getOptions().realType + "TitleBox" + this.getId())
        if (this.getTitleOpt().show == true) {
            // 添加填充
            titleBox.append("rect")
                .attr("width", this.options.width)
                .attr("height", 50)
                .style("fill-opacity", 0)
                .style("opacity", 0.0)

        }
        return titleBox
    }

    // legend box
    getLegendBox() {
        return this.legendBox
    }
    setLegendBox(legendOpt) {
        let legendBox = this.container
            .append("svg")
            .attr("class", "legendBox")
            .attr("id", this.getOptions().realType + "LegendBox" + this.getId())

        return legendBox
    }

    // databox
    getDataBox() {
        return this.dataBox
    }

    setDataBox(dataOpt) {
        let dataBox = this.container.append("svg")
            .attr("class", "dataBox")
            .attr("id", this.getOptions().realType + "DataBox" + this.getId())



        return dataBox
    }

    // 调整box布局
    boxLayout() {
        this.layout = new GooalLayout(this.getOptions(), this.getTitleBox(), this.getDataBox(), this.getLegendBox())
    }

    // draw
    draw() { }
    redrawBar() { }
    redrawPie() { }
    redrawScatter() { }
    redrawLine() { }
    redrawCustom() { }

    redraw(newWidth, opt) {
        if (newWidth > 0) {

            this.getContainer().remove()
            let options = opt || this.getOptions()
            options.width = newWidth
            this.setWidth(newWidth)

            // reset container & ...Box & ...BBox
            this.container = this.setContainer(this.dom)

            this.titleBox = this.setTitleBox(options.titleBox)
            this.legendBox = this.setLegendBox(options.legendBox)
            this.dataBox = this.setDataBox(options.dataBox)

            this.titleBBox = this.titleBox.node().getBBox()
            this.dataBBox = this.dataBox.node().getBBox()
            this.legendBBox = this.legendBox.node().getBBox()


            this.layout = new GooalLayout(this.getOptions(), this.getTitleBox(), this.getDataBox(), this.getLegendBox())

            this.redrawBar()
            this.redrawPie()
            this.redrawScatter()
            this.redrawLine()
            this.redrawCustom()

        }
    }

    // 选择事件
    selectOn() { }
    selectOff() { }
}

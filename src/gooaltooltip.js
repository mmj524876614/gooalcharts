import * as d3 from 'd3'

export default class GooalTooltip {
    constructor(svg, opt, tooltipCon) {
        d3.select("." + opt.type + "tooltip" + opt.id).remove()
        this.chartEl = svg
        this.options = opt
        this.tooltipConfig = tooltipCon
        // init
        this.tooltipContainer = d3.select("body")
            .append("div")
            .attr("class", opt.type + "tooltip" + opt.id + " gooaltooltip")
            .style("opacity", 0.0)
            .style("position", "absolute")
            // .style("width", "auto")
            .style("height", "auto")
            // .style("font-family", "simsun")
            .style("font-size", "12px")
            // .style("text-align", "center")
            // .style("border-style", "solid")
            // .style("border-width", "1px")
            .style("background-color", "white")
            .style("border", "1px solid #ddd")
        // .style("border-radius", "5px")
        this.arrowBox
        this.tooltip = this.drawTooltip(this.chartEl, this.options)
    }

    drawTooltip(svg, opt) {
        let commonOpt = opt
        let chartEl = svg
        // init
        // let tooltipContainer = d3.select("body")
        let tooltipContainer = this.tooltipContainer
        this.tooltipContainer.html("")
        let tooltip = tooltipContainer
            .append("div")
            .attr("class", commonOpt.type + "TooltipContent" + commonOpt.id)
            .style("font-size", "13px")
            .style("padding", "5px")

        let arrowBox = tooltipContainer
            .append("div")
            .attr("class", "arrow-box")
            .style("left", -10 + "px")
            .style("transform", "")

        arrowBox.append("i")
            .attr("class", "left-arrow1")

        arrowBox.append("i")
            .attr("class", "left-arrow2")

        this.arrowBox = arrowBox

        let elementClass = "." + commonOpt.type + "Element" + commonOpt.id
        chartEl.selectAll(elementClass)
            .on("mouseover." + commonOpt.type + "tooptip" + commonOpt.id, this.tooltipConfig)
            .on("mousemove." + commonOpt.type + "tooptip" + commonOpt.id, function (d) {
                let tooltipHeight
                let tooltipWidth

                if (commonOpt.type == "groupchart") {
                    if (this.tagName == "circle") {
                        tooltipHeight = document.getElementsByClassName("line" + "tooltip" + commonOpt.id)[0].clientHeight
                        tooltipWidth = document.getElementsByClassName("line" + "tooltip" + commonOpt.id)[0].clientWidth
                    }
                    if (this.tagName == "rect") {
                        tooltipHeight = document.getElementsByClassName("bar" + "tooltip" + commonOpt.id)[0].clientHeight
                        tooltipWidth = document.getElementsByClassName("bar" + "tooltip" + commonOpt.id)[0].clientWidth
                    }
                } else {
                    tooltipHeight = document.getElementsByClassName(commonOpt.type + "tooltip" + commonOpt.id)[0].clientHeight
                    tooltipWidth = document.getElementsByClassName(commonOpt.type + "tooltip" + commonOpt.id)[0].clientWidth
                }

                let bodyWdith = window.innerWidth
                    || document.documentElement.clientWidth
                    || document.body.clientWidth
                let bodyHeight = window.innerHeight
                    || document.documentElement.clientHeight
                    || document.body.clientHeight

                let supportPageOffset = window.pageXOffset !== undefined
                let isCSS1Compat = ((document.compatMode || "") === "CSS1Compat")
                let scrollY = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop

                tooltipContainer
                    .style("left", function () {
                        if (bodyWdith - d3.event.pageX < tooltipWidth) {
                            arrowBox.style("transform", "rotateY(180deg)")
                                .style("left", tooltipWidth + 10 + "px")
                            return (d3.event.pageX - tooltipWidth - 25) + "px"
                        }
                        else {
                            arrowBox.style("left", -10 + "px")
                                .style("transform", "")
                            return (d3.event.pageX + 25) + "px"
                        }
                    })
                    .style("top", function () {
                        if (bodyHeight + scrollY - d3.event.pageY < tooltipHeight)
                            return (d3.event.pageY - tooltipHeight - 5) + "px"
                        else if (d3.event.pageY - scrollY < tooltipHeight) {
                            return (d3.event.pageY + 5) + "px"
                        }
                        else
                            return (d3.event.pageY - tooltipHeight / 2 + 5) + "px"

                    })
                    .style("padding", "5px")
                    .style("opacity", 1)
            })
            .on("mouseout." + commonOpt.type + "tooptip" + commonOpt.id, function (d) {
                arrowBox.style("left", -10 + "px")
                    .style("transform", "")
                tooltipContainer.style("left", "-1000px")
                    .style("top", "-1000px")
                    .style("opacity", 1)
            })

        return tooltip

    }

    redrawTooltips(svg, opt) {
        let commonOpt = opt
        let chartEl = svg
        let tooltipContainer = this.tooltipContainer
        let tooltip = this.tooltip
        let arrowBox = this.arrowBox
        let elementClass = "." + commonOpt.type + "Element" + commonOpt.id
        chartEl.selectAll(elementClass)
            .on("mouseover." + commonOpt.type + "tooptip" + commonOpt.id, this.tooltipConfig)
            .on("mousemove." + commonOpt.type + "tooptip" + commonOpt.id, function (d) {
                let tooltipHeight
                let tooltipWidth
                
                if (commonOpt.type == "groupchart") {
                    if (this.tagName == "circle") {
                        tooltipHeight = document.getElementsByClassName("line" + "tooltip" + commonOpt.id)[0].clientHeight
                        tooltipWidth = document.getElementsByClassName("line" + "tooltip" + commonOpt.id)[0].clientWidth
                    }
                    if (this.tagName == "rect") {
                        tooltipHeight = document.getElementsByClassName("bar" + "tooltip" + commonOpt.id)[0].clientHeight
                        tooltipWidth = document.getElementsByClassName("bar" + "tooltip" + commonOpt.id)[0].clientWidth
                    }
                } else {
                    tooltipHeight = document.getElementsByClassName(commonOpt.type + "tooltip" + commonOpt.id)[0].clientHeight
                    tooltipWidth = document.getElementsByClassName(commonOpt.type + "tooltip" + commonOpt.id)[0].clientWidth
                }
                let bodyWdith = window.innerWidth
                    || document.documentElement.clientWidth
                    || document.body.clientWidth
                let bodyHeight = window.innerHeight
                    || document.documentElement.clientHeight
                    || document.body.clientHeight

                let supportPageOffset = window.pageXOffset !== undefined
                let isCSS1Compat = ((document.compatMode || "") === "CSS1Compat")
                let scrollY = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop

                tooltipContainer
                    .style("left", function () {
                        if (bodyWdith - d3.event.pageX < tooltipWidth) {
                            arrowBox.style("transform", "rotateY(180deg)")
                                .style("left", tooltipWidth + 10 + "px")
                            return (d3.event.pageX - tooltipWidth - 25) + "px"
                        }
                        else {
                            arrowBox.style("left", -10 + "px")
                                .style("transform", "")
                            return (d3.event.pageX + 25) + "px"
                        }
                    })
                    .style("top", function () {
                        if (bodyHeight + scrollY - d3.event.pageY < tooltipHeight)
                            return (d3.event.pageY - tooltipHeight - 5) + "px"
                        else if (d3.event.pageY - scrollY < tooltipHeight) {
                            return (d3.event.pageY + 5) + "px"
                        }
                        else
                            return (d3.event.pageY - tooltipHeight / 2 + 5) + "px"

                    })
                    .style("padding", "5px")
                    .style("opacity", 1)
            })
            .on("mouseout." + commonOpt.type + "tooptip" + commonOpt.id, function (d) {
                arrowBox.style("left", -10 + "px")
                    .style("transform", "")
                tooltipContainer.style("opacity", 1)
                    .style("left", "-1000px")
                    .style("top", "-1000px")
            })
        return tooltip
    }

}
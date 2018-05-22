import * as d3 from 'd3'

export default class LegendEvents {
    constructor(svg, opt) {
        this.svg = svg
        this.options = opt
    }

    getLegendItem() {
        d3.selectAll("." + this.options.type + "Legend" + this.options.id)
            .on("click.changeColor", function (d, i) {
                console.log({ "element": this, "data": d, "index": i })
                return { "element": this, "data": d, "index": i }
            })
    }

    changeColor(legendItem, color) {
        let normalColor = this.options.dataBox.normalColor
        normalColor[legendItem.index] = color
    }
}
import * as d3 from 'd3'

export default class GooalLayout {
    constructor(opt, titleBox, dataBox, legendBox) {
        this.containerWidth = opt.width
        this.containerHeight = opt.height

        this.option = opt
        this.titleOpt = opt.titleBox
        this.legendOpt = opt.legendBox
        this.dataOpt = opt.dataBox


        this.titleBox = titleBox
        this.dataBox = dataBox
        this.legendBox = legendBox

        this.layout = opt.layout

        this.data = this.layout.data
        this.title = this.layout.title
        this.legend = this.layout.legend

        this.adjustLayout()

        return this.layout
    }

    adjustLayout() {
        if (this.legendOpt.show == false) {
            // dataBox
            this.data.width = this.containerWidth

            // legendBox
            this.legend.x = 0
            this.legend.y = 0
            this.legend.width = 0
            this.legend.height = 0

        } else {
            // legendBox
            // console.log(this.legend.width)
            if (this.legendOpt.position == "top") {
                this.legend.width = this.containerWidth
                this.legend.height = this.legendOpt.icon.y

                this.data.width = this.containerWidth

                this.legend.x = 0
            } else {
                this.legend.width = this.containerWidth * 0.2
                this.legend.height = this.data.height

                // dataBox
                this.data.width = this.containerWidth - this.legend.width
                // console.log(this.data.width)

                // legendBox
                this.legend.x = this.data.width
            }
        }

        if (this.titleOpt.show == false) {
            this.title.x = 0
            this.title.y = 0
            this.title.width = 0
            this.title.height = 0

            if (this.legendOpt.position == "top") {
                this.data.height = this.containerHeight - this.legend.height
                this.data.y = this.legend.height
            }
            else {
                this.data.height = this.containerHeight
                this.data.y = 0
            }
            this.legend.y = 0
        } else if (this.titleOpt.show == true) {
            if (this.titleOpt.position == "bottom") {
                // titleBox
                this.title.height = 50
                // dataBox
                if (this.legendOpt.position == "top")
                    this.data.height = this.containerHeight - this.title.height - this.legend.height
                else
                    this.data.height = this.containerHeight - this.title.height

                // titleBox
                this.title.x = 0
                if (this.legendOpt.position == "top")
                    this.title.y = this.data.height + this.legend.height
                else
                    this.title.y = this.data.height

                // console.log( this.title)
                this.title.width = this.option.width


                // dataBox
                this.data.x = 0
                if (this.legendOpt.position == "top")
                    this.data.y = this.legend.height
                else
                    this.data.y = 0

                // legendBox
                this.legend.y = 0

            } else {
                // titleBox
                this.title.x = 0
                this.title.y = 0
                this.title.width = this.option.width
                this.title.height = 50

                // dataBox
                this.data.x = 0
                if (this.legendOpt.position == "top") {
                    this.data.y = this.title.height + this.legend.height
                } else {
                    this.data.y = this.title.height
                }


                if (this.legendOpt.position == "top")
                    this.data.height = this.containerHeight - this.title.height - this.legend.height
                else
                    this.data.height = this.containerHeight - this.title.height

                // legendBox
                this.legend.y = this.title.height

            }
        }

        this.titleBox.attr("x", this.title.x)
            .attr("y", this.title.y)
            .attr("width", this.title.width)
            .attr("height", this.title.height)

        this.dataBox.attr("y", this.data.y)
            .attr("width", this.data.width)
            .attr("height", this.data.height)

        this.legendBox.attr("x", this.legend.x)
            .attr("y", this.legend.y)
            .attr("width", this.legend.width)
        // .attr("height", this.legend.height)

    }

    changeTitleLayout(attribute, value) {
        if (attribute == "width") {

        } else if (attribute == "height") {

        }
    }

    changeDataLayout(attribute, value) {
        if (attribute == "width") {

        } else if (attribute == "height") {

        }
    }

    changeLegendLayout(attribute, value) {
        if (attribute == "width") {
            if (this.legendOpt.position == "right") {
                this.legend.width = value
                this.data.width = this.containerWidth - this.legend.width
            }
        } else if (attribute == "height") {

        }

    }
}
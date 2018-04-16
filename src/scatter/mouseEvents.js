import * as d3 from 'd3'

let scatterEl
let preColor, curColor
let preRadius, curRadius
let commonOpt

function addEvents(svg, events, methods, opt) {
    scatterEl = svg
    commonOpt = opt
    scatterEl.selectAll("." + opt.type + "element" + opt.id)
        .on(events, methods)
}
// default events
function defaultEvents(svg, opt) {
    scatterEl = svg
    commonOpt = opt
    scatterEl.selectAll("." + opt.type + "element" + opt.id)
        .on("mouseover.highlight", mouseOverHighlight)
        .on("mouseout.highlight", handleMouseOut)
}
// mouse over
function mouseOverHighlight(d) {
    preColor = d3.select(this).style("fill")
    preRadius = d3.select(this).attr("r")
    // 悬浮高亮
    // d3.select(this).style("fill", "brown")
    d3.select(this).attr("r", 10)
}

//mouse out 
function handleMouseOut(d) {
    // 取消高亮
    // d3.select(this).style("fill", preColor)
    d3.select(this).attr("r", preRadius)
}


export { addEvents }
export { defaultEvents }
import drawBar from './barView'
import drawGroupedBar from './groupedBarView'
import drawStackedBar from './stackedBarView'
import { defaultEvents as mouseDefault } from './mouseEvents'
import { handleBarData, handleGroupedBarData, handleStackedBar } from './dataEvents'
import drawLegend from '../drawLegend'
import drawAxis from './drawAxis'

var width = 800
var height = 400
var barContainer
var commonOpt
var data

// 读取配置文件
function readConfig(options) {
  commonOpt = options
}

// 绘制
function presenter(dom, options, legendDom, newWidth) {

  if (newWidth != undefined) {
    width = ""
  }

  // 读取配置
  readConfig(options)

  // 绘制容器
  barContainer = dom

  if (options.type == "bar") {
    data = handleBarData(options)
    var barchart = drawBar(barContainer, data, options, newWidth)
    drawAxis(barchart.svg, options, barchart.margin, barchart.xScale, barchart.yScale, newWidth)
  } else if (options.type == "groupedbar") {
    data = handleGroupedBarData(options)
    var groupedbar = drawGroupedBar(barContainer, data, options, newWidth)
    drawAxis(groupedbar.svg, options, groupedbar.margin, groupedbar.xScale, groupedbar.yScale, newWidth)
    drawLegend(legendDom, data.secondary)
  } else if (options.type == "stackedbar") {
    data = handleStackedBar(options)
    var stackedbar = drawStackedBar(barContainer, data, options, newWidth)
    drawAxis(stackedbar.svg, options, stackedbar.margin, stackedbar.xScale, stackedbar.yScale, newWidth)
    drawLegend(legendDom, data.secondary)
  }

  // 加载鼠标默认事件
  mouseDefault(barContainer)


  // 返回bar容器
  return barContainer
}

export default function (dom, options, legendDom, newWidth) {
  return presenter(dom, options, legendDom, newWidth)
}
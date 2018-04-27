function moveDot(xOffset, yOffset) {
    var chart = document.getElementById("chart").getSVGDocument();
    var dot = chart.getElementById("pinpoint");

    if (dot) {
        var transformAttr = ' translate(' + xOffset + ',' + yOffset + ')';
        dot.setAttribute('transform', transformAttr);
    }
}
function prepare() {
    var S = document.getElementById("chart");
    var chart = S.getSVGDocument();
    var dot = chart.getElementById('pinpoint');
}

function moveDot(xOffset, yOffset) {
    var S = document.getElementById("chart");
    var chart = S.getSVGDocument();
    var dot = chart.getElementById('pinpoint');
    if (dot) {
        var transformAttr = ' translate(' + xOffset + ',' + yOffset + ')';
        dot.setAttribute('transform', transformAttr);
    }
}
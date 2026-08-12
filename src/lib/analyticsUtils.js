/**
 * Computes SVG dash offsets and assigns colors for donut charts.
 * @param {Array} chartData 
 * @param {Array} colors 
 * @returns {Array}
 */
export function formatDonutData(chartData = [], colors = []) {
  let accumulatedPercentage = 0;
  return chartData.map((item, index) => {
    const percent = item.percentage;
    const offset = 100 - accumulatedPercentage + 25; // 25 unit offset rotates start point to top (12 o'clock)
    accumulatedPercentage += percent;
    return {
      ...item,
      dashoffset: offset % 100,
      color: colors[index % colors.length]
    };
  });
}

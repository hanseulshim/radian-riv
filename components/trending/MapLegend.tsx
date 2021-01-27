import React from 'react'

export default function MapLegend() {
  return (
    <div className="legend-container">
      <span className="legend-title">Year/Year Median Percent Change:</span>
      <div className="item">
        <div className="swatch swatch1" />
        <span>20% +</span>
      </div>
      <div className="item">
        <div className="swatch swatch2" />
        <span>10 - 20%</span>
      </div>
      <div className="item">
        <div className="swatch swatch3" />
        <span>0 - 10%</span>
      </div>
      <div className="item">
        <div className="swatch swatch4" />
        <span>-10 - 0%</span>
      </div>
      <div className="item">
        <div className="swatch swatch5" />
        <span>-20 - -10%</span>
      </div>
      <div className="item">
        <div className="swatch swatch6" />
        <span> &lt; - 20%</span>
      </div>
    </div>
  )
}

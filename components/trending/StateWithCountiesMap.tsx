import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Alert from 'components/common/Alert'
import * as d3 from 'd3'
import { getStateGeoJson, getCountiesGeoJson } from 'api'
import MapLegend from './MapLegend'

const width = 1100
const height = 850
const projection = d3.geoAlbersUsa().translate([width / 2, height / 2])

const path = d3.geoPath().projection(projection)

export default function StateWithCountiesMap() {
  const [stateGeo, setStateGeo] = useState(null)
  const [countyGeo, setCountyGeo] = useState(null)
  const [zoomLevel, setZoomLevel] = useState(null)
  const [error, setError] = useState(null)
  const router = useRouter()
  const { state: routerState } = router.query

  useEffect(() => {
    const getGeoJson = async () => {
      try {
        const stateJson = await getStateGeoJson(routerState as string)
        setStateGeo(stateJson)
        const countyJson = await getCountiesGeoJson(routerState as string)
        setCountyGeo(countyJson)
      } catch (e) {
        setError('There was a problem loading the Geo Json data.')
      }
    }
    getGeoJson()
  }, [])

  useEffect(() => {
    if (stateGeo) {
      const bounds = path.bounds(stateGeo),
        dx = bounds[1][0] - bounds[0][0],
        dy = bounds[1][1] - bounds[0][1],
        x = (bounds[0][0] + bounds[1][0]) / 2,
        y = (bounds[0][1] + bounds[1][1]) / 2,
        scale = 0.9 / Math.max(dx / width, dy / height),
        translate = [width / 2 - scale * x, height / 2 - scale * y]

      d3.selectAll('g')
        .transition()
        .duration(750)
        .style('stroke-width', 1.5 / scale + 'px')
        .attr('transform', 'translate(' + translate + ')scale(' + scale + ')')

      setZoomLevel(scale)
    }
  }, [stateGeo])

  const getCountyFill = (num: number) => {
    if (num < -0.2) {
      return '#76143b'
    } else if (num >= -0.2 && num <= -0.1) {
      return '#bd2042'
    } else if (num > -0.1 && num <= 0) {
      return '#bd6720'
    } else if (num > 0 && num <= 0.1) {
      return '#a8bf31'
    } else if (num > 0.1 && num <= 0.2) {
      return '#42c675'
    } else if (num > 0.2) {
      return '#068e26'
    }
  }

  const handleClick = (county: any) => {
    router.push(`/trending/${routerState}/${county.properties.COUNTY_ID}`)
  }

  if (error) {
    return <Alert type={'error'} message={error} />
  }

  return (
    <div className="map-container">
      <MapLegend />
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <g className="state">
          {countyGeo &&
            countyGeo.map((county, i) => {
              return (
                <React.Fragment key={'county' + i}>
                  <path
                    d={d3.geoPath().projection(projection)(county)}
                    fill={getCountyFill(
                      county.properties.MEDIAN_PERCENT_CHANGE
                    )}
                    stroke="black"
                    strokeWidth={0.05}
                    className="county"
                    id={`${
                      county.properties.STATE_CODE + county.properties.GEO_ID
                    }`}
                    onClick={() => handleClick(county)}
                  />
                </React.Fragment>
              )
            })}

          {countyGeo &&
            countyGeo.map((county, i) => {
              return (
                <React.Fragment key={'countyLabel' + i}>
                  <text
                    x={path.centroid(county)[0]}
                    y={path.centroid(county)[1]}
                    fontSize={`${12 / zoomLevel}px`}
                    textAnchor="middle"
                    fill={'black'}
                    fontWeight="800"
                    onMouseOver={e => {
                      d3.select(
                        `#${
                          county.properties.STATE_CODE +
                          county.properties.GEO_ID
                        }`
                      ).classed('active', true)
                    }}
                    onMouseOut={e => {
                      d3.select(
                        `#${
                          county.properties.STATE_CODE +
                          county.properties.GEO_ID
                        }`
                      ).classed('active', false)
                    }}
                    onClick={() => handleClick(county)}
                  >
                    {county.properties.NAME}
                  </text>
                </React.Fragment>
              )
            })}
        </g>
      </svg>
    </div>
  )
}

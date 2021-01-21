import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Alert from 'components/common/Alert'
import * as d3 from 'd3'
import { getUsaMap } from 'api'

const width = 1100
const height = 850
const projection = d3
  .geoAlbersUsa()
  .translate([width / 2, height / 2])
  .scale([1000])
const path = d3.geoPath().projection(projection)

export default function UnitedStatesMap() {
  const [geographies, setGeographies] = useState([])
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const getMapData = async () => {
      try {
        const geoJson = await getUsaMap()
        setGeographies(geoJson)
      } catch (e) {
        setError('There was a problem loading the Geo Json data.')
      }
    }
    getMapData()
  }, [])

  const getStateFill = (num: number) => {
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

  const handleClick = (d: any) => {
    router.push(`/trending/${d.properties.postal}`)
  }

  const renderStates = (d: any) => {
    const { abbrev, name, medianPctChange } = d.properties
    const lineLength = 50
    const labelOffset = 15
    const statesThatNeedLines = [
      'Mass.',
      'N.H.',
      'N.J.',
      'D.C.',
      'Del.',
      'Conn.',
      'R.I.'
    ]

    const getLabelXPosition = d => {
      if (abbrev === 'Mich.' || abbrev === 'Fla.') {
        return path.centroid(d)[0] + 10
      } else if (abbrev === 'La.') {
        return path.centroid(d)[0] - 10
      } else if (statesThatNeedLines.includes(abbrev)) {
        if (abbrev === 'Mass.') {
          return path.centroid(d)[0] + (lineLength - 20) + labelOffset
        }
        return path.centroid(d)[0] + lineLength + labelOffset
      } else return path.centroid(d)[0]
    }

    const getLabelYPosition = d => {
      if (abbrev === 'Mich.') {
        return path.centroid(d)[1] + 20
      } else if (statesThatNeedLines.includes(abbrev)) {
        if (['Mass.', 'Del.', 'R.I.'].includes(abbrev)) {
          return path.centroid(d)[1] + 3.5 - 5
        }
        return path.centroid(d)[1] + 3.5
      } else return path.centroid(d)[1]
    }

    const getLine = d => {
      if (statesThatNeedLines.includes(abbrev)) {
        if (['Mass.', 'Del.', 'R.I.'].includes(abbrev)) {
          if (abbrev === 'Mass.') {
            return (
              <line
                x1={path.centroid(d)[0]}
                x2={path.centroid(d)[0] + (lineLength - 25)}
                y1={path.centroid(d)[1] - 5}
                y2={path.centroid(d)[1] - 5}
                stroke="black"
              ></line>
            )
          } else
            return (
              <line
                x1={path.centroid(d)[0]}
                x2={path.centroid(d)[0] + lineLength}
                y1={path.centroid(d)[1] - 5}
                y2={path.centroid(d)[1] - 5}
                stroke="black"
              ></line>
            )
        } else
          return (
            <line
              x1={path.centroid(d)[0]}
              x2={path.centroid(d)[0] + lineLength}
              y1={path.centroid(d)[1]}
              y2={path.centroid(d)[1]}
              stroke="black"
            ></line>
          )
      } else return null
    }

    return (
      <React.Fragment key={'state' + name}>
        <path
          key={`path-${name}`}
          d={d3.geoPath().projection(projection)(d)}
          className="state"
          fill={getStateFill(medianPctChange)}
          stroke="#FFFFFF"
          strokeWidth={0.75}
          onClick={() => handleClick(d)}
        />
        {getLine(d)}
        <text
          x={getLabelXPosition(d)}
          y={getLabelYPosition(d)}
          fontSize={statesThatNeedLines.includes(abbrev) ? '.6em' : '.5em'}
          textAnchor="middle"
          fill={
            statesThatNeedLines.includes(abbrev) || abbrev === 'Hawaii'
              ? 'black'
              : 'white'
          }
          fontWeight="800"
          className="state-label"
          onClick={() => handleClick(d)}
        >
          {abbrev}
        </text>
      </React.Fragment>
    )
  }

  if (error) {
    return <Alert type={'error'} message={error} />
  }

  return (
    <div className="usa-map-container">
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
      <svg width={width} height={height} viewBox="270 150 600 600">
        <g className="usa">{geographies.map((d, i) => renderStates(d))}</g>
      </svg>
    </div>
  )
}

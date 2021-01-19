import React, { useEffect, useState } from 'react'
import { useTrending } from 'context/trending/TrendingProvider'
import {
  ComposedChart,
  Line,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import Checkbox from 'components/common/Checkbox'
import { getSupplyChart, ChartParam } from 'api'
import DownloadData from '../DownloadData'

interface Props {
  view: string
}

export default function SupplyChart({ view }: Props) {
  const {
    selectedState,
    selectedCounty,
    selectedZip,
    selectedMsa,
    selectedType
  } = useTrending()
  const [data, setData] = useState<ChartParam[]>([])
  const [range, setRange] = useState('5Yr')
  const [seriesState, setSeriesState] = useState({
    Sold: true,
    'Active Listings': false,
    'U/C': false
  })
  const [dataModal, setDataModal] = useState(false)
  const closeModal = () => {
    setDataModal(!dataModal)
  }
  const formatXAxis = (date: Date): string =>
    date.toLocaleDateString('en-NY', {
      month: 'short',
      year: '2-digit'
    })
  const formatLabel = (date: Date): string =>
    `Period: ${date.toLocaleDateString('en-NY', {
      month: '2-digit',
      year: 'numeric'
    })}`
  useEffect(() => {
    const getChartData = async () => {
      const chartData = await getSupplyChart({
        range,
        state: selectedState.value,
        county: selectedCounty?.value || null,
        zip: selectedZip?.value || null,
        type: selectedType?.value || null,
        msa: selectedMsa?.value || null
      })
      setData(chartData)
    }
    getChartData()
  }, [
    selectedState,
    selectedCounty,
    selectedZip,
    selectedMsa,
    selectedType,
    range
  ])

  if (!data.length) {
    return null
  }

  const rangeOptions = ['3M', '6M', '1Yr', '5Yr', 'Max']
  const getChartPadding = () => {
    let padding = 10
    if (range === '3M') {
      padding = 300
    } else if (range === '6M') {
      padding = 150
    } else if (range === '1Yr') {
      padding = 75
    } else if (range === '5Yr') {
      padding = 30
    }
    return { left: padding, right: padding }
  }
  const renderChartComponents = () => {
    const { Sold: sold, 'Active Listings': active, 'U/C': uc } = seriesState
    const chartComponents = []
    const maxBarSize = 300
    const chartBuilder = {
      firstBar: {
        label: '',
        color: '#D2A171'
      },
      secondBar: {
        label: '',
        color: '#C4D078'
      },
      thirdBar: {
        label: '',
        color: '#C19A54'
      },
      firstLine: {
        label: 'Months to Supply',
        color: '#44356F'
      }
    }
    if (sold && !active && !uc) {
      chartBuilder.firstBar.label = 'Sold Distressed Properties'
      chartBuilder.secondBar.label = 'Sold Non Distressed Properties'
    } else if (!sold && active && !uc) {
      chartBuilder.firstBar.label = 'Distressed Active Listings'
      chartBuilder.secondBar.label = 'NonDistressed Active Listings'
    } else if (!sold && !active && uc) {
      chartBuilder.firstBar.label = 'U/C Distressed Properties'
      chartBuilder.secondBar.label = 'U/C NonDistressed Properties'
    } else if (sold && active && !uc) {
      chartBuilder.firstBar.label = 'Sold Properties'
      chartBuilder.firstBar.color = '#DBCF7B'
      chartBuilder.secondBar.label = 'Active Listings'
      chartBuilder.secondBar.color = '#BCAF8C'
    } else if (sold && !active && uc) {
      chartBuilder.firstBar.label = 'Sold Properties'
      chartBuilder.firstBar.color = '#DBCF7B'
      chartBuilder.secondBar.label = 'U/C Listings'
      chartBuilder.secondBar.color = '#C19A54'
    } else if (!sold && active && uc) {
      chartBuilder.firstBar.label = 'Active Listings'
      chartBuilder.firstBar.color = '#DBCF7B'
      chartBuilder.secondBar.label = 'U/C Listings'
      chartBuilder.secondBar.color = '#C19A54'
    } else {
      chartBuilder.firstBar.label = 'Sold Properties'
      chartBuilder.firstBar.color = '#DBCF7B'
      chartBuilder.secondBar.label = 'Active Listings'
      chartBuilder.secondBar.color = '#BCAF8C'
      chartBuilder.thirdBar.label = 'U/C Listings'
      chartBuilder.thirdBar.color = '#C19A54'
    }
    for (const [key, { label, color }] of Object.entries(chartBuilder)) {
      if (label) {
        chartComponents.push(
          key.includes('Bar') ? (
            <Bar
              key={label}
              dataKey={label}
              fill={color}
              yAxisId="left"
              stackId="a"
              maxBarSize={maxBarSize}
            />
          ) : (
            <Line
              key={label}
              dataKey={label}
              stroke={color}
              yAxisId="right"
              type="monotone"
              strokeWidth={2}
              dot={false}
            />
          )
        )
      }
    }
    return chartComponents
  }
  return (
    <>
      <div className="chart">
        <ul className="range-selector">
          {rangeOptions.map(opt => (
            <li
              key={opt}
              onClick={() => setRange(opt)}
              className={opt === range ? 'active' : ''}
            >
              {opt}
            </li>
          ))}
        </ul>
        <h4 className="chart-title">Supply County: {selectedCounty.label}</h4>
        <ResponsiveContainer width="100%" height={500}>
          <ComposedChart data={data} margin={{ left: 50, right: 50 }}>
            <XAxis
              dataKey="date"
              tickFormatter={formatXAxis}
              minTickGap={50}
              padding={getChartPadding()}
            />
            <YAxis
              yAxisId="left"
              label={{
                value: '# of Change',
                angle: -90,
                position: 'center',
                dx: -50
              }}
              tickCount={10}
            />
            <YAxis
              orientation="right"
              yAxisId="right"
              label={{
                value: 'Months Supply',
                angle: 90,
                position: 'center',
                dx: 50
              }}
              tickCount={10}
            />
            <Tooltip labelFormatter={formatLabel} />
            <CartesianGrid stroke="#f5f5f5" />
            {renderChartComponents()}
          </ComposedChart>
        </ResponsiveContainer>
        <div className="checkbox-row">
          {Object.keys(seriesState).map(series => (
            <Checkbox
              key={series}
              label={`${series}`}
              checked={seriesState[series]}
              onChange={e =>
                setSeriesState({
                  ...seriesState,
                  [series]: e.target.checked
                })
              }
            />
          ))}
        </div>
      </div>
      <button
        className="btn btn-primary download-data"
        onClick={() => setDataModal(!dataModal)}
      >
        Download Data
      </button>
      {dataModal && (
        <DownloadData closeModal={closeModal} view={view} range={range} />
      )}
    </>
  )
}

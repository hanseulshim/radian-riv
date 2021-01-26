import React, { useEffect, useState } from 'react'
import { useTrending } from 'context/TrendingProvider'
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
import numeral from 'numeral'
import Checkbox from 'components/common/Checkbox'
import { getListedSoldChart, ChartParam } from 'api'
import DownloadData from '../DownloadData'

interface Props {
  view: string
}

export default function Listed({ view }: Props) {
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
    'Active Listings': true,
    'New Listings': false,
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
  const formatTooltip = (num: number, name: string): [string, string] => {
    const formatted = name.includes('Price')
      ? numeral(num).format('$0,0[.]00')
      : num.toString()
    return [formatted, name]
  }
  const formatYAxisLeft = (num: number): string => numeral(num).format('0,0')
  const formatYAxisRight = (num: number): string =>
    numeral(num).format('0[.]0a')
  const formatLabel = (date: Date): string =>
    `Period: ${date.toLocaleDateString('en-NY', {
      month: '2-digit',
      year: 'numeric'
    })}`
  useEffect(() => {
    const getChartData = async () => {
      const chartData = await getListedSoldChart({
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
    const {
      'Active Listings': active,
      'New Listings': newListings,
      'U/C': uc
    } = seriesState
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
        label: '',
        color: '#4d3c7c'
      },
      secondLine: {
        label: '',
        color: '#7f0000'
      },
      thirdLine: {
        label: '',
        color: '#ec5700'
      }
    }
    if (active && !newListings && !uc) {
      chartBuilder.firstBar.label = 'Active Listed Distressed Properties'
      chartBuilder.secondBar.label = 'Active Listed NonDistressed Properties'
      chartBuilder.firstLine.label = 'Active Listed Median Price'
    } else if (!active && newListings && !uc) {
      chartBuilder.firstBar.label = 'New Listings Distressed'
      chartBuilder.secondBar.label = 'New Listings NonDistressed'
      chartBuilder.secondLine.label = 'New Listings Median Price'
    } else if (!active && !newListings && uc) {
      chartBuilder.firstBar.label = 'U/C Distressed Properties'
      chartBuilder.secondBar.label = 'U/C NonDistressed Properties'
      chartBuilder.thirdLine.label = 'U/C Median Price'
    } else if (active && newListings && !uc) {
      chartBuilder.firstBar.label = 'New Listings'
      chartBuilder.firstBar.color = '#e0d582'
      chartBuilder.secondBar.label = 'Active Listings'
      chartBuilder.secondBar.color = '#c4b895'
      chartBuilder.secondLine.label = 'New Listings Median Price'
      chartBuilder.firstLine.label = 'Active Listed Median Price'
    } else if (active && !newListings && uc) {
      chartBuilder.firstBar.label = 'U/C Listings'
      chartBuilder.firstBar.color = '#c9a45a'
      chartBuilder.secondBar.label = 'Active Listings'
      chartBuilder.secondBar.color = '#c4b895'
      chartBuilder.thirdLine.label = 'U/C Median Price'
      chartBuilder.firstLine.label = 'Active Listed Median Price'
    } else if (!active && newListings && uc) {
      chartBuilder.firstBar.label = 'U/C Listings'
      chartBuilder.firstBar.color = '#c9a45a'
      chartBuilder.secondBar.label = 'New Listings'
      chartBuilder.secondBar.color = '#e0d582'
      chartBuilder.thirdLine.label = 'U/C Median Price'
      chartBuilder.secondLine.label = 'New Listings Median Price'
    } else {
      chartBuilder.firstBar.label = 'U/C Listings'
      chartBuilder.firstBar.color = '#c9a45a'
      chartBuilder.secondBar.label = 'New Listings'
      chartBuilder.secondBar.color = '#e0d582'
      chartBuilder.thirdBar.label = 'Active Listings'
      chartBuilder.thirdBar.color = '#c4b895'
      chartBuilder.thirdLine.label = 'U/C Median Price'
      chartBuilder.secondLine.label = 'New Listings Median Price'
      chartBuilder.firstLine.label = 'Active Listed Median Price'
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
        <h4 className="chart-title">Listed County: {selectedCounty.label}</h4>
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
                value: 'Listed',
                angle: -90,
                position: 'center',
                dx: -50
              }}
              tickCount={10}
              tickFormatter={formatYAxisLeft}
            />
            <YAxis
              orientation="right"
              yAxisId="right"
              label={{
                value: 'Median List Price',
                angle: 90,
                position: 'center',
                dx: 50
              }}
              tickCount={10}
              tickFormatter={formatYAxisRight}
            />
            <Tooltip labelFormatter={formatLabel} formatter={formatTooltip} />
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
        className="btn btn-small download-data"
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

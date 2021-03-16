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
import Checkbox from 'components/common/Checkbox'
import { getDomChart, ChartParam } from 'api'
import DownloadData from '../DownloadData'

export default function DomChart() {
  const {
    selectedState,
    selectedCounty,
    selectedZip,
    selectedMsa,
    selectedType
  } = useTrending()
  const [data, setData] = useState<ChartParam[]>([])
  const [tableData, setTableData] = useState([])
  const [range, setRange] = useState('5Yr')
  const [seriesState, setSeriesState] = useState({
    Sold: true,
    'Active Listings': false,
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
  const formatLabel = (date: Date): string =>
    `Period: ${date.toLocaleDateString('en-NY', {
      month: '2-digit',
      year: 'numeric'
    })}`
  useEffect(() => {
    const getChartData = async () => {
      const { chartData, tableData } = await getDomChart({
        range,
        state: selectedState.value as string,
        county: (selectedCounty?.value as string) || null,
        zip: (selectedZip?.value as string) || null,
        type: (selectedType?.value as string) || null,
        msa: (selectedMsa?.value as string) || null
      })
      setData(chartData)
      setTableData(tableData)
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
      Sold: sold,
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
        color: '#BCAF8C'
      },
      fourthBar: {
        label: '',
        color: '#C19A54'
      },
      firstLine: {
        label: '',
        color: '#27703F'
      },
      secondLine: {
        label: '',
        color: '#44356F'
      },
      thirdLine: {
        label: '',
        color: '#E7511D'
      },
      fourthLine: {
        label: '',
        color: '#878349'
      }
    }
    if (sold && !active && !newListings && !uc) {
      chartBuilder.firstBar.label = 'DOM - Distressed Sold Properties'
      chartBuilder.secondBar.label = 'DOM - Non Distressed Sold Properties'
      chartBuilder.firstLine.label = 'DOM - Sold Properties'
    } else if (!sold && active && !newListings && !uc) {
      chartBuilder.firstBar.label = 'Distressed Active Listings'
      chartBuilder.secondBar.label = 'NonDistressed Active Listings'
      chartBuilder.secondLine.label = 'DOM - Active Listings'
    } else if (!sold && !active && newListings && !uc) {
      chartBuilder.firstBar.label = 'New Listings Distressed'
      chartBuilder.secondBar.label = 'New Listings NonDistressed'
      chartBuilder.fourthLine.label = 'DOM - New Listings'
    } else if (!sold && !active && !newListings && uc) {
      chartBuilder.firstBar.label = 'U/C Distressed Properties'
      chartBuilder.secondBar.label = 'U/C NonDistressed Properties'
      chartBuilder.thirdLine.label = 'DOM - U/C Listings'
    } else if (sold && active && !newListings && !uc) {
      chartBuilder.firstBar.label = 'Sold Properties'
      chartBuilder.firstBar.color = '#DBCF7B'
      chartBuilder.thirdBar.label = 'Active Listings'
      chartBuilder.firstLine.label = 'DOM - Sold Properties'
      chartBuilder.secondLine.label = 'DOM - U/C Listings'
    } else if (sold && !active && newListings && !uc) {
      chartBuilder.firstBar.label = 'New Listings'
      chartBuilder.thirdBar.label = 'Sold Properties'
      chartBuilder.firstLine.label = 'DOM - Sold Properties'
      chartBuilder.fourthLine.label = 'DOM - New Listings'
    } else if (sold && !active && !newListings && uc) {
      chartBuilder.firstBar.label = 'Sold Properties'
      chartBuilder.firstBar.color = '#DBCF7B'
      chartBuilder.fourthBar.label = 'U/C Listings'
      chartBuilder.firstLine.label = 'DOM - Sold Properties'
      chartBuilder.thirdLine.label = 'DOM - U/C Listings'
    } else if (!sold && active && newListings && !uc) {
      chartBuilder.firstBar.label = 'New Listings'
      chartBuilder.thirdBar.label = 'Active Listings'
      chartBuilder.secondLine.label = 'DOM - Active Listings'
      chartBuilder.fourthLine.label = 'DOM - U/C Listings'
    } else if (!sold && active && !newListings && uc) {
      chartBuilder.thirdBar.label = 'Active Listings'
      chartBuilder.fourthBar.label = 'U/C Listings'
      chartBuilder.secondLine.label = 'DOM - Active Listings'
      chartBuilder.thirdLine.label = 'DOM - U/C Listings'
    } else if (!sold && !active && newListings && uc) {
      chartBuilder.firstBar.label = 'New Listings'
      chartBuilder.fourthBar.label = 'U/C Listings'
      chartBuilder.thirdLine.label = 'DOM - U/C Listings'
      chartBuilder.fourthLine.label = 'DOM - New Listings'
    } else if (sold && active && newListings && !uc) {
      chartBuilder.firstBar.label = 'New Listings'
      chartBuilder.secondBar.label = 'Sold Properties'
      chartBuilder.secondBar.color = '#DBCF7B'
      chartBuilder.thirdBar.label = 'U/C Listings'
      chartBuilder.firstLine.label = 'DOM - Sold Properties'
      chartBuilder.secondLine.label = 'DOM - Active Listings'
      chartBuilder.fourthLine.label = 'DOM - New Listings'
    } else if (!sold && active && newListings && uc) {
      chartBuilder.firstBar.label = 'New Listings'
      chartBuilder.thirdBar.label = 'Active Listings'
      chartBuilder.fourthBar.label = 'U/C Listings'
      chartBuilder.secondLine.label = 'DOM - Active Listings'
      chartBuilder.thirdLine.label = 'DOM - U/C Listings'
      chartBuilder.fourthLine.label = 'DOM - New Listings'
    } else {
      chartBuilder.firstBar.label = 'New Listings'
      chartBuilder.secondBar.label = 'Sold Properties'
      chartBuilder.secondBar.color = '#DBCF7B'
      chartBuilder.thirdBar.label = 'Active Listings'
      chartBuilder.fourthBar.label = 'U/C Listings'
      chartBuilder.firstLine.label = 'DOM - Sold Properties'
      chartBuilder.secondLine.label = 'DOM - Active Listings'
      chartBuilder.thirdLine.label = 'DOM - U/C Listings'
      chartBuilder.fourthLine.label = 'DOM - New Listings'
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
              strokeWidth={3}
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
        <h4 className="chart-title">DOM County: {selectedCounty.label}</h4>
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
                value: '# of Units',
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
                value: 'DOM',
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
        className="btn btn-small download-data"
        onClick={() => setDataModal(!dataModal)}
      >
        Download Data
      </button>
      {dataModal && (
        <DownloadData closeModal={closeModal} tableData={tableData} />
      )}
    </>
  )
}

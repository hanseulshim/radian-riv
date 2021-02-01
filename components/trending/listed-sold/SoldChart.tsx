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
import { formatPrice, formatValue } from 'utils'
import { getListedSoldChart, ChartParam } from 'api'
import DownloadData from '../DownloadData'
interface Props {
  view: string
}

export default function SoldChart({ view }: Props) {
  const {
    selectedState,
    selectedCounty,
    selectedZip,
    selectedMsa,
    selectedType
  } = useTrending()
  const [data, setData] = useState<ChartParam[]>([])
  const [range, setRange] = useState('5Yr')

  const [dataModal, setDataModal] = useState(false)
  const closeModal = () => {
    setDataModal(!dataModal)
  }
  const formatXAxis = (date: Date): string =>
    date.toLocaleDateString('en-NY', {
      month: 'short',
      year: '2-digit'
    })
  const formatYAxisLeft = (num: number): string => formatValue(num)
  const formatYAxisRight = (num: number): string => formatValue(num, true)
  const formatTooltip = (num: number, name: string): [string, string] => {
    const formatted = name.includes('Price') ? formatPrice(num) : num.toString()
    return [formatted, name]
  }

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
        <h4 className="chart-title">Sold County: {selectedCounty.label}</h4>
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
                value: 'Sold',
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
                value: 'Median Sold Price',
                angle: 90,
                position: 'center',
                dx: 50
              }}
              tickCount={10}
              tickFormatter={formatYAxisRight}
            />
            <Tooltip labelFormatter={formatLabel} formatter={formatTooltip} />
            <CartesianGrid stroke="#f5f5f5" />
            <Bar
              key={'Sold NonDistressed Properties'}
              dataKey={'Sold NonDistressed Properties'}
              fill={'#cad67f'}
              yAxisId="left"
              stackId="a"
              maxBarSize={300}
            />
            <Bar
              key={'Sold Distressed Properties'}
              dataKey={'Sold Distressed Properties'}
              fill={'#c9a45a'}
              yAxisId="left"
              stackId="a"
              maxBarSize={300}
            />
            <Line
              key={'Sold Median Price'}
              dataKey={'Sold Median Price'}
              stroke={'#ec5700'}
              yAxisId="right"
              type="monotone"
              strokeWidth={2}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
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

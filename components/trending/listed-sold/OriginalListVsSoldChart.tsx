import React, { useEffect, useState } from 'react'
import { useTrending } from 'context/TrendingProvider'
import {
  ComposedChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { getListedSoldPercentChart, ChartParam } from 'api'
import { formatPercent } from 'utils'
import DownloadData from '../DownloadData'

export default function OriginalListVsSoldChart() {
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

  const [dataModal, setDataModal] = useState(false)
  const closeModal = () => {
    setDataModal(!dataModal)
  }
  const formatXAxis = (date: Date): string =>
    date.toLocaleDateString('en-NY', {
      month: 'short',
      year: '2-digit'
    })
  const formatYAxis = (num: number): string => formatPercent(num)
  const formatLabel = (date: Date): string =>
    `Period: ${date.toLocaleDateString('en-NY', {
      month: '2-digit',
      year: 'numeric'
    })}`
  const formatTooltip = (num: number, name: string): [string, string] => {
    const formatted = name.includes('%') ? formatPercent(num) : num.toString()
    return [formatted, name]
  }
  useEffect(() => {
    const getChartData = async () => {
      const { chartData, tableData } = await getListedSoldPercentChart({
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
        <h4 className="chart-title">
          Original List % Change VS Final Sold Price: {selectedCounty.label}
        </h4>
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
                value: '% Change',
                angle: -90,
                position: 'center',
                dx: -50
              }}
              tickCount={10}
              tickFormatter={formatYAxis}
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
            <Tooltip labelFormatter={formatLabel} formatter={formatTooltip} />
            <CartesianGrid stroke="#f5f5f5" />
            <Line
              key={'Current List To Final Sold % Change'}
              dataKey={'Current List To Final Sold % Change'}
              stroke={'#ec5800'}
              yAxisId="left"
              type="monotone"
              strokeWidth={2}
              dot={false}
            />
            <Line
              key={'Original List To Final Sold % Change'}
              dataKey={'Original List To Final Sold % Change'}
              stroke={'#4b7b8e'}
              yAxisId="left"
              type="monotone"
              strokeWidth={2}
              dot={false}
            />
            <Line
              key={'DOM - Sold Properties'}
              dataKey={'DOM - Sold Properties'}
              stroke={'#94c53e'}
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
        <DownloadData closeModal={closeModal} tableData={tableData} />
      )}
    </>
  )
}

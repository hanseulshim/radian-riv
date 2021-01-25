import React, { useEffect, useState } from 'react'
import { useTrending } from 'context/TrendingProvider'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import Checkbox from 'components/common/Checkbox'
import { getHomePriceChart, ChartParam } from 'api'
import numeral from 'numeral'
import DownloadData from '../DownloadData'

export default function AnnualChangeChart() {
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
    state: true,
    msa: false,
    county: false,
    zip: false
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
  const formatYAxis = (num: number): string => numeral(num).format('0%')
  const formatLabel = (date: Date): string =>
    `Period: ${date.toLocaleDateString('en-NY', {
      month: '2-digit',
      year: 'numeric'
    })}`
  const formatTooltip = (num: number, name: string): [string, string] => [
    numeral(num).format('0[.]0%'),
    name
  ]
  useEffect(() => {
    const getChartData = async () => {
      const chartData = await getHomePriceChart({
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
  useEffect(() => {
    setSeriesState({
      ...seriesState,
      county: !!selectedCounty,
      zip: !!selectedZip,
      msa: !!selectedMsa
    })
  }, [selectedCounty, selectedZip, selectedMsa])

  const checkDisabled = (series: string): boolean => {
    if (series === 'county') {
      return !selectedCounty
    } else if (series === 'zip') {
      return !selectedZip
    } else if (series === 'msa') {
      return !selectedMsa
    }
    return false
  }

  if (!data.length) {
    return null
  }

  const rangeOptions = ['3M', '6M', '1Yr', '5Yr', 'Max']
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
        <h4 className="chart-title">Home Price - Annual % Change</h4>
        <ResponsiveContainer width="100%" height={500}>
          <LineChart data={data} margin={{ left: 50, right: 20 }}>
            <XAxis dataKey="date" tickFormatter={formatXAxis} minTickGap={50} />
            <YAxis
              label={{
                value: 'Annual % Change',
                angle: -90,
                position: 'center',
                dx: -50
              }}
              tickFormatter={formatYAxis}
            />
            <Tooltip labelFormatter={formatLabel} formatter={formatTooltip} />
            <CartesianGrid stroke="#f5f5f5" />
            {seriesState.state && (
              <Line
                name="State"
                type="monotone"
                dataKey="state"
                stroke="#88BD43"
                strokeWidth={2}
                dot={false}
              />
            )}
            {seriesState.county && (
              <Line
                name="County"
                type="monotone"
                dataKey="county"
                stroke="#EB461B"
                strokeWidth={2}
                dot={false}
              />
            )}
            {seriesState.zip && (
              <Line
                name="Zip"
                type="monotone"
                dataKey="zip"
                stroke="#640F17"
                strokeWidth={2}
                dot={false}
              />
            )}
            {seriesState.msa && (
              <Line
                name="MSA"
                type="monotone"
                dataKey="msa"
                stroke="#87824A"
                strokeWidth={2}
                dot={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
        <div className="checkbox-row">
          {Object.keys(seriesState).map(series => (
            <Checkbox
              key={series}
              label={`${series.toUpperCase()} (MLS)`}
              checked={seriesState[series]}
              onChange={e =>
                setSeriesState({
                  ...seriesState,
                  [series]: e.target.checked
                })
              }
              disabled={checkDisabled(series)}
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
        <DownloadData closeModal={closeModal} range={range} view="Home Price" />
      )}
    </>
  )
}

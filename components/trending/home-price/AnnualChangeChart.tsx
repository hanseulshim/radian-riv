import React, { useEffect, useState } from 'react'
import { useTrending } from 'context/trending/TrendingProvider'
import {
  LineChart,
  Legend,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts'
import { getHomePriceChart, ChartParam } from 'api'

const options = {
  month: 'short',
  day: 'numeric'
}

export default function AnnualChangeChart() {
  const {
    selectedState,
    selectedCounty,
    selectedZip,
    selectedMsa,
    selectedType
  } = useTrending()
  const [data, setData] = useState<ChartParam[]>([])
  const formatXAxis = item => {
    const date = new Date(item)
    return date.toLocaleDateString('en-NY', options)
  }
  useEffect(() => {
    const getChartData = async () => {
      const chartData = await getHomePriceChart({
        range: '5',
        state: '5',
        county: '5',
        zip: '5',
        type: '5',
        msa: null
      })
      setData(chartData)
    }
    getChartData()
  }, [selectedState, selectedCounty, selectedZip, selectedMsa, selectedType])
  return (
    <div className="chart">
      <h4 className="chart-title">Home Price - Annual % Change</h4>
      <LineChart
        width={1000}
        height={500}
        data={data}
        margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="date" tickFormatter={formatXAxis} />
        <YAxis
          label={{
            value: 'Annual % Change',
            angle: -90,
            position: 'insideLeft'
          }}
        />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        {selectedState && (
          <Line name="state" type="monotone" dataKey="state" stroke="#ff7300" />
        )}
        {selectedCounty && (
          <Line name="county" type="monotone" dataKey="county" stroke="green" />
        )}
        {selectedZip && (
          <Line name="zip" type="monotone" dataKey="zip" stroke="red" />
        )}
        {selectedMsa && (
          <Line name="msa" type="monotone" dataKey="msa" stroke="black" />
        )}
      </LineChart>
    </div>
  )
}

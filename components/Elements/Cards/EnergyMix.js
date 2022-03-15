import React from 'react'
import { PieChart } from 'react-minimal-pie-chart'

const EnergyMix = (props) => {
  const data = props.data.map((e, i) => ({
    color: `rgba(202, 26, 124, ${1 / (i + 1)})`,
    title: e.source,
    value: e.percent,
  }))

  return (
    <PieChart
      animate={true}
      data={data}
      label={({ dataEntry }) => dataEntry.title}
      labelPosition={60}
      labelStyle={{ fill: 'white', fontSize: '10px' }}
      lineWidth={70}
      viewBoxSize={[150, 150]}
    />
  )
}

export default EnergyMix

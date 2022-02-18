import { Pie } from '@ant-design/plots'
import React from 'react'

const EnergyMix = (props) => {
  const data = props.data.map((e) => ({ type: e.source, value: e.percent }))
  const config = {
    autoFit: false,
    appendPadding: 0,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    height: 120,
    label: {
      type: 'inner',
      offset: '-30%',
      content: null,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'legend-filter',
        enable: false,
      },
    ],
  }

  return <Pie {...config} />
}

export default EnergyMix

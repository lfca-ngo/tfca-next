import { Pie } from '@ant-design/plots'
import React from 'react'

const EnergyMix = (props) => {
  const data = props.data.map((e) => ({ type: e.source, value: e.percent }))
  const config = {
    angleField: 'value',
    appendPadding: 0,
    autoFit: false,
    colorField: 'type',
    data,
    height: 120,
    interactions: [
      {
        enable: false,
        type: 'legend-filter',
      },
    ],
    label: {
      content: null,
      offset: '-30%',
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
      type: 'inner',
    },
    radius: 0.8,
  }

  return <Pie {...config} />
}

export default EnergyMix

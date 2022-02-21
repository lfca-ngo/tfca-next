import Icon, {
  ArrowLeftOutlined,
  AuditOutlined,
  BankOutlined,
  CalculatorFilled,
  CarOutlined,
  CheckCircleFilled,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloudServerOutlined,
  CoffeeOutlined,
  CommentOutlined,
  CrownOutlined,
  EnvironmentFilled,
  EuroCircleFilled,
  FileDoneOutlined,
  GlobalOutlined,
  HeartOutlined,
  HomeOutlined,
  LikeFilled,
  LikeOutlined,
  RocketOutlined,
  ShareAltOutlined,
  SmileOutlined,
  SoundFilled,
  TeamOutlined,
  ThunderboltOutlined,
  UserOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import React from 'react'

import IconEnergy from '../assets/icons/energy.svg'

const MAP = {
  bank: <BankOutlined />,
  check: <CheckCircleFilled />,
  climate_activism: <LikeFilled />,
  comment: <CommentOutlined />,
  companyPledge: <FileDoneOutlined />,
  completeClimateNeutrality: <LikeOutlined />,
  ecosia: <GlobalOutlined />,
  flightPolicy: <GlobalOutlined />,
  green_finances: <EuroCircleFilled />,
  greenBusinessModel: <SmileOutlined />,
  greenDigital: <CloudServerOutlined />,
  measure_reduce: <CalculatorFilled />,
  officeReductionChampion: <CrownOutlined />,
  offsetPrivateEmployeeFootprint: <HeartOutlined />,
  personalPledge: <UserOutlined />,
  politics: <CommentOutlined />,
  renewableEnergy: <ThunderboltOutlined />,
  responsibleSupplychain: <ShareAltOutlined />,
  share_deck: <SoundFilled />,
  supportClimateDemos: <TeamOutlined />,
  sustainabilityClause: <RocketOutlined />,
  sustainableBanking: <BankOutlined />,
  sustainablePensionFund: <AuditOutlined />,
  switch_energy: <Icon component={IconEnergy} />,
  switch_energy_generic: <Icon component={IconEnergy} />,
  veggyFood: <CoffeeOutlined />,
  warning: <WarningOutlined />,
}

const CustomIcon = ({ name }) => {
  if (!name || !MAP[name]) return null
  return MAP[name]
}

export default CustomIcon

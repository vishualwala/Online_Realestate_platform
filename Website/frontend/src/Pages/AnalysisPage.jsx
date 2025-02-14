import React from 'react'
import LocationAnalysis from '../Components/Analysis/LocationAnalysis'
import ScatterPlot from '../Components/Analysis/ScatterPlot'
import BarPlot from '../Components/Analysis/Barplot'
import Poster from '../Components/Analysis/Poster'
import PieChart from '../Components/Analysis/PieChart'
import BoxPlot from '../Components/Analysis/BoxPlot'

const AnalysisPage = () => {
  return (
    <>
      <Poster />
      <LocationAnalysis />
      <hr />
      <ScatterPlot />
      <hr />
      <BoxPlot/>
      <hr />
      <PieChart />
      <hr />
      <BarPlot />
      
      
      

    </>
  )
}

export default AnalysisPage
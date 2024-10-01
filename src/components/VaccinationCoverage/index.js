import './index.css'
import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

const VaccinationCoverage = props => {
  const {data} = props

  const dataFormat = num => {
    if (num > 1000) {
      return `${(num / 1000).toString()}K`
    }
    return num.toString()
  }

  return (
    <div className="vaccination-div">
      <h1>Vaccination Coverage</h1>
      <BarChart data={data} width={1000} height={500}>
        <Bar
          dataKey="dose1"
          name="Dose 1"
          fill="#5a8dee"
          radius={[8, 8, 0, 0]}
        />
        <Bar
          dataKey="dose2"
          name="Dose 2"
          fill="#f54394"
          radius={[8, 8, 0, 0]}
        />
        <XAxis
          dataKey="vaccineDate"
          tick={{stroke: 'gray', strokeWidth: 0.2}}
        />
        <YAxis
          tickFormatter={dataFormat}
          tick={{stroke: 'gray', strokeWidth: 0.2}}
        />
        <Legend />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage

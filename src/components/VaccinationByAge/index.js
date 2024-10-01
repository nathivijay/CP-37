import './index.css'
import {PieChart, Pie, Cell, Legend} from 'recharts'

const VaccinationByAge = props => {
  const {data} = props

  return (
    <div className="vaccination-div">
      <h1>Vaccination by Age</h1>

      <PieChart width={1000} height={500}>
        <Pie data={data} dataKey="count">
          <Cell name="18-44" fill="#2d87bb" />
          <Cell name="44-60" fill="#a3df9f" />
          <Cell name="Above 60" fill="#64c2a6" />
        </Pie>
        <Legend iconType="circle" />
      </PieChart>
    </div>
  )
}

export default VaccinationByAge

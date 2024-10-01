import './index.css'
import {PieChart, Pie, Cell, Legend} from 'recharts'

const VaccinationByGender = props => {
  const {data} = props

  return (
    <div className="vaccination-div">
      <h1>Vaccination by gender</h1>

      <PieChart width={1000} height={500}>
        <Pie
          cy="70%"
          data={data}
          dataKey="count"
          startAngle={180}
          endAngle={0}
          innerRadius="50%"
          outerRadius="80%"
        >
          <Cell name="Male" fill="#f54394" />
          <Cell name="Female" fill="#5a8dee" />
          <Cell name="Others" fill="#2cc6c6" />
        </Pie>
        <Legend iconType="circle" />
      </PieChart>
    </div>
  )
}

export default VaccinationByGender

import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

const apiStatusCodes = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PRORESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {apiStatus: apiStatusCodes.initial, data: []}

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({apiStatus: apiStatusCodes.inProgress})
    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(vaccinationDataApiUrl)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        last7DaysVaccination: data.last_7_days_vaccination.map(eachData => ({
          vaccineDate: eachData.vaccine_date,
          dose1: eachData.dose_1,
          dose2: eachData.dose_2,
        })),
        vaccinationByAge: data.vaccination_by_age.map(range => ({
          age: range.age,
          count: range.count,
        })),
        vaccinationByGender: data.vaccination_by_gender.map(eachGender => ({
          count: eachGender.count,
          gender: eachGender.gender,
        })),
      }
      this.setState({apiStatus: apiStatusCodes.success, data: updatedData})
    } else {
      this.setState({apiStatus: apiStatusCodes.failure})
    }
  }

  renderSuccessView = () => {
    const {data} = this.state
    return (
      <>
        <VaccinationCoverage data={data.last7DaysVaccination} />
        <VaccinationByGender data={data.vaccinationByGender} />
        <VaccinationByAge data={data.vaccinationByAge} />
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-div">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderProgressView = () => (
    <div data-testid="loader" className="loader-div">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusCodes.success:
        return this.renderSuccessView()
      case apiStatusCodes.failure:
        return this.renderFailureView()
      case apiStatusCodes.inProgress:
        return this.renderProgressView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-div">
        <div className="logo-div">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <h1>Co-WIN</h1>
        </div>
        <h1 className="main-div-main-head">CoWIN Vaccination in India</h1>
        {this.renderView()}
      </div>
    )
  }
}

export default CowinDashboard

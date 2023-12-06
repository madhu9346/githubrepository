import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusList = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  process: 'PROCESS',
}

class GithubPopularRepos extends Component {
  state = {
    oneLanguage: 'ALL',
    languagesList: [],
    apiStatus: apiStatusList.initial,
  }

  componentDidMount() {
    this.getLanguages()
  }

  getLanguages = async () => {
    const {oneLanguage} = this.state
    this.setState({apiStatus: apiStatusList.process})

    const url = `https://apis.ccbp.in/popular-repos?language=${oneLanguage}`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const list = data.popular_repos.map(each => ({
        name: each.name,
        avatarUrl: each.avatar_url,
        forksCount: each.forks_count,
        id: each.id,
        issuesCount: each.issues_count,
        starsCount: each.stars_count,
      }))
      this.setState({languagesList: list, apiStatus: apiStatusList.success})
    } else {
      this.setState({apiStatus: apiStatusList.failure})
    }
  }

  changeLanguageFiltersData = id => {
    this.setState({oneLanguage: id})
    this.getLanguages()
  }

  loadingCon = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  allDetails = () => {
    const {languagesList} = this.state
    return (
      <ul className="con">
        {languagesList.map(each => (
          <RepositoryItem eachItem={each} key={each.id} />
        ))}
      </ul>
    )
  }

  failureView = () => (
    <div className="mmm">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="madhu"
        alt="failure view"
      />
      <h1 className="main-heading">Not Found</h1>
    </div>
  )

  languageFilterItem = () => (
    <ul className="unOrderContainer">
      {languageFiltersData.map(each => (
        <LanguageFilterItem
          eachItem={each}
          key={each.id}
          changeOneLanguage={this.changeLanguageFiltersData}
        />
      ))}
    </ul>
  )

  apiStatusComponent = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'SUCCESS':
        return this.allDetails()
      case 'FAILURE':
        return this.failureView()
      case 'PROCESS':
        return this.loadingCon()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-container">
        <h1 className="main-heading">Popular</h1>
        {this.languageFilterItem()}
        <div className="loadingContainer">{this.apiStatusComponent()}</div>
      </div>
    )
  }
}
export default GithubPopularRepos

import './index.css'

const LanguageFilterItem = props => {
  const {eachItem, changeOneLanguage} = props
  const {id, language} = eachItem

  const changeLanguage = () => {
    changeOneLanguage(id)
  }

  return (
    <li className="listItems">
      <button type="button" className="btn" onClick={changeLanguage}>
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem

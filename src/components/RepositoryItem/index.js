import './index.css'

const RepositoryItem = props => {
  const {eachItem} = props
  const {name, avatarUrl, forksCount, issuesCount, starsCount} = eachItem
  return (
    <li className="listItems">
      <img src={avatarUrl} className="images" alt={name} />
      <h1 className="head1">{name}</h1>
      <div className="container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          className="imagesList"
          alt="stars"
        />
        <p className="para">{starsCount}</p>
        <p className="para1">stars</p>
      </div>
      <div className="container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          className="imagesList"
          alt="forks"
        />
        <p className="para">{forksCount}</p>
        <p className="para1">forks</p>
      </div>
      <div className="container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          className="imagesList"
          alt="open issues"
        />
        <p className="para">{issuesCount}</p>
        <p className="para1">open Issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem

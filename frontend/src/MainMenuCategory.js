import React from 'react'
import './MainMenuCategory.css'
import MenuItem from './MainMenuItem'


class MainMenuCategory extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <li key={this.props.data.name + 'li'} className='MainMenuCategory'>
        <span className='header'>{this.props.data.name}</span>
        <ul key={this.props.data.name + 'ul'}>
          {this.createLinks(this.props.data.links)}
        </ul>
      </li>
    )
  }

  createLinks(links) {
    return (
      links.map((value, index) => {
        return this.renderMenuItem(value, index)
      })
    )  
  }

  renderMenuItem(name, index) {
    return(
      <MenuItem name={name} index={index} key={name + 'item'}/>
    )
  }
  
}



export default MainMenuCategory;

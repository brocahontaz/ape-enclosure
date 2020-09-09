import React from 'react'
import './MainMenu.css'
import MenuCategory from './MainMenuCategory'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

class MainMenu extends React.Component {
  constructor(props) {
    super(props)
    this.menuCategories = [
      {name: 'General', links: ['Dashboard', 'Roster', 'Settings', 'Help']},
      {name: 'Spreadsheet', links: ['Open Sheet', 'Update']},
      {name: 'Raids', links: ['Calendar', 'Attendence', 'Loot']}
    ]
  }
  render() {
    return (
      <div className="MainMenu">
        <Router>
          <nav>
            <ul>
              {this.createMenu()}
            </ul>
          </nav> 
        </Router>
      </div>
    )
  }

  createMenu() {
    return(
      this.menuCategories.map((value, index) => {
        return this.renderMenuCategory(value, index)
      })
    )
  }

  renderMenuCategory(data, index) {
    return(
      <MenuCategory data={data} index={index} key={data.name + 'cat'}/>
    )
  }

  
}

export default MainMenu

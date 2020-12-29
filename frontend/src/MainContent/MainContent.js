import React from 'react'
import { Switch, Route } from 'react-router-dom'

import './MainContent.css'

import Sidebar from './Sidebar'
import Home from './Home'
import Roster from './Roster'
import Team from './Team'
import Characters from './Characters'
import ContentWrapper from './ContentWrapper'

const MainContent = () => 
  <main className='MainContent'>
    <Sidebar />
    <ContentWrapper>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/roster' component={Roster} />
        <Route path='/team' component={Team} />
        <Route path='/characters' component={Characters} />
      </Switch>
    </ContentWrapper>
  </main>

export default MainContent
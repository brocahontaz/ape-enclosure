import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import Roster from './Roster'

const MainContent = () => 
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route  path='/roster' component={Roster} />
    </Switch>
  </main>

export default MainContent
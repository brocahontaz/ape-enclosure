import React from 'react'
import './MainContent.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

class MainContent extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <main>
        <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
        </Router>
      </main>
    )
  }
}

function Home() {
  return(
    <div>
      hej
    </div>
  )
}


export default MainContent;

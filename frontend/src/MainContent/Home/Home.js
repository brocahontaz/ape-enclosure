import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as icon from '@fortawesome/free-solid-svg-icons'

import './Home.css'

import ContentBox from 'MainContent/components/ContentBox'

const Home = () =>
  <div className='Home'>
    <h2><FontAwesomeIcon icon={icon.faAnchor}/> Ape Enclosure Dashboard</h2>
    <ContentBox header='Keystones'>
      hej
    </ContentBox>
    <ContentBox header='Twitch'>
      hej
    </ContentBox>
    <ContentBox header='YouTube'>
      hej
    </ContentBox>
    <ContentBox header='Warcraftlogs'>
      hej
    </ContentBox>
  </div>

export default Home
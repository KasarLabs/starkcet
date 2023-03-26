import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import styled from 'styled-components';

function Footer() {
  return (
    <Main>
      <p>Powered by <a href="https://starknet.io" target={'_blank'} className="outlineLink" rel="noreferrer noopener">Starknet</a> and <a href="https://kasar.io/" target={'_blank'} className="outlineLink" rel="noreferrer noopener">KasarLabs</a></p>
      <LogoRaw>
        <a href="https://twitter.com/kasarlabs"> <FontAwesomeIcon icon={faTwitter} size="1x" color='#000' /></a>
        <a href="https://github.com/kasarlabs"> <FontAwesomeIcon icon={faGithub} size="1x" color='#000' /></a>
      </LogoRaw>
    </Main>
  )
}

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  z-index: 10;
background-color: #fff;
`

const LogoRaw = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`

export default Footer
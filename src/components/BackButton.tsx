import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from '@emotion/styled'

const BackButtonSvg = styled.svg`
  width: 60px;
  height: 60px;
  padding-left: 40px;
  padding-top: 40px;
  position: fixed;
  cursor: pointer;

  .arrow {
    stroke: #fff;
    stroke-width: 32;
  }

  &:hover {
    .arrow {
      animation: dash 0.5s linear forwards;
      stroke-dasharray: 1100;
      stroke-dashoffset: 1100;
    }
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0;
    }
  }
`

const BackButton: React.FC<{}> = () => {
  const history = useHistory()

  return (
    <BackButtonSvg
      onClick={() => history.goBack()}
      id="back-button"
      viewBox="-30 0 536 506"
    >
      <path
        className="arrow"
        fill="none"
        d="
          M378.56,221.28
          L250.56,221.28
          L250.56,80.416
          L0,253.28
          L250.56,426.144
          L250.56,285.28
        "
      />
      <rect fill="white" x="410" y="205" width="32" height="32" />
      <rect fill="white" x="474" y="205" width="32" height="32" />
    </BackButtonSvg>
  )
}

export default BackButton

import React from "react";
import styled from "styled-components";
import { Typography, Icon } from "antd";
import MediaQuery from "react-responsive";
import { COLORS } from "../data/constants";
import Map from "./Map";

const { Title, Paragraph } = Typography;

const MapContainer = styled.div`
  position: relative;
`;
const Legend = styled.div`
  width: 300px;
  height: 200px;
  position: absolute;
  bottom: 0;
  left: 0;
  background: #7a7979;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const ColorSquare = styled.div`
  background: ${props => props.color};
  width: 30px;
  height: 20px;
  margin-right: 10px;
`;

const LegendItemStyle = styled.div`
  color: white;
  display: flex;
  padding-left: 20px;
`;

const LegendItem = ({ initialRange, finalRange }) => {
  let color;
  if (initialRange === 0) {
    color = COLORS.GREEN;
  } else if (initialRange === 31) {
    color = COLORS.YELLOW;
  } else {
    color = COLORS.RED;
  }

  return (
    <LegendItemStyle className="LegendItemStyle">
      <ColorSquare color={color} className="ColorSquare" />
      <Paragraph style={{ color: "white" }}>
        {initialRange}% - {finalRange}% below proficiency
      </Paragraph>
    </LegendItemStyle>
  );
};

const HelpButtonStyle = styled.div`
  position: absolute;
  bottom: 120px;
  right: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const HelpButton = ({ openModal }) => (
  <HelpButtonStyle
    className="HelpButton"
    onClick={() => {
      openModal();
    }}
  >
    <Icon
      type="question-circle"
      theme="twoTone"
      twoToneColor="#52c41a"
      style={{ fontSize: "40px" }}
    />
  </HelpButtonStyle>
);

export default ({
  children,
  height,
  selectedDataSet,
  openModal,
  selectedDataset,
  selectedScores,
  selectedDistrictCoordinates,
  switchSchoolAndFetch,
  selectedSchoolCoordinates
}) => (
  <MapContainer>
    <Map
      height={height}
      selectedDataset={selectedDataset}
      selectedDistrictCoordinates={selectedDistrictCoordinates}
      selectedScores={selectedScores}
      switchSchoolAndFetch={switchSchoolAndFetch}
      selectedSchoolCoordinates={selectedSchoolCoordinates}
    >
      {children}
    </Map>
    <Legend className="Legend">
      <LegendItem initialRange={0} finalRange={30}></LegendItem>
      <LegendItem initialRange={31} finalRange={50}></LegendItem>
      <LegendItem initialRange={51} finalRange={100}></LegendItem>
    </Legend>
    <MediaQuery maxWidth={768}>
      <HelpButton openModal={openModal} />
    </MediaQuery>
  </MapContainer>
);

import React, { useState, useEffect, useContext } from "react";
import AppContext from "components/App/AppContext";
import { FixedSizeList as List } from "react-window";
import DateSlider from "components/DateSlider";
import Switch from "@material-ui/core/Switch";

import {
  PatientContainer,
  Button,
  InfoContaner,
  Name,
  Address,
  Note,
  PatientGroup,
  LAT,
  LNG,
  VerifyDate,
  SliderContainer,
} from "./Patient.style";

const Patient = React.forwardRef((props, ref) => {
  const [selected1, setSelected1] = useState(
    new Date("2019-12-08T00:00:00").getTime()
  );
  const [selected2, setSelected2] = useState(new Date().getTime());
  const [autoPlay, setAutoPlay] = useState(false);
  
  const {
    patients,
    activePatient,
    setActivePatient,
    updateAllData,
  } = useContext(AppContext);

  useEffect(() => {
    updateAllData(selected1, selected2);
  }, [selected1, selected2]);

  const onClick = (e, data) => {
    setActivePatient(data);
  };

  const handleChangeSwitch = (e) => {
    setAutoPlay(e.target.checked);
    if (e.target.checked) {
      window.intervalId1 = setInterval(() => {
        Patient.s1 += 86400000;
        setSelected1(Patient.s1)
        if (Patient.s1 >=new Date().getTime()) {
          Patient.s1 = new Date("2019-12-08T00:00:00").getTime();
          clearInterval(window.intervalId1);
          setAutoPlay(false);
          setSelected1(Patient.s1)
        }
      }, 50);
    } else {
      Patient.s1 = new Date("2019-12-08T00:00:00").getTime();
      clearInterval(window.intervalId1);
    }
  }

  const renderItems = ({ index, style, data }) => (
    <Button
      key={index}
      onClick={(e) => onClick(e, data[index])}
      style={style}
      className={`${activePatient?.index === index ? "active" : ""}`}
    >
      {data[index].name}
    </Button>
  );

  return (
    <PatientContainer>
      <List
        ref={ref}
        height={300}
        width={300}
        itemData={patients}
        itemCount={patients.length}
        itemSize={50}
      >
        {renderItems}
      </List>
      <InfoContaner>
        {activePatient && (
          <>
            <Name>Name: {activePatient.name}</Name>
            <Address>Address: {activePatient.address}</Address>
            <Note>Note: {activePatient.note}</Note>
            <PatientGroup>
              Patient Group: {activePatient.patientGroup}
            </PatientGroup>
            <LAT>Latitude: {activePatient.lat}</LAT>
            <LNG>Longitude: {activePatient.lng}</LNG>
            <VerifyDate>Verify date: {activePatient.verifyDate}</VerifyDate>
          </>
        )}
      </InfoContaner>
      <SliderContainer>
        <DateSlider
          value={[selected1, selected2]}
          onChange={[setSelected1, setSelected2]}
          max={new Date().getTime()}
          min={new Date("2019-12-08T00:00:00").getTime()}
        />
        <Switch
          checked={autoPlay}
          onChange={handleChangeSwitch}
          color="primary"
          name="checkedB"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </SliderContainer>
    </PatientContainer>
  );
});

Patient.s1 = new Date("2019-12-08T00:00:00").getTime();
export default Patient;

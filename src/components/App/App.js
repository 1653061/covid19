import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Loading from "components/Loading";
import Patient from "components/Patient";
import AppContext from "./AppContext";
import { Map, AppContainer } from "./App.style";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [patients, setPatient] = useState([]);
  const [activePatient, setActivePatient] = useState(null);
  const listRef = useRef(null);
  useEffect(() => {
    const platform = new window.H.service.Platform({
      apikey: process.env.REACT_APP_API_KEY,
    });

    var defaultLayers = platform.createDefaultLayers();

    window.map = new window.H.Map(
      document.getElementById("map"),
      defaultLayers.vector.normal.map,
      {
        center: { lat: 50, lng: 5 },
        zoom: 4,
        pixelRatio: window.devicePixelRatio || 1,
      }
    );

    const behavior = new window.H.mapevents.Behavior(
      new window.H.mapevents.MapEvents(window.map)
    );

    window.ui = window.H.ui.UI.createDefault(window.map, defaultLayers);

    window.addEventListener("resize", onWindowResize);
    window.onload = () => {
      axios
        .get(
          "https://cors-anywhere.herokuapp.com/https://maps.vnpost.vn/apps/covid19/api/patientapi/list"
        )
        .then((res) => {
          const data = res?.data?.data.sort((item1, item2) => {
            return new Date(item2.verifyDate).getTime() / 1000 - new Date(item1.verifyDate).getTime() / 1000
          }).map((item, index) => {
            return { ...item, index };
          });

          const newData = data.map((item, index) => {
            const marker = new window.H.map.Marker({
              lat: item.lat,
              lng: item.lng,
            });
            marker.setData(
              `<div>${item.name} -  ${item.patientGroup}`
            );

            let bubble;
            marker.addEventListener("pointerdown", (evt) => {
              updateActivePatient(item);
              bubble = new window.H.ui.InfoBubble(evt.target.getGeometry(), {
                content: evt.target.getData(),
              });
              window.ui.addBubble(bubble);
            });

            window.map.addObject(marker);
            return {
              ...item,
              marker,
            }
          });

          window.data = newData;
          setPatient(newData);
          setActivePatient(newData[0]);
          window.map.setCenter({ lat: newData[0].lat, lng: newData[0].lng });
          window.map.setZoom(5);
          setLoading(false);
        });
      window.map.setCenter({ lat: 10.762622, lng: 106.660172 });
      window.map.setZoom(5);
    };

    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  const updateAllData = (selected1, selected2) => {
    if (window.data) {
      const newData = window.data.filter((data) => {
        const verifyDate = new Date(data.verifyDate).getTime();
        const start = selected2 > selected1 ? selected1 : selected2;
        const end = selected2 > selected1 ? selected2 : selected1;
        if (verifyDate >= start && verifyDate <= end) {
          data.marker.setVisibility(true);
          return data;
        } else {
          data.marker.setVisibility(false);
        }
        return null;
      }).filter(item => item);
      if (newData?.length) {
        setActivePatient(newData[0]);
      } else {
        setActivePatient(null);
      }
      setPatient(newData);
    }
  }

  const onWindowResize = () => {
    window.map.getViewPort().resize();
  };

  const updateActivePatient = (data) => {
    setActivePatient(data);
    listRef.current.scrollToItem(data.index, 'center');
    window.map.setCenter({ lat: data.lat, lng: data.lng });
    window.map.setZoom(5);
  };
  const contextValue = {
    activePatient,
    setActivePatient: updateActivePatient,
    patients,
    updateAllData,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <AppContainer>
        <Loading loading={loading} />
        <Map id="map"></Map>
        <Patient ref={listRef} />
      </AppContainer>
    </AppContext.Provider>
  );
};

export default App;

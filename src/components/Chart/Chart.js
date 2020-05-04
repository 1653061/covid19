import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Line } from "react-chartjs-2";
import Loading from "components/Loading";
import { LineWrapper, LineContent } from "./Chart.style";

const Chart = () => {
  const [dataVN, setDataVN] = useState(null);
  const [dataTG, setDataTG] = useState(null);

  useEffect(() => {
    axios.get("https://td.fpt.ai/corona/corona-total.json").then((res) => {
      const sortedDate = Object.keys(res.data).sort(
        (a, b) =>
          moment(a.date).format("YYYYMMDD") - moment(b.date).format("YYYYMMDD")
      );
      const nhiem = [];
      const nghiNhiem = [];
      const hoiPhuc = [];
      sortedDate.forEach((value) => {
        const data = res.data[value];
        nhiem.push(data[0]);
        nghiNhiem.push(data[1]);
        hoiPhuc.push(data[2]);
      });
      setDataTG({
        labels: sortedDate,
        nhiem,
        nghiNhiem,
        hoiPhuc,
      });
    });
    axios.get("https://td.fpt.ai/corona/corona-chart-vn.json").then((res) => {
      const sortedDate = Object.keys(res.data).sort(
        (a, b) =>
          moment(a.date).format("YYYYMMDD") - moment(b.date).format("YYYYMMDD")
      );
      const nhiem = [];
      const nghiNhiem = [];
      const hoiPhuc = [];
      sortedDate.forEach((value) => {
        const data = res.data[value];
        nhiem.push(data[0]);
        nghiNhiem.push(data[1]);
        hoiPhuc.push(data[2]);
      });
      setDataVN({
        labels: sortedDate,
        nhiem,
        nghiNhiem,
        hoiPhuc,
      });
    });
  }, []);
  return !dataVN || !dataTG ? (
    <Loading loading={true} />
  ) : (
    <>
      <LineWrapper>
        <LineContent>
          <Line
            data={{
              labels: dataVN?.labels,
              datasets: [
                {
                  data: dataVN?.nhiem,
                  label: "Nhiem",
                  borderColor: "#3e95cd",
                  fill: false,
                },
                {
                  data: dataVN?.nghiNhiem,
                  label: "Nghi Nhiem",
                  borderColor: "#8e5ea2",
                  fill: false,
                },
                {
                  data: dataVN?.hoiPhuc,
                  label: "Hoi Phuc",
                  borderColor: "#3cba9f",
                  fill: false,
                },
              ],
            }}
          />
        </LineContent>
        <LineContent>
          <Line
            data={{
              labels: dataTG?.labels,
              datasets: [
                {
                  data: dataTG?.nhiem,
                  label: "Nhiem",
                  borderColor: "#3e95cd",
                  fill: false,
                },
                {
                  data: dataTG?.nghiNhiem,
                  label: "Nghi Nhiem",
                  borderColor: "#8e5ea2",
                  fill: false,
                },
                {
                  data: dataTG?.hoiPhuc,
                  label: "Hoi Phuc",
                  borderColor: "#3cba9f",
                  fill: false,
                },
              ],
            }}
          />
        </LineContent>
      </LineWrapper>
    </>
  );
};

export default Chart;

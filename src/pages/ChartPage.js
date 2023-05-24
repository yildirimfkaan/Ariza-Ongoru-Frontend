import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner, Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
// import menu from "../data/menu";
// import userData from "../data/userData";
// import { ethers } from "ethers";
// import Web3 from "web3";
// import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import UPFormControl from "./FormControl";
import userData from "../data/userData";
import { id } from "ethers/lib/utils";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function ChartPage({ ...props }) {
  const { history } = props;

  const [deger, setDeger] = useState([]);
  const [barColor, setBarColor] = useState("#003399");

  const actualTableData = [
    {
      id: 1,
      name: "St1",
      no: 7500,
      time: 7150,
    },
    {
      id: 2,
      name: "St2",
      no: 7500,
      time: 7456,
    },
    {
      id: 3,
      name: "St3",
      no: 7500,
      time: 7901,
    },
    {
      id: 4,
      name: "St4",
      no: 7500,
      time: 7308,
    },
    {
      id: 5,
      name: "St5",
      no: 7500,
      time: 7308,
    },
    {
      id: 6,
      name: "St6",
      no: 7500,
      time: 7845,
    },
    {
      id: 7,
      name: "St7",
      no: 7500,
      time: 7145,
    },
    {
      id: 8,
      name: "St8",
      no: 7500,
      time: 7045,
    },
    {
      id: 9,
      name: "St9",
      no: 7500,
      time: 7645,
    },
    {
      id: 10,
      name: "St10",
      no: 7500,
      time: 7445,
    },
    {
      id: 11,
      name: "St11",
      no: 7500,
      time: 7745,
    },
    {
      id: 12,
      name: "St12",
      no: 7500,
      time: 7995,
    },
    {
      id: 13,
      name: "St13",
      no: 7500,
      time: 7608,
    },
    {
      id: 14,
      name: "St14",
      no: 7500,
      time: 7408,
    },
    {
      id: 15,
      name: "St15",
      no: 7500,
      time: 7108,
    },
    {
      id: 16,
      name: "St16",
      no: 7500,
      time: 7008,
    },
    {
      id: 17,
      name: "St17",
      no: 7500,
      time: 7808,
    },
    {
      id: 18,
      name: "St18",
      no: 7500,
      time: 7608,
    },
  ];

  const hidrolicTank = [
    {
      id: 1,
      name: "Tank 1",
      no: 7000,
      heat: 225,
      pressure: 520,
    },
    {
      id: 2,
      name: "Tank 2",
      no: 7314,
      heat: 256,
      pressure: 450,
    },
    {
      id: 3,
      name: "Tank 3",
      no: 7123,
      heat: 175,
      pressure: 550,
    },
    {
      id: 4,
      name: "Tank 4",
      no: 7345,
      heat: 160,
      pressure: 500,
    },
    {
      id: 5,
      name: "Tank 5",
      no: 7345,
      heat: 190,
      pressure: 475,
    },
    {
      id: 6,
      name: "Tank 6",
      no: 7345,
      heat: 240,
      pressure: 490,
    },
  ];

  const [tableData, setTableData] = useState(actualTableData);

  const [editingRow, setEditingRow] = useState(null);
  const [errorColor,setErrorColor]=useState('white')

  const addTableRow = (payload) => {
    console.log(payload.number);
    console.log(payload);
    setDeger(payload);
    const totalRow = tableData.length;
    payload.id = totalRow + 1;
    payload.no = Number(payload.number);
    console.log(payload);
    const updatedTableData = [...tableData];
    updatedTableData.push(payload);
    setTableData(updatedTableData);
  };
  console.log(userData);
  const [state, setState] = useState({
    data: {
      name: "",
      surname: "",
      number: "",
    },
    errors: {},
  });

  const handleChange = (e) => {
    console.log(e.target.value, state.data, e.target.id);
    setState({
      data: {
        ...state.data,
        [e.target.id]: e.target.value,
      },
      errors: {
        ...state.errors,
        [e.target.id]: "",
      },
    });
  };

  const { data, errors } = state;
  console.log(data);
  console.log(deger);

  //düzenleme formu
  const handleEdit = (id) => {
    console.log(id);
    const rowToEdit = tableData.find((row) => row.id === id);
    setEditingRow(rowToEdit);
  };

  const handleDelete = (id, e) => {
    console.log("id:", id, "event:", e);
    let copy = [...tableData];
    console.log(
      "filtered copy",
      copy.filter((item, index) => id !== item.id)
    );
    setTableData(copy.filter((item, index) => id !== item.id));
  };

  //düzenleme formunu kaydetme kısmı
  const handleSave = () => {
    const updatedData = tableData.map((row) =>
      row.id === editingRow.id ? editingRow : row
    );
    setTableData(updatedData);
    setEditingRow(null);
  };
  console.log(tableData);
  
  const CustomTooltip = ({ active, payload, label  }) => {
    if (active && payload && payload.length) {
      console.log(payload)
      return (<>
        <div className="mx-5">Station/Time</div>
        <AreaChart
          width={600}
          height={200}
          data={tableData}
          margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
          
        >
          <defs>
            <linearGradient id="colorSt1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSt2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#005000" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#005000" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSt3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#cfea61" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#cfea61" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSt4" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#710000" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#710000" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSt5" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7c7496" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#7c7496" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="time"
            stroke="#005000"
            fillOpacity={0.7}
            fill="url(#colorSt2)"
          />

          <Area
            type="monotone"
            dataKey="no"
            stroke="#710000"
            fillOpacity={0.7}
            fill="url(#colorSt4)"
          />
          <AreaChart
            type="monotone"
            dataKey="id"
            stroke="#7c7496"
            fillOpacity={0.7}
            fill="url(#colorSt5)"
          />
        </AreaChart>
       
        <div className="custom-tooltip mx-5 mt-0 mb-0" >
        <p className="label" style={{color:"#000000"}}>{`${label} : Heat: ${payload[0].value} Pressure: ${payload[1].value} `}</p>

      </div>
      
        </>
      );
    }

    return null;
  };
  const CustomTooltip_Error_Spotter = ({ active, payload, label  }) => {
    if (active && payload && payload.length) {
      
      
      
      if(payload[0].value> payload[1].value){
        setErrorColor("red")
      }
      else{
        setErrorColor("")
      }
      return (<>
        <div className="custom-tooltip mx-5"  >
        <p className="label" style={{color:"#000000",backgroundColor:errorColor}}>{`${label} : Time: ${payload[0].value}  `}</p>
        {/* <p className="label" style={{color:"cyan"}}>{`Threshold: ${payload[1].value}  `}</p> */}

      </div>
      
        </>
      );
    }

    return null;
  };

  return (
    <>
    <h4 className="d-flex justify-content-center"></h4>
      <AreaChart
        width={1200}
        height={200}
        data={tableData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        className="mx-2 mt-5"
      >
        <defs>
          <linearGradient id="colorSt1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorSt2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#710000" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#710000" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorSt3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#cfea61" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#cfea61" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorSt4" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#005000" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#005000" stopOpacity={1} />
          </linearGradient>
          <linearGradient id="colorSt5" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#7c7496" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#7c7496" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="time"
          stroke="#710000"
          fillOpacity={0.6}
          fill="url(#colorSt2)"
        />

        <Area
          type="monotone"
          dataKey="no"
          stroke="#005000"
          fillOpacity={0.6}
          fill="url(#colorSt4)"
        />
        <Area
          type="monotone"
          dataKey="id"
          stroke="#7c7496"
          fillOpacity={0.7}
          fill="url(#colorSt5)"
        />
      </AreaChart>
      {/* <BarChart width={1300} height={250} data={tableData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis dataKey="no" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="no" stroke="#ff7300" />
        <Bar dataKey="time" fill="#8080ff" />
      </BarChart> */}      
     { console.log("hey",tableData.map((object, i) => {
            if (object.time > object.no) {
              console.log(object.time>object.no)
              return "#990000";
            } else {
              return "#003399";
            }
          }))}
      {/* { (tableData.map((object, i) => {
            if (object.time > object.no) {
  
              return "#990000";
            } else {
              return "#003399";
            }
          })) } */}

<h4 className="d-flex justify-content-center mt-5">İstasyon / Zaman Grafiği</h4>
      <ComposedChart width={1300} height={250} data={tableData} className="mx-2">
        <XAxis dataKey="name" />
        <YAxis  yAxisId="left" dataKey="no" />
        <YAxis  orientation="right" dataKey="no" />
        <Tooltip content={<CustomTooltip_Error_Spotter />}/>
        <Legend />
        <CartesianGrid stroke={"#f5f5f5"} />

        <Bar dataKey="time"
          barSize={20}
          fill="990000"
          >
            {tableData.map((object,i)=>(
              <Cell cursor="pointer" fill={object.time>object.no ? "990000" : "003999"}></Cell>
            ))}
          </Bar>
        <Line yAxisId="left" type="monotone" dataKey="no" stroke="#990000" />
      </ComposedChart>
      <h4 className="d-flex justify-content-center col-6 mt-5">Sıcaklık ve Basınç Grafiği</h4>
      <BarChart width={730} height={250} data={hidrolicTank} className="mx-2">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" dataKey="pressure" />
        <YAxis  orientation="right" dataKey="pressure" />
        <Tooltip
          // onClick={() => {
          //   tooltipClick();
          // }}
          content={<CustomTooltip/>}
          position={{ x: 750, y: -20 }}
        />
        <Legend />

        <Bar dataKey="heat" fill="#b300b3" />
        <Bar dataKey="pressure" fill="#009933" />
      </BarChart>
    </>
  );
}

export default ChartPage;

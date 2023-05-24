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

function TablePage1({ ...props }) {
  const { history } = props;
  const [isLoading, setLoading] = useState(false);
  const [recordData, setRecordData] = useState(false);

  const [deger, setDeger] = useState([]);

  const actualTableData =  [
    { id: 1, name: "ali", surname: "koç", no: 1 },
    { id: 2, name: "mauro", surname: "icardi", no: 2314 },
    { id: 3, name: "sergen", surname: "yalçın", no: 123 },
    { id: 4, name: "hami", surname: "mandıralı", no: 12345 },
  ]
  const [tableData, setTableData] = useState(actualTableData);

  const [editingRow, setEditingRow] = useState(null);

  const addTableRow = (payload) => {
    console.log(payload.number);
    console.log(payload)
    setDeger(payload);
    const totalRow = tableData.length;
    payload.id = totalRow + 1;
    payload.no = Number(payload.number)
    console.log(payload)
    const updatedTableData = [...tableData]
    updatedTableData.push(payload)
    setTableData(updatedTableData)
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
  const validate = () => {
    const { data } = state;
    const errors = {};

    if (data.name === "") errors.name = "Name cannot be blank.";
    if (data.surname === "") errors.surname = "Surname cannot be blank.";
    if (data.number === "") errors.number = "Number cannot be blank.";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { data } = state;
    const errors = validate();

    // const payload = {
    //   data,

    // };

    if (Object.keys(errors).length === 0) {
      console.log(data);
      addTableRow(data);
      setState({
        data: {
          name: "",
          surname: "",
          number: "",
        },
        errors: {},
      });
    } else {
      setState({
        errors,
      });
    }
  };

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
  console.log(data)
  console.log(deger)
  
 

  //düzenleme formu
  const handleEdit = (id) => {
    console.log(id)
    const rowToEdit = tableData.find((row) => row.id === id);
    setEditingRow(rowToEdit);
  };
  
  const handleDelete = (id,e) => {
    console.log("id:",id,"event:",e)
    let copy = [...tableData]
    console.log("filtered copy",copy.filter((item,index)=> id !== item.id))
    setTableData(copy.filter((item,index)=> id !== item.id)) 
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
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Cep No</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row,index) => (
            <tr key={row.id}>
              <td>{row.name}</td>
              <td>{row.surname}</td>
              <td>{row.no}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(row.id)}>Edit</Button>
              </td>
              <td>
                <Button variant="danger" onClick={(e) => handleDelete(row.id,e)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
        {/* render kısmı */}
        {editingRow && (
          <tfoot>
            <tr>
              <td colSpan="3">
                <Form onSubmit={handleSave}>
                  <input
                    type="text"
                    value={editingRow.name}
                    onChange={(e) =>
                      setEditingRow({ ...editingRow, name: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    value={editingRow.surname}
                    onChange={(e) =>
                      setEditingRow({ ...editingRow, surname: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    value={editingRow.no}
                    onChange={(e) =>
                      setEditingRow({ ...editingRow, no: e.target.value })
                    }
                  />
                  <Button type="submit" value="Save">
                    Kaydet
                  </Button>
                </Form>
              </td>
            </tr>
          </tfoot>
        )}
      </Table>

      <Button
        onClick={() => {
          setRecordData(true);
        }}
      >
        Aç
      </Button>
      {recordData ? (
        <Container className="col-6 mb-5 mt-5">
          <Form onSubmit={handleSubmit}>
            <UPFormControl
              label="Name"
              type="text"
              placeHolder="isim"
              value={data?.name}
              handleChange={handleChange}
              error={errors.name}
            />
            <UPFormControl
              label="Surname"
              type="text"
              placeHolder="soyisim"
              value={data?.surname}
              handleChange={handleChange}
              error={errors.surname}
            />
            <UPFormControl
              label="Number"
              type="number"
              placeHolder="numara"
              value={data?.number}
              handleChange={handleChange}
              error={errors.number}
            />
            <Button
              className="mb-4 mt-4 bg-unopad-primary col-sm-12"
              type="submit"
            >
              SignUp
            </Button>
          </Form>
        </Container>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default TablePage1;

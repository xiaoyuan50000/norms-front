import "../stylesheets/css/transportUnit.css";
import { useEffect, useRef, useState } from "react";
import DataTableComponent from "../components/transportUnit/table.jsx";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';

function TransportUnit() {
  const [transportOrder, setTransportOrder] = useState('');
  const [lastUpdate, setLastUpdate] = useState('');
  const [sourceDestination, setSourceDestination] = useState('');
  const [nextDestination, setNextDestination] = useState('');
  const [error, setError] = useState('');
  const [description, setDescription] = useState('');

  const [onSubmit, setOnSubmit] = useState(0);


  const handleSubmit = async (e) => {
    e.preventDefault();

    setOnSubmit(!onSubmit)
  }


  return (
    <div className="tu-div">
      <div className="card">
        <form onSubmit={handleSubmit}>
          <TextField
            className="inputCss"
            value={transportOrder}
            label="Transport Order"
            onChange={(e) => setTransportOrder(e.target.value)}
          />

          <DatePicker
            className="inputCss"
            label="Last Update"
            onChange={(e) => setLastUpdate(dayjs(e).format('YYYY-MM-DD'))}
          />

          <FormControl>
            <InputLabel>Source Destination</InputLabel>
            <Select
              className="inputCss"
              value={sourceDestination}
              onChange={(e) => setSourceDestination(e.target.value)}>
              <MenuItem value="Pallet_Conveyor">Pallet_Conveyor</MenuItem>
            </Select>
          </FormControl>


          <FormControl>
            <InputLabel>Next Destination</InputLabel>
            <Select
              className="inputCss"
              value={nextDestination}
              onChange={(e) => setNextDestination(e.target.value)}>
              <MenuItem value="AV">AV</MenuItem>
            </Select>
          </FormControl>

          <TextField
            className="inputCss"
            label="Error"
            value={error}
            onChange={(e) => setError(e.target.value)}
          />

          <TextField
            className="inputCss"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button
            className="buttonCss"
            variant="contained"
            type="submit">submit
          </Button>
        </form>
      </div>


      <div className="card">
        <div className="card-body">
          <DataTableComponent transportOrder={transportOrder} lastUpdate={lastUpdate} sourceDestination={sourceDestination} nextDestination={nextDestination} error={error} description={description} onSubmit={onSubmit} />
        </div>
      </div>
    </div >
  )
}

export default TransportUnit
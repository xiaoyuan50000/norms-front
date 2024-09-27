import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import './assets/main.css'
import './stylesheets/materialdesignicons.min.css'
import './stylesheets/vendor.bundle.base.css'
import './fonts/fontello-941f4311/css/fontello.css'
import './fonts/fontello-941f4311/css/animation.css'

import './stylesheets/dataTables.bootstrap4.css'
import './stylesheets/style.css'
import './stylesheets/common-style.css'
import 'rsuite/dist/rsuite.min.css';

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Router>
      <App />
    </Router>
  </LocalizationProvider>
)

/* eslint-disable prettier/prettier */
import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import {
  FormControl,
  Button,
  InputLabel,
  Select,
  TextField,
  CircularProgress,
  Chip,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios';
import MySnackBar from './components/MySnackBar';
import './Home.css';

interface InputSubmit {
  url: string;
  type: string;
}

interface Response {
  data: Array<string>;
  status: number;
  statusText: string;
}
// interface dataSubmit {
//   name: string;
//   value: string | number;
// }

function App(): JSX.Element {
  const [dataResponse, setDataResponse] = useState<Response>({
    data: [],
    status: 0,
    statusText: '',
  });
  const [statusTransaction, setStatusTransaction] = useState(false);
  const [state, setState] = useState<InputSubmit>({
    url: '',
    type: '',
  });
  const [statusStyle, setStatusStyle] = useState({
    color: '#FFF',
    borderColor: '#FFF',
  });

  // useEffect(() => {
  //   if (String(dataResponse.statusText) === '') {
  //     return setStatusStyle({
  //       color: '#FFF',
  //       borderColor: '#FFF',
  //     });
  //   }
  //   if (String(dataResponse.statusText) !== 'OK') {
  //     return setStatusStyle({
  //       color: '#E83B42',
  //       borderColor: '#E83B42',
  //     });
  //   }
  //   return setStatusStyle({
  //     color: '#33ff00',
  //     borderColor: '#33ff00',
  //   });
  // }, [statusStyle, dataResponse]);

  const handleChange: any = (
    event: ChangeEvent<{ name?: string; value: unknown }>,
  ) => {
    const name = event.target.name as keyof typeof state;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  async function handleSumbit(event: FormEvent): Promise<void> {
    event.preventDefault();
    setStatusTransaction(true);
    const { url, type } = state;
    if (type === '') {
      alert('Selecione um tipo de envio!');
    }
    if (url === '') {
      alert('Insira uma API!');
    }
    if (type === 'GET') {
      try {
        await axios.get(url).then((response: any) => {
          setDataResponse(response);
        });
      } catch (error) {
        const errorRequest = String(error).substring(7);
        if (errorRequest !== 'Network Error') {
          const typeError = errorRequest.substring(0, errorRequest.length - 21);
          const codeError = errorRequest.substring(errorRequest.length - 3);
          setDataResponse({
            data: [],
            status: Number(codeError),
            statusText: typeError,
          });
        } else {
          setDataResponse({
            data: [],
            status: 400,
            statusText: errorRequest,
          });
        }
      }
    }
    // reloadStyleStatus();
    setStatusTransaction(false);
  }
  return (
    <div className="app">
      <MySnackBar title="Este site ainda está em desenvolvimento, ok?!" />
      <div id="title" className="text-center">
        <p id="title-top" className="h1">
          API TESTER
        </p>
        <p id="title-bottom">
          made by{' '}
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/KevinCerqueira"
          >
            Kevin
          </a>
        </p>
      </div>
      <div className="sections flex-container">
        <div id="section-input" className="flex-item">
          <form onSubmit={handleSumbit} noValidate autoComplete="off">
            <div className="flex-container">
              <div className="flex-item flex-grow-0">
                <FormControl id="form-control" variant="outlined">
                  <InputLabel htmlFor="select-type">Type</InputLabel>
                  <Select
                    native
                    id="select-type"
                    value={state.type}
                    onChange={handleChange}
                    label="Type"
                    inputProps={{
                      name: 'type',
                      id: 'select-type',
                    }}
                    disabled={statusTransaction}
                  >
                    <option value=""> </option>
                    <option value="GET">GET</option>
                    <option disabled value="POST" className="text-secondary">
                      POST
                    </option>
                  </Select>
                </FormControl>
              </div>
              <div className="flex-item flex-grow-2">
                <TextField
                  id="input-url"
                  className="w-100"
                  label="API"
                  variant="outlined"
                  inputProps={{
                    name: 'url',
                    id: 'input-url',
                  }}
                  disabled={statusTransaction}
                  onChange={handleChange}
                />
              </div>
              <div className="flex-item flex-grow-0">
                <Button
                  id="btn-send"
                  className="w-100 h-100"
                  variant="contained"
                  color="default"
                  type="submit"
                  onClick={handleSumbit}
                  disabled={statusTransaction}
                >
                  {statusTransaction ? (
                    <CircularProgress className="circular-progress" />
                  ) : (
                    <SendIcon />
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div id="section-response" className="flex-item">
          <div id="section-response-container" className="flex-container">
            <div id="section-status" className="flex-item">
              <div id="container-chips" className="flex-container">
                <div className="flex-item text-center">
                  <Chip
                    style={statusStyle}
                    className="chip-status"
                    label={`Status: ${
                      dataResponse.statusText === ''
                        ? 'NO DATA'
                        : dataResponse.status
                    }`}
                    variant="outlined"
                  />
                </div>
                <div className="flex-item text-center">
                  <Chip
                    style={statusStyle}
                    className="chip-status"
                    label={`Status Text: ${
                      dataResponse.statusText === ''
                        ? 'NO DATA'
                        : dataResponse.statusText
                    }`}
                    variant="outlined"
                  />
                </div>
              </div>
            </div>
            <div id="section-return" className="flex-item">
              <TextField
                className="btn-block"
                id="outlined-multiline-static"
                label="Return"
                multiline
                rows={4}
                value={dataResponse.data}
                variant="outlined"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

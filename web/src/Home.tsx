import React, { useState, FormEvent, ChangeEvent } from 'react';
import {
  FormControl,
  Button,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import MyModal from './components/MyModal';
import './Home.css';

interface inputSubmit {
  url: string;
  type: string;
}
// interface dataSubmit {
//   name: string;
//   value: string | number;
// }

function App(): JSX.Element {
  // const [response, setResponse] = useState();
  const [state, setState] = useState<inputSubmit>({
    url: '',
    type: 'GET',
  });
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

    console.log(state);
  }
  return (
    <div className="app">
      <MyModal
        title="ATENÇÃO"
        body="Este site ainda está em desenvolvimento, ok?!"
      />
      <div id="title" className="text-center">
        <p id="title-top" className="h1">
          API TESTER
        </p>
        <p id="title-bottom">
          made by{' '}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/KevinCerqueira"
          >
            Kevin
          </a>
        </p>
      </div>
      <div id="section-input">
        <form onSubmit={handleSumbit} noValidate autoComplete="off">
          <div className="flex-container">
            <div className="flex-item flex-grow-0">
              <FormControl
                id="form-control"
                variant="outlined"
                className="w-100"
              >
                <InputLabel htmlFor="select-type">Type</InputLabel>
                <Select
                  id="select-type"
                  value={state.type}
                  onChange={handleChange}
                  label="Type"
                  inputProps={{
                    name: 'type',
                    id: 'select-type',
                  }}
                >
                  <MenuItem value="GET">GET</MenuItem>
                  <MenuItem value="POST">POST</MenuItem>
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
                onChange={handleChange}
              />
            </div>
            <div className="flex-item flex-grow-0">
              <Button
                id="btn-send"
                className="w-100 h-100"
                variant="contained"
                color="default"
              >
                <SendIcon />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;

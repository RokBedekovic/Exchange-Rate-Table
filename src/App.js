import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import pic from '../src/doland.jpg';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      table: [],
      isLoaded: false,
      defaultAddr: 'http://hnbex.eu/api/v1/rates/daily/?date=',
      year: '',
      month: '',
      day: '', 
    }
  }

  componentDidMount() {
    fetch(this.state.defaultAddr)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          table: json,
        })
      });
  }

  getDate(address){
    fetch(address)
    .then(res => res.json())
    .then(json => {
      this.setState({
        isLoaded: true,
        table: json,
      })
    });
  }

  updateYear(evt){
    this.setState({
      year: evt.target.value
    });
  }

  updateMonth(evt){
    this.setState({
      month: evt.target.value
    });
  }

  updateDay(evt){
    this.setState({
      day: evt.target.value
    });
  }

  render() {

    var {isLoaded, table} = this.state;

    if (!isLoaded) {
      return <div>You need to install a google chrome extension "CORS Unblock" to access-control-allow-origin! </div>
    }

    else {
      return (
        <div className="App">

          <header className="mt-5 mb-5 txt"><h2>Exchange rate profile</h2></header>

          <Container>
            <Row>
              <Col>
                <div className="mb-3"><img src={pic} alt={"pic"} /></div>
                <p className="txt">Name: Doland</p>
                <p className="txt">Surname: Tmurp</p>

                  <Form>
                    <div className="mb-2">
                      <Form.Control 
                        type="number"
                        placeholder="YYYY"
                        onChange={(evt) => this.updateYear(evt)}
                      />
                    </div>

                    <div className="mb-2">
                      <Form.Control 
                        type="number"
                        placeholder="MM"
                        onChange={(evt) => this.updateMonth(evt)}
                      />
                    </div>

                    <div className="mb-2">
                      <Form.Control 
                        type="number"
                        placeholder="DD"
                        onChange={(evt) => this.updateDay(evt)}
                      />
                    </div>
                  </Form>

                  <button className="btn1" onClick={() => 
                    this.getDate(this.state.defaultAddr + 
                                  this.state.year + '-' + 
                                  this.state.month + '-' + 
                                  this.state.day)}>Get date</button>
                  <button className="ml-2 btn1" onClick={() => this.getDate(this.state.defaultAddr)}>Reset</button>
              </Col>

              <Col>
                <div>
                  {table.map(item => (
                  <li key={item.currency_code} className="Table">
                      Currency: {item.currency_code} |  
                      Median rate: {item.median_rate}  |  
                      Buying rate: {item.buying_rate}  |
                      Selling rate: {item.selling_rate}
                  </li>
                  ))}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      );
    } 
  }
}

export default App;
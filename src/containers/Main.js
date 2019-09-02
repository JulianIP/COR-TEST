import React from 'react';
import Container from '@material-ui/core/Container';
import Header from '../components/Header';
import Box from '@material-ui/core/Box';
import SopaLetras from '../components/SopaLetras/SopaLetras';
import Button from '@material-ui/core/Button';
import blue from '@material-ui/core/colors/blue';
import Input from '@material-ui/core/Input';
import axios from 'axios';
import './Main.css';

class Main extends React.Component  {
    
    state = {
        matrixList: [],
        calcular: false,
        palabraABuscar: '',
    }

    componentDidMount() {
        axios.get('./resources.json').then( response => {
            let matrixList = response.data;
            if(!!matrixList){
                this.setState({
                    matrixList: matrixList.resources.map(m => ({matriz:m, pintada: false}))
                })
            }
        },
        e => {
            alert("No se han podido cargar los datos")
        });
    }

    calcular = (e) => {
        e.preventDefault();
        let value = e.target.palabra.value;

        this.setState({
            palabraABuscar: value.toUpperCase()
        });
    }

    render() {
        return (    
            <div className="main-page">
                <Header />
                <Container fixed>            
                    <Box
                        display="flex"
                        flexWrap="wrap"
                        p={1}
                        m={1}
                        bgcolor="background.paper"
                        justifyContent="space-between"
                    >
                        <Box mt={1} width="100%">
                            <h3>Sopa de letras - Test para entrevista FRONT-END</h3>
                            <p>Escriba una cadena de caracteres a ser buscada en las sopas de letras. Luego haga click en el boton Buscar para ejecutar el proceso.</p>                            
                        </Box>
                        <Box
                            display="flex"
                            flexWrap="wrap"
                            width="100%"
                            mt={3}
                            mb={3} 
                            >
                            <form onSubmit={this.calcular}>
                                <Input disabled={!this.state.matrixList.length} name="palabra" placeholder="Ingrese la palabra a buscar" aria-describedby="my-helper-text" />
                                <Button disabled={!this.state.matrixList.length} type="submit" variant="contained" style={{'backgroundColor': blue[600], 'color':'#fff', 'marginLeft':'16px'}} size="medium">
                                    Buscar
                                </Button>  
                            </form>  
                        </Box>
                        {
                            this.state.matrixList.map( (el,i) => (
                                <Box 
                                    width="100%"
                                    key={i}>
                                    <SopaLetras matriz={el.matriz} palabraABuscar={this.state.palabraABuscar} />
                                </Box>
                            ))
                        }
                    </Box>
                </Container>
            </div>    
        )
    }
}

export default Main;
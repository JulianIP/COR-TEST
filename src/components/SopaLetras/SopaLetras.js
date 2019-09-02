import React from 'react';
import Box from '@material-ui/core/Box';
import './SopaLetras.css';

class SopaLetras extends React.Component {

    state = {
        totalPalabrasEncontradas: 0,
        totalDiagonales:0,
        totalHorizontales:0,
        totalVerticales:0
    }

    componentWillReceiveProps(props){
        if(!!props.palabraABuscar){
            let totalDiagonales = 0,
                totalHorizontales = 0,
                totalVerticales = 0,
                matriz = [...this.props.matriz];
    
            //horizontales
            totalHorizontales += this.obtenerSumaDeCoincidencias(matriz,props.palabraABuscar);
            //verticales
            let matrizTranspuesta = matriz[0].map((_, c) => matriz.map((_, r) => matriz[r][c]));
            totalVerticales += this.obtenerSumaDeCoincidencias(matrizTranspuesta,props.palabraABuscar);
            //diagonales
            totalDiagonales += this.sumarDiagonales(matriz,props.palabraABuscar);
            totalDiagonales += this.sumarDiagonales(matriz.reverse(),props.palabraABuscar);
    
            this.setState({
                totalPalabrasEncontradas: totalDiagonales + totalHorizontales + totalVerticales,
                totalDiagonales: totalDiagonales,
                totalHorizontales: totalHorizontales,
                totalVerticales: totalVerticales
            });
        }
    }

    sumarDiagonales = (filas, palabra) => {
        let suma = 0;

        var matDiagonales = [];

        //obtengo una matriz con las letras de las diagonales
        //primera parte diagonal superior
        for (let i=0;i<filas.length;i++) {
            let sub = [];
            for (let j=0;j<=i;j++) { 
                sub.push(filas[i-j][j]);
            }
            matDiagonales.push(sub);
        }

        //segunda parte diagonal inferior
        for (let i=0;i<filas.length;i++) {
            let sub = [];
            for (let j=0;j<filas.length-i-1;j++) {                 
                sub.push(filas[filas.length-j-1][j+i+1]);       
            }
            matDiagonales.push(sub);
        }

        suma += this.obtenerSumaDeCoincidencias(matDiagonales,palabra);

        return suma;
    }

    obtenerSumaDeCoincidencias = (filas, palabra) => {
        let suma = 0, regex = new RegExp(palabra, 'g');

        for(let fila of filas){
            let ocurrencias = fila.join('').match(regex);
            suma += !!ocurrencias ? ocurrencias.length : 0;
            ocurrencias = fila.reverse().join('').match(regex);
            suma += !!ocurrencias ? ocurrencias.length : 0;
            fila.reverse();
        } 

        return suma;
    }

    render() {
        return (        
            <Box 
                display="flex"
                flexWrap="wrap"
                mb={3}
                m={1} 
                className="sopa-letras"
                justifyContent="space-between"
                alignItems="center">
                <div>
                    {
                        this.props.matriz.map( (fila,i) => (
                            <div className="fila" key={i}>
                                {
                                    fila.map( (columna,j) => (
                                        <div key={j} className="columna">
                                            {columna}
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
                {
                    !!this.props.palabraABuscar &&
                    <div>
                        <h4>{this.state.totalPalabrasEncontradas} ocurrencias </h4>
                        <span>(De las cuales {this.state.totalHorizontales} son horizontales, {this.state.totalVerticales} verticales y {this.state.totalDiagonales} diagonales)</span>
                    </div>
                }
            </Box>
        )}
};

export default SopaLetras;
import React from 'react';
import CardNoticia from '../../CardNoticia';
import { api, API_KEY } from '../../../api/config.js';

class Ciencias extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            listaNoticias: [],


        }

    }

    render() {
        return (
            <div>
                <h1 className="text-center m-3">Ciências</h1>

                <div className="containerNews" >

                    {
                        this.state.listaNoticias.length > 0 ?
                            this.state.listaNoticias.map(noticia => <CardNoticia noticia={noticia} />)
                            :
                            <div className="m-5">
                                <span>Carregando...</span>
                            </div>
                    }

                </div>
            </div>
        )
    }
}


export default Ciencias;
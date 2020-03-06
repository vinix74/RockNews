import React from 'react';
import { api, API_KEY } from '../../../api/config.js';
import CardNoticia from '../../CardNoticia';

import './styles.scss';

class Busca extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listaNoticias: [],
        }

    }

    componentDidMount() {
        const termo = this.props.location.search.split('?')[1].replace("%20", " ");


        api.get(`/everything?q=${termo}&apiKey=${API_KEY}`)
            .then(res => {
                if (res.status === 200)
                    this.setState({ listaNoticias: res.data.articles });
            });
    }

    componentDidUpdate(prevProps) {

        const ultimoTermo = prevProps.location.search.split('?')[1];
        const novoTermo = this.props.location.search.split('?')[1];

        if (ultimoTermo !== novoTermo)
            api.get(`/everything?q=${novoTermo}&apiKey=${API_KEY}`)
                .then(res => {
                    if (res.status === 200)
                        this.setState({ listaNoticias: res.data.articles });
                });
    }

    render() {
        return (
            <div>
                <h1 className="text-center">{this.props.location.search.split('?')[1]}</h1>

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


export default Busca;
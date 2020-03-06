import React from 'react';
import { api, API_KEY, GERAL_BRASIL } from '../../../api/config.js';
import CardNoticia from '../../CardNoticia';

// import './styles.scss';

class Busca extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listaNoticias: [],
        }

    }

    componentDidMount = async () => {
        debugger;

        const termo = this.props.location.search.split('?')[1].replace("%20", " ");
        const listaTermos = ["geral", "tecnologia", "ciencias"]

        if (!listaTermos.includes(termo)) {

            await api.get(`/everything?q=${termo}&country=br&apiKey=${API_KEY}`)
                .then(res => {
                    if (res.status === 200)
                        this.setState({ listaNoticias: res.data.articles });
                });

        } else {

            await api.get(`/top-headlines?category=${termo === "geral" ? "general" : termo === "ciencias" ? "science" : "technology"}&country=br&apiKey=${API_KEY}`)
                .then(res => {
                    if (res.status === 200)
                        this.setState({ listaNoticias: res.data.articles });
                });
        }
    }

    componentDidUpdate = async (prevProps) => {

        debugger;

        const ultimoTermo = prevProps.location.search.split('?')[1];
        const novoTermo = this.props.location.search.split('?')[1];

        if (ultimoTermo !== novoTermo)
            await api.get(`/everything?q=${novoTermo}&country=br&apiKey=${API_KEY}`)
                .then(res => {
                    if (res.status === 200)
                        this.setState({ listaNoticias: res.data.articles });
                });
    }

    render() {
        return (
            <div>
                <h1 className="text-center text-uppercase mt-3">{this.props.location.search.split('?')[1]}</h1>

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
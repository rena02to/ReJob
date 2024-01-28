import { Link } from "react-router-dom";
import './BackLink.css'

const BackLink = () => {
    return (
        <div className="link-voltar-topo">
            <Link to="/">Voltar para o Início</Link>
        </div>
    );
}

export default BackLink;
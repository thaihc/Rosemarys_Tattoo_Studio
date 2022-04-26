import { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import FormUsuario from "../../components/Form/FormUsuario";
import Paragrafo from "../../components/Paragrafo";
import Subtitulo from "../../components/Subtitulo";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import toast from "react-hot-toast";
import * as S from "./styled";
import { apiCliente } from "../../services/api";


function Usuario({changeTheme}){
    const style = {
        height: "70px",
    }

    const {id} = useParams()
    const navigate = useNavigate()
    const [usuario, setUsuario] = useState({})
    const [load, setLoad] = useState(true)
    
    useEffect(() => {
        async function buscaUsuario(){
            try {
              const response = await apiCliente.get(`/cliente/${id}`)
                setLoad(false)
                setUsuario(response.data.cliente)
            } catch (error) {
                console.log(error);
            }
        }
        buscaUsuario()
    }, []);

    const dataCorreta= (data)=>{
        const dataArr = data.split('-')
        const ano = dataArr.shift()
        const dia = dataArr.pop()
       
        return `${dia}-${dataArr.pop()}-${ano}`
    }

    const [agendamentos, setAgendamentos] = useState([])

    useEffect(()=>{
        const agendamentos = localStorage.getItem('agendamentos')
        const agendamentosParse = JSON.parse(agendamentos) || []
        
        setAgendamentos(agendamentosParse);
       
    }, [])


    return(
        <>
            <Header btnHome={{display: "none"}} btnVoltar={{display: "none"}} btnLogin={{display: "none"}} btnInicial={{display: "none"}} className={"btn custom-btn styleHeader"} style={style} div={{display:"none"}} portfolio="Portifólio" sair="Sair" changeTheme={changeTheme} />
            <S.Main>
                <S.BlocoUm>
                    <Subtitulo texto="Bem vindo de volta" nome={usuario.nome} />
                    <section>
                        {agendamentos.length === 0 ? 
                        <p>Você não tem agendamentos disponíveis</p> 
                         :
                         agendamentos.length > 1 ? <p>Você tem {agendamentos.length} agendamentos pendentes</p> 
                         :
                         <p>Você tem {agendamentos.length} agendamento pendente</p> 
                    }
                    </section>
                </S.BlocoUm>
                <S.BlocoDois>
                    <FormUsuario />
                    <section>                            
                        <div className="container">
                            <div className="bordaAnimada"></div>
                            <div className="corner">
                                <div className="dados">
                                    <h2>Seus dados</h2>
                                    <Paragrafo texto="Nome completo:" atributo={usuario.nome} />
                                    <Paragrafo texto="Data de nascimento:" atributo={load === false ? dataCorreta(usuario.data_nascimento) : ''}/>
                                    <Paragrafo texto="Gênero:" atributo={usuario.genero} />
                                    <Paragrafo texto="CPF:" atributo={usuario.cpf} />
                                    <Paragrafo texto="Email:" atributo={usuario.email} />
                        
                                    <Button className="styleForm alterar" nome="Alterar" onClick={()=>navigate(`/atualizarUsuario/${id}`)}/>
                                </div>
                            </div>
                        </div>
                    </section>

                </S.BlocoDois>
            </S.Main>
            <Footer />
        </>
    );
}

export default Usuario;
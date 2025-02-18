import * as S from "./styled.js";
import "react-calendar/dist/Calendar.css";
import Button from "../../Button/index.jsx";
import Input from "../../Input/index.jsx";
import iconBack from "../../../assets/iconBack.png";
import iconNext from "../../../assets/iconNext.png";
import Carregando from "../../Carregando";

import { apiAgenda } from "../../../services/api.js";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useFuncionario from "../../Hooks/funcionario.jsx";

import { MdOutlineSearchOff } from "react-icons/md";

function FAgendaMain() {
  const [agenda, setAgenda] = useState([]);
  const [load, setLoad] = useState(true);
  const [data, setData] = useState("");
  const carousel = useRef(null);
  const navigate = useNavigate();
  const [funcionario] = useFuncionario();

  async function getAgenda() {
    try {
      const response = await apiAgenda.get("/agenda");
      setAgenda(response.data.agenda);
      setData('')
      setLoad(false);
    } catch (error) {
      toast.error(error.response.data);
    }
  }
  useEffect(() => {
    getAgenda();
  }, []);

  const handleBackClick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft -= carousel.current.offsetWidth;
  };
  const handleNextClick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft += carousel.current.offsetWidth;
  };

  async function deletarAgendamento(id) {
    try {
      const response = await apiAgenda.delete(`/agenda/id/${id}`);
      toast.success(response.data.message);
      getAgenda();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  const converteData = (data) => {
    const dataSplit = data.split("-");
    return `${dataSplit.pop()}-${dataSplit.pop()}-${dataSplit.shift()}`;
  };

  async function getAgendamentoData() {
    try {
      const response = await apiAgenda.get(
        `/agenda/data/${converteData(data)}`
      );
      setAgenda(response.data.agenda);
    } catch (error) {
      toast.error(
        error.response.data.message.replace(converteData(data), data)
      );
    }
  }

  const dataCorreta = (data) => {
    const dataArr = data.split("-");
    const ano = dataArr.shift();
    const dia = dataArr.pop();

    return `${dia}-${dataArr.pop()}-${ano}`;
  };

  return (
    <>
    {load ? (
      <Carregando />
    ) : (
        <S.Container>
          <S.Quadro>
            <h2>Agenda</h2>
            <div className="busca">
                <div className="divIcon">
                  <MdOutlineSearchOff className="cancelarFiltro" onClick={()=> getAgenda()}/>
                </div>
              <Input
                placeholder="digite a data desejada"
                type="text"
                name="search"
                id="search"
                value={data}
                onChange={(e) => setData(e.target.value) }
              ></Input>
              <Button
                type="submit"
                nome="Buscar"
                onClick={getAgendamentoData}
              ></Button>
            </div>
            <S.Form ref={carousel}>
              {agenda.map((agendamento) => {
                return (
                  <div className="lista dados" key={agendamento.ID}>
                    <ul>
                      <li>
                        ID: <span>{agendamento.ID}</span>
                      </li>
                      <li>
                        CLIENTE_ID: <span>{agendamento.Cliente_ID}</span>
                      </li>
                      <li>
                        FUNCIONARIO_ID:{" "}
                        <span>{agendamento.Funcionario_ID}</span>
                      </li>
                      <li>
                        DATA:{" "}
                        <span>
                          {load === false ? dataCorreta(agendamento.Data) : ""}
                        </span>
                      </li>
                      <li>
                        HORA: <span>{agendamento.Hora}</span>
                      </li>
                      <li>
                        SERVIÇO: <span>{agendamento.Servico}</span>
                      </li>
                      <li>
                        DURAÇÃO: <span>{agendamento.Duracao}</span>
                      </li>
                      <div className="botao">
                        <Button
                          className="styleForm"
                          type="submit"
                          nome="Alterar"
                          onClick={() =>
                            navigate(
                              "/funcionario/agendamento-update/" +
                                funcionario.ID +
                                "/" +
                                agendamento.ID
                            )
                          }
                        ></Button>
                        <Button
                          className="styleForm"
                          type="submit"
                          nome="Deletar"
                          onClick={(e) => {
                            deletarAgendamento(agendamento.ID);
                          }}
                        ></Button>
                      </div>
                    </ul>
                  </div>
                );
              })}
            </S.Form>
            <div className="seta">
              <button className="btnBusca" onClick={handleBackClick}>
                <img src={iconBack} alt="back"></img>
              </button>
              <button className="btnBusca" onClick={handleNextClick}>
                <img src={iconNext} alt="next"></img>
              </button>
            </div>
          </S.Quadro>
        </S.Container>
        )}
        </>
        );
}
export default FAgendaMain;

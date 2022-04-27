import * as S from "./styled.js";

import Button from "../../Button/index.jsx";
import Input from "../../Input/index.jsx";
import Label from "../../Label/index.jsx";

import toast from "react-hot-toast";
import { useState } from "react";
import { apiAgenda } from "../../../services/api.js";

function FormAgenda({ botao }) {
  const [agendamento, setAgendamento] = useState([]);

  const handleOnchange = (e) => {
    e.preventDefault();
    setAgendamento({ ...agendamento, [e.target.name]: e.target.value });
  };
  const handleOnchangeNumber = (e) => {
    e.preventDefault();
    setAgendamento({
      ...agendamento,
      [e.target.name]: parseInt(e.target.value),
    });
  };

  const inserirAgendamento = async (e) => {
    e.preventDefault();
    try {
      const response = await apiAgenda.post("/agenda", agendamento);
      toast.success(response.data.message);
      console.log(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
  return (
    <S.Container>
      <S.Quadro>
        <h2>Agendamento</h2>
        <S.Form>
          <div className="caixa">
            <Input
              placeholder="CLIENTE_ID"
              type="number"
              name="Cliente_ID"
              id="cId"
              onChange={(e) => handleOnchangeNumber(e)}
            ></Input>
            <Input
              placeholder="FUNCIONARIO_ID"
              type="number"
              name="Funcionario_ID"
              id="func_id"
              onChange={(e) => handleOnchangeNumber(e)}
            ></Input>
            <Input
              placeholder="DATA"
              type="date"
              name="Data"
              id="func_id"
              onChange={(e) => handleOnchange(e)}
            ></Input>
          </div>
          <div className="caixa">
            <Input
              placeholder="HORA"
              type="time"
              name="Hora"
              id="func_id"
              onChange={(e) => handleOnchange(e)}
            ></Input>
            <Input
              placeholder="SERVIÇO"
              type="text"
              name="Servico"
              id="func_id"
              onChange={(e) => handleOnchange(e)}
            ></Input>

            <div>
              <Input
                placeholder="DURAÇÃO EM MINUTOS"
                className="inputduracao"
                name="Duracao"
                id="Duracao"
                onChange={(e) => handleOnchange(e)}
              ></Input>
            </div>
            <Button
              className="styleForm"
              type="submit"
              nome="Inserir"
              onClick={(e) => inserirAgendamento(e)}
            ></Button>
          </div>
        </S.Form>
      </S.Quadro>
    </S.Container>
  );
}
export default FormAgenda;

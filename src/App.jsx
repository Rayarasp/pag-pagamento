import { useState } from "react";
import BackCard from "./components/BackCard";
import CardFront from "./components/FrontCard";
import { ToastContainer, toast } from 'react-toastify';
import instance from "./api/instance";

export default function App() {
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [mes, setMes] = useState(0);
  const [ano, setAno] = useState(0);
  const [cvv, setCvv] = useState(0);
  const [senha, setSenha] = useState("");

  async function pagar(){
    if(!nome || !numero || !mes || !ano || !cvv || !senha){
      return toast.error("preencha todos os campos")
    }

    if (numero.length !== 16){
      return toast.error("Número do cartão inválido")
    }

    if(cvv.length !== 3){
      return toast.error("CVV inválido")
    }

    if(mes.length !== 2){
      return toast.error("Data de expiração inválida")
    } 
    
    if(ano.length < 1){
      return toast.error("Data de expiração inválida")
    }

    if(senha.length < 4){
      return toast.error("Senah inválida")
    }

    try{
      const response = await instance.post("/creditcards", {
        name: nome,
        number: numero,
        expiration: `${mes}/${ano}`,
        cvv: cvv,
        password: senha
      })

      return toast.success("Pagamento realizado com sucesso")
    

    } catch (error) {
      return toast.error("Erro ao processar o pagamento")

    }

  }

  return (
    <div className="w-full h-screen flex">
      <ToastContainer 
      position="top-right"
      autoClose={5000}
      theme="colored"
      />
      <div className="w-[40%] relative h-full bg-[#271540]">
        <div className="absolute top-10 left-60">
          <CardFront />
        </div>
        <div className="absolute top-[380px] left-[350px]">
          <BackCard />
        </div>
      </div>
      <div className="w-[%] h-full flex items-end p-[40px] flex-col">
        <h1 className="text-[40px] w-[60%] h-[150px] font-bold">
          Preencha os campos para concluir o pagamento
        </h1>
        <div className="w-[65%] h-auto min-h-[200px] flex flex-col gap-4">
          <div className="w-full flex flex-col">
            <label htmlFor="nome" className="text-[20px]">
              Nome no cartão
            </label>
            <input
              onChange={(event) => setNome(event.target.value)}
              type="text"
              className="w-full pl-2 h-[40px] rounded-md bg-[#D9D9D9]"
            />
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="numero" className="text-[20px]">
              Número do cartão
            </label>
            <input
              onChange={(event) => setNumero(event.target.value)}
              type="text"
              className="w-full pl-2 h-[40px] rounded-md bg-[#D9D9D9]"
            />
          </div>
          <div className="flex">
            <div className="w-[70%] flex flex-col">
              <label htmlFor="" className="text-[20px]">
                Data de expiração
              </label>
              <div className="w-full flex gap-2">
                <input
                  type="number"
                  onChange={(event) => setMes(event.target.value)}
                  placeholder="MM"
                  className="w-[50%] pl-2 h-[40px] rounded-md bg-[#D9D9D9]"
                />
                <input
                  type="number"
                  onChange={(event) => setAno(event.target.value)}
                  placeholder="AA"
                  className="w-[50%] pl-2 h-[40px] rounded-md bg-[#D9D9D9]"
                />
              </div>
            </div>
            <div className="w-[30%] pl-2 flex flex-col">
              <label htmlFor="" className="text-[20px]">
                CVV
              </label>
              <input
                type="number"
                onChange={(event) => setCvv(event.target.value)}
                className="w-full h-[40px] rounded-md bg-[#D9D9D9] pl-2"
              />
            </div>
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="" className="text-[20px]">
              Senha do cartão
            </label>
            <input
              type="password"
              onChange={(event) => setSenha(event.target.value)}
              className="w-full h-[40px] rounded-md pl-2 bg-[#D9D9D9]"
            />
          </div>
          <button
            onClick={pagar}
            className="w-full h-[50px] rounded-md bg-[#271540]
            text-white font-bold">PAGAR</button>
        </div> 
      </div>
    </div>
  )
}
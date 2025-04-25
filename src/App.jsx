import CardFront from "./components/FrontCard";

export default function App(){
  return(
    <div className="w-full h-screen flex">
      <div className="w-[40%] h-full bg-[#271540]">
        
        <div className="absolute top-8 left-70"> 
        <CardFront />

        </div>

      </div>
      <div className="w-[60%] h-full flex justify-end p-[40px]">
        <h1 className="text-[40px] w-[70%] h-[150px]">Preencha os  campos para concluir o pagamento</h1>
      </div>
    </div>
    
  )


}
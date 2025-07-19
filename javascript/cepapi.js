
const displayCep = async (cep)=>{
    try{
        cep = await formatacao(cep);
        let data = await buscarcep(cep);
        console.log(`Endereço: ${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`);
    }catch (error){
        console.error(error.message);
    }
}
const formatacao = (cep) => {
    return new Promise ((resolve, reject)=>{
        cep = cep.replace(/\D/g, ''); //substitui todos não dígitos com espaço
         if (cep.length !== 8) {
            reject(new Error("CEP inválido. O CEP deve conter 8 dígitos."));
        }else{
            resolve(cep);
        }
    });
}

const buscarcep = async (cep) => {

    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    
    if (!response.ok) {
        throw new Error("Erro ao buscar CEP");
    }

    const data = await response.json();

    if (data.erro) {
        throw new Error("CEP não encontrado.");
    }

    return data;
};


cep = input("Digite o CEP: ")
displayCep(cep)




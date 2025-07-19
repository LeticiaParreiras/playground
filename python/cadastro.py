from datetime import datetime

cadastros = []
res = True

#Loop pra prencher pessoa
while res == True:
    pessoa = {
        "name" : "name",
        "dt_birth" : "00/00/0000",
        "gender" : "x"
    } # Dícionario
    
    pessoa["name"] = input("Nome?")
    
    # Loop pra prencher data corretamente, so sai do loop se dt_valid for True
    dt_valid = False
    while not dt_valid:
        dt_input = input("Data de nascimento (DD/MM/AAAA): ")
        
        try:
        # Tenta converter a string digitada para um objeto datetime
        # "%d/%m/%Y" indica o formato: dia/mês/ano com 4 dígitos
            dt_obj = datetime.strptime(dt_input, "%d/%m/%Y")
            dt_valid = True
            
             # Salva a data formatada novamente como string (garante formatação correta)
            data_temp = dt_obj.strftime("%d/%m/%Y")
        except ValueError:
		        # Se a conversão falhar (ex: data inválida como 31/02/2024), cai aqui
            print("Data inválida. Use o formato DD/MM/AAAA e certifique-se de que a data existe.")
            
    pessoa["dt_birth"] = data_temp
    
    # Anquanto a resposta Não for F ou M, repete esse loop 
    while pessoa["gender"] not in ["F", "M"]:
        pessoa["gender"] = input("Gênero? (F/M)").upper() # Coloca em caixa alta
        
    cadastros.append(pessoa)   
    res_temp = "" 
    while res_temp not in ["Y", "N"]:    
        res_temp = input("Deseja fazer mais cadastros?").upper()
        if res_temp == "N":
            res = False
    
print(cadastros)
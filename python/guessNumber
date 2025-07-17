import random

# Gera uma tupla com 5 números aleatórios de 0 a 9
tupla = tuple(random.randint(0, 9) for _ in range(5))

print("Bem-indo ao jogo em adivinhar o numero dentro da tupla")
print(f"O primeiro número na tupla é {tupla[0]} e o último é {tupla[-1]}")
print(f"Agora adivinhe um numero sabendo que tem outros {len(tupla)- 2} números, e tembem que so tem números entre 0 a 9")

# Loop para ficar adivinhando
res = False
while not res:
    num = input("Digite o número:")
    
    if(int(num) in tupla):
        if(int(num) == tupla[0] or int(num) == tupla[-1] ):
            print("engraçadinho, eu ja falei esse número")
        else:
            print(f"Parabéns o {num} esta na tupla")
    else:
        print("Poxa esse número não esta na tupla")
    
    # Perguntar se deseja parar    
    res_temp = "" 
    while res_temp not in ["Y", "N"]:    
        res_temp = input("Deseja parar de adivinhar e ver a tupla?(Y/N)").upper()
        if res_temp == "Y":
            res = True
            print(f"Essa e tupla: {tupla}")

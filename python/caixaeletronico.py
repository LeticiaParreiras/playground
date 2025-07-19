print("Caixa Eletrônico")

num_valid = False
while not num_valid:
    valor = float(input("Informe o valor do saque: "))
    if (valor%2 == 0 or valor%5 == 0):
        num_valid = True
    else:
        print("Da pra sacar somente números pares ou multiplos de 5")
notas = {"notas100": 0, "notas50": 0, "notas20": 0, "notas10": 0, "notas5": 0, "notas2": 0}

while valor > 0:
    while valor >= 100:
        valor -= 100
        notas["notas100"] += 1
        
    while valor >= 50:
        valor -= 50
        notas["notas50"] += 1
        
    while valor >= 20:
        valor -= 20
        notas["notas20"] += 1
    
    while valor >= 10:
        valor -= 10
        notas["notas10"] += 1
    
    while valor >= 5:
        valor -= 5
        notas["notas5"] += 1    
        
    while valor >= 2:
        valor -= 2
        notas["notas2"] += 1        
        
print("\nNotas entregues:")
for nota, quantidade in notas.items():
    if quantidade > 0:
        print(f"{nota}: {quantidade}")
import math 
class Node:
	def __init__(self, data):
		self.data = data
		self.next = None

class stack:
	def __init__(self):
		self.top = None

	def push(self, data):
        # Adiciona um novo nó no topo da pilha
		new_node = Node(data)
		if self.top:
			new_node.next = self.top
		self.top = new_node

	def pop(self):
     # Remove o nó do topo da pilha e retorna seu valor
		if self.top is None:
			return None
		else:
			popped_node = self.top
			self.top = self.top.next
			popped_node.next = None
			return popped_node.data

def isNumber(c):
    try:
        float(c)
        return True
    except ValueError:
        return False
    
def isOperatorB(c): # verifica se e opberador basico
    return c in ["+", "*" , "-", "/", "^"]
def isOpeatorA(c): # verifica se e operador avançado
    return c in ["raiz", "log", "!"]

def calcule (tokens, pilha):
    for c in tokens:
        if(isNumber(c)):
            try:
                c = int(c)
            except ValueError:
                c = float(c)
            pilha.push(c)
        elif(isOperatorB(c)):
            op1 = pilha.pop()
            op2 = pilha.pop()
            if c in "+":
                pilha.push(op1 + op2)
            elif c in "-":
                pilha.push(op1 - op2)
            elif c in "/":
                if op2 == 0:
                    print("Erro: Não e possivel dividir por zero")
                    break
                pilha.push(op1 / op2)
            elif c == "*":
                pilha.push(op1 * op2)
            elif c in "^":
                pilha.push(op1 ** op2)
        elif(isOpeatorA(c)):
            op = pilha.pop()
            if c in "raiz":
                pilha.push(math.isqrt(op))
            elif c in "log":
                pilha.push(math.log10(op))
            elif c in "!":
                pilha.push(math.factorial(op))
        else:
            print(f"Operador invalido: {c}")
            break
    return pilha.top.data

print("Digite uma expressão em forma pós-fixada")
expresion = input(": ").lower()
tokens = expresion.split()
pilha = stack()
value = calcule(tokens, pilha)
print(f"expressão: {expresion} = {value}")

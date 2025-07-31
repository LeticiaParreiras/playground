class Towers_Hanoi:
    def __init__ (self):
        self.towers = {
            "A" : [3, 2, 1],
            "B": [],
            "C": [],
        }
    def print(self):
        for name, tower in self.towers.items():
            print(f"{name}: {tower}")
        print("-" * 20)
    
    def move (self, n ,location , destination):
        tower_destination = self.towers.get(destination)
        if not tower_destination or tower_destination[-1] > n:
            disk = self.towers[location].pop()
            self.towers[destination].append(disk)
        else:
            return
        self.print()
    def resolve(self,n ,location, aux ,destination):
        if n == 1:
            self.move(n ,location, destination)
            return
        else:
            self.resolve(n - 1, location, destination, aux)
            self.move(n, location, destination)
            self.resolve(n - 1, aux, location, destination)
            
        
towers = Towers_Hanoi()

towers.resolve(3,"A", "B", "C")

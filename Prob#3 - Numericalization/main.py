# read inputs
inp = input().strip().split()
n, m1, m2 = inp[0], int(inp[1]), int(inp[2])

# read custom display from display.txt
display = {}
with open('display.txt') as file :
    for num in range(10) :
        display[num] = []
        for row in range(5) :
            line = file.readline()[:5]
            display[num].append(line)

def repeat_print(str, n) :
    print(str * n, end = '')

# reapeatly print each column m2 times for each number
def print_row(row) :
    for num in [int(c) for c in n] :
        for col in range(5) :
            repeat_print(display[num][row][col], m2)
        repeat_print(' ', m2)
    print(end = '\n')

# print each row m1 times
for row in range(5) :
    for i in range(m1) :
        print_row(row)
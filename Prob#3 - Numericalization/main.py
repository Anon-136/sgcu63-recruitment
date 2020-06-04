inp = input().strip().split()
n, m1, m2 = inp[0], int(inp[1]), int(inp[2])

display = {}
with open('display.txt') as file :
    for i in range(10) :
        display[i] = []
        for j in range(5) :
            line = file.readline()[:5]
            display[i].append(line)

def repeat_print(str, n) :
    print(str * n, end = '')

for i in range(5) :
    for _ in range(m1) :
        for num in [int(c) for c in n] :
            for j in range(5) :
                repeat_print(display[num][i][j], m2)
            repeat_print(' ', m2)
        print(end = '\n')
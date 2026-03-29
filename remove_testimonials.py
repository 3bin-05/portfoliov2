with open('e:/Portfolio/Portfolio2/PORTFOLIO - Copy/src/components/Works.jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()
with open('e:/Portfolio/Portfolio2/PORTFOLIO - Copy/src/components/Works.jsx', 'w', encoding='utf-8') as f:
    f.writelines(lines[:251] + lines[405:])

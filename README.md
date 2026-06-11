# Závěrečný projekt - NBA GM Simulátor

Webová aplikace, která simuluje práci generálního manažera basketbalového týmu. Umožňuje sestavit dva týmy snů a nechat je proti sobě odehrát simulovaný zápas na základě jejich týmových statistik a vzájemných matchupů.

## 🏀 Hlavní funkce

- **Správa týmů (Team A vs Team B):** 
  - Možnost pojmenovat si oba týmy.
  - Každý tým může mít maximálně 5 hráčů (plná základní pětka).
  - Aplikace hlídá platový strop (Salary Cap), který je stanoven na $185M pro zachování balance.
- **Katalog hráčů:**
  - Hráči jsou rozděleni do 3 kategorií s různými váhami pro výpočet celkového hodnocení (OVR): *Guard*, *Wing*, *BigMan*.
  - Vyhledávání podle jména.
  - Filtrace podle herních pozic.
- **Analýza týmu:**
  - Real-time výpočet týmových statistik (Scoring, Shooting, Playmaking, Defense, Rebounding) a průměrného OVR hodnocení.
  - Automatická detekce slabin týmu (např. špatné doskoky, chybějící střelba).
- **Simulace zápasu:**
  - Pokročilý algoritmus, který neporovnává pouze celkové OVR, ale řeší konkrétní "matchupy" (např. Útok domácích vs Obrana hostů, souboj v doskocích, rozehrávka).
  - V případě vyrovnaných matchupů rozhoduje těsná koncovka (clutch game) na základě ratingu a štěstí.

## 💻 Použité technologie

- **TypeScript** (hlavní logika a OOP principy: třídy, dědičnost, abstrakce)
- **JavaScript** (zkompilovaný výstup pro běh v prohlížeči)
- **HTML / CSS** (uživatelské rozhraní a interakce, barevné schéma)

## ⚙️ Spuštění a kompilace

Projekt využívá TypeScript. Pokud chcete provádět změny v kódu, upravujte `.ts` soubory a následně je zkompilujte do JavaScriptu pomocí příkazu (vyžaduje nainstalovaný Node.js a TypeScript):

```bash
tsc web.ts data.ts script.ts --target ES2016 --module ES2015 --moduleResolution node
```

Pro samotné spuštění aplikace stačí otevřít soubor `index.html` (nebo jakýkoli hlavní HTML soubor projektu) v jakémkoliv moderním webovém prohlížeči. 

## 📂 Struktura projektu

- `data.ts` / `data.js` - Databáze hráčů a definice herních dat.
- `script.ts` / `script.js` - Hlavní business logika, definice tříd (`Player`, `Guard`, `Wing`, `BigMan`, `Team`) a funkce pro simulaci zápasu.
- `web.ts` / `web.js` - Propojení logiky s uživatelským rozhraním (DOM manipulace, event listenery).

## 🎨 UI & Barevná paleta
Uživatelské rozhraní využívá specifické barvy (dle grafického návrhu):
- Tmavě modrá: `#003049`
- Červená: `#D62828`
- Oranžová: `#F77F00`
- Žlutá: `#FCBF49`
- Světlá (béžová): `#EAE2B7`
- Zelená (akcent/vítěz): `#0ff162` / `#25d164`
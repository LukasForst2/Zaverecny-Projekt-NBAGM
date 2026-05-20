// data.ts
export enum PlayerType {
    Guard = "Guard",
    Wing = "Wing",
    BigMan = "BigMan",
}

export interface PlayerData {
    id: number;
    type: PlayerType;
    name: string;
    surname: string;
    salary: number; // Vybalancováno pro týmový Salary Cap 185M / 5 hráčů
    scoring: number;
    shooting: number;
    playmaking: number;
    defense: number;
    rebounding: number;
}
/*
        Prirucka hodnoceni:
        95–99 → elite / MVP level
        90–94 → All-NBA
        80–89 → All-Star / top hráč
        70–79 → solid starter
        60–69 → role player
        <60 → bench / meh
    */ 
   
export const Player_catalog: PlayerData[] = [
// --- GUARDS --- id: 1-20
    { id: 1, type: PlayerType.Guard, name: "Jamal", surname: "Murray", salary: 42000000, scoring: 89, shooting: 93, playmaking: 88, rebounding: 69, defense: 75 },
    { id: 2, type: PlayerType.Guard, name: "Steph", surname: "Curry", salary: 55000000, scoring: 93, shooting: 99, playmaking: 91, rebounding: 68, defense: 70 },
    { id: 3, type: PlayerType.Guard, name: "LaMelo", surname: "Ball", salary: 38000000, scoring: 86, shooting: 86, playmaking: 95, rebounding: 79, defense: 72 },
    { id: 4, type: PlayerType.Guard, name: "Shai", surname: "Gilgeous-Alexander", salary: 62000000, scoring: 97, shooting: 89, playmaking: 90, rebounding: 81, defense: 88 },
    { id: 5, type: PlayerType.Guard, name: "Luka", surname: "Doncic", salary: 65000000, scoring: 99, shooting: 88, playmaking: 98, rebounding: 85, defense: 75 },
    { id: 6, type: PlayerType.Guard, name: "Cade", surname: "Cunningham", salary: 40000000, scoring: 88, shooting: 85, playmaking: 92, rebounding: 78, defense: 80 },
    { id: 7, type: PlayerType.Guard, name: "Anthony", surname: "Edwards", salary: 58000000, scoring: 95, shooting: 88, playmaking: 84, rebounding: 77, defense: 87 },
    { id: 8, type: PlayerType.Guard, name: "Donovan", surname: "Mitchell", salary: 48000000, scoring: 93, shooting: 87, playmaking: 85, rebounding: 72, defense: 76 },
    { id: 9, type: PlayerType.Guard, name: "Jalen", surname: "Brunson", salary: 52000000, scoring: 94, shooting: 89, playmaking: 87, rebounding: 70, defense: 73 },
    { id: 10, type: PlayerType.Guard, name: "Tyrese", surname: "Maxey", salary: 44000000, scoring: 91, shooting: 90, playmaking: 85, rebounding: 71, defense: 74 },
    { id: 11, type: PlayerType.Guard, name: "Nickeil", surname: "Alexander-Walker", salary: 14000000, scoring: 74, shooting: 79, playmaking: 72, rebounding: 65, defense: 85 },
    { id: 12, type: PlayerType.Guard, name: "Anthony", surname: "Black", salary: 11000000, scoring: 70, shooting: 68, playmaking: 76, rebounding: 70, defense: 81 },
    { id: 13, type: PlayerType.Guard, name: "Alex", surname: "Caruso", salary: 22000000, scoring: 72, shooting: 78, playmaking: 75, rebounding: 67, defense: 93 },
    { id: 14, type: PlayerType.Guard, name: "Stephon", surname: "Castle", salary: 13000000, scoring: 75, shooting: 70, playmaking: 77, rebounding: 69, defense: 83 },
    { id: 15, type: PlayerType.Guard, name: "Darius", surname: "Garland", salary: 35000000, scoring: 85, shooting: 86, playmaking: 89, rebounding: 64, defense: 66 },
    { id: 16, type: PlayerType.Guard, name: "Jrue", surname: "Holiday", salary: 28000000, scoring: 80, shooting: 85, playmaking: 83, rebounding: 74, defense: 91 },
    { id: 17, type: PlayerType.Guard, name: "Kon", surname: "Knuppel", salary: 8000000, scoring: 68, shooting: 72, playmaking: 66, rebounding: 62, defense: 65 },
    { id: 18, type: PlayerType.Guard, name: "Vít", surname: "Krejčí", salary: 7000000, scoring: 66, shooting: 73, playmaking: 76, rebounding: 63, defense: 69 },
    { id: 19, type: PlayerType.Guard, name: "Kyle", surname: "Lowry", salary: 6000000, scoring: 67, shooting: 74, playmaking: 79, rebounding: 64, defense: 70 },
    { id: 20, type: PlayerType.Guard, name: "Ajay", surname: "Mitchell", salary: 8000000, scoring: 69, shooting: 71, playmaking: 73, rebounding: 60, defense: 64 },

// --- WINGS --- id: 21-39
    { id: 21, type: PlayerType.Wing, name: "LeBron", surname: "James", salary: 48000000, scoring: 91, shooting: 84, playmaking: 93, rebounding: 83, defense: 78 },
    { id: 22, type: PlayerType.Wing, name: "Peyton", surname: "Watson", salary: 12000000, scoring: 73, shooting: 72, playmaking: 68, rebounding: 76, defense: 89 },
    { id: 23, type: PlayerType.Wing, name: "Brandon", surname: "Miller", salary: 34000000, scoring: 86, shooting: 88, playmaking: 78, rebounding: 75, defense: 81 },
    { id: 24, type: PlayerType.Wing, name: "Jaylen", surname: "Brown", salary: 50000000, scoring: 91, shooting: 84, playmaking: 77, rebounding: 81, defense: 87 },
    { id: 25, type: PlayerType.Wing, name: "Giannis", surname: "Antetokounmpo", salary: 63000000, scoring: 97, shooting: 68, playmaking: 85, rebounding: 94, defense: 92 },
    { id: 26, type: PlayerType.Wing, name: "Julius", surname: "Randle", salary: 36000000, scoring: 87, shooting: 80, playmaking: 81, rebounding: 89, defense: 76 },
    { id: 27, type: PlayerType.Wing, name: "Aaron", surname: "Gordon", salary: 30000000, scoring: 83, shooting: 75, playmaking: 79, rebounding: 83, defense: 88 },
    { id: 28, type: PlayerType.Wing, name: "Kawhi", surname: "Leonard", salary: 46000000, scoring: 90, shooting: 89, playmaking: 80, rebounding: 80, defense: 90 },
    { id: 29, type: PlayerType.Wing, name: "Kevin", surname: "Durant", salary: 52000000, scoring: 95, shooting: 94, playmaking: 83, rebounding: 82, defense: 83 },
    { id: 30, type: PlayerType.Wing, name: "Scottie", surname: "Barnes", salary: 45000000, scoring: 88, shooting: 81, playmaking: 87, rebounding: 86, defense: 89 },
    { id: 31, type: PlayerType.Wing, name: "OG", surname: "Anunoby", salary: 34000000, scoring: 79, shooting: 83, playmaking: 69, rebounding: 75, defense: 94 },
    { id: 32, type: PlayerType.Wing, name: "Ace", surname: "Bailey", salary: 15000000, scoring: 77, shooting: 76, playmaking: 71, rebounding: 77, defense: 76 },
    { id: 33, type: PlayerType.Wing, name: "Paolo", surname: "Banchero", salary: 52000000, scoring: 92, shooting: 79, playmaking: 86, rebounding: 87, defense: 80 },
    { id: 34, type: PlayerType.Wing, name: "Miles", surname: "Bridges", salary: 26000000, scoring: 84, shooting: 79, playmaking: 75, rebounding: 80, defense: 75 },
    { id: 35, type: PlayerType.Wing, name: "Mikal", surname: "Bridges", salary: 32000000, scoring: 82, shooting: 84, playmaking: 77, rebounding: 73, defense: 88 },
    { id: 36, type: PlayerType.Wing, name: "Julian", surname: "Champagnie", salary: 9000000, scoring: 72, shooting: 77, playmaking: 64, rebounding: 66, defense: 73 },
    { id: 37, type: PlayerType.Wing, name: "Cooper", surname: "Flagg", salary: 20000000, scoring: 84, shooting: 79, playmaking: 80, rebounding: 84, defense: 89 },
    { id: 38, type: PlayerType.Wing, name: "Rui", surname: "Hachimura", salary: 18000000, scoring: 79, shooting: 81, playmaking: 66, rebounding: 73, defense: 72 },
    { id: 39, type: PlayerType.Wing, name: "Brandon", surname: "Ingram", salary: 38000000, scoring: 86, shooting: 83, playmaking: 84, rebounding: 74, defense: 73 },

// --- BIG MEN --- id: 40-60
    { id: 40, type: PlayerType.BigMan, name: "Nikola", surname: "Jokic", salary: 66000000, scoring: 98, shooting: 87, playmaking: 99, rebounding: 99, defense: 77 },
    { id: 41, type: PlayerType.BigMan, name: "Rudy", surname: "Gobert", salary: 24000000, scoring: 73, shooting: 60, playmaking: 68, rebounding: 94, defense: 96 },
    { id: 42, type: PlayerType.BigMan, name: "Victor", surname: "Wembanyama", salary: 64000000, scoring: 94, shooting: 83, playmaking: 84, rebounding: 95, defense: 99 },
    { id: 43, type: PlayerType.BigMan, name: "Evan", surname: "Mobley", salary: 40000000, scoring: 85, shooting: 75, playmaking: 79, rebounding: 89, defense: 92 },
    { id: 44, type: PlayerType.BigMan, name: "Bam", surname: "Adebayo", salary: 46000000, scoring: 87, shooting: 76, playmaking: 84, rebounding: 91, defense: 94 },
    { id: 45, type: PlayerType.BigMan, name: "Jalen", surname: "Duren", salary: 20000000, scoring: 80, shooting: 62, playmaking: 70, rebounding: 93, defense: 79 },
    { id: 46, type: PlayerType.BigMan, name: "Alperen", surname: "Sengun", salary: 44000000, scoring: 89, shooting: 75, playmaking: 89, rebounding: 90, defense: 77 },
    { id: 47, type: PlayerType.BigMan, name: "Karl-Anthony", surname: "Towns", salary: 45000000, scoring: 90, shooting: 94, playmaking: 77, rebounding: 88, defense: 76 },
    { id: 48, type: PlayerType.BigMan, name: "Naz", surname: "Reid", salary: 22000000, scoring: 85, shooting: 87, playmaking: 75, rebounding: 77, defense: 77 },
    { id: 49, type: PlayerType.BigMan, name: "Joel", surname: "Embiid", salary: 61000000, scoring: 98, shooting: 86, playmaking: 82, rebounding: 91, defense: 89 },
    { id: 50, type: PlayerType.BigMan, name: "Chet", surname: "Holmgren", salary: 48000000, scoring: 87, shooting: 84, playmaking: 77, rebounding: 89, defense: 93 },
    { id: 51, type: PlayerType.BigMan, name: "Moussa", surname: "Diabate", salary: 6000000, scoring: 64, shooting: 52, playmaking: 56, rebounding: 82, defense: 73 },
    { id: 52, type: PlayerType.BigMan, name: "Steven", surname: "Adams", salary: 10000000, scoring: 66, shooting: 48, playmaking: 69, rebounding: 88, defense: 77 },
    { id: 53, type: PlayerType.BigMan, name: "Deandre", surname: "Ayton", salary: 28000000, scoring: 83, shooting: 77, playmaking: 63, rebounding: 90, defense: 78 },
    { id: 54, type: PlayerType.BigMan, name: "Clint", surname: "Capela", salary: 16000000, scoring: 74, shooting: 52, playmaking: 57, rebounding: 89, defense: 80 },
    { id: 55, type: PlayerType.BigMan, name: "Isaiah", surname: "Hartenstein", salary: 32000000, scoring: 76, shooting: 64, playmaking: 83, rebounding: 87, defense: 85 },
    { id: 56, type: PlayerType.BigMan, name: "Luke", surname: "Kornet", salary: 6000000, scoring: 67, shooting: 60, playmaking: 66, rebounding: 75, defense: 74 },
    { id: 57, type: PlayerType.BigMan, name: "Mitchell", surname: "Robinson", salary: 15000000, scoring: 68, shooting: 48, playmaking: 53, rebounding: 89, defense: 87 },
    { id: 58, type: PlayerType.BigMan, name: "Isaiah", surname: "Stewart", salary: 16000000, scoring: 75, shooting: 75, playmaking: 65, rebounding: 80, defense: 81 },
    { id: 59, type: PlayerType.BigMan, name: "Myles", surname: "Turner", salary: 30000000, scoring: 83, shooting: 83, playmaking: 67, rebounding: 79, defense: 86 },
    { id: 60, type: PlayerType.BigMan, name: "Domantas", surname: "Sabonis", salary: 48000000, scoring: 88, shooting: 78, playmaking: 92, rebounding: 96, defense: 74 }
];

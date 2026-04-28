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
    salary: number;
    // od 1 - 100, hodnoceno podle porovnani s ostatnimi hraci
    /* 
        Prirucka hodnoceni:
        95–99 → elite / MVP level
        90–94 → All-NBA
        80–89 → All-Star / top hráč
        70–79 → solid starter
        60–69 → role player
        <60 → bench / meh
    */
    scoring: number;
    shooting: number;
    playmaking: number;
    defense: number;
    rebounding: number;
}

export const Player_catalog: PlayerData[] = [
    {
        id: 1,
        type: PlayerType.Guard,
        name: "Jamal",
        surname: "Murray",
        salary: 46000000,
        
        scoring: 89,
        shooting: 96,
        playmaking: 88,
        rebounding: 69,
        defense: 70
    }
    {
        id: 2,
        type: PlayerType.BigMan,
        name: "Nikola",
        surname: "Jokic",
        salary: 55000000,
        
        scoring: 98,
        shooting: 85,
        playmaking: 99,
        rebounding: 99,
        defense: 75
    }
    {
        id: 3,
        type: PlayerType.Wing,
        name: "LeBron",
        surname: "James",
        salary: 44000000,
        
        scoring: 88,
        shooting: 89,
        playmaking: 94,
        rebounding: 82,
        defense: 80
    }
    {
        id: 4,
        type: PlayerType.Guard,
        name: "Steph",
        surname: "Curry",
        salary: 59000000,
        
        scoring: 94,
        shooting: 98,
        playmaking: 92,
        rebounding: 69,
        defense: 70
    }
    {
        id: 5,
        type: PlayerType.Guard,
        name: "Peyton",
        surname: "Watson",
        salary: 3000000,
        
        scoring: 80,
        shooting: 90,
        playmaking: 75,
        rebounding: 78,
        defense: 89
    }
    {
        id: 6,
        type: PlayerType.Guard,
        name: "Jamal",
        surname: "Murray",
        salary: 46000000,
        
        scoring: 89,
        shooting: 96,
        playmaking: 88,
        rebounding: 69,
        defense: 70
    }
    {
        id: 1,
        type: PlayerType.Guard,
        name: "Jamal",
        surname: "Murray",
        salary: 46000000,
        
        scoring: 89,
        shooting: 96,
        playmaking: 88,
        rebounding: 69,
        defense: 70
    }
    {
        id: 1,
        type: PlayerType.Guard,
        name: "Jamal",
        surname: "Murray",
        salary: 46000000,
        
        scoring: 89,
        shooting: 96,
        playmaking: 88,
        rebounding: 69,
        defense: 70
    }
    {
        id: 1,
        type: PlayerType.Guard,
        name: "Jamal",
        surname: "Murray",
        salary: 46000000,
        
        scoring: 89,
        shooting: 96,
        playmaking: 88,
        rebounding: 69,
        defense: 70
    }
    {
        id: 1,
        type: PlayerType.Guard,
        name: "Jamal",
        surname: "Murray",
        salary: 46000000,
        
        scoring: 89,
        shooting: 96,
        playmaking: 88,
        rebounding: 69,
        defense: 70
    }
    {
        id: 1,
        type: PlayerType.Guard,
        name: "Jamal",
        surname: "Murray",
        salary: 46000000,
        
        scoring: 89,
        shooting: 96,
        playmaking: 88,
        rebounding: 69,
        defense: 70
    }
    {
        id: 1,
        type: PlayerType.Guard,
        name: "Jamal",
        surname: "Murray",
        salary: 46000000,
        
        scoring: 89,
        shooting: 96,
        playmaking: 88,
        rebounding: 69,
        defense: 70
    }
    {
        id: 1,
        type: PlayerType.Guard,
        name: "Jamal",
        surname: "Murray",
        salary: 46000000,
        
        scoring: 89,
        shooting: 96,
        playmaking: 88,
        rebounding: 69,
        defense: 70
    }
    {
        id: 1,
        type: PlayerType.Guard,
        name: "Jamal",
        surname: "Murray",
        salary: 46000000,
        
        scoring: 89,
        shooting: 96,
        playmaking: 88,
        rebounding: 69,
        defense: 70
    }
    {
        id: 1,
        type: PlayerType.Guard,
        name: "Jamal",
        surname: "Murray",
        salary: 46000000,
        
        scoring: 89,
        shooting: 96,
        playmaking: 88,
        rebounding: 69,
        defense: 70
    }
    {
        id: 1,
        type: PlayerType.Guard,
        name: "Jamal",
        surname: "Murray",
        salary: 46000000,
        
        scoring: 89,
        shooting: 96,
        playmaking: 88,
        rebounding: 69,
        defense: 70
    }
    {
        id: 1,
        type: PlayerType.Guard,
        name: "Jamal",
        surname: "Murray",
        salary: 46000000,
        
        scoring: 89,
        shooting: 96,
        playmaking: 88,
        rebounding: 69,
        defense: 70
    }
    {
        id: 1,
        type: PlayerType.Guard,
        name: "Jamal",
        surname: "Murray",
        salary: 46000000,
        
        scoring: 89,
        shooting: 96,
        playmaking: 88,
        rebounding: 69,
        defense: 70
    }
    {
        id: 1,
        type: PlayerType.Guard,
        name: "Jamal",
        surname: "Murray",
        salary: 46000000,
        
        scoring: 89,
        shooting: 96,
        playmaking: 88,
        rebounding: 69,
        defense: 70
    }
    {
        id: 1,
        type: PlayerType.Guard,
        name: "Jamal",
        surname: "Murray",
        salary: 46000000,
        
        scoring: 89,
        shooting: 96,
        playmaking: 88,
        rebounding: 69,
        defense: 70
    }
    {
        id: 1,
        type: PlayerType.Guard,
        name: "Jamal",
        surname: "Murray",
        salary: 46000000,
        
        scoring: 89,
        shooting: 96,
        playmaking: 88,
        rebounding: 69,
        defense: 70
    }
]
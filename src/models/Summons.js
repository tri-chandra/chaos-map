class Summon {
    constructor(id, name, stats = {}) {
        this.id = id;
        this.name = name;

        this.rarity = '';
        this.scaling = '';
        this.type = '';
        this.mana = 1;
    }
}

Summon.Rarity = {
    Common: 'common',
    Uncommon: 'uncommon',
    Rare: 'rare',
    Epic: 'epic',
    Legendary: 'legendary'
}

Summon.Scaling = {
    Health: 'health',
    Armor: 'armor',
    Attack: 'attack',
    Level: 'level'
}

Summon.Type = {
    Spell: 'spell',
    Summon: 'summon'
}

Summon.SkeletonSummoner = new Summon(
    'summoner', 
    'Skeleton Summoner', 
    {
        mana: 18,
        rarity: Summon.Rarity.Legendary,
        scaling: Summon.Scaling.Level,
        type: Summon.Type.Summon
    });

export default Summon;
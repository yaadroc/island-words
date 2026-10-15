/* Island Words - content. All words uppercase A-Z, no spaces/accents. */
(function (root) {
  var DATA = {
    tagline: 'Discover the Caribbean, One Word at a Time!',
    islands: [
      { id: 'jamaica', name: 'Jamaica', color: '#2E9E5B', starsReq: 0,
        blurb: 'Land of reggae, jerk and the Blue Mountains.',
        puzzles: [
          { id: 'jm1', title: 'Roots of Rhythm', theme: 'Music', level: 1, words: ['SKA', 'DUB', 'MENTO', 'REGGAE'],
            fact: 'Mento is Jamaica\'s folk music and came before ska, rocksteady and reggae.' },
          { id: 'jm2', title: 'Yard Food', theme: 'Food', level: 2, words: ['ACKEE', 'JERK', 'PATTY', 'BAMMY', 'SORREL', 'FESTIVAL', 'SALTFISH'],
            fact: 'Ackee is Jamaica\'s national fruit, and ackee and saltfish is the national dish.' },
          { id: 'jm3', title: 'Sound System', theme: 'Music', level: 3, words: ['REGGAE', 'RIDDIM', 'DANCEHALL', 'MENTO', 'SKA', 'DUB', 'ROCKSTEADY'],
            fact: 'Reggae music was added to UNESCO\'s list of Intangible Cultural Heritage in 2018.' },
          { id: 'jm4', title: 'Mountains & Towns', theme: 'Places', level: 4, words: ['BLUEMOUNTAIN', 'KINGSTON', 'PATOIS', 'NEGRIL', 'MONTEGOBAY'],
            fact: 'Blue Mountain Peak is Jamaica\'s highest point at 2,256 metres (7,402 feet).' }
        ] },
      { id: 'bahamas', name: 'Bahamas', color: '#14B8C4', starsReq: 6,
        blurb: 'Hundreds of islands, pink flamingos and turquoise water.',
        puzzles: [
          { id: 'bs1', title: 'Out Islands', theme: 'Places', level: 1, words: ['EXUMA', 'BIMINI', 'ANDROS', 'CONCH'],
            fact: 'Andros is the largest island in The Bahamas, and its barrier reef is one of the longest in the world.' },
          { id: 'bs2', title: 'Junkanoo Day', theme: 'Culture', level: 2, words: ['JUNKANOO', 'FLAMINGO', 'NASSAU', 'CONCH', 'GOOMBAY'],
            fact: 'Junkanoo is a colorful street parade of music and costumes held on Boxing Day and New Year\'s Day.' },
          { id: 'bs3', title: 'Bahamian Flag', theme: 'Flags', level: 3, words: ['AQUAMARINE', 'GOLD', 'BLACK', 'TRIANGLE', 'FLAG'],
            fact: 'The flag from 1973 has aquamarine for the sea, gold for sun and sand, and a black triangle for the strength of the people.' },
          { id: 'bs4', title: 'Pigs & Rhythms', theme: 'Culture', level: 5, words: ['RAKEANDSCRAPE', 'SWIMMINGPIGS', 'JUNKANOO', 'GOOMBAY', 'FLAMINGO', 'NASSAU', 'EXUMA'],
            fact: 'Rake-and-scrape is traditional Bahamian music, and the famous swimming pigs live on Big Major Cay in the Exumas.' }
        ] },
      { id: 'trinidad', name: 'Trinidad & Tobago', color: '#FF6B4A', starsReq: 15,
        blurb: 'Home of steelpan, soca and the greatest Carnival.',
        puzzles: [
          { id: 'tt1', title: 'Twin Island Basics', theme: 'Culture', level: 1, words: ['SOCA', 'ROTI', 'PAN', 'TOBAGO'],
            fact: 'Soca music was created in Trinidad in the 1970s, a lively mix of calypso with other rhythms.' },
          { id: 'tt2', title: 'Flag Colors', theme: 'Flags', level: 2, words: ['TRINIDAD', 'TOBAGO', 'RED', 'BLACK', 'WHITE'],
            fact: 'The red, white and black flag stands for the vitality of the land, the equality of the people and their strength.' },
          { id: 'tt3', title: 'Street Eats & Beats', theme: 'Food', level: 3, words: ['DOUBLES', 'CALYPSO', 'STEELPAN', 'MARACAS', 'ROTI', 'SOCA'],
            fact: 'Doubles is a beloved street food: two soft bara filled with curried channa (chickpeas).' },
          { id: 'tt4', title: 'Carnival Time', theme: 'Culture', level: 4, words: ['CARNIVAL', 'MASQUERADE', 'PORTOFSPAIN', 'STEELPAN', 'CALYPSO', 'SOCA'],
            fact: 'The steelpan was invented in Trinidad and Tobago and is the only new acoustic instrument of the 20th century.' }
        ] },
      { id: 'barbados', name: 'Barbados', color: '#FFC93C', starsReq: 24,
        blurb: 'Little England of the Caribbean: rum, surf and flying fish.',
        puzzles: [
          { id: 'bb1', title: 'Bajan Basics', theme: 'Culture', level: 2, words: ['RUM', 'BAJAN', 'OISTINS', 'CROPOVER'],
            fact: 'Crop Over is Barbados\' summer festival, originally celebrating the end of the sugar cane harvest.' },
          { id: 'bb2', title: 'Ocean Flag', theme: 'Flags', level: 2, words: ['TRIDENT', 'GOLD', 'BLUE', 'BLACK'],
            fact: 'The black trident on the Barbados flag is "broken", a symbol of the break from colonial status.' },
          { id: 'bb3', title: 'Fish & Fun', theme: 'Food', level: 3, words: ['BRIDGETOWN', 'BATHSHEBA', 'FLYINGFISH', 'OISTINS', 'RUM'],
            fact: 'Flying fish is the national dish of Barbados, served with cou-cou. Oistins has a famous Friday fish fry.' }
        ] },
      { id: 'dominican', name: 'Dominican Republic', color: '#0B3C5D', starsReq: 32,
        blurb: 'Birthplace of merengue and bachata, with sun-soaked beaches.',
        puzzles: [
          { id: 'dr1', title: 'Flag Colors', theme: 'Flags', level: 1, words: ['CROSS', 'BLUE', 'RED', 'WHITE', 'BIBLE'],
            fact: 'The Dominican flag has a white cross, and its coat of arms in the center includes a Bible.' },
          { id: 'dr2', title: 'Dance Floor', theme: 'Music', level: 2, words: ['MERENGUE', 'BACHATA', 'MANGU', 'CARIBE'],
            fact: 'Merengue and bachata are both on UNESCO\'s lists of Intangible Cultural Heritage.' },
          { id: 'dr3', title: 'Old Capital', theme: 'Places', level: 4, words: ['SANTODOMINGO', 'BASEBALL', 'MERENGUE', 'BACHATA', 'MANGU', 'CARIBE'],
            fact: 'Santo Domingo\'s Colonial Zone is the oldest European-established settlement in the Americas, and baseball is hugely loved on the island.' }
        ] },
      { id: 'stlucia', name: 'Saint Lucia', color: '#E8567F', starsReq: 40,
        blurb: 'The twin Pitons rise from the sea over lush rainforest.',
        puzzles: [
          { id: 'lc1', title: 'Pitons & Plantations', theme: 'Food', level: 1, words: ['PITONS', 'COCOA', 'BANANA'],
            fact: 'The Pitons, Gros Piton and Petit Piton, are a UNESCO World Heritage Site.' },
          { id: 'lc2', title: 'Island Sights', theme: 'Places', level: 3, words: ['SOUFRIERE', 'RAINFOREST', 'CASTRIES', 'PITONS', 'BANANA', 'COCOA'],
            fact: 'Castries is the capital of Saint Lucia, and bananas are one of its most important crops.' },
          { id: 'lc3', title: 'Volcano Adventure', theme: 'Places', level: 5, words: ['SULPHURSPRINGS', 'RAINFOREST', 'SOUFRIERE', 'CASTRIES', 'PIGEONISLAND', 'PITONS', 'COCOA', 'BANANA'],
            fact: 'The Sulphur Springs near Soufriere are known as the "drive-in volcano".' }
        ] }
    ]
  };
  root.IW_DATA = DATA;
  if (typeof module !== 'undefined') module.exports = DATA;
})(typeof globalThis !== 'undefined' ? globalThis : window);

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
          { id: 'jm5', title: 'Black, Green & Gold', theme: 'Flags', level: 2, words: ['GOLD', 'GREEN', 'BLACK', 'SALTIRE', 'FLAG'],
            fact: 'Jamaica\'s flag is the only national flag in the world that has none of the colors red, white or blue.' },
          { id: 'jm6', title: 'Sprint Kings', theme: 'Sports', level: 2, words: ['BOLT', 'SPRINT', 'RECORD', 'TRACK', 'GOLD'],
            fact: 'Usain Bolt, from Jamaica, set the 100 metres world record of 9.58 seconds in 2009.' },
          { id: 'jm3', title: 'Sound System', theme: 'Music', level: 3, words: ['REGGAE', 'RIDDIM', 'DANCEHALL', 'MENTO', 'SKA', 'DUB', 'ROCKSTEADY'],
            fact: 'Reggae music was added to UNESCO\'s list of Intangible Cultural Heritage in 2018.' },
          { id: 'jm4', title: 'Mountains & Towns', theme: 'Places', level: 4, words: ['BLUEMOUNTAIN', 'KINGSTON', 'PATOIS', 'NEGRIL', 'MONTEGOBAY'],
            fact: 'Blue Mountain Peak is Jamaica\'s highest point at 2,256 metres (7,402 feet).' },
          { id: 'jm7', title: 'Spice of Jerk', theme: 'Food', level: 4, words: ['PIMENTO', 'SCOTCHBONNET', 'THYME', 'GINGER', 'JERK'],
            fact: 'Pimento (also called allspice) is native to Jamaica and is the key flavor in authentic jerk.' }
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
          { id: 'bs5', title: 'Wild Bahamas', theme: 'Wildlife', level: 3, words: ['FLAMINGO', 'INAGUA', 'IGUANA', 'DOLPHIN', 'TURTLE'],
            fact: 'Inagua National Park in The Bahamas is home to the largest breeding colony of West Indian flamingos in the world.' },
          { id: 'bs4', title: 'Pigs & Rhythms', theme: 'Culture', level: 5, words: ['RAKEANDSCRAPE', 'SWIMMINGPIGS', 'JUNKANOO', 'GOOMBAY', 'FLAMINGO', 'NASSAU', 'EXUMA'],
            fact: 'Rake-and-scrape is traditional Bahamian music, and the famous swimming pigs live on Big Major Cay in the Exumas.' }
        ] },
      { id: 'trinidad', name: 'Trinidad & Tobago', color: '#FF6B4A', starsReq: 14,
        blurb: 'Home of steelpan, soca and the greatest Carnival.',
        puzzles: [
          { id: 'tt1', title: 'Twin Island Basics', theme: 'Culture', level: 1, words: ['SOCA', 'ROTI', 'PAN', 'TOBAGO'],
            fact: 'Soca music was created in Trinidad in the 1970s, a lively mix of calypso with other rhythms.' },
          { id: 'tt2', title: 'Flag Colors', theme: 'Flags', level: 2, words: ['TRINIDAD', 'TOBAGO', 'RED', 'BLACK', 'WHITE'],
            fact: 'The red, white and black flag stands for the vitality of the land, the equality of the people and their strength.' },
          { id: 'tt3', title: 'Street Eats & Beats', theme: 'Food', level: 3, words: ['DOUBLES', 'CALYPSO', 'STEELPAN', 'MARACAS', 'ROTI', 'SOCA'],
            fact: 'Doubles is a beloved street food: two soft bara filled with curried channa (chickpeas).' },
          { id: 'tt5', title: 'Lake of Asphalt', theme: 'Places', level: 3, words: ['PITCHLAKE', 'LABREA', 'ASPHALT', 'IBIS'],
            fact: 'The Pitch Lake at La Brea is the largest natural deposit of asphalt in the world.' },
          { id: 'tt4', title: 'Carnival Time', theme: 'Culture', level: 4, words: ['CARNIVAL', 'MASQUERADE', 'PORTOFSPAIN', 'STEELPAN', 'CALYPSO', 'SOCA'],
            fact: 'The steelpan was invented in Trinidad and Tobago and is the only new acoustic instrument of the 20th century.' },
          { id: 'tt6', title: 'Tobago Treasures', theme: 'Places', level: 4, words: ['BUCCOOREEF', 'PIGEONPOINT', 'NYLONPOOL', 'SCARBOROUGH', 'TOBAGO'],
            fact: 'Buccoo Reef off Tobago is a protected marine park, popular for snorkeling.' }
        ] },
      { id: 'food', name: 'Caribbean Food', color: '#F28C28', starsReq: 22,
        blurb: 'Fruit, spice and Sunday dinner from across the islands.',
        puzzles: [
          { id: 'fd1', title: 'Tropical Fruit', theme: 'Food', level: 1, words: ['MANGO', 'GUAVA', 'PAPAYA', 'LIME'],
            fact: 'Papaya is called pawpaw on many Caribbean islands.' },
          { id: 'fd2', title: 'Market Day', theme: 'Food', level: 3, words: ['CALLALOO', 'PLANTAIN', 'BREADFRUIT', 'CASSAVA', 'TAMARIND'],
            fact: 'Breadfruit was brought to the Caribbean from the Pacific in 1793 by Captain William Bligh.' },
          { id: 'fd3', title: 'Sunday Dinner', theme: 'Food', level: 4, words: ['CURRYGOAT', 'OXTAIL', 'RICEANDPEAS', 'JOHNNYCAKE', 'COCONUTMILK'],
            fact: 'In rice and peas, the "peas" are really red kidney beans, cooked in coconut milk. It is a classic Sunday dish in Jamaica.' }
        ] },
      { id: 'barbados', name: 'Barbados', color: '#FFC93C', starsReq: 30,
        blurb: 'Little England of the Caribbean: rum, surf and flying fish.',
        puzzles: [
          { id: 'bb1', title: 'Bajan Basics', theme: 'Culture', level: 2, words: ['RUM', 'BAJAN', 'OISTINS', 'CROPOVER'],
            fact: 'Crop Over is Barbados\' summer festival, originally celebrating the end of the sugar cane harvest.' },
          { id: 'bb2', title: 'Ocean Flag', theme: 'Flags', level: 2, words: ['TRIDENT', 'GOLD', 'BLUE', 'BLACK'],
            fact: 'The black trident on the Barbados flag is "broken", a symbol of the break from colonial status.' },
          { id: 'bb3', title: 'Fish & Fun', theme: 'Food', level: 3, words: ['BRIDGETOWN', 'BATHSHEBA', 'FLYINGFISH', 'OISTINS', 'RUM'],
            fact: 'Flying fish is the national dish of Barbados, served with cou-cou. Oistins has a famous Friday fish fry.' },
          { id: 'bb4', title: 'Bajan Heritage', theme: 'Culture', level: 4, words: ['HOLETOWN', 'CHATTELHOUSE', 'COUCOU', 'RIHANNA', 'CRICKET'],
            fact: 'Barbados became a republic in 2021, and singer Rihanna, born in Barbados, was named a National Hero at the ceremony.' }
        ] },
      { id: 'dominican', name: 'Dominican Republic', color: '#0B3C5D', starsReq: 38,
        blurb: 'Birthplace of merengue and bachata, with sun-soaked beaches.',
        puzzles: [
          { id: 'dr1', title: 'Flag Colors', theme: 'Flags', level: 1, words: ['CROSS', 'BLUE', 'RED', 'WHITE', 'BIBLE'],
            fact: 'The Dominican flag has a white cross, and its coat of arms in the center includes a Bible.' },
          { id: 'dr2', title: 'Dance Floor', theme: 'Music', level: 2, words: ['MERENGUE', 'BACHATA', 'MANGU', 'CARIBE'],
            fact: 'Merengue and bachata are both on UNESCO\'s lists of Intangible Cultural Heritage.' },
          { id: 'dr4', title: 'Hispaniola Gems', theme: 'Places', level: 3, words: ['LARIMAR', 'AMBER', 'HISPANIOLA', 'PUNTACANA'],
            fact: 'Larimar is a rare blue gemstone found only in the Dominican Republic.' },
          { id: 'dr3', title: 'Old Capital', theme: 'Places', level: 4, words: ['SANTODOMINGO', 'BASEBALL', 'MERENGUE', 'BACHATA', 'MANGU', 'CARIBE'],
            fact: 'Santo Domingo\'s Colonial Zone is the oldest European-established settlement in the Americas, and baseball is hugely loved on the island.' }
        ] },
      { id: 'legends', name: 'Legends of Rhythm', color: '#7B2CBF', starsReq: 46,
        blurb: 'Reggae, dancehall, soca and calypso stars.',
        puzzles: [
          { id: 'lg1', title: 'Reggae Royalty', theme: 'Music', level: 2, words: ['MARLEY', 'TOSH', 'CLIFF', 'WAILERS', 'EXODUS'],
            fact: 'Bob Marley and the Wailers\' album Exodus was named Album of the Century by TIME magazine in 1999.' },
          { id: 'lg2', title: 'Dancehall Hits', theme: 'Music', level: 3, words: ['SEANPAUL', 'BEENIEMAN', 'SHAGGY', 'DUTTYROCK'],
            fact: 'Sean Paul\'s album Dutty Rock won the Grammy for Best Reggae Album in 2004.' },
          { id: 'lg3', title: 'Calypso & Soca Stars', theme: 'Music', level: 4, words: ['SPARROW', 'KITCHENER', 'SUPERBLUE', 'MONTANO', 'CALYPSO'],
            fact: 'The Mighty Sparrow, born in Grenada and raised in Trinidad, was crowned Calypso King of the World.' },
          { id: 'lg4', title: 'Reggae Hall of Fame', theme: 'Music', level: 5, words: ['BOBMARLEY', 'JIMMYCLIFF', 'PETERTOSH', 'BUJUBANTON', 'NINEMILE'],
            fact: 'Bob Marley was born in 1945 in Nine Mile, in the parish of Saint Ann, Jamaica.' }
        ] },
      { id: 'stlucia', name: 'Saint Lucia', color: '#E8567F', starsReq: 54,
        blurb: 'The twin Pitons rise from the sea over lush rainforest.',
        puzzles: [
          { id: 'lc1', title: 'Pitons & Plantations', theme: 'Food', level: 1, words: ['PITONS', 'COCOA', 'BANANA'],
            fact: 'The Pitons, Gros Piton and Petit Piton, are a UNESCO World Heritage Site.' },
          { id: 'lc2', title: 'Island Sights', theme: 'Places', level: 3, words: ['SOUFRIERE', 'RAINFOREST', 'CASTRIES', 'PITONS', 'BANANA', 'COCOA'],
            fact: 'Castries is the capital of Saint Lucia, and bananas are one of its most important crops.' },
          { id: 'lc4', title: 'Nobel Island', theme: 'Culture', level: 3, words: ['WALCOTT', 'LEWIS', 'NOBEL', 'POET', 'ECONOMIST'],
            fact: 'Saint Lucia has produced two Nobel Prize winners: poet Derek Walcott and economist Sir Arthur Lewis.' },
          { id: 'lc3', title: 'Volcano Adventure', theme: 'Places', level: 5, words: ['SULPHURSPRINGS', 'RAINFOREST', 'SOUFRIERE', 'CASTRIES', 'PIGEONISLAND', 'PITONS', 'COCOA', 'BANANA'],
            fact: 'The Sulphur Springs near Soufriere are known as the "drive-in volcano".' }
        ] },
      { id: 'cuba', name: 'Cuba', color: '#C1272D', starsReq: 62,
        blurb: 'The biggest island: salsa, classic cars and old Havana.',
        puzzles: [
          { id: 'cu1', title: 'Hello Havana', theme: 'Places', level: 1, words: ['CUBA', 'HAVANA', 'SALSA', 'CIGAR'],
            fact: 'Cuba is the largest island in the Caribbean.' },
          { id: 'cu2', title: 'Cuban Rhythms', theme: 'Music', level: 2, words: ['SON', 'RUMBA', 'MAMBO', 'BOLERO'],
            fact: 'Son cubano blends Spanish guitar with African rhythms and is a root of salsa.' },
          { id: 'cu3', title: 'Cuban Kitchen', theme: 'Food', level: 3, words: ['TOSTONES', 'YUCA', 'FLAN', 'CUBANO', 'PLANTAIN'],
            fact: 'A Cuban sandwich is pressed hot with ham, roast pork, Swiss cheese and pickles.' },
          { id: 'cu4', title: 'Island Landmarks', theme: 'Places', level: 4, words: ['VARADERO', 'VINALES', 'MALECON', 'SANTIAGO', 'HAVANA'],
            fact: 'The Malecon is Havana\'s famous seawall and seaside promenade, about 8 kilometres long.' }
        ] },
      { id: 'cricket', name: 'Cricket Ground', color: '#6A994E', starsReq: 70,
        blurb: 'West Indies cricket greats and grounds.',
        puzzles: [
          { id: 'cr1', title: 'Windies Legends', theme: 'Sports', level: 1, words: ['LARA', 'WALSH', 'SOBERS', 'WICKET'],
            fact: 'Brian Lara scored 400 not out against England in Antigua in 2004, a Test record.' },
          { id: 'cr2', title: 'Fast & Fearless', theme: 'Sports', level: 3, words: ['RICHARDS', 'AMBROSE', 'HOLDING', 'GARNER', 'LLOYD'],
            fact: 'Sir Vivian Richards is from Antigua, and the stadium in North Sound is named after him.' },
          { id: 'cr3', title: 'Cricket Grounds', theme: 'Sports', level: 5, words: ['KENSINGTONOVAL', 'QUEENSPARKOVAL', 'SABINAPARK', 'PROVIDENCE', 'WINDIES', 'CRICKET'],
            fact: 'The West Indies won the first two Cricket World Cups, in 1975 and 1979.' }
        ] },
      { id: 'grenada', name: 'Grenada', color: '#B5651D', starsReq: 78,
        blurb: 'The Spice Isle: nutmeg, cocoa and underwater art.',
        puzzles: [
          { id: 'gr1', title: 'Spice Rack', theme: 'Food', level: 1, words: ['NUTMEG', 'MACE', 'CLOVE', 'SPICE'],
            fact: 'Grenada is called the Spice Isle and is one of the world\'s top producers of nutmeg.' },
          { id: 'gr2', title: 'Tri-Island State', theme: 'Places', level: 3, words: ['GRENADA', 'CARRIACOU', 'STGEORGES', 'SPICEISLE'],
            fact: 'The country of Grenada includes the islands of Grenada, Carriacou and Petite Martinique.' },
          { id: 'gr3', title: 'Underwater Art', theme: 'Places', level: 3, words: ['SCULPTURE', 'MOLINERE', 'SNORKEL', 'REEF'],
            fact: 'Molinere Bay in Grenada has the first underwater sculpture park in the world, created in 2006.' },
          { id: 'gr4', title: 'Chocolate & Carnival', theme: 'Culture', level: 4, words: ['CHOCOLATE', 'CACAO', 'GRANDETANG', 'SPICEMAS'],
            fact: 'Grenada\'s carnival is called Spicemas, and Grand Etang is a crater lake inside a forest reserve.' }
        ] },
      { id: 'wildlife', name: 'Island Wildlife', color: '#2A9D8F', starsReq: 86,
        blurb: 'Birds, turtles and reef creatures of the Caribbean.',
        puzzles: [
          { id: 'wl1', title: 'Beach Critters', theme: 'Wildlife', level: 1, words: ['IGUANA', 'PARROT', 'TURTLE', 'CRAB'],
            fact: 'Female sea turtles return to the beaches where they hatched to lay their own eggs.' },
          { id: 'wl2', title: 'Land & Sea', theme: 'Wildlife', level: 3, words: ['FLAMINGO', 'MANATEE', 'PELICAN', 'MONGOOSE', 'STINGRAY'],
            fact: 'Mongooses were brought to Jamaica in 1872 to control rats in the sugar cane fields.' },
          { id: 'wl3', title: 'Reef & Rainforest', theme: 'Wildlife', level: 5, words: ['DOCTORBIRD', 'SCARLETIBIS', 'LEATHERBACK', 'PARROTFISH', 'BARRACUDA'],
            fact: 'The doctor bird, or red-billed streamertail, is Jamaica\'s national bird.' }
        ] },
      { id: 'haiti', name: 'Haiti', color: '#1D3E9B', starsReq: 94,
        blurb: 'The first free Black republic, rich in art and flavor.',
        puzzles: [
          { id: 'ha1', title: 'Free at Last', theme: 'Culture', level: 1, words: ['HAITI', 'KOMPA', 'DRUM', 'MANGO'],
            fact: 'Haiti declared independence in 1804, becoming the first free Black republic in the world.' },
          { id: 'ha2', title: 'Haitian Kitchen', theme: 'Food', level: 2, words: ['JOUMOU', 'GRIOT', 'PIKLIZ', 'MANGO'],
            fact: 'Soup joumou, eaten on New Year\'s Day to celebrate independence, was added to UNESCO\'s heritage list in 2021.' },
          { id: 'ha3', title: 'Mountain Fortress', theme: 'Places', level: 3, words: ['CITADELLE', 'JACMEL', 'LABADEE', 'CAPHAITIEN'],
            fact: 'The Citadelle Laferriere near Cap-Haitien is one of the largest fortresses in the Americas and a UNESCO World Heritage Site.' },
          { id: 'ha4', title: 'Land of Mountains', theme: 'Culture', level: 4, words: ['CREOLE', 'RARA', 'AYITI', 'TAINO', 'MOUNTAINS', 'PAINTING'],
            fact: 'The name Haiti comes from the Taino word Ayiti, meaning "land of high mountains".' }
        ] },
      { id: 'festivals', name: 'Festival Season', color: '#E63946', starsReq: 102,
        blurb: 'Parades, music and celebrations all year round.',
        puzzles: [
          { id: 'fe1', title: 'Party Parades', theme: 'Culture', level: 2, words: ['CARNIVAL', 'CROPOVER', 'JOUVERT', 'JUNKANOO'],
            fact: 'J\'ouvert is the early-morning start of Carnival, from the French "jour ouvert", meaning "day open".' },
          { id: 'fe2', title: 'Arts & Music Fests', theme: 'Culture', level: 3, words: ['SUMFEST', 'CARIFESTA', 'SPICEMAS', 'CALABASH'],
            fact: 'Carifesta, a travelling festival of Caribbean arts, was first held in Guyana in 1972.' },
          { id: 'fe3', title: 'Holiday Time', theme: 'Culture', level: 4, words: ['EMANCIPATION', 'INDEPENDENCE', 'CHRISTMAS', 'BOXINGDAY'],
            fact: 'Many Caribbean islands celebrate Emancipation Day on 1 August, marking the end of slavery in the British Empire in 1834.' }
        ] },
      { id: 'puertorico', name: 'Puerto Rico', color: '#00A6A6', starsReq: 110,
        blurb: 'Coqui frogs, glowing bays and a tropical rainforest.',
        puzzles: [
          { id: 'pr1', title: 'Island Sounds', theme: 'Music', level: 1, words: ['COQUI', 'BOMBA', 'PLENA', 'SALSA'],
            fact: 'The coqui is a tiny tree frog whose "ko-KEE" call is a beloved symbol of Puerto Rico.' },
          { id: 'pr2', title: 'Plantain Power', theme: 'Food', level: 2, words: ['MOFONGO', 'PASTELES', 'TOSTONES', 'FLAN'],
            fact: 'Mofongo is made from fried green plantains mashed with garlic and broth or pork.' },
          { id: 'pr3', title: 'Nature & Forts', theme: 'Places', level: 3, words: ['ELYUNQUE', 'SANJUAN', 'ELMORRO', 'VIEQUES', 'CULEBRA'],
            fact: 'El Yunque is the only tropical rainforest in the U.S. National Forest System.' },
          { id: 'pr4', title: 'Glow in the Dark', theme: 'Places', level: 5, words: ['BIOLUMINESCENT', 'MOSQUITOBAY', 'PONCE', 'ARECIBO', 'RINCON', 'VIEQUES'],
            fact: 'Mosquito Bay on Vieques is known as one of the brightest bioluminescent bays in the world.' }
        ] },
      { id: 'slang', name: 'Island Talk', color: '#F4A261', starsReq: 118,
        blurb: 'Friendly words and phrases you will hear in the yard.',
        puzzles: [
          { id: 'sl1', title: 'Irie Vibes', theme: 'Slang', level: 1, words: ['IRIE', 'YARD', 'LIME', 'BLESS'],
            fact: '"Irie" is Jamaican for everything being good and all right.' },
          { id: 'sl2', title: 'Yard Talk', theme: 'Slang', level: 3, words: ['BREDREN', 'LIKKLE', 'WALKGOOD', 'ONELOVE', 'NOPROBLEM'],
            fact: '"Walk good" is a Jamaican way to say goodbye and wish someone a safe journey.' },
          { id: 'sl3', title: 'Trini & Yaad Words', theme: 'Slang', level: 4, words: ['BACCHANAL', 'LIMING', 'TALLAWAH', 'BLESSUP'],
            fact: 'In Trinidad, "liming" means hanging out and relaxing with friends.' }
        ] }
    ]
  };
  root.IW_DATA = DATA;
  if (typeof module !== 'undefined') module.exports = DATA;
})(typeof globalThis !== 'undefined' ? globalThis : window);

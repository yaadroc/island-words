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
      { id: 'antigua', name: 'Antigua & Barbuda', color: '#1AA6B7', starsReq: 118,
        blurb: 'Sailing harbors, historic forts and giant frigatebird colonies.',
        puzzles: [
          { id: 'ag1', title: 'Harbor Days', theme: 'Places', level: 1, words: ['SAIL', 'DOCK', 'FORT', 'REEF'],
            fact: 'Nelson\'s Dockyard in English Harbour, Antigua, is a UNESCO World Heritage Site.' },
          { id: 'ag2', title: 'Twin Island State', theme: 'Culture', level: 2, words: ['ANTIGUA', 'BARBUDA', 'NELSON', 'SAILING'],
            fact: 'Antigua and Barbuda became an independent nation in 1981.' },
          { id: 'ag3', title: 'Birds & Pineapples', theme: 'Nature', level: 4, words: ['FRIGATEBIRD', 'CODRINGTON', 'STJOHNS', 'PINEAPPLE'],
            fact: 'Barbuda\'s Codrington Lagoon shelters one of the largest frigatebird colonies in the world.' }
        ] },
      { id: 'stkitts', name: 'Saint Kitts & Nevis', color: '#2F8F4E', starsReq: 125,
        blurb: 'A tiny twin-island nation with a mighty fortress.',
        puzzles: [
          { id: 'kn1', title: 'Twin Islands', theme: 'Places', level: 1, words: ['NEVIS', 'KITTS', 'SUGAR', 'FORT'],
            fact: 'Saint Kitts and Nevis is the smallest sovereign country in the Americas by both area and population.' },
          { id: 'kn2', title: 'Fortress on the Hill', theme: 'Places', level: 3, words: ['BRIMSTONE', 'FORTRESS', 'BASSETERRE', 'VOLCANO'],
            fact: 'Brimstone Hill Fortress National Park on Saint Kitts is a UNESCO World Heritage Site.' },
          { id: 'kn3', title: 'Nevis Notables', theme: 'Culture', level: 4, words: ['HAMILTON', 'CHARLESTOWN', 'NEVISPEAK', 'SUGARTRAIN'],
            fact: 'Alexander Hamilton, a Founding Father of the United States, was born on Nevis in the 1750s.' }
        ] },
      { id: 'cayman', name: 'Cayman Islands', color: '#0E7C9B', starsReq: 132,
        blurb: 'Three islands famous for diving, stingrays and blue iguanas.',
        puzzles: [
          { id: 'ky1', title: 'Under the Sea', theme: 'Nature', level: 1, words: ['DIVE', 'REEF', 'SAND', 'RAY'],
            fact: 'At Stingray City in Grand Cayman\'s North Sound, visitors can wade among friendly southern stingrays.' },
          { id: 'ky2', title: 'Three Islands', theme: 'Places', level: 2, words: ['GRAND', 'BRAC', 'LITTLE', 'CAYMAN'],
            fact: 'The Cayman Islands are Grand Cayman, Cayman Brac and Little Cayman.' },
          { id: 'ky3', title: 'Turtle Islands', theme: 'Culture', level: 3, words: ['STINGRAY', 'SEVENMILE', 'GEORGETOWN', 'TURTLE'],
            fact: 'Columbus sighted the islands in 1503 and called them Las Tortugas because of all the sea turtles.' },
          { id: 'ky4', title: 'Blue Iguana Trail', theme: 'Nature', level: 4, words: ['BLUEIGUANA', 'MASTICTRAIL', 'SEVENMILE', 'CAYMANBRAC'],
            fact: 'Conservation programs have helped bring the Grand Cayman blue iguana back from the edge of extinction.' }
        ] },
      { id: 'curacao', name: 'Curaçao', color: '#F2A900', starsReq: 139,
        blurb: 'Pastel harbor houses, Papiamentu and a famous blue liqueur.',
        puzzles: [
          { id: 'cw1', title: 'Blue Orange', theme: 'Food', level: 1, words: ['PUNDA', 'LARAHA', 'BLUE', 'SALT'],
            fact: 'Blue Curaçao liqueur is flavored with the dried peel of the laraha, a bitter orange grown on the island.' },
          { id: 'cw2', title: 'Sweet Island', theme: 'Culture', level: 2, words: ['DUSHI', 'CURACAO', 'DUTCH', 'KENEPA'],
            fact: 'Curaçao is a constituent country of the Kingdom of the Netherlands.' },
          { id: 'cw3', title: 'Colorful Capital', theme: 'Places', level: 3, words: ['WILLEMSTAD', 'OTROBANDA', 'PAPIAMENTU', 'PUNDA'],
            fact: 'The historic center of Willemstad is a UNESCO World Heritage Site.' },
          { id: 'cw4', title: 'Bridges & Birds', theme: 'Places', level: 4, words: ['CHRISTOFFEL', 'KLEINCURACAO', 'QUEENEMMA', 'FLAMINGO'],
            fact: 'The Queen Emma Bridge in Willemstad is a floating pontoon bridge that swings open to let ships pass.' }
        ] },
      { id: 'aruba', name: 'Aruba', color: '#2A7FDB', starsReq: 146,
        blurb: 'One Happy Island, with leaning divi-divi trees and white sand.',
        puzzles: [
          { id: 'aw1', title: 'Windswept Shore', theme: 'Nature', level: 1, words: ['ALOE', 'DIVI', 'EAGLE', 'WIND'],
            fact: 'Aruba\'s famous divi-divi trees are bent by the constant trade winds.' },
          { id: 'aw2', title: 'One Happy Island', theme: 'Culture', level: 2, words: ['ARUBA', 'HAPPY', 'ARIKOK', 'ISLAND'],
            fact: 'Aruba became a separate constituent country of the Kingdom of the Netherlands in 1986.' },
          { id: 'aw3', title: 'Sun & Sand', theme: 'Places', level: 3, words: ['ORANJESTAD', 'EAGLEBEACH', 'LIGHTHOUSE', 'PAPIAMENTO'],
            fact: 'Aruba, Bonaire and Curaçao are called the ABC islands and lie just off the coast of Venezuela.' }
        ] },
      { id: 'bonaire', name: 'Bonaire', color: '#00A878', starsReq: 153,
        blurb: 'A diver\'s paradise ringed by a protected marine park.',
        puzzles: [
          { id: 'bq1', title: 'Reef Keepers', theme: 'Nature', level: 1, words: ['SALT', 'DIVE', 'REEF', 'DONKEY'],
            fact: 'The Bonaire National Marine Park, created in 1979, protects the coral reefs all around the island.' },
          { id: 'bq2', title: 'Pink Flocks', theme: 'Wildlife', level: 2, words: ['BONAIRE', 'FLAMINGO', 'SALTPANS', 'DONKEY'],
            fact: 'Flamingos gather around Bonaire\'s salt flats, one of the few places in the Caribbean where they breed.' },
          { id: 'bq3', title: 'Wind & Wild', theme: 'Places', level: 4, words: ['KRALENDIJK', 'WASHINGTON', 'SLAGBAAI', 'WINDSURFING'],
            fact: 'Bonaire is a special municipality of the Netherlands, and Kralendijk is its capital.' }
        ] },
      { id: 'dominica', name: 'Dominica', color: '#2E8B3D', starsReq: 160,
        blurb: 'The Nature Isle, with rainforest, hot springs and a boiling lake.',
        puzzles: [
          { id: 'dm1', title: 'Parrot Island', theme: 'Wildlife', level: 1, words: ['PARROT', 'LAKE', 'WHALE', 'RIVER'],
            fact: 'The Sisserou parrot, Dominica\'s national bird, appears on its flag, one of very few national flags that includes purple.' },
          { id: 'dm2', title: 'Island Heritage', theme: 'Culture', level: 2, words: ['DOMINICA', 'ROSEAU', 'KALINAGO', 'BOUYON'],
            fact: 'The Kalinago Territory on Dominica\'s east coast is home to the Kalinago people, one of the Caribbean\'s Indigenous nations.' },
          { id: 'dm3', title: 'Nature Isle', theme: 'Nature', level: 4, words: ['NATUREISLE', 'BOILINGLAKE', 'TROISPITONS', 'WAITUKUBULI'],
            fact: 'Morne Trois Pitons National Park, home of the Boiling Lake, is a UNESCO World Heritage Site.' }
        ] },
      { id: 'stvincent', name: 'St Vincent & the Grenadines', color: '#3D5AFE', starsReq: 167,
        blurb: 'A chain of sailing islands crowned by an active volcano.',
        puzzles: [
          { id: 'vc1', title: 'Island Chain', theme: 'Places', level: 1, words: ['BEQUIA', 'CAYS', 'UNION', 'SAIL'],
            fact: 'The Grenadines are a chain of small islands. The northern ones belong to Saint Vincent and the Grenadines, and the southern ones, like Carriacou, belong to Grenada.' },
          { id: 'vc2', title: 'Turtle Waters', theme: 'Nature', level: 2, words: ['MUSTIQUE', 'VINCY', 'CORAL', 'TURTLE'],
            fact: 'Tobago Cays Marine Park in the Grenadines protects coral reefs and sea turtles.' },
          { id: 'vc3', title: 'Bligh\'s Breadfruit', theme: 'History', level: 4, words: ['SOUFRIERE', 'BREADFRUIT', 'KINGSTOWN', 'ARROWROOT', 'WALLILABOU'],
            fact: 'Captain William Bligh brought breadfruit plants from Tahiti to Saint Vincent in 1793.' }
        ] },
      { id: 'bermuda', name: 'Bermuda', color: '#E75480', starsReq: 174,
        blurb: 'A pink-sand island in the Atlantic, often grouped with the Caribbean.',
        puzzles: [
          { id: 'bm1', title: 'Pink Sands', theme: 'Places', level: 1, words: ['SHORTS', 'PINK', 'SAND', 'MOON'],
            fact: 'Bermuda shorts are still worn by businesspeople there as part of formal dress.' },
          { id: 'bm2', title: 'Island Spirit', theme: 'Culture', level: 2, words: ['GOMBEY', 'HAMILTON', 'CAHOW', 'BERMUDA'],
            fact: 'The cahow, Bermuda\'s national bird, was thought extinct for centuries until it was rediscovered in 1951.' },
          { id: 'bm3', title: 'Old Fortresses', theme: 'History', level: 4, words: ['MOONGATE', 'STGEORGES', 'TRIANGLE', 'SOMERSISLES', 'DINGHY'],
            fact: 'The Historic Town of St George and Related Fortifications is a UNESCO World Heritage Site. Bermuda sits in the North Atlantic, not in the Caribbean Sea.' }
        ] },
      { id: 'turkscaicos', name: 'Turks & Caicos', color: '#00B4D8', starsReq: 181,
        blurb: 'Grace Bay beaches, conch and migrating humpback whales.',
        puzzles: [
          { id: 'tc1', title: 'Salt Islands', theme: 'History', level: 1, words: ['CONCH', 'SALT', 'SAND', 'REEF'],
            fact: 'Raking salt from the ponds was a main industry on Grand Turk and Salt Cay for centuries.' },
          { id: 'tc2', title: 'Island Emblems', theme: 'Culture', level: 2, words: ['TURKS', 'CAICOS', 'LOBSTER', 'CACTUS'],
            fact: 'The Turks and Caicos coat of arms shows a conch shell, a spiny lobster and a Turk\'s head cactus.' },
          { id: 'tc3', title: 'Whale Season', theme: 'Wildlife', level: 4, words: ['GRACEBAY', 'GRANDTURK', 'MIDDLECAICOS', 'WHALES'],
            fact: 'Humpback whales pass through Turks and Caicos waters every winter.' }
        ] },
      { id: 'bvi', name: 'British Virgin Islands', color: '#1D8FE1', starsReq: 188,
        blurb: 'Sailing paradise with giant granite boulders and secret coves.',
        puzzles: [
          { id: 'vg1', title: 'Boulder Baths', theme: 'Places', level: 1, words: ['BATHS', 'SAIL', 'BOAT', 'ROCK'],
            fact: 'The Baths on Virgin Gorda are giant granite boulders that form pools and sea caves.' },
          { id: 'vg2', title: 'Island Hopping', theme: 'Places', level: 2, words: ['TORTOLA', 'ANEGADA', 'GORDA', 'VIRGIN'],
            fact: 'Anegada is a flat coral island, while most of the other British Virgin Islands are hilly and volcanic.' },
          { id: 'vg3', title: 'Beach Bars & Bays', theme: 'Places', level: 4, words: ['JOSTVANDYKE', 'ROADTOWN', 'NORMANISLAND', 'PAINKILLER', 'FUNGI'],
            fact: 'Columbus named the Virgin Islands in 1493 after Saint Ursula and her followers.' }
        ] },
      { id: 'usvi', name: 'US Virgin Islands', color: '#E4572E', starsReq: 195,
        blurb: 'St. Thomas, St. John and St. Croix: three islands, one big culture.',
        puzzles: [
          { id: 'vi1', title: 'Island Music', theme: 'Music', level: 1, words: ['QUELBE', 'TURTLE', 'REEF', 'PARK'],
            fact: 'Quelbe is the official music of the U.S. Virgin Islands.' },
          { id: 'vi2', title: 'Three Sisters', theme: 'Places', level: 2, words: ['STTHOMAS', 'STCROIX', 'STJOHN', 'DANISH'],
            fact: 'The United States bought the Danish West Indies from Denmark in 1917 and renamed them the U.S. Virgin Islands.' },
          { id: 'vi3', title: 'Stilts & Beaches', theme: 'Culture', level: 4, words: ['MOCKOJUMBIE', 'MAGENSBAY', 'BUCKISLAND', 'FREDERIKSTED'],
            fact: 'Mocko jumbies are stilt dancers, a tradition with roots in West Africa.' }
        ] },
      { id: 'anguilla', name: 'Anguilla', color: '#4CC3D9', starsReq: 202,
        blurb: 'Quiet, powder-white beaches and thrilling boat races.',
        puzzles: [
          { id: 'ai1', title: 'Shape of an Eel', theme: 'Places', level: 1, words: ['EEL', 'SAND', 'SHOAL', 'SALT'],
            fact: 'The name Anguilla comes from a word for eel, describing the island\'s long, thin shape.' },
          { id: 'ai2', title: 'Three Dolphins', theme: 'Culture', level: 2, words: ['ANGUILLA', 'DOLPHIN', 'VALLEY', 'RACING'],
            fact: 'Anguilla\'s coat of arms shows three dolphins.' },
          { id: 'ai3', title: 'Race Day', theme: 'Sports', level: 4, words: ['BOATRACING', 'SANDYGROUND', 'MEADSBAY', 'CRAYFISH'],
            fact: 'Boat racing, with sleek wooden sailboats, is Anguilla\'s national sport.' }
        ] },
      { id: 'montserrat', name: 'Montserrat', color: '#2D9F5D', starsReq: 209,
        blurb: 'The Emerald Isle of the Caribbean, with Irish roots and an active volcano.',
        puzzles: [
          { id: 'ms1', title: 'Emerald Isle', theme: 'Culture', level: 1, words: ['IRISH', 'ORIOLE', 'GREEN', 'HARP'],
            fact: 'Montserrat is called the Emerald Isle of the Caribbean because of its Irish heritage and lush green hills.' },
          { id: 'ms2', title: 'Volcano Story', theme: 'History', level: 2, words: ['PLYMOUTH', 'VOLCANO', 'EMERALD', 'ISLE'],
            fact: 'The Soufriere Hills volcano began erupting in 1995, and the old capital, Plymouth, had to be abandoned.' },
          { id: 'ms3', title: 'Studio on the Isle', theme: 'Music', level: 4, words: ['MONTSERRAT', 'SOUFRIERE', 'GOATWATER', 'LITTLEBAY', 'AIRSTUDIOS'],
            fact: 'Beatles producer George Martin opened AIR Studios on Montserrat, where many famous albums were recorded.' }
        ] },
      { id: 'martinique', name: 'Martinique', color: '#C2185B', starsReq: 216,
        blurb: 'French-Creole flavor, rhum agricole and the story of Mont Pelee.',
        puzzles: [
          { id: 'mq1', title: 'Rum & Rhythm', theme: 'Culture', level: 1, words: ['PELEE', 'ZOUK', 'RHUM', 'PUNCH'],
            fact: 'Martinique\'s rhum agricole is made from fresh sugar cane juice rather than molasses.' },
          { id: 'mq2', title: 'Voices of Martinique', theme: 'Culture', level: 2, words: ['CESAIRE', 'FANON', 'BIGUINE', 'CREOLE'],
            fact: 'Poet Aime Cesaire of Martinique helped found the Negritude literary movement.' },
          { id: 'mq3', title: 'Volcano & Capital', theme: 'History', level: 4, words: ['FORTDEFRANCE', 'SAINTPIERRE', 'JOSEPHINE', 'DIAMONDROCK'],
            fact: 'Mont Pelee erupted in 1902 and destroyed the city of Saint-Pierre.' }
        ] },
      { id: 'guadeloupe', name: 'Guadeloupe', color: '#0097A7', starsReq: 223,
        blurb: 'A butterfly-shaped archipelago with drumming, waterfalls and a volcano.',
        puzzles: [
          { id: 'gp1', title: 'Drums & Sandwiches', theme: 'Culture', level: 1, words: ['GWOKA', 'BOKIT', 'DRUM', 'REEF'],
            fact: 'Gwoka, Guadeloupe\'s drumming, singing and dance tradition, was added to UNESCO\'s heritage list in 2014.' },
          { id: 'gp2', title: 'Island Family', theme: 'Places', level: 2, words: ['SAINTES', 'DESIRADE', 'GALANTE', 'MARIE'],
            fact: 'Guadeloupe is an archipelago, and Marie-Galante is named after Columbus\'s flagship.' },
          { id: 'gp3', title: 'Butterfly Wings', theme: 'Places', level: 4, words: ['GRANDETERRE', 'BASSETERRE', 'SOUFRIERE', 'POINTEAPITRE'],
            fact: 'Guadeloupe\'s two main islands, Basse-Terre and Grande-Terre, give it a butterfly shape when seen from above.' }
        ] },
      { id: 'sintmaarten', name: 'Sint Maarten / Saint Martin', color: '#7E57C2', starsReq: 230,
        blurb: 'One island, two nations, and planes landing over the beach.',
        puzzles: [
          { id: 'sx1', title: 'Jet Over Maho', theme: 'Places', level: 1, words: ['MAHO', 'PLANE', 'SAND', 'JET'],
            fact: 'At Maho Beach, airplanes fly in extremely low over the sand as they land.' },
          { id: 'sx2', title: 'Two Nations', theme: 'History', level: 2, words: ['MARIGOT', 'FRENCH', 'DUTCH', 'BORDER'],
            fact: 'The island has been shared by France and the Netherlands since the Treaty of Concordia in 1648.' },
          { id: 'sx3', title: 'Guavaberry Time', theme: 'Food', level: 4, words: ['PHILIPSBURG', 'ORIENTBAY', 'GUAVABERRY', 'SIMPSONBAY', 'PICPARADIS'],
            fact: 'Guavaberry liqueur, made with rum and local guavaberries, is a traditional folk drink of Sint Maarten.' }
        ] },
      { id: 'stbarths', name: 'Saint Barthélemy', color: '#D9455F', starsReq: 237,
        blurb: 'Chic French island with a Swedish past.',
        puzzles: [
          { id: 'bl1', title: 'Swedish Past', theme: 'History', level: 1, words: ['SWEDEN', 'SALINE', 'BEACH', 'SAND'],
            fact: 'Sweden ruled Saint Barthelemy from 1784 until it returned to France in 1878.' },
          { id: 'bl2', title: 'Little Capital', theme: 'Places', level: 2, words: ['GUSTAVIA', 'COROSSOL', 'STBARTH', 'FRENCH'],
            fact: 'Gustavia, the capital, is named after King Gustav III of Sweden.' },
          { id: 'bl3', title: 'Beach Hopping', theme: 'Places', level: 3, words: ['COLOMBIER', 'SHELLBEACH', 'GOUVERNEUR', 'LORIENT'],
            fact: 'Saint Barthelemy is a French overseas collectivity.' }
        ] },
      { id: 'saba', name: 'Saba', color: '#3A7D44', starsReq: 244,
        blurb: 'The Unspoiled Queen, a Dutch volcano rising straight from the sea.',
        puzzles: [
          { id: 'sb1', title: 'Lace & Spice', theme: 'Culture', level: 1, words: ['SABA', 'LACE', 'SPICE', 'CLIFF'],
            fact: 'Saba lace is a traditional needlework craft of the island.' },
          { id: 'sb2', title: 'Top of the Kingdom', theme: 'Places', level: 2, words: ['SCENERY', 'BOTTOM', 'QUEEN', 'DUTCH'],
            fact: 'Mount Scenery on Saba, at 887 metres (2,910 feet), is the highest point in the Kingdom of the Netherlands.' },
          { id: 'sb3', title: 'Tiny Runway', theme: 'Places', level: 4, words: ['WINDWARDSIDE', 'UNSPOILED', 'AIRSTRIP', 'MARINEPARK'],
            fact: 'Saba\'s airport has one of the shortest commercial runways in the world.' }
        ] },
      { id: 'statia', name: 'Sint Eustatius', color: '#B8860B', starsReq: 251,
        blurb: 'Statia, the Golden Rock, with a volcano and a big moment in history.',
        puzzles: [
          { id: 'st1', title: 'Volcano Garden', theme: 'Nature', level: 1, words: ['QUILL', 'FORT', 'ROCK', 'STATIA'],
            fact: 'The Quill is a dormant volcano on Sint Eustatius with a rainforest growing inside its crater.' },
          { id: 'st2', title: 'Salute!', theme: 'History', level: 2, words: ['ORANJE', 'SALUTE', 'AMERICA', 'FLAG'],
            fact: 'In 1776, Fort Oranje on Sint Eustatius fired one of the first official foreign salutes to the American flag.' },
          { id: 'st3', title: 'Golden Rock', theme: 'History', level: 3, words: ['ORANJESTAD', 'GOLDENROCK', 'FORTORANJE', 'MARINEPARK'],
            fact: 'Sint Eustatius was nicknamed the Golden Rock because 18th-century trade made it so wealthy.' }
        ] },
      { id: 'slang', name: 'Island Talk', color: '#F4A261', starsReq: 258,
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

define([], function() {
		
	var stationsMap = {
		Bakerloo : [
			{ code : 'BST' , name : 'Baker Street', atLength : [676] ,position : { x : 1060, y : 699, type: 'circle', text : 'W'}},
			{ code : 'CHX' , name : 'Charing Cross', atLength : [334] ,position : { x : 1256, y : 960, type: 'circle', text : 'W'}},
			{ code : 'ERB' , name : 'Edgware Road', atLength : [851] ,position : { x : 907, y : 644, type : 'rect', text : 'N'}},
			{ code : 'ELE' , name : 'Elephant & Castle', atLength : [1] ,position : { x : 1308, y : 1260, type: 'circle', text : 'E'}},
			{ code : 'EMB' , name : 'Embankment', atLength : [248] ,position : { x : 1276, y : 1036, type: 'circle', text : 'E'}},
			{ code : 'HSD' , name : 'Harlesden', atLength : [1200] ,position : { x : 696, y : 469, type : 'rect', text : 'W'}},
			{ code : 'HAW' , name : 'Harrow & Wealdstone', atLength : [1426] ,position : { x : 696, y : 244, type: 'circle', text : 'W'}},
			{ code : 'KGN' , name : 'Kensal Green', atLength : [1136] ,position : { x : 696, y : 534, type : 'rect', text : 'E'}},
			{ code : 'KNT' , name : 'Kenton', atLength : [1388] ,position : { x : 696, y : 282, type : 'rect', text : 'E'}},
			{ code : 'KPK' , name : 'Kilburn Park', atLength : [1074] ,position : { x : 705, y : 594, type : 'rect', text : 'W'}},
			{ code : 'LAM' , name : 'Lambeth North', atLength : [84] ,position : { x : 1276, y : 1200, type : 'rect', text : 'E'}},
			{ code : 'MDV' , name : 'Maida Vale', atLength : [1043] ,position : { x : 724, y : 614, type : 'rect', text : 'W'}},
			{ code : 'MYB' , name : 'Marylebone', atLength : [780] ,position : { x : 979, y : 646, type: 'circle', text : 'N'}},
			{ code : 'NWM' , name : 'North Wembley', atLength : [1284] ,position : { x : 696, y : 386, type : 'rect', text : 'W'}},
			{ code : 'OXC' , name : 'Oxford Circus', atLength : [524] ,position : { x : 1139, y : 815, type: 'circle', text : 'W'}},
			{ code : 'PAD' , name : 'Paddington', atLength : [938] ,position : { x : 820, y : 646, type: 'circle', text : 'N'}},
			{ code : 'PIC' , name : 'Piccadilly Circus', atLength : [420] ,position : { x : 1196, y : 897, type: 'circle', text : 'W'}},
			{ code : 'QPK' , name : 'Queens Park', atLength : [1112] ,position : { x : 696, y : 560, type: 'circle', text : 'W'}},
			{ code : 'RPK' , name : 'Regents Park', atLength : [610] ,position : { x : 1100, y : 739, type : 'rect', text : 'E'}},
			{ code : 'SKT' , name : 'South Kenton', atLength : [1312] ,position : { x : 696, y : 357, type : 'rect', text : 'E'}},
			{ code : 'SPK' , name : 'Stonebridge Park', atLength : [1228] ,position : { x : 696, y : 441, type : 'rect', text : 'W'}},
			{ code : 'WAR' , name : 'Warwick Avenue', atLength : [1016] ,position : { x : 745, y : 634, type : 'rect', text : 'W'}},
			{ code : 'WLO' , name : 'Waterloo', atLength : [200] ,position : { x : 1276, y : 1084, type: 'circle', text : 'E'}},
			{ code : 'WEM' , name : 'Wembley Central', atLength : [1256] ,position : { x : 696, y : 414, type: 'circle', text : 'W'}},
			{ code : 'WJN' , name : 'Willesden Junction', atLength : [1162] ,position : { x : 696, y : 507, type: 'circle', text : 'W'}}  
		],
		Victoria : [
			{ code : 'BHR' , name : 'Blackhorse Road', atLength : [1676] ,position : { x : 1862, y : 363, type: 'circle', text : 'N'}},
			{ code : 'BRX' , name : 'Brixton', atLength : [1] ,position : { x : 1255, y : 1411, type: 'circle', text : 'W'}},
			{ code : 'EUS' , name : 'Euston', atLength : [944] ,position : { x : 1316, y : 638, type: 'circle', text : 'W'}},
			{ code : 'FPK' , name : 'Finsbury Park', atLength : [1458] ,position : { x : 1656, y : 396, type: 'circle', text : 'W'}},
			{ code : 'GPK' , name : 'Green Park', atLength : [588] ,position : { x : 1079, y : 898, type: 'circle', text : 'W'}},
			{ code : 'HBY' , name : 'Highbury & Islington', atLength : [1308] ,position : { x : 1608, y : 527, type: 'circle', text : 'N'}},
			{ code : 'KXX' , name : 'Kings Cross St. P', atLength : [1024] ,position : { x : 1393, y : 627, type: 'circle', text : 'N'}},
			{ code : 'OXC' , name : 'Oxford Circus', atLength : [694] ,position : { x : 1139, y : 815, type: 'circle', text : 'W'}},
			{ code : 'PIM' , name : 'Pimlico', atLength : [342] ,position : { x : 1078, y : 1142, type : 'rect', text:'E'}},
			{ code : 'SVS' , name : 'Seven Sisters', atLength : [1566] ,position : { x : 1752, y : 363, type: 'circle', text : 'N'}},
			{ code : 'STK' , name : 'Stockwell', atLength : [76] ,position : { x : 1203, y : 1360, type: 'circle'}},
			{ code : 'TTH' , name : 'Tottenham Hale', atLength : [1622] ,position : { x : 1809, y : 363, type: 'circle', text : 'N'}},
			{ code : 'VUX' , name : 'Vauxhall', atLength : [214] ,position : { x : 1106, y : 1262, type: 'circle', text : 'W'}},
			{ code : 'VIC' , name : 'Victoria', atLength : [470] ,position : { x : 1080, y : 1021, type: 'circle', text : 'S'}},
			{ code : 'WAL' , name : 'Walthamstow Central', atLength : [1768] ,position : { x : 1957, y : 363, type: 'circle', text : 'N'}},
			{ code : 'WST' , name : 'Warren Street', atLength : [857] ,position : { x : 1256, y : 700, type: 'circle', text : 'S'}}
		],
		Circle : [
			{ code : 'ALD' , name : 'Aldgate', atLength : [1366] ,position : { x : 1683, y : 861, type : 'rect', text : 'W'}},
			{ code : 'BST' , name : 'Baker Street', atLength : [642] ,position : { x : 1085, y : 672, type: 'circle', text : 'N'}},
			{ code : 'BAR' , name : 'Barbican', atLength : [1070] ,position : { x : 1486, y : 747, type : 'rect', text : 'W'}},
/**/		{ code : 'BAY' , name : 'Bayswater', atLength : [2520] ,position : { x : 856, y : 750, type : 'rect', text : 'E'}},
			{ code : 'BLF' , name : 'Blackfriars', atLength : [1708] ,position : { x : 1421, y : 986, type : 'rect', text : 'E'}},
			{ code : 'CST' , name : 'Cannon Street', atLength : [1622] ,position : { x : 1475, y : 934, type: 'circle', text : 'W'}},
			{ code : 'ERD' , name : 'Edgware Road', atLength : [2648] ,position : { x : 941, y : 687, type: 'circle', text : '-'}},
			{ code : 'ERD' , name : 'Edgware Road', atLength : [500] ,position : { x : 941, y : 687, type: 'circle', text : 'E'}},
			{ code : 'EMB' , name : 'Embankment', atLength : [1872] ,position : { x : 1255, y : 1014, type: 'circle', text : 'N'}},
			{ code : 'ESQ' , name : 'Euston Square', atLength : [860] ,position : { x : 1303, y : 672, type : 'rect',text : 'S'}},
			{ code : 'FAR' , name : 'Farringdon', atLength : [1020] ,position : { x : 1447, y : 708, type: 'circle', text : 'N'}},
/**/		{ code : 'GHR' , name : 'Goldhawk Road', atLength : [32] ,position : { x : 698, y : 951, type : 'rect', text : '-'}},
			{ code : 'GRD' , name : 'Gloucester Road', atLength : [2224] ,position : { x : 903, y : 1021, type : 'rect', text : 'S'}},
			{ code : 'GPS' , name : 'Great Portland Street', atLength : [724] ,position : { x : 1170, y : 676, type : 'rect', text : '-'}},
			{ code : 'HMS' , name : 'Hammersmith', atLength : [1] ,position : { x : 695, y : 987, type: 'circle', text : 'W'}},
			{ code : 'HST' , name : 'High Street Kensington', atLength : [2384] ,position : { x : 856, y : 886, type : 'rect', text : 'E'}},
			{ code : 'KXX' , name : 'Kings Cross St Pancras', atLength : [950] ,position : { x : 1393, y : 672, type: 'circle', text : 'S'}},
/**/		{ code : 'LAT' , name : 'Latimer Road', atLength : [240] ,position : { x : 705, y : 752, type : 'rect', text : 'E'}},
/**/		{ code : 'LBG' , name : 'Ladbroke Grove', atLength : [260] ,position : { x : 728, y : 730, type : 'rect', text : 'E'}},
			{ code : 'LST' , name : 'Liverpool Street', atLength : [1220] ,position : { x : 1626, y : 763, type: 'circle', text : 'N'}},
			{ code : 'MAN' , name : 'Mansion House', atLength : [1668] ,position : { x : 1447, y : 959, type : 'rect', text : 'E'}},
			{ code : 'MON' , name : 'Monument', atLength : [1540] ,position : { x : 1549, y : 912, type: 'circle', text : 'S'}},
			{ code : 'MGT' , name : 'Moorgate', atLength : [1114] ,position : { x : 1519, y : 762, type: 'circle', text : 'N'}},
/**/		{ code : 'NHG' , name : 'Notting Hill Gate', atLength : [2454] ,position : { x : 858, y : 815, type: 'circle', text : 'W'}},
			{ code : 'PAD' , name : 'Paddington', atLength : [2572] ,position : { x : 867, y : 696, type: 'circle', text : 'E'}},
			{ code : 'PAD' , name : 'Paddington', atLength : [400] ,position : { x : 867, y : 696, type: 'circle', text : '-'}}, 
/**/		{ code : 'ROY' , name : 'Royal Oak', atLength : [320] ,position : { x : 769, y : 687, type : 'rect', text : '-'}},
/**/		{ code : 'SBM' , name : 'Shepherds Bush Market', atLength : [74] ,position : { x : 698, y : 909, type : 'rect', text : '-'}},
			{ code : 'SSQ' , name : 'Sloane Square', atLength : [2114] ,position : { x : 1014, y : 1021, type : 'rect', text : 'S'}}, 
			{ code : 'SKN' , name : 'South Kensington', atLength : [2190] ,position : { x : 938, y : 1021, type: 'circle', text : 'S'}},
			{ code : 'SJP' , name : 'St. Jamess Park', atLength : [2008] ,position : { x : 1121, y : 1021, type : 'rect', text : 'S'}},
			{ code : 'TEM' , name : 'Temple', atLength : [1792] ,position : { x : 1336, y : 1008, type : 'rect', text : 'N'}},
			{ code : 'THL' , name : 'Tower Hill', atLength : [1436] ,position : { x : 1651, y : 912, type: 'circle', text : 'N'}},
			{ code : 'VIC' , name : 'Victoria', atLength : [2050] ,position : { x : 1080, y : 1021, type: 'circle',text:'-'}},
/**/		{ code : 'WBP' , name : 'Westbourne Park', atLength : [290] ,position : { x : 748, y : 709, type : 'rect', text : '-'}},
			{ code : 'WMS' , name : 'Westminster', atLength : [1928] ,position : { x : 1199, y : 1014, type: 'circle', text : 'N'}},
/**/		{ code : 'WDL' , name : 'Wood Lane', atLength : [133] ,position : { x : 696, y : 847, type: 'circle', text : 'W'}}
		], 
		Hammersmith : [
			{ code : 'ALE' , name : 'Aldgate East', atLength : [1434] ,position : { x : 1747, y : 848, type: 'circle', text : 'S'}},
			{ code : 'BST' , name : 'Baker Street', atLength : [653] ,position : { x : 1085, y : 672, type: 'circle', text : '-'}},
			{ code : 'BAR' , name : 'Barbican', atLength : [1086] ,position : { x : 1490, y : 747, type : 'rect', text : '-'}},
			{ code : 'BKG' , name : 'Barking', atLength : [1980] ,position : { x : 2204, y : 633, type: 'circle', text : 'E'}},
			{ code : 'BWR' , name : 'Bow Road', atLength : [1682] ,position : { x : 1953, y : 745, type: 'circle', text : 'S'}},
			{ code : 'BBB' , name : 'Bromley-by-Bow', atLength : [1760] ,position : { x : 2031, y : 744, type : 'rect', text : 'S'}},
			{ code : 'EHM' , name : 'East Ham', atLength : [1936] ,position : { x : 2172, y : 662, type: 'circle', text : 'E'}},
			{ code : 'ERD' , name : 'Edgware Road', atLength : [511] ,position : { x : 941, y : 670, type: 'circle', text : 'N'}},
			{ code : 'ESQ' , name : 'Euston Square', atLength : [872] ,position : { x : 1303, y : 656, type : 'rect', text : '-'}},
			{ code : 'FAR' , name : 'Farringdon', atLength : [1033] ,position : { x : 1447, y : 708, type: 'circle', text : '-'}},
/**/		{ code : 'GHR' , name : 'Goldhawk Road', atLength : [32] ,position : { x : 692, y : 951, type : 'rect', text : 'E'}},
			{ code : 'GPS' , name : 'Great Portland Street', atLength : [735] ,position : { x : 1170, y : 664, type: 'rect', text : 'N'}},
			{ code : 'HMS' , name : 'Hammersmith', atLength : [1] ,position : { x : 695, y : 987, type: 'circle', text : '-'}},
			{ code : 'KXX' , name : 'Kings Cross St Pancras', atLength : [962] ,position : { x : 1393, y : 672, type: 'circle', text : '-'}},,
/**/		{ code : 'LAT' , name : 'Latimer Road', atLength : [230] ,position : { x : 697, y : 752, type : 'rect', text : '-'}},
/**/		{ code : 'LBG' , name : 'Ladbroke Grove', atLength : [260] ,position : { x : 720, y : 730, type : 'rect', text : '-'}},
			{ code : 'LST' , name : 'Liverpool Street', atLength : [1230] ,position : { x : 1626, y : 763, type: 'circle', text : '-'}},
			{ code : 'MLE' , name : 'Mile End', atLength : [1614] ,position : { x : 1885, y : 744, type: 'circle', text : 'S'}},
			{ code : 'MGT' , name : 'Moorgate', atLength : [1136] ,position : { x : 1519, y : 762, type: 'circle', text : '-'}},
			{ code : 'PAD' , name : 'Paddington', atLength : [410] ,position : { x : 841, y : 672, type: 'circle', text : '-'}},
			{ code : 'PLW' , name : 'Plaistow', atLength : [1866] ,position : { x : 2124, y : 710, type : 'rect', text : 'E'}},
/**/		{ code : 'ROY' , name : 'Royal Oak', atLength : [320] ,position : { x : 761, y : 687, type : 'rect', text : 'E'}},
/**/		{ code : 'SBM' , name : 'Shepherds Bush Market', atLength : [74] ,position : { x : 692, y : 909, type : 'rect', text : 'E'}},
			{ code : 'STG' , name : 'Stepney Green', atLength : [1510] ,position : { x : 1800, y : 793, type : 'rect', text : 'E'}},
			{ code : 'UPK' , name : 'Upton Park', atLength : [1902] ,position : { x : 2150, y : 683, type : 'rect', text : 'E'}},
			{ code : 'WHM' , name : 'West Ham', atLength : [1798] ,position : { x : 2067, y : 745, type: 'circle', text : 'N'}},
/**/		{ code : 'WBP' , name : 'Westbourne Park', atLength : [290] ,position : { x : 740, y : 709, type : 'rect', text : 'E'}},
			{ code : 'WCL' , name : 'Whitechapel', atLength : [1466] ,position : { x : 1771, y : 826, type: 'circle', text : 'N'}},
/**/		{ code : 'WDL' , name : 'Wood Lane', atLength : [133] ,position : { x : 696, y : 847, type: 'circle', text : '-'}}  			
		],
		Jubilee : [
			{ code : 'BST' , name : 'Baker Street', atLength : [1748] ,position : { x : 1060, y : 698, type: 'circle', text : '-'}},
			{ code : 'BER' , name : 'Bermondsey', atLength : [812] ,position : { x : 1653, y : 1028, type: 'circle', text : 'N'}},
			{ code : 'BDS' , name : 'Bond Street', atLength : [1632] ,position : { x : 1060, y : 817, type: 'circle', text : 'N'}},
			{ code : 'CWR' , name : 'Canada Water', atLength : [692] ,position : { x : 1773, y : 1028, type: 'circle', text : 'N'}},
			{ code : 'CWF' , name : 'Canary Wharf', atLength : [538] ,position : { x : 1928, y : 1028, type: 'circle', text : 'N'}},
			{ code : 'CNT' , name : 'Canning Town', atLength : [325] ,position : { x : 2068, y : 911, type: 'circle', text : 'N'}},
			{ code : 'CPK' , name : 'Canons Park', atLength : [2304] ,position : { x : 794, y : 252, type : 'rect', text : 'E'}},
			{ code : 'DHL' , name : 'Dollis Hill', atLength : [2106] ,position : { x : 860, y : 419, type : 'rect', text : 'E'}},
			{ code : 'FRD' , name : 'Finchley Road', atLength : [1942] ,position : { x : 977, y : 537, type: 'circle', text : 'E'}},
			{ code : 'GPK' , name : 'Green Park', atLength : [1542] ,position : { x : 1079, y : 897, type: 'circle', text : '-'}},
			{ code : 'KIL' , name : 'Kilburn', atLength : [2234] ,position : { x : 921, y : 481, type: 'circle', text : 'E'}},
			{ code : 'KBY' , name : 'Kingsbury', atLength : [2234] ,position : { x : 794, y : 319, type : 'rect', text : 'E'}},
			{ code : 'LON' , name : 'London Bridge', atLength : [946] ,position : { x : 1519, y : 1028, type: 'circle', text : 'N'}},
			{ code : 'NEA' , name : 'Neasden', atLength : [2143] ,position : { x : 832, y : 391, type : 'rect', text : 'E'}},
			{ code : 'NGW' , name : 'North Greenwich', atLength : [454] ,position : { x : 2009, y : 1017, type: 'circle', text : 'E'}},
			{ code : 'QBY' , name : 'Queensbury', atLength : [2268] ,position : { x : 794, y : 287, type : 'rect', text : 'E'}},
			{ code : 'SWK' , name : 'Southwark', atLength : [1164] ,position : { x : 1337, y : 1119, type: 'circle', text : 'S'}},
			{ code : 'SJW' , name : 'St Johns Wood', atLength : [1874] ,position : { x : 1024, y : 582, type : 'rect', text : 'E'}}, 
			{ code : 'STA' , name : 'Stanmore', atLength : [1] ,position : { x : 794, y : 219, type: 'circle', text : '-'}},
			{ code : 'SFD' , name : 'Stratford', atLength : [6] ,position : { x : 2022, y : 610, type: 'circle', text : 'N'}},
			{ code : 'SWC' , name : 'Swiss Cottage', atLength : [1906] ,position : { x : 999, y : 561, type : 'rect', text : 'E'}},
			{ code : 'WLO' , name : 'Waterloo', atLength : [1292] ,position : { x : 1234, y : 1084, type: 'circle', text : 'W'}},
			{ code : 'WPK' , name : 'Wembley Park', atLength : [2182] ,position : { x : 809, y : 369, type: 'circle', text : 'E'}},
			{ code : 'WHM' , name : 'West Ham', atLength : [160] ,position : { x : 2067, y : 744, type: 'circle', text : '-'}},
			{ code : 'WHD' , name : 'West Hampstead', atLength : [1984] ,position : { x : 947, y : 507, type: 'circle', text : 'E'}},
			{ code : 'WMS' , name : 'Westminster', atLength : [1374] ,position : { x : 1200, y : 1014, type: 'circle', text : '-'}},
			{ code : 'WLG' , name : 'Willesden Green', atLength : [1] ,position : { x : 889, y : 448, type : 'rect', text : 'E'}}
		],
		District : [
			{ code : 'ACT' , name : 'Acton Town', atLength : [2280,2280,2280,2280] ,position : { x : 416, y : 1001, type: 'circle', text : 'S'}}, 
			{ code : 'ALE' , name : 'Aldgate East', atLength : [874,874,874,874] ,position : { x : 1747, y : 848, type: 'circle', text : '-'}},
/**/		{ code : 'BAY' , name : 'Bayswater', atLength : [646,646,646,646] ,position : { x : 856, y : 750, type : 'rect', text : '-'}},
			{ code : 'BKG' , name : 'Barking', atLength : [330,330,330,330] ,position : { x : 2204, y : 633, type: 'circle', text : '-'}},
			{ code : 'BCT' , name : 'Barons Court', atLength : [1944,1944,1944,1944] ,position : { x : 742, y : 1021, type: 'rect', text : 'S'}},
			{ code : 'BEC' , name : 'Becontree', atLength : [288,288,288,288] ,position : { x : 2266, y : 576, type: 'rect', text : 'E'}},
			{ code : 'BLF' , name : 'Blackfriars', atLength : [1256,1256,1256,1256] ,position : { x : 1421, y : 986, type: 'rect', text : '-'}},
			{ code : 'BWR' , name : 'Bow Road', atLength : [630,630,630,630] ,position : { x : 1953, y : 745, type: 'circle', text : '-'}},
			{ code : 'BBB' , name : 'Bromley-by-Bow', atLength : [550,550,550,550] ,position : { x : 2031, y : 744, type: 'circle', text : '-'}},
			{ code : 'CST' , name : 'Cannon Street', atLength : [1178,1178,1178,1178] ,position : { x : 1475, y : 934, type: 'circle', text : '-'}},
			{ code : 'CHP' , name : 'Chiswick Park', atLength : [2240,2240,2240,2240] ,position : { x : 447, y : 1021, type : 'rect', text : 'S'}},
			{ code : 'DGE' , name : 'Dagenham East', atLength : [160,160,160,160] ,position : { x : 2327, y : 511, type: 'rect', text : 'E'}},
			{ code : 'DGH' , name : 'Dagenham Heathway', atLength : [190,190,190,190] ,position : { x : 2306, y : 535, type: 'circle', text : 'E'}},
			{ code : 'EBY' , name : 'Ealing Broadway', atLength : [2497,2497,2497,2497] ,position : { x : 354, y : 820, type: 'circle', text : 'S'}},
			{ code : 'ECM' , name : 'Ealing Common', atLength : [2378,2378,2378,2378] ,position : { x : 398, y : 912, type: 'circle', text : 'E'}},
			{ code : 'ECT' , name : 'Earls Court', atLength : [1854,1854,1854,366] ,position : { x : 835, y : 1021, type: 'circle', text : 'S'}},
			{ code : 'EHM' , name : 'East Ham', atLength : [372,372,372,372] ,position : { x : 2172, y : 662, type: 'circle', text : '-'}},
			{ code : 'EPY' , name : 'East Putney', atLength : [2120,2120,2120,98] ,position : { x : 812, y : 1270, type: 'rect', text : 'W'}},
			{ code : 'ERD' , name : 'Edgware Road', atLength : [786,786,786,786] ,position : { x : 941, y : 687, type: 'circle', text : '-'}},
			{ code : 'EPK' , name : 'Elm Park', atLength : [110,110,110,110] ,position : { x : 2360, y : 478, type: 'circle', text : 'E'}},
			{ code : 'EMB' , name : 'Embankment', atLength : [1436,1436,1436,1436] ,position : { x : 1255, y : 1014, type: 'circle', text : '-'}},
			{ code : 'FBY' , name : 'Fulham Broadway', atLength : [2006,2006,2006,214] ,position : { x : 812, y : 1157, type: 'circle', text : 'E'}},
			{ code : 'GRD' , name : 'Gloucester Road', atLength : [1782,1782,1782,1782] ,position : { x : 903, y : 1014, type: 'rect', text : '-'}},
			{ code : 'GUN' , name : 'Gunnersbury', atLength : [2292,2292,2292,2292] ,position : { x : 482, y : 1117, type: 'circle', text : 'E'}},
			{ code : 'HMD' , name : 'Hammersmith', atLength : [1993,1993,1993,1993] ,position : { x : 697, y : 1020, type: 'circle', text : 'S'}},
			{ code : 'HST' , name : 'High Street Kensington', atLength : [510,510,510,510] ,position : {  x : 856, y : 886, type: 'rect', text : '-'}},
			{ code : 'HCH' , name : 'Hornchurch', atLength : [78,78,78,78] ,position : { x : 2384, y : 455, type: 'rect', text : 'E'}},
			{ code : 'OLY' , name : 'Kensington (Olympia)', atLength : [0,0,0,0] ,position : { x : 814, y : 933, type: 'circle', text : 'N'}},
			{ code : 'KEW' , name : 'Kew Gardens', atLength : [2342,2342,2342,2342] ,position : { x : 482, y : 1166, type: 'circle', text : 'E'}},
			{ code : 'MAN' , name : 'Mansion House', atLength : [1214,1214,1214,1214] ,position : { x : 1447, y : 959, type: 'rect', text : '-'}},
			{ code : 'MLE' , name : 'Mile End', atLength : [696,696,696,696] ,position : { x : 1885, y : 744, type: 'circle', text : '-'}},
			{ code : 'MON' , name : 'Monument', atLength : [1100,1100,1100,1100] ,position : { x : 1549, y : 912, type: 'circle', text : '-'}},
/**/		{ code : 'NHG' , name : 'Notting Hill Gate', atLength : [584,584,584,584] ,position : { x : 858, y : 815, type: 'circle', text : '-'}},
/**/		{ code : 'PAD' , name : 'Paddington', atLength : [708,708,708,708] ,position : { x : 867, y : 696, type: 'circle', text : '-'}}, 
			{ code : 'PGR' , name : 'Parsons Green', atLength : [2040,2040,2040,176] ,position : { x : 812, y : 1192, type: 'rect', text : 'W'}},
			{ code : 'PLW' , name : 'Plaistow', atLength : [440,440,440,440] ,position : { x : 2124, y : 710, type: 'rect', text : '-'}},
			{ code : 'PUT' , name : 'Putney Bridge', atLength : [2074,2074,2074,144] ,position : { x : 812, y : 1225, type: 'rect', text : 'W'}},
			{ code : 'RCP' , name : 'Ravenscourt Park', atLength : [2032,2032,2032,2032] ,position : { x : 654, y : 1021, type : 'rect', text : 'S'}},
			{ code : 'RMD' , name : 'Richmond', atLength : [2375,2375,2375,2375] ,position : { x : 482, y : 1203, type: 'circle', text : 'E'}},
			{ code : 'SSQ' , name : 'Sloane Square', atLength : [1674,1674,1674,1674] ,position : { x : 1014, y : 1021, type: 'rect', text : '-'}},
			{ code : 'SKN' , name : 'South Kensington', atLength : [1752,1752,1752,1752] ,position : { x : 938, y : 1021, type: 'circle', text : '-'}},
			{ code : 'SFS' , name : 'Southfields', atLength : [2154,2154,2154,64] ,position : { x : 812, y : 1305, type: 'rect', text : 'W'}},
			{ code : 'SJP' , name : 'St. Jamess Park', atLength : [1566,1566,1566,1566] ,position : { x : 1121, y : 1021, type: 'rect', text : '-'}},
			{ code : 'STB' , name : 'Stamford Brook', atLength : [2104,2104,2104,2104] ,position : { x : 584, y : 1021, type : 'rect', text : 'S'}},
			{ code : 'STG' , name : 'Stepney Green', atLength : [796,796,796,796] ,position : { x : 1800, y : 793, type: 'rect', text : '-'}},
			{ code : 'TEM' , name : 'Temple', atLength : [1352,1352,1352,1352] ,position : { x : 1336, y : 1008, type: 'rect', text : '-'}},
			{ code : 'THL' , name : 'Tower Hill', atLength : [998,998,998,998] ,position : { x : 1651, y : 912, type: 'circle', text : '-'}},
			{ code : 'TGR' , name : 'Turnham Green', atLength : [2164,2164,2164,2164] ,position : { x : 522, y : 1021, type : 'rect', text : 'S'}},
			{ code : 'UPM' , name : 'Upminster', atLength : [0,0,0,0] ,position : { x : 2441, y : 400, type: 'circle', text : 'E'}},
			{ code : 'UPB' , name : 'Upminster Bridge', atLength : [42,42,42,42] ,position : { x : 2409, y : 431, type: 'circle', text : 'E'}},
			{ code : 'UPY' , name : 'Upney', atLength : [288,288,288,288] ,position : { x : 2236, y : 604, type: 'circle', text : 'E'}},
			{ code : 'UPK' , name : 'Upton Park', atLength : [406,406,406,406] ,position : { x : 2150, y : 683, type: 'rect', text : '-'}},
			{ code : 'VIC' , name : 'Victoria', atLength : [1610,1610,1610,1610] ,position : { x : 1080, y : 1021, type: 'circle', text : '-'}},
			{ code : 'WBT' , name : 'West Brompton', atLength : [1940,1940,1940,278] ,position : { x : 812, y : 1091, type: 'circle', text : 'E'}},
			{ code : 'WHM' , name : 'West Ham', atLength : [515,515,515,515] ,position : { x : 2067, y : 745, type: 'circle', text : '-'}},
			{ code : 'WKN' , name : 'West Kensington', atLength : [1902,1902,1902,1902] ,position : { x : 785, y : 1021, type: 'rect', text : 'S'}},
			{ code : 'WMS' , name : 'Westminster', atLength : [1492,1492,1492,1492] ,position : { x : 1199, y : 1014, type: 'circle', text : '-'}},
			{ code : 'WCL' , name : 'Whitechapel', atLength : [842,842,842,842] ,position : { x : 1771, y : 826, type: 'circle', text : '-'}},
			{ code : 'WDN' , name : 'Wimbledon', atLength : [2214,2214,2214,0] ,position : { x : 812, y : 1370, type: 'circle', text : 'W'}},
			{ code : 'WMP' , name : 'Wimbledon Park ', atLength : [2186,2186,2186,32] ,position : { x : 812, y : 1338, type: 'circle', text : 'W'}}
		]
	} 

	return stationsMap;

});

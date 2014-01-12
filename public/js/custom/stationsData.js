define([], function() {
		
	var stationsMap = {
		Bakerloo : [
			{ code : 'BST' , name : 'Baker Street', atLength : 676 ,position : { x : 1060, y : 699, type: 'circle', text : 'W'}},
			{ code : 'CHX' , name : 'Charing Cross', atLength : 334 ,position : { x : 1256, y : 960, type: 'circle', text : 'W'}},
			{ code : 'ERB' , name : 'Edgware Road', atLength : 851 ,position : { x : 907, y : 644, type : 'rect', attr : { rotate : 90, offset : { x : 0, y : -10}}}},
			{ code : 'ELE' , name : 'Elephant & Castle', atLength : 1 ,position : { x : 1308, y : 1260, type: 'circle', text : 'W'}},
			{ code : 'EMB' , name : 'Embankment', atLength : 248 ,position : { x : 1276, y : 1036, type: 'circle', text : 'W'}},
			{ code : 'HSD' , name : 'Harlesden', atLength : 1200 ,position : { x : 696, y : 469, type : 'rect', attr : { rotate : 0, offset : { x : -10, y : 0}}}},
			{ code : 'HAW' , name : 'Harrow & Wealdstone', atLength : 1426 ,position : { x : 696, y : 244, type: 'circle', text : 'W'}},
			{ code : 'KGN' , name : 'Kensal Green', atLength : 1136 ,position : { x : 696, y : 534, type : 'rect', attr : { rotate : 0, offset : { x : 0, y : 0}}}},
			{ code : 'KNT' , name : 'Kenton', atLength : 1388 ,position : { x : 696, y : 282, type : 'rect', attr : { rotate : 0, offset : { x : 0, y : 0}}}},
			{ code : 'KPK' , name : 'Kilburn Park', atLength : 1074 ,position : { x : 705, y : 594, type : 'rect', attr : { rotate : 0, offset : { x : -8, y : 0}}}},
			{ code : 'LAM' , name : 'Lambeth North', atLength : 84 ,position : { x : 1276, y : 1200, type : 'rect', attr : { rotate : 0, offset : { x : 0, y : 0}}}},
			{ code : 'MDV' , name : 'Maida Vale', atLength : 1043 ,position : { x : 724, y : 614, type : 'rect', attr : { rotate : 0, offset : { x : -8, y : 0}}}},
			{ code : 'MYB' , name : 'Marylebone', atLength : 780 ,position : { x : 979, y : 646, type: 'circle', text : 'N'}},
			{ code : 'NWM' , name : 'North Wembley', atLength : 1284 ,position : { x : 696, y : 386, type : 'rect', attr : { rotate : 0, offset : { x : -10, y : 0}}}},
			{ code : 'OXC' , name : 'Oxford Circus', atLength : 524 ,position : { x : 1139, y : 815, type: 'circle', text : 'W'}},
			{ code : 'PAD' , name : 'Paddington', atLength : 938 ,position : { x : 820, y : 646, type: 'circle', text : 'N'}},
			{ code : 'PIC' , name : 'Piccadilly Circus', atLength : 420 ,position : { x : 1196, y : 897, type: 'circle', text : 'W'}},
			{ code : 'QPK' , name : 'Queens Park', atLength : 1112 ,position : { x : 696, y : 560, type: 'circle', text : 'W'}},
			{ code : 'RPK' , name : 'Regents Park', atLength : 610 ,position : { x : 1100, y : 739, type : 'rect', attr : { rotate : 0, offset : { x : 8, y : 0}}}},
			{ code : 'SKT' , name : 'South Kenton', atLength : 1312 ,position : { x : 696, y : 357, type : 'rect', attr : { rotate : 0, offset : { x : -10, y : 0}}}},
			{ code : 'SPK' , name : 'Stonebridge Park', atLength : 1228 ,position : { x : 696, y : 441, type : 'rect', attr : { rotate : 0, offset : { x : -10, y : 0}}}},
			{ code : 'WAR' , name : 'Warwick Avenue', atLength : 1016 ,position : { x : 745, y : 634, type : 'rect', attr : { rotate : 0, offset : { x : -8, y : 0}}}},
			{ code : 'WLO' , name : 'Waterloo', atLength : 200 ,position : { x : 1276, y : 1084, type: 'circle', text : 'W'}},
			{ code : 'WEM' , name : 'Wembley Central', atLength : 1256 ,position : { x : 696, y : 414, type: 'circle', text : 'W'}},
			{ code : 'WJN' , name : 'Willesden Junction', atLength : 1162 ,position : { x : 696, y : 507, type: 'circle', text : 'W'}}  
		],
		Victoria : [
			{ code : 'BHR' , name : 'Blackhorse Road', atLength : 1676 ,position : { x : 1862, y : 363, type: 'circle', text : 'W'}},
			{ code : 'BRX' , name : 'Brixton', atLength : 1 ,position : { x : 1255, y : 1411, type: 'circle', text : 'W'}},
			{ code : 'EUS' , name : 'Euston', atLength : 944 ,position : { x : 1316, y : 638, type: 'circle', text : 'W'}},
			{ code : 'FPK' , name : 'Finsbury Park', atLength : 1458 ,position : { x : 1656, y : 396, type: 'circle', text : 'W'}},
			{ code : 'GPK' , name : 'Green Park', atLength : 588 ,position : { x : 1079, y : 898, type: 'circle', text : 'W'}},
			{ code : 'HBY' , name : 'Highbury & Islington', atLength : 1308 ,position : { x : 1608, y : 527, type: 'circle', text : 'W'}},
			{ code : 'KXX' , name : 'Kings Cross St. P', atLength : 1024 ,position : { x : 1393, y : 627, type: 'circle', text : 'W'}},
			{ code : 'OXC' , name : 'Oxford Circus', atLength : 694 ,position : { x : 1139, y : 815, type: 'circle', text : 'W'}},
			{ code : 'PIM' , name : 'Pimlico', atLength : 342 ,position : { x : 1078, y : 1142, type : 'rect', attr : { rotate : 0, offset : { x : -8, y : 0}}}},
			{ code : 'SVS' , name : 'Seven Sisters', atLength : 1566 ,position : { x : 1752, y : 363, type: 'circle', text : 'W'}},
			{ code : 'STK' , name : 'Stockwell', atLength : 76 ,position : { x : 1203, y : 1360, type: 'circle'}},
			{ code : 'TTH' , name : 'Tottenham Hale', atLength : 1622 ,position : { x : 1809, y : 363, type: 'circle', text : 'W'}},
			{ code : 'VUX' , name : 'Vauxhall', atLength : 214 ,position : { x : 1106, y : 1262, type: 'circle', text : 'W'}},
			{ code : 'VIC' , name : 'Victoria', atLength : 470 ,position : { x : 1080, y : 1014, type: 'circle', text : 'S'}},
			{ code : 'WAL' , name : 'Walthamstow Central', atLength : 1768 ,position : { x : 1957, y : 363, type: 'circle', text : 'W'}},
			{ code : 'WST' , name : 'Warren Street', atLength : 857 ,position : { x : 1256, y : 700, type: 'circle', text : 'S'}}
		],
		Circle : [
			{ code : 'ALD' , name : 'Aldgate', atLength : 1366 ,position : { x : 1683, y : 861, type : 'rect', text : 'E', attr : { rotate : 0, offset : { x : -10, y : 0}}}},
			{ code : 'BST' , name : 'Baker Street', atLength : 642 ,position : { x : 1085, y : 672, type: 'circle', text : 'N'}},
			{ code : 'BAR' , name : 'Barbican', atLength : 1070 ,position : { x : 1481, y : 747, type : 'rect', text : 'E', attr : { rotate : 0, offset : { x : -6, y : 0}}}},
/**/		{ code : 'BAY' , name : 'Bayswater', atLength : 2520 ,position : { x : 856, y : 750, type : 'rect', text : 'E', attr : { rotate : 0, offset : { x : 10, y : 0}}}},
			{ code : 'BLF' , name : 'Blackfriars', atLength : 1708 ,position : { x : 1421, y : 986, type : 'rect', text : 'E', attr : { rotate : 0, offset : { x : -10, y : 0}}}},
			{ code : 'CST' , name : 'Cannon Street', atLength : 1622 ,position : { x : 1475, y : 934, type: 'circle', text : 'W'}},
			{ code : 'ERD' , name : 'Edgware Road', atLength : 2648 ,position : { x : 941, y : 687, type: 'circle', text : '-'}},
			{ code : 'ERD' , name : 'Edgware Road', atLength : 500 ,position : { x : 941, y : 687, type: 'circle', text : '-'}},
			{ code : 'EMB' , name : 'Embankment', atLength : 1872 ,position : { x : 1255, y : 1014, type: 'circle', text : 'N'}},
			{ code : 'ESQ' , name : 'Euston Square', atLength : 860 ,position : { x : 1303, y : 662, type : 'rect', attr : { rotate : 90, offset : { x : 0, y : 10}}}},
			{ code : 'FAR' , name : 'Farringdon', atLength : 1020 ,position : { x : 1447, y : 708, type: 'circle', text : 'W'}},
/**/		{ code : 'GHR' , name : 'Goldhawk Road', atLength : 32 ,position : { x : 698, y : 951, type : 'rect', text : '-', attr : { rotate : 0, offset : { x : -10, y : 0}}}},
			{ code : 'GRD' , name : 'Gloucester Road', atLength : 2224 ,position : { x : 903, y : 1011, type : 'rect', text : 'E', attr : { rotate : 90, offset : { x : 0, y : -10}}}},
			{ code : 'GPS' , name : 'Great Portland Street', atLength : 724 ,position : { x : 1170, y : 676, type : 'rect', text : '-', attr : { rotate : 90, offset : { x : 0, y : -10}}}},
			{ code : 'HMS' , name : 'Hammersmith', atLength : 1 ,position : { x : 695, y : 987, type: 'circle', text : 'W'}},
			{ code : 'HST' , name : 'High Street Kensington', atLength : 2384 ,position : { x : 856, y : 886, type : 'rect', text : 'E', attr : { rotate : 0, offset : { x : 10, y : 0}}}},
			{ code : 'KXX' , name : 'Kings Cross St Pancras', atLength : 950 ,position : { x : 1393, y : 672, type: 'circle', text : 'S'}},
/**/		{ code : 'LAT' , name : 'Latimer Road', atLength : 240 ,position : { x : 705, y : 752, type : 'rect', text : 'E', attr : { rotate : 0, offset : { x : 2, y : 0}}}},
/**/		{ code : 'LBG' , name : 'Ladbroke Grove', atLength : 260 ,position : { x : 728, y : 730, type : 'rect', text : 'E', attr : { rotate : 0, offset : { x : 2, y : 0}}}},
			{ code : 'LST' , name : 'Liverpool Street', atLength : 1220 , position : { x : 1626, y : 763, type: 'circle', text : 'N'}},
			{ code : 'MAN' , name : 'Mansion House', atLength : 1668 ,position : { x : 1447, y : 959, type : 'rect', text : 'E', attr : { rotate : 0, offset : { x : -10, y : 0}}}},
			{ code : 'MON' , name : 'Monument', atLength : 1540 ,position : { x : 1549, y : 912, type: 'circle', text : 'S'}},
			{ code : 'MGT' , name : 'Moorgate', atLength : 1114 ,position : { x : 1519, y : 762, type: 'circle', text : 'N'}},
/**/		{ code : 'NHG' , name : 'Notting Hill Gate', atLength : 2454 ,position : { x : 858, y : 815, type: 'circle', text : 'W'}},
			{ code : 'PAD' , name : 'Paddington', atLength : 2572 ,position : { x : 867, y : 696, type: 'circle', text : 'W'}},
			{ code : 'PAD' , name : 'Paddington', atLength : 400 ,position : { x : 867, y : 696, type: 'circle', text : '-'}}, 
/**/		{ code : 'ROY' , name : 'Royal Oak', atLength : 320 ,position : { x : 769, y : 687, type : 'rect', text : '-', attr : { rotate : 0, offset : { x : -10, y : 0}}}},
/**/		{ code : 'SBM' , name : 'Shepherds Bush Market', atLength : 74 ,position : { x : 698, y : 909, type : 'rect', text : '-', attr : { rotate : 0, offset : { x : -10, y : 0}}}},
			{ code : 'SSQ' , name : 'Sloane Square', atLength : 2114 ,position : { x : 1014, y : 1014, type : 'rect', text : 'E', attr : { rotate : 90, offset : { x : 0, y : -10}}}}, 
			{ code : 'SKN' , name : 'South Kensington', atLength : 2190 ,position : { x : 938, y : 1014, type: 'circle', text : 'S'}},
			{ code : 'SJP' , name : 'St. Jamess Park', atLength : 2008 ,position : { x : 1121, y : 1011, type : 'rect', text : 'E', attr : { rotate : 90, offset : { x : 0, y : -10}}}},
			{ code : 'TEM' , name : 'Temple', atLength : 1792 ,position : { x : 1336, y : 1011, type : 'rect', text : 'E', attr : { rotate : 90, offset : { x : 0, y : -10}}}},
			{ code : 'THL' , name : 'Tower Hill', atLength : 1436 ,position : { x : 1651, y : 912, type: 'circle', text : 'S'}},
			{ code : 'VIC' , name : 'Victoria', atLength : 2050 ,position : { x : 0, y : 0, type: 'none'}},
/**/		{ code : 'WBP' , name : 'Westbourne Park', atLength : 290 ,position : { x : 748, y : 709, type : 'rect', text : '-', attr : { rotate : 0, offset : { x : -10, y : 0}}}},
			{ code : 'WMS' , name : 'Westminster', atLength : 1928 ,position : { x : 1199, y : 1014, type: 'circle', text : 'N'}},
/**/		{ code : 'WDL' , name : 'Wood Lane', atLength : 133 ,position : { x : 696, y : 847, type: 'circle', text : 'W'}}
		], 
		Hammersmith : [
			{ code : 'ALE' , name : 'Aldgate East', atLength : 1434 ,position : { x : 1747, y : 848, type: 'circle', text : 'S'}},
			{ code : 'BST' , name : 'Baker Street', atLength : 653 ,position : { x : 1085, y : 672, type: 'circle', text : '-'}},
			{ code : 'BAR' , name : 'Barbican', atLength : 1086 , position : { x : 1481, y : 747, type : 'rect', text : '-', attr : { rotate : 0, offset : { x : 4, y : 0}}}},
			{ code : 'BKG' , name : 'Barking', atLength : 1980 ,position : { x : 2204, y : 633, type: 'circle', text : 'N'}},
			{ code : 'BWR' , name : 'Bow Road', atLength : 1682 ,position : { x : 1953, y : 745, type: 'circle', text : 'S'}},
			{ code : 'BBB' , name : 'Bromley-by-Bow', atLength : 1760 ,position : { x : 2031, y : 744, type : 'rect', text : 'S', attr : { rotate : 90, offset : { x : 0, y : -10}}}},
			{ code : 'EHM' , name : 'East Ham', atLength : 1936 ,position : { x : 2172, y : 662, type: 'circle', text : 'N'}},
			{ code : 'ERD' , name : 'Edgware Road', atLength : 511 ,position : { x : 941, y : 670, type: 'circle', text : 'N'}},
			{ code : 'ESQ' , name : 'Euston Square', atLength : 872 ,position : { x : 1303, y : 656, type : 'rect', text : '-', attr : { rotate : 90, offset : { x : 0, y : 10}}}},
			{ code : 'FAR' , name : 'Farringdon', atLength : 1033 , position : { x : 1447, y : 708, type: 'circle', text : '-'}},
/**/		{ code : 'GHR' , name : 'Goldhawk Road', atLength : 32 ,position : { x : 692, y : 951, type : 'rect', text : 'E', attr : { rotate : 0, offset : { x : -10, y : 0}}}},
			{ code : 'GPS' , name : 'Great Portland Street', atLength : 735 ,position : { x : 1170, y : 668, type: 'rect', text : 'E', attr : { rotate : 90, offset : { x : 0, y : -10}}}},
			{ code : 'HMS' , name : 'Hammersmith', atLength : 1 ,position : { x : 695, y : 987, type: 'circle', text : '-'}},
			{ code : 'KXX' , name : 'Kings Cross St Pancras', atLength : 962 ,position : { x : 1393, y : 672, type: 'circle', text : '-'}},,
/**/		{ code : 'LAT' , name : 'Latimer Road', atLength : 230 ,position : { x : 697, y : 752, type : 'rect', text : '-', attr : { rotate : 0, offset : { x : 2, y : 0}}}},
/**/		{ code : 'LBG' , name : 'Ladbroke Grove', atLength : 260 ,position : { x : 720, y : 730, type : 'rect', text : '-', attr : { rotate : 0, offset : { x : 2, y : 0}}}},
			{ code : 'LST' , name : 'Liverpool Street', atLength : 1230 , position : { x : 1626, y : 763, type: 'circle', text : '-'}},
			{ code : 'MLE' , name : 'Mile End', atLength : 1614 ,position : { x : 1885, y : 744, type: 'circle', text : 'S'}},
			{ code : 'MGT' , name : 'Moorgate', atLength : 1136 , position : { x : 1519, y : 762, type: 'circle', text : '-'}},
			{ code : 'PAD' , name : 'Paddington', atLength : 410 ,position : { x : 841, y : 672, type: 'circle', text : 'W'}},
			{ code : 'PLW' , name : 'Plaistow', atLength : 1866 ,position : { x : 2124, y : 710, type : 'rect', text : 'E', attr : { rotate : 0, offset : { x : 00, y : 0}}}},
/**/		{ code : 'ROY' , name : 'Royal Oak', atLength : 320 ,position : { x : 761, y : 687, type : 'rect', text : 'E', attr : { rotate : 0, offset : { x : -10, y : 0}}}},
/**/		{ code : 'SBM' , name : 'Shepherds Bush Market', atLength : 74 ,position : { x : 692, y : 909, type : 'rect', text : 'E', attr : { rotate : 0, offset : { x : -10, y : 0}}}},
			{ code : 'STG' , name : 'Stepney Green', atLength : 1510 ,position : { x : 1800, y : 793, type : 'rect', text : 'E', attr : { rotate : 0, offset : { x : 0, y : 0}}}},
			{ code : 'UPK' , name : 'Upton Park', atLength : 1902 ,position : { x : 2150, y : 683, type : 'rect', text : 'W', attr : { rotate : 0, offset : { x : -10, y : 0}}}},
			{ code : 'WHM' , name : 'West Ham', atLength : 1798 ,position : { x : 2067, y : 745, type: 'circle', text : 'S'}},
/**/		{ code : 'WBP' , name : 'Westbourne Park', atLength : 290 ,position : { x : 740, y : 709, type : 'rect', text : 'E', attr : { rotate : 0, offset : { x : -10, y : 0}}}},
			{ code : 'WCL' , name : 'Whitechapel', atLength : 1466 ,position : { x : 1771, y : 826, type: 'circle', text : 'N'}},
/**/		{ code : 'WDL' , name : 'Wood Lane', atLength : 133 ,position : { x : 696, y : 847, type: 'circle', text : '-'}}  			
		]
	} 

	return stationsMap;

});

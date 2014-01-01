define([], function() {
		
	var stationsMap = {
		Bakerloo : [
			{ code : 'BST' , name : 'Baker Street', atLength : 676 ,position : { x : 1060, y : 699, type: 'circle'}},
			{ code : 'CHX' , name : 'Charing Cross', atLength : 334 ,position : { x : 1256, y : 960, type: 'circle'}},
			{ code : 'ERB' , name : 'Edgware Road', atLength : 851 ,position : { x : 907, y : 644, type : 'rect', attr : { rotate : 90, offset : { x : 0, y : -10}}}},
			{ code : 'ELE' , name : 'Elephant & Castle', atLength : 1 ,position : { x : 1308, y : 1260, type: 'circle'}},
			{ code : 'EMB' , name : 'Embankment', atLength : 248 ,position : { x : 1276, y : 1036, type: 'circle'}},
			{ code : 'HSD' , name : 'Harlesden', atLength : 1200 ,position : { x : 696, y : 469, type : 'rect', attr : { rotate : 0, offset : { x : -10, y : 0}}}},
			{ code : 'HAW' , name : 'Harrow & Wealdstone', atLength : 1426 ,position : { x : 696, y : 244, type: 'circle'}},
			{ code : 'KGN' , name : 'Kensal Green', atLength : 1136 ,position : { x : 696, y : 534, type : 'rect', attr : { rotate : 0, offset : { x : 0, y : 0}}}},
			{ code : 'KNT' , name : 'Kenton', atLength : 1388 ,position : { x : 696, y : 282, type : 'rect', attr : { rotate : 0, offset : { x : 0, y : 0}}}},
			{ code : 'KPK' , name : 'Kilburn Park', atLength : 1074 ,position : { x : 705, y : 594, type : 'rect', attr : { rotate : 0, offset : { x : -8, y : 0}}}},
			{ code : 'LAM' , name : 'Lambeth North', atLength : 84 ,position : { x : 1276, y : 1200, type : 'rect', attr : { rotate : 0, offset : { x : 0, y : 0}}}},
			{ code : 'MDV' , name : 'Maida Vale', atLength : 1043 ,position : { x : 724, y : 614, type : 'rect', attr : { rotate : 0, offset : { x : -8, y : 0}}}},
			{ code : 'MYB' , name : 'Marylebone', atLength : 780 ,position : { x : 979, y : 646, type: 'circle'}},
			{ code : 'NWM' , name : 'North Wembley', atLength : 1284 ,position : { x : 696, y : 386, type : 'rect', attr : { rotate : 0, offset : { x : -10, y : 0}}}},
			{ code : 'OXC' , name : 'Oxford Circus', atLength : 524 ,position : { x : 1139, y : 815, type: 'circle'}},
			{ code : 'PAD' , name : 'Paddington', atLength : 938 ,position : { x : 820, y : 646, type: 'circle'}},
			{ code : 'PIC' , name : 'Piccadilly Circus', atLength : 420 ,position : { x : 1196, y : 897, type: 'circle'}},
			{ code : 'QPK' , name : 'Queens Park', atLength : 1112 ,position : { x : 696, y : 560, type: 'circle'}},
			{ code : 'RPK' , name : 'Regents Park', atLength : 610 ,position : { x : 1100, y : 739, type : 'rect', attr : { rotate : 0, offset : { x : 8, y : 0}}}},
			{ code : 'SKT' , name : 'South Kenton', atLength : 1312 ,position : { x : 696, y : 357, type : 'rect', attr : { rotate : 0, offset : { x : -10, y : 0}}}},
			{ code : 'SPK' , name : 'Stonebridge Park', atLength : 1228 ,position : { x : 696, y : 441, type : 'rect', attr : { rotate : 0, offset : { x : -10, y : 0}}}},
			{ code : 'WAR' , name : 'Warwick Avenue', atLength : 1016 ,position : { x : 745, y : 634, type : 'rect', attr : { rotate : 0, offset : { x : -8, y : 0}}}},
			{ code : 'WLO' , name : 'Waterloo', atLength : 200 ,position : { x : 1276, y : 1084, type: 'circle'}},
			{ code : 'WEM' , name : 'Wembley Central', atLength : 1256 ,position : { x : 696, y : 414, type: 'circle'}},
			{ code : 'WJN' , name : 'Willesden Junction', atLength : 1162 ,position : { x : 696, y : 507, type: 'circle'}}  
		]
	} 

	return stationsMap;

});

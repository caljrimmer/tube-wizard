define([], function() {
		
	var stationsMap = {
		Bakerloo : [
			{ code : 'BST' , name : 'Baker Street', position : { x : 1060, y : 699, type: 'circle'}},
			{ code : 'CHX' , name : 'Charing Cross', position : { x : 1256, y : 960, type: 'circle'}},
			{ code : 'ERB' , name : 'Edgware Road', position : { x : 907, y : 644, type : 'rect', attr : { rotate : 90, offset : { x : 0, y : -10}}}},
			{ code : 'ELE' , name : 'Elephant and Castle', position : { x : 1308, y : 1260, type: 'circle'}},
			{ code : 'EMB' , name : 'Embankment', position : { x : 1276, y : 1036, type: 'circle'}},
			{ code : 'HSD' , name : 'Harlesden', position : { x : 696, y : 469, type : 'rect', attr : { rotate : 0, offset : { x : -10, y : 0}}}},
			{ code : 'HAW' , name : 'Harrow and Wealdstone', position : { x : 696, y : 244, type: 'circle'}},
			{ code : 'KGN' , name : 'Kensal Green', position : { x : 696, y : 534, type : 'rect', attr : { rotate : 0, offset : { x : 0, y : 0}}}},
			{ code : 'KNT' , name : 'Kenton', position : { x : 696, y : 282, type : 'rect', attr : { rotate : 0, offset : { x : 0, y : 0}}}},
			{ code : 'KPK' , name : 'Kilburn Park', position : { x : 705, y : 594, type : 'rect', attr : { rotate : 0, offset : { x : -8, y : 0}}}},
			{ code : 'LAM' , name : 'Lambeth North', position : { x : 1276, y : 1200, type : 'rect', attr : { rotate : 0, offset : { x : 0, y : 0}}}},
			{ code : 'MDV' , name : 'Maida Vale', position : { x : 724, y : 614, type : 'rect', attr : { rotate : 0, offset : { x : -8, y : 0}}}},
			{ code : 'MYB' , name : 'Marylebone', position : { x : 979, y : 646, type: 'circle'}},
			{ code : 'NWM' , name : 'North Wembley', position : { x : 696, y : 386, type : 'rect', attr : { rotate : 0, offset : { x : -10, y : 0}}}},
			{ code : 'OXC' , name : 'Oxford Circus', position : { x : 1139, y : 815, type: 'circle'}},
			{ code : 'PAD' , name : 'Paddington', position : { x : 820, y : 646, type: 'circle'}},
			{ code : 'PIC' , name : 'Piccadilly Circus', position : { x : 1196, y : 897, type: 'circle'}},
			{ code : 'QPK' , name : 'Queen\'s Park', position : { x : 696, y : 560, type: 'circle'}},
			{ code : 'RPK' , name : 'Regent\'s Park', position : { x : 1100, y : 739, type : 'rect', attr : { rotate : 0, offset : { x : 8, y : 0}}}},
			{ code : 'SKT' , name : 'South Kenton', position : { x : 696, y : 357, type : 'rect', attr : { rotate : 0, offset : { x : -10, y : 0}}}},
			{ code : 'SPK' , name : 'Stonebridge Park', position : { x : 696, y : 441, type : 'rect', attr : { rotate : 0, offset : { x : -10, y : 0}}}},
			{ code : 'WAR' , name : 'Warwick Avenue', position : { x : 745, y : 634, type : 'rect', attr : { rotate : 0, offset : { x : -8, y : 0}}}},
			{ code : 'WLO' , name : 'Waterloo', position : { x : 1276, y : 1084, type: 'circle'}},
			{ code : 'WEM' , name : 'Wembley Central', position : { x : 696, y : 414, type: 'circle'}},
			{ code : 'WJN' , name : 'Willesden Junction', position : { x : 696, y : 507, type: 'circle'}}  
		]
	} 

	return stationsMap;

});

define([], function() {  

	var Routes = {
		District : [
		/*EBY->UPM*/['EBY','ECM','ACT','CHP','TGR','STB','RCP','HMD','BCT','WKN'],
		/*RMD->UPM*/['RMD','KEW','GUN'],
		/*WDN->UPM*/['WDN','WMP','SFS','EPY','PUT','PGR','FBY','WBT'],
		/*WDN->ERD*/['HST','NHG','BAY','PAD','ERD']
		],
		Central : [
		/*WRP->EPP*/['WRP','RUG','SRP','NHT','GFD','PER','HLN','SNB','SWF','WFD','BHL','LTN','DEB','THB','EPP'],
		/*EBY->WFD*/['EBY','WAC','WAN','RED','GHL','NEP','BDE','FLP','HAI','GRH','CHG','ROD']
		] 
	};
	
	return Routes;  

});
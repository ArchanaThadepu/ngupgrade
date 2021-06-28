// Mechanism for throwing a custom event for Tealeaf to record
tl_throwSyntheticEvent = function(target, eventType, value) {
	var x = document.getElementById(target);
	if (document.createEvent) {
		var e = document.createEvent("MutationEvent");
		e.initMutationEvent(eventType, false, false, null, 0,
		value, null, 0);
		x.dispatchEvent(e);
		if (value != undefined) {
		e.value = value;
		}
		// Browser Check
		TeaLeaf.Client.tlAddEvent(e);
		} else {
		var e = document.createEventObject();
		e.type = eventType;
		e.srcElement = x;
		e.value = value;
		e.result = value;
		TeaLeaf.Client.tlAddEvent(e);
	}
}

//External Selector Method
//console.log("TeaLeaf");
//console.log(Ext.ComponentMgr.all.length);
//Ext.ComponentMgr.all.each(function (item) {
//console.log("getType: "+item.getXType());
//    if (item.getXType() == "combo") { //Selector for XType of control
//        console.log(item.id);
//	item.on('select', function(){console.log(this.id + ":" + this.getValue());
//	tl_throwSyntheticEvent(this.id, "select", this.getValue())});
	//Note Do tlAddEvent here and comment out the above

//    }
//});


//UI Highlighting Rule to set value
//combo=Ext.getCmp("f_r33453F722BAF4DFBA57309A2DADD20CDDB_6");
//combo.setValue("HONDA");

//var r = combo.findRecord(combo.valueField, "HONDA");        
//            if (!Ext.isEmpty(r)) {
//                var index = combo.store.indexOf(r);
//                combo.initSelect = true;
//                combo.fireEvent("select", combo, r, index);
//                combo.initSelect = false;
//                }
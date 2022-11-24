/*!
 App Connect Datastore
 Version: 1.1.0
 (c) 2022 Wappler.io
 @build 2022-04-14 12:01:47
 */
dmx.Component("datastore",{initialData:{data:[]},attributes:{session:{type:Boolean,default:!1},columns:{type:Object,default:{}}},methods:{insert:function(t){this._insert(t),this._store()},update:function(t,e){this._update(t,e),this._store()},upsert:function(t,e){this._filter(t).length?this._update(t,e):this._insert(e),this._store()},delete:function(t){this._delete(t),this._store()},clear:function(){this.records=[],this.lastid=0,this._store()},get:function(t){return this._filter(t)}},events:{inserted:Event,updated:Event,deleted:Event},render:function(t){this.store=window[this.props.session?"sessionStorage":"localStorage"],this.records=[],this.lastid=0,this._read=this._read.bind(this),this.props.session||window.addEventListener("storage",this._read),this._read()},update:function(t,e){e.has("columns")&&this._setData()},_read:function(){try{var t=this.store.getItem("datastore_"+this.name);t&&((t=JSON.parse(t)).records&&(this.records=t.records),t.lastid&&(this.lastid=t.lastid))}catch(t){console.warn("Error parsing datastore",t)}this._setData()},_filter:function(t){return"number"==typeof t&&(t={$id:t}),this.records.filter((e=>{if(Array.isArray(t)){for(var s=0;s<t.length;s++)for(var r in t[s])if(e[r]===t[s][r])return!0}else for(var r in t)if(e[r]===t[r])return!0;return!1}))},_parseData:function(t){return"object"==typeof t&&!Array.isArray(t)},_mergeData:function(t,e){var s=Object.assign({},t);for(var r in e){var i=e[r];this._isExpression(i)&&(i=dmx.parse(i,new dmx.DataScope(t,this))),s[r]=i}return s},_insert:function(t){var e={inserted:[],deleted:[]};if(Array.isArray(t))for(var s=0;s<t.length;s++){var r=this._mergeData({$id:++this.lastid},t[s]);this.records.push(r),e.inserted.push(r)}else{r=this._mergeData({$id:++this.lastid},t);this.records.push(r),e.inserted.push(r)}this.dispatchEvent("inserted",null,e)},_update:function(t,e){if(this._parseData(e)){var s={inserted:[],deleted:[]};this._filter(t).forEach((t=>{var r=this._mergeData(t,e);dmx.equal(t,r)||(s.deleted.push(dmx.clone(t)),s.inserted.push(dmx.clone(r)),Object.assign(t,r))})),this.dispatchEvent("updated",null,s)}else console.warn("Invalid data!",e)},_delete:function(t){"number"==typeof t&&(t={$id:t});var e={inserted:[],deleted:[]};this.records=this.records.filter((function(s){for(var r in t)if(s[r]===t[r])return e.deleted.push(dmx.clone(s)),!1;return!0})),this.dispatchEvent("deleted",null,e)},_store:function(){var t=JSON.stringify({records:this.records,lastid:this.lastid});t!==this.store.getItem("datastore_"+this.name)&&(this.store.setItem("datastore_"+this.name,t),this._setData())},_setData:function(){"object"==typeof this.props.columns?this.set("data",this.records.map(((t,e)=>{const s=dmx.clone(t),r=dmx.DataScope({$value:t,$index:e,$key:e,...t});for(let t in this.props.columns){let e=this.props.columns[t];this._isExpression(e)&&(e=dmx.parse(e,r)),s[t]=e}return s}))):this.set("data",this.records)},_isExpression:function(t){return"string"==typeof t&&t.includes("{{")}});
//# sourceMappingURL=../maps/dmxDatastore.js.map

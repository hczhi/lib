/**
 * @require static/css/base.less
 * @require widget/calendar/css/calendar.less
 * @require static/js/jquery-1.11.2.min.js
 */

 (function(window){
 	//html
 	var _calHtml = "<dl>"+
            "<dt class=\"date\"></dt>"+
            "<dt><strong>\u65e5</strong></dt>"+
            "<dt>\u4e00</dt>"+
            "<dt>\u4e8c</dt>"+
            "<dt>\u4e09</dt>"+
            "<dt>\u56db</dt>"+
            "<dt>\u4e94</dt>"+
            "<dt><strong>\u516d</string></dt>"+
            "<dd></dd>"+
        "</dl>";
 	var _html = '<span class="cal-close"></span><span class="cal-prev"></span><span class="cal-next"></span>'+
				'<div class="cal-container cal_lc">'+_calHtml+'</div>'+
				'<div class="cal-container cal_rc">'+_calHtml+'</div>';
	//
	function _getNextMonth(y,m){
		var month = m+1;
		if(month>=12){
			month = 0;
			y = y+1;
		}
		return [y,month];
	}
	function _getPreMonth(y,m){
		var month = m-1;
		if(month<0){
			month = 11;
			y = y-1;
		}
		return [y,month];
	}
	function _createcal(y,m,ele,rule,cur){
		var Month = m+1;
		var yearMonth = y+"年"+Month+"月";
		var rulelength = (rule.noRule)?false:rule;
		ele.find(".date").html(yearMonth);
		//var nextM = _getNextMonth(y,m);
		var curDate = new Date();
		curDate.setMonth(m + 1);
		curDate.setDate(0);
		var num = curDate.getDate();
		curDate.setMonth(m);
		curDate.setDate(0);
		var fristDay = curDate.getDay();
		if (fristDay==6){
			fristDay = 0 ;
		}
		var _chtml = "";
		if(rulelength){
			//有规则
			var fromT = rulelength.from;
			var toT = rulelength.to;
			var arry = rulelength.rule;
			for(var i = 0 ; i<=num+fristDay ; i++){
				var _a = "";
				if(i<=fristDay){
					_a = "<a></a>";
				}else{
					var date = i-fristDay;
					var className = "";
					var newDate = new Date();
					newDate.setFullYear(y);
					newDate.setMonth(m);
					newDate.setDate(date);
					newDate.setHours(0);
					newDate.setMinutes(0);
					newDate.setSeconds(0);
					newDate.setMilliseconds(0);
					var newTime = newDate.getTime();
					if(newTime>=fromT&&newTime<=toT){
						for(var n = 0 , le = arry.length; n<le ; n++){
							if(newTime==arry[n]){
								className = "indays";
							}
						}
					}else{
						className = "indays";
					}
					var _month = m+1;
					_a = "<a class='"+className+"' year='"+y+"' month='"+_month+"'>"+date+"</a>";
				}
				_chtml+=_a;
			}
		}else{
			for(var i = 0 ; i<=num+fristDay ; i++){
				var _a = "";
				if(i<=fristDay){
					_a = "<a></a>";
				}else{
					var date = i-fristDay;
					var className = "indays";
					var _month = m+1;
					_a = "<a class='"+className+"' year='"+y+"' month='"+_month+"'>"+date+"</a>";
				}
				_chtml+=_a;
			}
		}
		ele.find("dd").html(_chtml);
		if(cur.year == y && cur.month == m){
			var e = cur.date+fristDay;
			ele.find("dd").find("a").eq(e).addClass("cnt");
		}
	}


 	var CALENDAR = function(data){
 		this.data = data;
 		this.calendarBox = data.box||false;
 		if(!this.calendarBox){return false;}
 		this.left = data.left||0;
 		this.top = data.top||0;
 		this.curDate = data.curDate||new Date();
 		this.curDateinfo = {
 			year:this.curDate.getFullYear(),
 			month:this.curDate.getMonth(),
 			date:this.curDate.getDate()
 		};
 		this.year = this.curDateinfo.year;
 		this.month = this.curDateinfo.month;
 		this.init();
 	};
 	CALENDAR.prototype = {
 		init:function(){
 			this.createHtml();
 			this._display = false;
 			this.createcal(this.year,this.month);
 			this.events();
 			this.hide();

 		},
 		reset:function(){
 			this.curDateinfo = {
	 			year:this.curDate.getFullYear(),
	 			month:this.curDate.getMonth(),
	 			date:this.curDate.getDate()
	 		};
	 		this.year = this.curDateinfo.year;
	 		this.month = this.curDateinfo.month;
	 		this.createcal(this.year,this.month);
 		},
 		createHtml:function(){
 			this.calendarBox.css({"left":this.left,"top":this.top});
 			this.calendarBox.html(_html);
 		},
 		createcal:function(y,m){
 			var cal_lc = this.calendarBox.find('.cal_lc');
 			var cal_rc = this.calendarBox.find('.cal_rc');
 			var nextM = _getNextMonth(y,m);
 			var rule1 = [] ,rule2 = [] ;
 			if(this.data.ruleData&&this.data.ruleData.length>0&&this.data.rule){
 				rule1 = this.data.rule(y,m);
 				rule2 = this.data.rule(nextM[0],nextM[1]);
 			}else{
 				rule1 = {"noRule":true};
 				rule2 = {"noRule":true};
 			}
 			_createcal(y,m,cal_lc,rule1,this.curDateinfo );
 			_createcal(nextM[0],nextM[1],cal_rc,rule2,this.curDateinfo );
 		},
 		events:function(){
 			var that = this;
 			this.calendarBox.find(".cal-prev").on('click',function(){
 				var newDate = _getPreMonth(that.year,that.month);
 				newDate = _getPreMonth(newDate[0],newDate[1]);
 				that.createcal(newDate[0],newDate[1]);
 				that.month = newDate[1];
 				that.year = newDate[0];
 			});
 			this.calendarBox.find(".cal-next").on('click',function(){
 				var newDate = _getNextMonth(that.year,that.month);
 				newDate = _getNextMonth(newDate[0],newDate[1]);
 				that.createcal(newDate[0],newDate[1]);
 				that.month = newDate[1];
 				that.year = newDate[0];
 			});
 			this.calendarBox.find(".cal-close").on('click',function(){
 				that.hide();
 			});
 			this.calendarBox.find("dd").on("click",".indays",function(){
 				// var year = $(this).attr("year");
 				// var month = $(this).attr("month");
 				// var day = $(this).html();
 				if(that.data.callback){
 					that.data.callback($(this));
 				}
 			});
 			this.calendarBox.on("click",function(e){
 				 e.stopPropagation();
 			});
 		},
 		show:function(){
 			if(!this._display){
 				this.calendarBox.show();
 				this._display = true;
 				this.reset();
 			}
 			
 		},
 		hide:function(){
 			this.calendarBox.hide();
 			this._display = false;
 		}
 	};
 	window.CALENDAR = CALENDAR;
 })(window);

var ruleData = [
				{
					"from":"2016-03-16",
					"to":"2016-04-24",
					"day":[1,4] //周日是0
				},
				{
					"from":"2016-06-17",
					"to":"2016-09-24",
					"day":[3,4] //周日是0
				}
];
var oneWeek = 24*60*60*1000*7;
var oneDay = 24*60*60*1000;
function cal_setDate(str){
	var date = new Date();
	var arry = str.split("-");
	date.setFullYear(arry[0]);
	var month = parseInt(arry[1])-1;
	date.setMonth(month);
	date.setDate(arry[2]);
	date.setHours(0);
					date.setMinutes(0);
					date.setSeconds(0);
					date.setMilliseconds(0);
	return date;
}
function addRuleDate(ruleData){
	var length = ruleData.length;
	if(ruleData.length==0){
		return false;
	}
	for(var i= 0 ; i<length ;i++){
		ruleData[i].fromDate = cal_setDate(ruleData[i].from);
		ruleData[i].toDate = cal_setDate(ruleData[i].to);
		ruleData[i].arry = [];
		var fromTime = ruleData[i].fromDate.getTime();
		var toTime = ruleData[i].toDate.getTime();
		ruleData[i].fromTime = fromTime;
		ruleData[i].toTime = toTime;
		var day = ruleData[i].fromDate.getDay();
		var len = ruleData[i].day.length;
		for(var i2 = 0 ; i2<len ; i2++){
			var days = ruleData[i].day[i2]-day;
			days = (days<0)?fromTime+days*oneDay+oneWeek:fromTime+days*oneDay;
			var addDay = function(days){
				if(days>=fromTime&&days<=toTime){
					ruleData[i].arry.push(days);
					days+=oneWeek;
					addDay(days);
				}else{
					return false;
				}
			};
			addDay(days);
		}
	}
};
addRuleDate(ruleData);
//规则 返回{from:1458529171415,to:1458529171415,day:[1,22]};
var calRule = function(year,month){
	var length = ruleData.length;
	for(var i = 0 ; i< length; i++){
		var newDate = new Date();
		newDate.setFullYear(year);
		newDate.setMonth(month);
		newDate.setDate(1);
		newDate.setHours(0);
					newDate.setMinutes(0);
					newDate.setSeconds(0);
					newDate.setMilliseconds(0);
		var lastDate = new Date();
		lastDate.setFullYear(year);
		lastDate.setMonth(month+1);
		lastDate.setDate(0);
		lastDate.setHours(0);
					lastDate.setMinutes(0);
					lastDate.setSeconds(0);
					lastDate.setMilliseconds(0);
		var newDateT = newDate.getTime();
		var lastDateT = lastDate.getTime();
		if(newDateT>=ruleData[i].fromTime&&newDateT<=ruleData[i].toTime){
			if(lastDateT>ruleData[i].toTime){
				return {"from":newDateT,"to":ruleData[i].toTime,"rule":ruleData[i].arry};
			}else{
				return {"from":newDateT,"to":lastDateT,"rule":ruleData[i].arry};
			}
		}
		if(newDateT<=ruleData[i].fromTime&&lastDateT>=ruleData[i].fromTime){
			if(lastDateT>ruleData[i].toTime){
				return {"from":ruleData[i].fromTime,"to":ruleData[i].toTime,"rule":ruleData[i].arry};
			}else{
				return {"from":ruleData[i].fromTime,"to":lastDateT,"rule":ruleData[i].arry};
			}
		}
		
		

	}

	return {"noRule":true};
};
function cal_click(ele){
	var year = ele.attr("year");
 				var month = ele.attr("month");
 				var day = ele.html();
 	$(".inputbox input").val(year+"-"+month+"-"+day);
 	cla.hide();
 	var newDate = new Date();
 	newDate.setFullYear(year);
 	var m = month-1;
					newDate.setMonth(m);
					newDate.setDate(day);
					newDate.setHours(0);
					newDate.setMinutes(0);
					newDate.setSeconds(0);
					newDate.setMilliseconds(0);
	cla.curDate = newDate;
}
var calDara = {
	box: $("#calendarBox"),
	left:0,
	top:30,
	curDate:new Date(),
	rule:calRule,
	ruleData:ruleData,
	callback:cal_click
}
var cla = new CALENDAR(calDara);
$(".inputbox input").on("focus",function(e){
	if(!cla._display){
		// alert("d");
		setTimeout(function(){
			cla.show();
			e.stopPropagation();
		},200);
	}
	
});
$("body").on("click",function(){
	if(cla._display){
		// alert("d");
		setTimeout(function(){
			cla.hide();
		},100);
	}
});

















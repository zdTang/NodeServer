/*
参数说明：
sqlObj: SQL语句结构体，Object类型
{
	"sql": sql语句,
	"value": sql语句中的参数值
}
return：语句执行结果
*/

// 传入单条SQL语句
var ControlAPI_obj_async = function(data) {
	var sqlObj = _structureAnalysis(data);
	return new Promise((resolved, rejected)=>{
		_generalOperation(sqlObj["sql"], sqlObj["value"], (result)=>{
			if(result === null){
				rejected(null);
			}
			else{
				resolved(result);
			}
		});
	});
}

// 传入多条SQL语句
// this.ControlAPI_objs_async = function(...vars) {
// 	let len = vars.length;
// 	let promiseList = [];
// 	for(let i = 0; i < len; i++){
// 		let sqlObj = _structureAnalysis(vars[i]);
// 		promiseList.push(new Promise((resolved, rejected)=>{
// 			_generalOperation(sqlObj["sql"], sqlObj["value"], (result)=>{
// 				if(result === null){
// 					rejected(null);
// 				}
// 				else{
// 					resolved(result);
// 				}
// 			});
// 		}));
// 	}
// 	return Promise.all(promiseList);
// }
async function Get(){

	try {
		let result_single = await ControlAPI_obj_async(obj1);
		//let result_multi = await ControlAPI_objs_async(obj1, obj2,...,objn);
	} catch (error) {
		// 捕获await中Promise的reject的数据
	}

}

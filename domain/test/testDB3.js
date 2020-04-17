function Get (path,id,param,sqlWhere,res){
    var promise = new Promise(function (resolve, reject) {
        
        var sql = getFileSql(path,id,param,sqlWhere);
        var mysql = dbHelper.getMysql();
        mysql.query({
          sql: sql
        }, function (err, rows) {
            res.end(JSON.stringify(rows));
            resolve(rows);//关键
        });    
    
    });
    promise.then(function (value) {
        console.log(value);
        return value;
    }, function (value) {});
    return promise;
};
const // node modules 
    path = require('path'),
    pg_debug = require("debug")("app:pg"),
    error_debug = require('debug')('app:pg-error'),
    { Pool, Client } = require('pg'),
    Cursor = require('pg-cursor'),
    {promisify} = require('util');
  

require('dotenv').config({path: path.resolve(__dirname, './.env') })
Cursor.prototype.readAsync = promisify(Cursor.prototype.read);


// variables used in the file
let 
  config = {
    user:  process.env.PG_USER,
    host:  process.env.PG_HOST,
    database:  process.env.PG_DATABASE,
    password:  process.env.PG_PSWD,
    // port: params.pg_port
  },
  pool, pool_close;// connects the specific database
  // serverLogger = new EventLogger("db.js"), // debug and info logger
	// errLogger = new ErrorLogger("db.js"); // error logger


function connect(){
  pool = new Pool(config);
  pool.connect(async(err, cli, release) => {
    if (!cli){
         console.log("ReConnecting to Postgressql in "+ process.env.POSTGRES_RECONNECT_TIMEOUT)
        pg_debug("ReConnecting to Postgressql in "+ process.env.POSTGRES_RECONNECT_TIMEOUT)
        setTimeout(()=> connect(), 
          process.env.POSTGRES_RECONNECT_TIMEOUT*1000)
        return;
    }else{
      pool_close = release
     console.log("Connected to Postgressql listening on port ") // + params.pg_port)    
      // pg_debug("Connected to Postgressql listening on port " + params.pg_port)      
    }

    pool.on('error', (err) => {
      console.log("PostgresSql Error, Error is : " + err)
      //  error_debug("PostgresSql Error, Error is : " + err)
    });
  });
}

connect()


function pg_close(){
  if (pool_close){
    console.log("closing pg pool....")
    try{
      pool.end()
      pool_close()
    }catch(e){
      console.log("func pg_close(), error closing pg Pool connection, error is " + e)
    }
  }
}


// process.on('uncaughtException', function(err) {
//    if (err.code == "57P01"){
//       connect()
//       if (pool_close) pool_close()
//       errLogger.fatal("Administrator command run, terminating the connection, postgessql 57P01")
//    }
// });


var create_schema = function(schema_name){
  var query='CREATE SCHEMA IF NOT EXISTS ';
  query=query+schema_name+';'; s         
  return new Promise((resolve, reject)=>{
    pool.query(query)
    .then(res=>{
      console.log("New schema created, schema name " + schema_name)
      resolve(true);  
    })
    .catch(err=>{
      console.log("func create_schema(), exception in creating schem, returning false, Error is : " + err)
      resolve(false);
    });
  })
};


var run_new_table_query = (query)=>{
  return new Promise((resolve, reject) => {
    pool.query(query, function (err) {
      if (err) {
        console.log(`func run_new_table_query(), exception in table query ${query}, returning false, Error is : ${err}`)
        resolve(false)
      }
      else {
        resolve(true)
      }
    });
  });
}


var create_tables = async function (schema_name, dictionary) {          
  // the function creates new tables in the given schema ....parameters-(name of schema,dictionary)
  try{
    for (let k in dictionary) {
      var query = 'CREATE TABLE IF NOT EXISTS ' + schema_name + '.';
      query = query + k + " ( ";

      for (let i in dictionary[k]) {
        if (i != 0)
          query = query + ",";

        let ls = dictionary[k][i].split(" ");
        query = query + ls[0] + " ";

        let len = ls[1].length;

        if (len == 1) {
          if (ls[1] == "1" || ls[1] == "2") {
            query += "smallint";
          }
          else
          if (ls[1] == "4") {
            query += "integer";
          }
          else
          if (ls[1] == "8") {
            query += "bigint";
          }
          else
          if (ls[1] == "s") {
            query += "text";
          }
        }
        else
        if (len == 2 && ls[1] == 'dt') {
          query += "TIMESTAMPTZ";
        }
        else {
          if (ls[1][len - 1] == 'b') {
            query += 'bytea';
          }
          else
          if (ls[1][len - 1] == 's') {
            let num = parseInt(ls[1].substr(0, len - 1));
            query += "varchar(" + num + ")";
          }
          else
          if (ls[1] == "bool") {
            query += "boolean";
          }
          else
          query += ls[1];        
        }
      }
      query += ');'
      await run_new_table_query(query);
    }
  }
  catch(err){
    console.log(`func create_tables(), exception in try catch, schema ${schema_name} json 
      value ${JSON.stringify(dictionary)}, returning false, Error is : ${err}`)
    return false;
  }
};
 
// pool.query("SELECT * FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema'").then(res=>console.log(res.rows))
// pool.query("SELECT * from public.supplier").then(res=>console.log(res.rows))



var insert= function(schema_name,table_name,cols,data){              
  // the function is for inserting new row ....parameters-(schema name,table name,cols,data) 
  // the data is a string split by $
  /**
   * cols is space seperated list of columns 
   * the values to the cols is passed as array of the values under data key
   */
  try{
    var query;     
                              
    if(cols==" ") // if cols is just a string with space it assumes 
      query="INSERT INTO "+schema_name+"."+table_name+" VALUES (";  
      //that all the fields are given for insertion
    else
    {
      var col_name=cols.split(" ");                     
      // if we want only specific columns for the insertion then we give columns separated by " "
      query="INSERT INTO "+schema_name+"."+table_name+" (";

      let size=col_name.length;
      let k=1;
      while(k<=size)
      {
        if(k!=1)
        query+=",";

        query+=col_name[k-1];
        k=k+1;
      }
      query+=")VALUES ("
    }

    let len=data.length;
    
    let i=0;
    let j=1;
    
    while(i<len)
    {   
      if(j!=1)    query+=",";
        
      query+="$"+j;
      i=i+1;
      j=j+1;
    }
    query+=");";

    return new Promise((resolve, reject) => {
      pool.query(query,data,function(err,res){             
        if(err)
        {
          console.log(`func insert(), exception in table query ${query} values ${data}, returning false, Error is : ${err}`)
          resolve(false)
        }// else insert success
        resolve(true)
      });
    });
  }catch(err){
    console.log(`func insert(), exception in try catch, schema${schema_name}, table ${table_name}, 
      cols ${cols} and values ${JSON.stringify(data)}, returning false, Error is : ${err}`)

    error_debug(`func insert(), exception in try catch, schema${schema_name}, table ${table_name}, 
      cols ${cols} and values ${JSON.stringify(data)}, returning false, Error is : ${err}`)
    return false;
  }
    
};


var insert_seq_id = function(schema_name,table_name,cols,data, seq_id){              
  // the function is for inserting new row ....parameters-(schema name,table name,cols,data) 
  // the data is a string split by $
  /**
   * cols is space seperated list of columns 
   * the values to the cols is passed as array of the values under data key
   */
  try{
    var query;                         
    if(cols==" ") // if cols is just a string with space it assumes 
      query="INSERT INTO "+schema_name+"."+table_name+" VALUES (";  
      //that all the fields are given for insertion
    else
    {
      var col_name=cols.split(" ");                     
      // if we want only specific columns for the insertion then we give columns separated by " "
      query="INSERT INTO "+schema_name+"."+table_name+" (";

      let size=col_name.length;
      let k=1;
      while(k<=size)
      {
        if(k!=1)
        query+=",";

        query+=col_name[k-1];
        k=k+1;
      }
      query+=")VALUES ("
    }

    let len=data.length;
    
    let i=0;
    let j=1;
    
    while(i<len)
    {   
      if(j!=1)    query+=",";
        
      query+="$"+j;
      i=i+1;
      j=j+1;
    }
    query+=`) returning ${seq_id};`; // id will be the sequence ID

    // console.log("query  => " + query);
    return new Promise((resolve, reject) => {
      pool.query(query,data,function(err,res){             
        if(err)
        {
          error_debug(`func insert(), exception in table query ${query} values ${data}, returning false, Error is : ${err}`)

          console.log(`func insert(), exception in table query ${query} values ${data}, returning false, Error is : ${err}`)
          resolve(false)
        }// else insert success
        resolve(res.rows);
      });
    });
  }catch(err){
    console.log(`func insert(), exception in try catch, schema${schema_name}, table ${table_name}, 
      cols ${cols} and values ${JSON.stringify(data)}, returning false, Error is : ${err}`)

    error_debug(`func insert(), exception in try catch, schema${schema_name}, table ${table_name}, 
      cols ${cols} and values ${JSON.stringify(data)}, returning false, Error is : ${err}`)
    return false;
  }
    
};


var update_entry=function(schema_name,table_name,req_cols,req_vals,cols,vals){    
  /**
   * req_cols used to update a db entry using the req_cols to update another column given in array
   * Or updating columns given as array in cols param using array of columns given in req_cols
   * vals are the values which we are udating in the cols
   * req_vals are the values which we use along with req cols to match the rows
   * 
   * req_cols, cols is string space sepearated
   * req_vals, vals are array of values
   *  */  
  // function for update...parameters
  // parameters are the (schema_name,table_name,req_cols,req_vals,cols,vals)
  try{
    var txt="SELECT EXISTS(SELECT 1 FROM "+schema_name+"."+table_name+" WHERE "
    var col_name1=req_cols.split(" ");        
    // the req_cols are the column names separated by spaces
    //let temp=req_vals.split("$");             
    // the req_vals are the values separated by "$"
    let p=1;
                                                    
    // these are the fields based on which u want to update
    while(p<=col_name1.length)
    {
      if(p!=1)
      txt+=" and ";
      txt+=col_name1[p-1]+"=$"+(p);
      p=p+1;
    }
    txt+=");"
    var query={
      text:txt,
      rowMode: "array"
    };
      
    return new Promise((resolve,reject) => {
      pool.query(query,req_vals)
      // first filter the rows using the required cols and its values
      .then(res=>{
        // now after filtering rows using req cols and req values, update the target columns with target values
        if(res.rows[0][0]==true)            
        // we check if that entry exists
        {
          var query="UPDATE "+schema_name+'.'+table_name+" SET ";
          let col_name=cols.split(" ");       
          // the cols are the string of the space separated fields which we want to change    
          // the vals are their corresponding values
          let size=col_name.length;
          let k=1;

          while(k<=size)
          {
            if(k!=1)
            query+=",";

            query+=col_name[k-1]+"=$"+k;
            k=k+1;
          }
          query+=" WHERE ";
          let l=1;

          while(l<=col_name1.length)
          {
            if(l!=1)
            query+=" and ";
            vals.push(req_vals[l-1]);
            query+=col_name1[l-1]+"=$"+(l+k-1);
            l=l+1;
          }

          query+=";"; // the update query
          
          pool.query(query,vals,function(err,res){
            // update the target cols and target vals
            if(err)
            {
              console.log("error .......")
              console.log(err)

              console.log(`func update_entry(), exception in pool.query in updating the target 
                cols ${cols}, query ${query} 
                and target values ${JSON.stringify(vals)}, returning false, Error is : ${err}`)
              resolve(false);
              }
            else{
              // update success
              resolve(true);
            }
          });
        }
        else{
          // update uncessfull as user does not exist
          resolve(false);
          errLogger.warn("Update unsuccessfull as user does not exist, query : " + 
            query + ", cols passed for filtering rows : " + 
            req_cols  + ", values passed for filtering rows : " + JSON.stringify(req_vals) )
        }
      })
      .catch(err=>{
        console.log(`func update_entry(), exception(catch) in pool.query in filtering 
          rows using req cols and req vals
           ${query} values ${req_vals}, returning false, Error is : ${err}`)
        return false;
      });
    });
  }catch(err){
    console.log(`func update_entry(), exception in try catch, schema${schema_name}, table ${table_name}, 
      query filter using cols ${req_cols} and corresponding col values ${JSON.stringify(req_vals)}, 
      updating columns ${cols} and their values ${JSON.stringify(vals)} returning false, Error is : ${err}`)
    
    error_debug(`func update_entry(), exception in try catch, schema${schema_name}, table ${table_name}, 
      query filter using cols ${req_cols} and corresponding col values ${JSON.stringify(req_vals)}, 
      updating columns ${cols} and their values ${JSON.stringify(vals)} returning false, Error is : ${err}`)
    
    
    return false;
  }

};


var fetch_data= async function(schema_name,tables,req,cols,vals,count,join_cols){
  /**
   * tables is the table name(only single table)
   * req is a space separated string, we will be fulling all col data of all rows and column names are passed as req
   * req is required values to be fetched
   * cols is the query paramter, that is fetching all records where col or cols is eqaul to some value or array of values
   * cols is string spaced input
   * 
   * vals is string seperated by '$'
   * using the cols and theri vals we pull all records which has 'req' columns in final JSON.
   * Multiple rows returns as array of rows being 
   * 
   * count is number of rows we want to get from db
   */
  try{
    // for fetching data from the database
    //  the tables is a string with table names separated , only needed when we need data from multiple tables
    var query="SELECT ";              
    // the req are the columns whose data we need to fetch
    need=req.split(" ");              
    // separated by space
    let len=need.length;      
    // the cols and vals are the string separated by " " and "$" respectively
    // these cols and vals are known to us
    // th count is the number of rows u need
    // the join_cols is a string with space separated columns that belong to each table in tables which are the 
    //referential keys

    let j=1;
    while(j<=len)
    {
    if(j!=1)
    query+=",";

    query+=need[j-1];
    j=j+1;
    }

    var table_name=tables.split(" ");
    let values=[];
    if(table_name.length==1)
    {
    query+=" FROM "+schema_name+"."+table_name[0];
    }
    else
    {
    query+=" FROM "+schema_name+"."+table_name[0]+","+schema_name+"."+table_name[1];
    }

    if(cols!="")
    {
      query+=" WHERE ";
      let col_name=cols.split(" ");
      values=vals.split("$");
      len=col_name.length;
      j=1;
      while(j<=len)
      {
      if(j!=1)
      query+=" and ";

      query+=col_name[j-1]+"=$"+j;
      j=j+1;
      }

      if(table_name.length!=1)
      query+=" and ";
    }
    else
    {
      if(table_name.length!=1)
      query+=" WHERE ";
    }

    if(table_name.length!=1)
    {
      var jc=join_cols.split(" ");
      query+=schema_name+"."+table_name[0]+"."+jc[0]+"="+schema_name+"."+table_name[1]+"."+jc[1];
    }
    if (count)
      query+=" FETCH FIRST "+count+" ROWS ONLY;";
    else
      query+=";";

    // console.log(query, values)

    return pool.query(query, values)
      .then(res=>{
        return res.rows;
      })
      .catch(err=>{
        console.log(`func fetch_data(), exception in pool.query ${query} 
        values for filtering rows using where ${vals}, returning false, Error is : ${err}`)
        
        error_debug(`func fetch_data(), exception in pool.query ${query} 
        values for filtering rows using where ${vals}, returning false, Error is : ${err}`)
        
        return false
      })

    // query+= ";" //" FETCH FIRST "+count+" ROWS ONLY;";

    // const client = await pool.connect();                // cursor only works for clients
    // const cursor = await client.query(new Cursor(query, values));
    // client.release()
    // var ans= await cursor.readAsync(count);
    // return ans; 
  }catch(err){
    console.log(`func fetch_data(), exception in try catch, schema ${schema_name}, table ${tables}, 
      query filter rows where cols ${cols} and corresponding values ${vals}, target cols trying to fetch
      ${req}, returning false, Error is : ${err}`)

    error_debug(`func fetch_data(), exception in try catch, schema ${schema_name}, table ${tables}, 
      query filter rows where cols ${cols} and corresponding values ${vals}, target cols trying to fetch
      ${req}, returning false, Error is : ${err}`)
    return false;
  }
};


var rowCnt = async function(schema_name,table_name){          // it just returns the number of records in a table
  var query='SELECT COUNT(*) FROM '+schema_name+"."+table_name+";";

  try{
    const res= await pool.query(query);
    return res;
  }catch(err){
    console.log(`func rowCnt(), Exception in querying row count, schema ${schema_name} and table ${table_name}`)
    return false;
  }
};


var general_query = async (query, data)=>{
  /**
   * query is the general db query
   * data is the qeury values as array
   */
  // const client = await pool.connect();   // cursor only works for clients
  // const cursor = await client.query(new Cursor(query, data));
  // var ans= await cursor.readAsync(count);
  return new Promise( (resolve, reject) => {
    pool.query(query, data)
      .then((ans)=>{
        resolve(ans.rows);
      })
      .catch(err=>{
        console.log(err)
        console.log(`func general_query(), exception in pool.query ${query} and query 
          values ${JSON.stringify(data)}, returning false, Error is : ${err}`)
        
        error_debug(`func general_query(), exception in pool.query ${query} and query 
          values ${JSON.stringify(data)}, returning false, Error is : ${err}`)
        
        return false
      })
  });
}


module.exports={pg_close, create_schema, create_tables, insert, insert_seq_id, 
  update_entry, fetch_data,rowCnt, general_query};

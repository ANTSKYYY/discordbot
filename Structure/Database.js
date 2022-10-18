const mysql = require("mysql");
const { DEC8_BIN } = require("mysql/lib/protocol/constants/charsets");
const Database = new mysql.createConnection({
  host: "pma.holo-food.store",
  user: "u3_WfxLqTFT05",
  password: "Qx^G1QtZvCHa^pKLe6Y4vJq5",
  database: "s3_Antskyyy"
})

Database.connect(function(err) {
  
  if(err) throw err;

  console.log("📜 la base de donnée est connectée ! ✅")
})

module.exports = Database;
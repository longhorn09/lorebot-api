const db = require("./db");
const helper = require("../helper");
require('dotenv').config()

async function getMultiple(pLore, page = 1) {
  let sqlStr = ''//const offset = helper.getOffset(page, config.listPerPage);
  const offset = helper.getOffset(page, process.env.DB_PAGESIZE);

  const rows = await db.query(
    `SELECT LORE_ID, OBJECT_NAME,ITEM_TYPE,ITEM_IS,AFFECTS
    FROM Lore 
    WHERE OBJECT_NAME like '%` + pLore + `%'
    LIMIT ${offset},${process.env.DB_PAGESIZE}`
  );


  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data, meta,
  };
}

async function create(pArg) {
  const result = await db.query(
    `INSERT INTO programming_languages 
    (name, released_year, githut_rank, pypl_rank, tiobe_rank) 
    VALUES 
    ("${pArg.name}", ${pArg.released_year})`
  );

  let message = "Error in Create Lore";

  if (result.affectedRows) {
    message = "Lore CREATE successfully";
  }

  return { message };
}

async function update(id, programmingLanguage) {
  const result = await db.query(
    `UPDATE programming_languages 
    SET name="${programmingLanguage.name}", released_year=${programmingLanguage.released_year}, githut_rank=${programmingLanguage.githut_rank}, 
    pypl_rank=${programmingLanguage.pypl_rank}, tiobe_rank=${programmingLanguage.tiobe_rank} 
    WHERE id=${id}`
  );

  let message = "Error in UPDATE Lore";

  if (result.affectedRows) {
    message = "Lore UPDATE successfully";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM programming_languages WHERE id=${id}`
  );

  let message = "Error in DELETE Lore";

  if (result.affectedRows) {
    message = "Lore deleted successfully";
  }

  return { message };
}

module.exports = {
  getMultiple,
  create,
  update,
  remove,
};

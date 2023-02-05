"use strict";
const db = require("./db");
const helper = require("../helper");
require('dotenv').config()
const moment = require('moment');
const mysql = require('mysql2');  //need it simply for the escape() function to prevent injection attack


/**
 * this services /brief SlashCommand
 */
async function getObjectNames(pLore, page = 1) {
  let whereClause = " WHERE 1=1 ";
  let searchItem = ''
  let splitArr = []

  const offset = helper.getOffset(page, 40); // helps with database paging

  searchItem = pLore;
  //console.log(`${dateTime} : ${message.author.username.toString().padEnd(30)} /stat ${searchItem}`);

  splitArr = searchItem.split(".");
  if (splitArr.length >= 1) {
    for (let i = 0; i < splitArr.length; i++)    {
      whereClause += ` and Lore.OBJECT_NAME LIKE '%${mysql.escape(splitArr[i]).substring(1,mysql.escape(splitArr[i]).length-1)}%' `
    }
  }

  const rows = await db.query(
    `SELECT Lore.LORE_ID, Lore.OBJECT_NAME FROM Lore ` + whereClause + `LIMIT ${offset},40`
  );

  const loreRows = await db.query(
    `SELECT count(Lore.LORE_ID) as LoreCount FROM Lore ` + whereClause //+ `LIMIT ${offset},${process.env.DB_PAGESIZE}`
  );

  //console.log(loreRows[0].LoreCount)
  const data = helper.emptyOrRows(rows);
  const loreCount = loreRows[0].LoreCount 
  const meta = { page ,loreCount };
  //console.log(rowCount)
  return {
    data, meta
  };
}

/**
 * this services /stat SlashCommand
 */
async function getLoreID(pLoreID, page = 1) {
  const offset = helper.getOffset(page, process.env.DB_PAGESIZE); // helps with database paging

  const rows = await db.query(
    `SELECT * FROM Lore WHERE LORE_ID=` + pLoreID
  );

  //console.log(loreRows[0].LoreCount)
  const data = helper.emptyOrRows(rows);
  const loreCount = 1;
  const meta = { page ,loreCount};

  return {
    data, meta
  };
}


/**
 * this services /stat SlashCommand
 */
async function getMultiLore(pLore, page = 1) {
  let whereClause = " WHERE 1=1 ";
  let searchItem = ''
  let splitArr = []

  const offset = helper.getOffset(page, process.env.DB_PAGESIZE); // helps with database paging

  searchItem = pLore;
  //console.log(`${dateTime} : ${message.author.username.toString().padEnd(30)} /stat ${searchItem}`);

  splitArr = searchItem.split(".");
  if (splitArr.length >= 1) {
    for (let i = 0; i < splitArr.length; i++)    {
      whereClause += ` and Lore.OBJECT_NAME LIKE '%${mysql.escape(splitArr[i]).substring(1,mysql.escape(splitArr[i]).length-1)}%' `
    }
  }

  //console.log( `SELECT LORE_ID, OBJECT_NAME,ITEM_TYPE,ITEM_IS,AFFECTS FROM Lore ` + whereClause + `LIMIT ${offset},${process.env.DB_PAGESIZE}`);

  const rows = await db.query(
    `SELECT * FROM Lore ` + whereClause + `LIMIT ${offset},${process.env.DB_PAGESIZE}`
  );

  const loreRows = await db.query(
    `SELECT count(*) as LoreCount FROM Lore ` + whereClause //+ `LIMIT ${offset},${process.env.DB_PAGESIZE}`
  );

  //console.log(loreRows[0].LoreCount)
  const data = helper.emptyOrRows(rows);
  const loreCount = loreRows[0].LoreCount 
  const meta = { page ,loreCount };
  //console.log(rowCount)
  return {
    data, meta
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
  getObjectNames,
  getMultiLore,
  create,
  update,
  remove,
  getLoreID,
};

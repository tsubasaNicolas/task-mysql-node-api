import { connect } from "../database";

export const getCierres = async (req, res) => {
  try {
    const connection = await connect();
    const [rows] = await connection.query(
      "SELECT controlcierre.*, locales.local FROM controlcierre INNER JOIN locales ON controlcierre.id_local = locales.id ORDER BY controlcierre.fecha_hora DESC"
    );
    res.json(rows);
  } catch (error) {
    console.log(error);
  }
};

export const getCierreLocales = async (req, res) => {
  try {
    const connection = await connect();
    const [rows] = await connection.query(
      //"SELECT T1.id_local, t1.id_local, t1.estado, date_format(t1.fecha_hora, '%d-%m-%Y %H:%i') as fecha_hora, locales.local, locales.encargado FROM controlcierre T1 INNER JOIN ( SELECT id_local, MAX(id) max_id_estado FROM controlcierre GROUP BY id_local ) T2 INNER JOIN locales ON T1.id_local = T2.id_local AND T1.id = T2.max_id_estado AND locales.id= t1.id_local order by t1.estado ASC, fecha_hora DESC"
      "SELECT controlcierre.id_local, controlcierre.estado, date_format(controlcierre.fecha_hora, '%d-%m-%Y %H:%i') as fecha_hora, locales.local, locales.encargado FROM controlcierre INNER JOIN ( SELECT id_local, MAX(id) max_id_estado FROM controlcierre GROUP BY id_local ) locales INNER JOIN locales ON controlcierre.id_local = locales.id_local AND controlcierre.id = locales.max_id_estado AND locales.id= controlcierre.id_local order by controlcierre.estado ASC, fecha_hora DESC"
    );
    res.json(rows);
  } catch (error) {
    console.log(error);
  }
};

export const getCierre = async (req, res) => {
  const connection = await connect();
  const [rows] = await connection.query(
    "SELECT * FROM controlcierre where id = ?",
    [req.params.id]
  );
  console.log(rows[0]);
  res.json(rows[0]);
};

export const getCierresCount = async (req, res) => {
  const connection = await connect();
  const [rows] = await connection.execute("SELECT COUNT(*) FROM controlcierre");
  console.log(rows);
  res.json(rows[0]["COUNT(*)"]);
};

export const saveCierre = async (req, res) => {
  const connection = await connect();
  const [results] = await connection.execute(
    "insert into controlcierre(id_local, cierre, estado, fecha_hora)values(?,?,?,?)",
    [req.body.id_local, req.body.cierre, req.body.estado, req.body.fecha_hora]
  );
  res.json({
    id: results.insertId,
    ...req.body,
  });
};
export const deleteCierre = async (req, res) => {
  const connection = await connect();
  await connection.execute("delete from controlcierre where id = ?", [
    req.params.id,
  ]);
  res.sendStatus(204);
};

export const updateCierre = async (req, res) => {
  const connection = await connect();
  await connection.query("update controlcierre SET ? where id = ?", [
    req.body,
    req.params.id,
  ]);
  res.sendStatus(204);
};

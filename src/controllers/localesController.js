import { connect } from "../database";

export const getLocales = async (req, res) => {
  try {
    const connection = await connect();
    const [rows] = await connection.query(
      "SELECT * FROM locales ORDER BY estado ASC;"
    );
    res.json(rows);
  } catch (error) {
    console.log(error);
  }
};

export const getLocal = async (req, res) => {
  const connection = await connect();
  const [rows] = await connection.query("SELECT * FROM locales where id = ?", [
    req.params.id,
  ]);
  console.log(rows[0]);
  res.json(rows[0]);
};

export const getLocalesCount = async (req, res) => {
  const connection = await connect();
  const [rows] = await connection.execute("SELECT COUNT(*) FROM locales");
  console.log(rows);
  res.json(rows[0]["COUNT(*)"]);
};

export const saveLocal = async (req, res) => {
  const connection = await connect();
  var sql =
    "insert into locales(local, encargado, telefono, ubicacion, estado)values(?,?,?,?,?);";
  const [results] = await connection.execute(
    sql,
    [
      req.body.local,
      req.body.encargado,
      req.body.telefono,
      req.body.ubicacion,
      req.body.estado,
    ]

    //   "call agregar_local_control_cierre(?)",
    //  [req.body.id]
  );

  res.json({
    id: results.insertId,
    ...req.body,
  });
};
export const deleteLocal = async (req, res) => {
  const connection = await connect();
  await connection.execute("delete from locales where id = ?", [req.params.id]);
  res.sendStatus(204);
};

export const updateLocal = async (req, res) => {
  const connection = await connect();
  await connection.query("update locales SET ? where id = ?", [
    req.body,
    req.params.id,
  ]);
  res.sendStatus(204);
};

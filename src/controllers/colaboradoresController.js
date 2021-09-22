import { connect } from "../database";

export const getColaboradores = async (req, res) => {
  try {
    const connection = await connect();
    const [rows] = await connection.query("SELECT * FROM colaboradores");
    res.json(rows);
  } catch (error) {
    console.log(error);
  }
};

export const getColaborador = async (req, res) => {
  const connection = await connect();
  const [rows] = await connection.query(
    "SELECT * FROM colaboradores where id = ?",
    [req.params.id]
  );
  console.log(rows[0]);
  res.json(rows[0]);
};

export const getColaboradoresCount = async (req, res) => {
  const connection = await connect();
  const [rows] = await connection.execute("SELECT COUNT(*) FROM colaboradores");
  console.log(rows);
  res.json(rows[0]["COUNT(*)"]);
};

export const saveColaborador = async (req, res) => {
  const connection = await connect();
  const [results] = await connection.execute(
    "insert into colaboradores(nombre,telefono)values(?,?)",
    [req.body.nombre, req.body.telefono]
  );
  res.json({
    id: results.insertId,
    ...req.body,
  });
};
export const deleteColaborador = async (req, res) => {
  const connection = await connect();
  await connection.execute("delete from colaboradores where id = ?", [
    req.params.id,
  ]);
  res.sendStatus(204);
};

export const updateColaborador = async (req, res) => {
  const connection = await connect();
  await connection.query("update colaboradores SET ? where id = ?", [
    req.body,
    req.params.id,
  ]);
  res.sendStatus(204);
};

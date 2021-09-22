import { connect } from "../database";

export const getIngresos = async (req, res) => {
  try {
    const connection = await connect();
    const [rows] = await connection.query(
      "SELECT controlingreso.*, colaboradores.nombre FROM controlingreso INNER JOIN colaboradores ON controlingreso.id_colaborador = colaboradores.id ORDER BY controlingreso.fecha_hora DESC"
    );
    res.json(rows);
  } catch (error) {
    console.log(error);
  }
};

export const getIngresoColaboradores = async (req, res) => {
  try {
    const connection = await connect();
    const [rows] = await connection.query(
      // "SELECT T1.id_colaborador, t1.id_colaborador, t1.estado, date_format(t1.fecha_hora, '%d-%m-%Y %H:%i') as fecha_hora, colaboradores.nombre FROM controlingreso T1 INNER JOIN ( SELECT id_colaborador, MAX(id) max_id_estado FROM controlingreso GROUP BY id_colaborador ) T2  INNER JOIN colaboradores ON T1.id_colaborador = T2.id_colaborador AND T1.id = T2.max_id_estado  AND colaboradores.id= t1.id_colaborador order by estado ASC, fecha_hora DESC"
      "SELECT controlingreso.id_colaborador, controlingreso.estado, date_format(controlingreso.fecha_hora, '%d-%m-%Y %H:%i') as fecha_hora, colaboradores.nombre FROM controlingreso INNER JOIN ( SELECT id_colaborador, MAX(id) max_id_estado FROM controlingreso GROUP BY id_colaborador ) colaboradores INNER JOIN colaboradores ON controlingreso.id_colaborador = colaboradores.id_colaborador AND controlingreso.id = colaboradores.max_id_estado AND colaboradores.id= controlingreso.id_colaborador order by estado ASC, fecha_hora DESC"
    );
    res.json(rows);
  } catch (error) {
    console.log(error);
  }
};

export const getIngreso = async (req, res) => {
  try {
    const connection = await connect();
    const [rows] = await connection.query(
      "SELECT * FROM controlingreso where id = ?",
      [req.params.id]
    );
    console.log(rows[0]);

    res.json(rows[0]);
  } catch (error) {
    console.log(error);
  }

  // console.log(rows[0].id_colaborador); //console.log(rows[0].id_colaborador);
  //res.json(rows[0]);
};

export const getUltimoRegistro = async (req, res) => {
  const connection = await connect();
  const [rows] = await connection.query(
    "SELECT * FROM controlingreso where id_colaborador = ?  ORDER BY id DESC LIMIT 1",
    [req.params.id]
  );
  console.log(rows[0]);
  res.json(rows[0]);
};

export const getIngresosCount = async (req, res) => {
  const connection = await connect();
  const [rows] = await connection.execute(
    "SELECT COUNT(*) FROM controlingreso"
  );
  console.log(rows);
  res.json(rows[0]["COUNT(*)"]);
};

export const saveIngreso = async (req, res) => {
  const connection = await connect();
  const [results] = await connection.execute(
    "insert into controlingreso(id_colaborador,ingreso, estado,fecha_hora)values(?,?,?,?)",
    [
      req.body.id_colaborador,
      req.body.ingreso,
      req.body.estado,
      req.body.fecha_hora,
    ]
  );
  res.json({
    id: results.insertId,
    ...req.body,
  });
};
export const deleteIngreso = async (req, res) => {
  const connection = await connect();
  await connection.execute("delete from controlingreso where id = ?", [
    req.params.id,
  ]);
  res.sendStatus(204);
};

export const updateIngreso = async (req, res) => {
  const connection = await connect();
  await connection.query(
    "update controlingreso SET ? where id_colaborador = ?",
    [req.body, req.params.id_colaborador]
  );
  res.sendStatus(204);
};

const { createClient } = require('@clickhouse/client')

async function searchById(id) {
  const client = createClient({
    host: 'https://glea01n0la.us-east-2.aws.clickhouse.cloud:8443',
    password: 'QTcAOOYyLFZX'
  })
  console.info(await client.ping())

  try {
    const rows = await client.query({
      query: `SELECT * FROM changelogs WHERE id='${id}'`,
      format: 'JSONEachRow',
    })
    return (await rows.json())

  } catch (err) {
    console.log(err)
  }
}

const getDataById = (request, response) => {
  const id = parseInt(request.params.id);

  if (request.params.id) {
    searchById(id)
      .then(res => {
        console.log(res);
        response.status(200).json(res);
      })
  }
}

module.exports = { getDataById }

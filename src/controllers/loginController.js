import pkg from 'follow-redirects';
import 'dotenv/config';
const { https } = pkg;

const TOKEN = process.env.ORACLE_TOKEN;


class LoginController {

  static async logar(req, res) {

    const options = {
      'method': 'POST',
      'hostname': 'p11042834c1prd-admin.occa.ocs.oraclecloud.com',
      'path': '/ccadmin/v1/login',
      'headers': {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${TOKEN}`
      },
      'maxRedirects': 20
    };

    try {
      const requestHttp = https.request(options, (response) => {
        let chunks = [];

        response.on("data", (chunk) => {
          chunks.push(chunk);
        });

        response.on("end", () => {
          const body = Buffer.concat(chunks);
          const data = body.toString();

          try {
            // Converte a string da Oracle para um objeto JSON real
            const jsonData = JSON.parse(data);
            // Retorna como JSON para quem chamou sua API
            res.status(response.statusCode || 200).json({ access_token: jsonData.access_token });
          } catch (e) {
            // Caso a Oracle não retorne um JSON válido
            res.status(500).json({ error: "Erro ao processar JSON da Oracle", raw: data });
          }
        });

        response.on("error", (error) => {
          console.error("Erro na resposta:", error);
          if (!res.headersSent) res.status(500).send(error.message);
        });
      });

      // Substituindo qs.stringify por URLSearchParams (Nativo do Node)
      const postData = new URLSearchParams({
        'grant_type': 'client_credentials'
      }).toString();

      requestHttp.on('error', (error) => {
        console.error("Erro na requisição:", error);
        if (!res.headersSent) res.status(500).json({ message: error.message });
      });

      requestHttp.write(postData);
      requestHttp.end();

    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - erro interno` });
    }
  }
}

export default LoginController;
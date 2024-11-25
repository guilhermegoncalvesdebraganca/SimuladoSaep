const express = require('express');
const cors = require('cors');
const Sequelize = require('sequelize');


const database = new Sequelize('saepsimulado', 'root', 'admin', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306
});


const Usuario = database.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    nome: { type: Sequelize.TEXT },
    email: { type: Sequelize.TEXT },
    nickname: { type: Sequelize.TEXT },
    senha: { type: Sequelize.INTEGER },
    foto: { type: Sequelize.TEXT },
    createdAt: { type: Sequelize.TEXT },
    updatedAt: { type: Sequelize.TEXT },
}, { freezeTableName: true, timestamps: false });


const Empresa = database.define('empresa', {
    id_empresa: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    nome: { type: Sequelize.TEXT, allowNull: false },
    logo: { type: Sequelize.TEXT, allowNull: true },
}, { freezeTableName: true, timestamps: false });

const Curso = database.define('curso', {
    id_curso: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    foto: { type: Sequelize.TEXT, allowNull: false },
    nome_curso: { type: Sequelize.TEXT, allowNull: true },
    instituicao: { type: Sequelize.TEXT, allowNull: true },
    empresa_id: { type: Sequelize.INTEGER, allowNull: true },
}, { freezeTableName: true, timestamps: false });


const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

(async () => {
    try {

        await database.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');

        await database.sync();

        // Rotas
        app.get('/api/usuarios', async (req, res) => {
            try {
                const usuarios = await Usuario.findAll();
                res.json(usuarios);
            } catch (error) {
                res.status(500).json({ error: 'Erro ao buscar usuários' });
            }
        });

        app.post('/api/login', async (req, res) => {
            const { usuario, senha } = req.body;
            console.log('Recebido:', usuario, senha);  // Verifique os dados antes de enviar
            
            try {
                const user = await Usuario.findOne({
                    where: {
                        nickname: usuario,
                        senha: senha,
                    },
                });
        
                if (user) {
                    const empresa = await Empresa.findOne();  // Obtém dados da empresa
                    res.json({
                        usuario: {
                            nome: user.nome,
                            foto: user.foto,
                        },
                        empresa: {
                            nome: empresa.nome,
                            logo: empresa.logo,
                        },
                    });
                } else {
                    res.status(401).json({ error: 'Usuário ou senha inválidos' });
                }
            } catch (error) {
                console.error('Erro ao autenticar:', error);
                res.status(500).json({ error: 'Erro ao autenticar' });
            }
        });

        app.get('/api/empresa', async (req, res) => {
            try {
                const empresa = await Empresa.findAll();
                res.json(empresa);
            } catch (error) {
                res.status(500).json({ error: 'Erro ao buscar empresas' });
            }
        });

        app.get('/api/cursos', async (req, res) => {
            try {
                const cursos = await Curso.findAll(); // Retorna todos os cursos
                res.json(cursos);  // Retorna os dados dos cursos
            } catch (error) {
                res.status(500).json({ error: 'Erro ao buscar cursos' });
            }
        });

        
        app.get('/api/comentarios', async (req, res) => {
            try {
                const comentarios = await Comentar.findAll();
                res.json(comentarios);
            } catch (error) {
                res.status(500).json({ error: 'Erro ao buscar comentários' });
            }
        });


        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });

    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
})();
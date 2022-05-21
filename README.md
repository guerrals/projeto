# Setup projeto

## Tecnologias utilizadas

Frontend: React, Tailwindcss, Chartjs, Axios
Backend: Django, Django DRF

## Setup de ambiente backend

### Ambiente virtual e bibliotecas

Dentro da pasta `backend` crie um ambiente virtual com o comando `python3 -m venv env`.
Quando o comando terminar de executar você verá uma pasta chamada `env` ser criara no diretório.
A depender do ambiente que está utilizando, (windows, mac, linux), execute o seguinte comando
Windows:
    `env\Scripts\activate`
Linux / Mac:
    `source env/bin/activate`
Desse modo, iniciará o ambiente virtual
Repare que na pasta `backend` existe um arquivo txt chamado `requirements`.
Este aquivo contém todas as bibliotecas e suas versões do qual o sistema precisa para executar.
Agora, dentro da pasta backend, digite no terminal `pip install -r requirements`.
Desse modo, instalará todas as dependências dentro do ambiente virtual.

### Migrations e execução

Para que o sistema execute corretamente é preciso que o banco de dados tenha o esquema dos modelos que utilizaremos no projeto.
Para isso execute o comando `python3 manage.py migrate` e logo em seguida `python3 manage.py makemigrations`.
Com isso o sistema está pronto para executar e para tanto execute o comando `python3 manage.py runserver`. OBS: Caso na execução aparecer warning de migrate, pare o processo e execute os comandos anteriores novamente. Logo em seguida volte e executar este comando e o aviso deve desaparecer.

Pronto, agora o servidor está configurado, rodando e pronto para receber chamadas!

## Setup de ambiente frontend

Dentro da pasta `frontend` execute o comando `npm install` para instalar todas as dependências necessárias para executar o projeto.

Ao fim da instalação execute o comando `npm run dev`.

Pronto, agora a aplicação está configurada e rodando!

## Final

Agora, acesse `localhost:3000` para acessar o frontend da aplicação e `localhost:8000` para observar o backend
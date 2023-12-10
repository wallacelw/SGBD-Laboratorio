drop database if exists projeto_db;
create database projeto_db;
use projeto_db;

create table Livros(
	isbn bigint primary key,
    titulo varchar(100),
    descricao text(100),
    data_de_aquisicao date,
    estado_de_conservacao varchar(100),
    localizacao_fisica varchar(100),
    uri_da_capa_do_livro varchar(100)
);

create table Materiais_Ditaticos(
	id bigint primary key,
    descricao text(100),
    numero_de_serie bigint,
    data_de_aquisicao date,
    estado_de_conservacao varchar(100),
    localizacao_fisica varchar(100),
    uri_da_foto_do_material varchar(100)
);

create table Categoria_dos_Materiais(
	id bigint,
	categoria varchar(100)
);
alter table Categoria_dos_Materiais add constraint fk_material_didaticos foreign key (id) references Materiais_Ditaticos (id);

create table Categoria_dos_Livros(
	isbn bigint,
	categoria varchar(100)
);
alter table Categoria_dos_Livros add constraint fk_categoria_livros foreign key (isbn) references Livros (isbn);

create table Autor(
	isbn bigint,
	autor varchar(100)
);
alter table Autor add constraint fk_autor_livros foreign key (isbn) references Livros (isbn);

create table Emprestimos(
	id_do_livro bigint,
    id_do_material bigint,
	id_do_usuario bigint,
	tipo_do_item enum("material", "livro"),
    data_do_emprestimo date,
    data_de_devolucao_prevista date,
    status_do_emprestimo enum("devolvido", "em_uso", "atrasado")
);

create table Usuarios(
	id bigint primary key,
	nome varchar(100),
    sobrenome varchar(100),
    funcao  enum("administrador","membro"),
    login varchar(100),
    senha varchar(100),
    uri_da_foto_do_usuario varchar(100)
);

alter table Emprestimos add constraint fk_usuario foreign key (id_do_usuario) references Usuarios (id);
alter table Emprestimos add constraint fk_emprestimo_livro foreign key (id_do_livro) references Livros (isbn);
alter table Emprestimos add constraint fk_emprestimo_material foreign key (id_do_material) references Materiais_Ditaticos (id);

insert into Livros (
	isbn,
    titulo,
    descricao,
    data_de_aquisicao,
    estado_de_conservacao,
    localizacao_fisica,
    uri_da_capa_do_livro
) 
values 
(1, 'titulo', 'descricao', '1000-01-01 00:00:00', 'ok', 'atras', '2093asd'), 
(2, 'titulo2', 'descricao', '1000-01-01 00:00:00', 'ok', 'atras', '2093asd'),
(3, 'titulo3', 'descricao', '1000-01-01 00:00:00', 'ok', 'atras', '20321sd'),
(
    9788522005239, 
    "O Pequeno Príncipe", 
    "Breve Descricao...",
    "2023-10-12 00:00:00",
    "Novo",
    "Embaixo",
    "../book-images/9788522005239.jpg"
)
;

insert into Materiais_Ditaticos (
	id,
    descricao,
    numero_de_serie,
    data_de_aquisicao,
    estado_de_conservacao,
    localizacao_fisica,
    uri_da_foto_do_material
) 
values 
(1, 'descricao', '123', '1000-01-01 00:00:00', 'ok', 'atras', '2093asd'), 
(2, 'descrica2o', '321', '1000-01-01 00:00:00', 'ok', 'atras', '2093asd'),
(3, 'descricao3', '213', '1000-01-01 00:00:00', 'ok', 'atras', '20321sd')
;

insert into Usuarios (
	id,
	nome,
    sobrenome,
    funcao,
    login,
    senha,
    uri_da_foto_do_usuario
)
values 
(1, 'root', 'adm', 'administrador', 'admin', 'admin', 'secret')
;
drop database if exists projeto_db;
create database projeto_db;
use projeto_db;

-------------------- Livros --------------------

create table Livros(
	isbn bigint,
    titulo varchar(100),
    descricao text(100),
    data_de_aquisicao date,
    estado_de_conservacao varchar(100),
    localizacao_fisica varchar(100),
    uri_da_capa_do_livro varchar(100),
    status_do_livro enum("disponivel", "nao_disponivel"),
    primary key (isbn)
);

create table Categoria_dos_Livros(
	isbn bigint,
	categoria varchar(100),
    primary key (isbn, categoria),
    foreign key (isbn) references Livros (isbn)
);

create table Autor(
	isbn bigint,
	autor varchar(100),
    primary key (isbn, autor),
    foreign key (isbn) references Livros (isbn)
);

-------------------- Materiais --------------------

create table Materiais_Didaticos(
	id bigint,
    descricao text(100),
    numero_de_serie bigint,
    data_de_aquisicao date,
    estado_de_conservacao varchar(100),
    localizacao_fisica varchar(100),
    uri_da_foto_do_material varchar(100),
    status_do_material enum("disponivel", "nao_disponivel"),
    primary key (id)
);

create table Categoria_dos_Materiais(
	id bigint,
	categoria varchar(100),
    primary key (id, categoria),
    foreign key (id) references Materiais_Didaticos (id)
);

-------------------- Usuarios --------------------

create table Usuarios(
	id bigint primary key,
	nome varchar(100),
    sobrenome varchar(100),
    funcao enum("administrador", "membro"),
    login varchar(100),
    senha varchar(100),
    uri_da_foto_do_usuario varchar(100)
);

-------------------- Emprestimos --------------------

create table Emprestimos(
    id bigint,
	id_do_livro bigint,
    id_do_material bigint,
	id_do_usuario bigint,
    data_do_emprestimo date,
    data_de_devolucao_prevista date,
    status_do_emprestimo enum("solicitado", "emprestado", "devolvido"),
    primary key (id),
    foreign key (id_do_usuario) references Usuarios (id),
    foreign key (id_do_livro) references Livros (isbn),
    foreign key (id_do_material) references Materiais_Didaticos (id)
);

-------------------- Dados --------------------

insert into Livros (
	isbn,
    titulo,
    descricao,
    data_de_aquisicao,
    estado_de_conservacao,
    localizacao_fisica,
    uri_da_capa_do_livro,
    status_do_livro
) 
values 
(	9788595081536, 
	'O homem mais rico da Babilônia', 
    'Com mais de dois milhões de exemplares vendidos no mundo todo, O homem mais rico da Babilônia é um clássico sobre como multiplicar riqueza e solucionar problemas financeiros.', 
    '2023-10-13 00:00:00', 
    'velho',
    'frente', 
    '9788595081536.jpg', 
    'disponivel'), 
    
(	9788572839046, 
	'O Príncipe de Maquiavel',
    'Nesta obra, que é um clássico sobre pensamento político, o grande escritor Maquiavel mostra como funciona a ciência política.', 
    '2023-10-13 00:00:00', 
    'okay', 
    'atras', 
    '8572839046.jpg', 
    'nao_disponivel'), 
    
(   9788522005239, 
	"O Pequeno Príncipe", 
	"Breve Descricao...",
	"2023-10-12 00:00:00",
	"Novo",
	"Embaixo",
	"../../book-images/9788522005239.jpg",
	"disponivel"),

(   101010, 
	"Destrua esse livro", 
	"Breve Descricao...",
	"2023-10-12 00:00:00",
	"Quase destruido",
	"",
	"",
	"disponivel")
;
insert into Categoria_dos_Livros (
	isbn,
	categoria
)
values
(9788595081536, "economia"),
(9788595081536, "coach"),

(9788572839046, "politica"),

(9788522005239, "infantil")
;

insert into Autor (
	isbn,
	autor
)
values
(9788595081536, "George S Clason"),
(9788595081536, "Luiz Cavalcanti de M. Guerra"),

(9788572839046, "Nicolau Maquiavel"),

(9788522005239, "Antoine de Saint-Exupéry")
;

insert into Materiais_Didaticos (
	id,
    descricao,
    numero_de_serie,
    data_de_aquisicao,
    estado_de_conservacao,
    localizacao_fisica,
    uri_da_foto_do_material,
    status_do_material
) 
values 
(1, 'Borracha Branca', '187137', "2023-10-12 00:00:00", 'mordido', 'atras', '1.jpg', 'nao_disponivel'), 
(2, 'Cola em Fita', '91418', "2023-10-12 00:00:00", 'novo', 'frente', '2.jpg', 'disponivel'),
(3, 'Papel A4 Chamex', '1019540018641', "2023-10-12 00:00:00", 'velho', 'em cima', '3.jpg', 'disponivel')
;

insert into Categoria_dos_Materiais (
	id,
	categoria
)
values
(1, "escola"),

(2, "creche"),

(3, "escola"),
(3, "escritorio")
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
(1, 'root', 'adm', 'administrador', 'admin', 'admin', 'secret'),
(2, 'estudante1', 'x', 'membro', 'membro', 'membro', 'secret'),
(3, 'estudante2', 'y', 'membro', 'membro', 'membro', 'secret')
;

insert into Emprestimos (
    id,
	id_do_livro,
    id_do_material,
	id_do_usuario,
    data_do_emprestimo,
    data_de_devolucao_prevista,
    status_do_emprestimo
)
values 
(1, 9788595081536, null, 1, "2020-01-25", "2023-01-30", "devolvido"),
(2, 9788572839046, null, 3, "2020-01-25", "2023-01-26", "emprestado"),
(3, null, 1, 2, "2020-01-25", "2023-01-27", "solicitado")
;
# Upload de Arquivos no Back-end:

Criam o input type=file no HTML. Ao submeter o formulario são enviados para o back-end dois dados principais:
- o nome do arquivo (ex. curriculo.pdf)
- e o upstream do arquivo (o arquivo em SI - porém com a extensão .tmp)

A Lógica para tratar um arquivo enviado via Upload é:
- copiar o arquivo .tmp para um diretório do projeto (comando copy)
- precisamos ver qual a extensão que está presente no nome do arquivo para reutiliza-la na nova nomenclatura (pois evitamos manter o nome que foi enviado)
- SE estamos trabalhando com algo que se relaciona com um banco de dados por exemplo, normalmente utilizamos o ID do registro para compor o nome. (logotipo-depto-23.jpg) onde o 23 é o ID do departamento.
- Por fim atualizamos o banco de dados com o nome do arquivo gerado vinculado ao registro.

## Vídeo:
https://www.youtube.com/watch?v=4pmkQjsKJ-U

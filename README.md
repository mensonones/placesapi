# placesapi

## Projetinho simples que consome o serviço do google places e expões em API REST básica.

## Chamadas da API

1. Buscar informações

http://localhost:3000/place/:type/:name

:type é o tipo de lugar que se quer buscar. Ex: restaurant <br/>
:name é o nome do local/cidade que se quer buscar. Ex: pentecoste

Exemplo de chamada: http://localhost:3000/place/escola/pentecoste

2. Salvar informações 
http://localhost:3000/place/:type/:name/save

:type é o tipo de lugar que se quer buscar. Ex: restaurant <br/>
:name é o nome do local/cidade que se quer buscar. Ex: pentecoste <br/>
save serve para explicitar que se quer salvar a resposta da chamada

3. Recuperar informações salvas

http://localhost:3000/places/saved

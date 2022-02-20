angular.module("moduloProduto",[]) 
.controller ("produtoController", function($scope, $http){ 

    //função para exibir ou não a barra de pesquisa 
    $scope.exibirBarra = false;
    $scope.alterarExibirBarra = function(){
        if($scope.exibirBarra){
            $scope.exibirBarra = false;
        } else{
            $scope.exibirBarra = true;
        }
    }

    //função para exibir ou não a barra de pesquisa 
    $scope.exibirBarraCad = false;
    $scope.alterarExibirBarraCad = function(){
        if($scope.exibirBarraCad){
            $scope.exibirBarraCad = false;
        } else{
            $scope.exibirBarraCad = true;
        }
    }

    //função para exibir ou não a barra de pesquisa 
    $scope.exibirLista = true;
    $scope.alterarExibirLista = function(){
        if($scope.exibirLista){
            $scope.exibirLista = false;
        } else{
            $scope.exibirLista = true;
        }
    }

    $scope.urlPesquisa = "";

    //função de carregar a lista de produto
    $scope.preencheListaProdutos = function(){
        if($scope.urlPesquisa === ""){
            $http.get("http://localhost:8080/api/produtos")
            .then(function(response){
            $scope.listaProdutos = response.data ;
            console.log(response.data)
           
        })    
        }
        else{
            $http.get($scope.urlPesquisa)
            .then(function(response){
            $scope.listaProdutos = response.data;
            $scope.urlPesquisa = "";
        })
        } 
    }

    $scope.nomeProd = "";
    $scope.btLimpar = false;
    //função para fazer a pesquisa por nome
    $scope.porNome = function(txtPesquisa){
        if (txtPesquisa != ""){
            $scope.urlPesquisa = "http://localhost:8080/api/produtos/nome/"+ txtPesquisa
            $scope.btLimpar = true;  
            $scope.preencheListaProdutos();
        }
    }

    //função botão limpar
    $scope.limpar = function(txtPesquisa){
        $scope.urlPesquisa = "";
        $scope.btLimpar = false;  
        $scope.nomeProd = "";
        $scope.preencheListaProdutos();
    }

    //função para incluir produtos
    $scope.incluirProdutos = async function(){ //chamada assincrona 
        await $http.post("http://localhost:8080/api/produtos", //await (espere terminar esta, antes da outra)
        {
            "nome": $scope.incNome,
            "preco": $scope.incPreco,
            "desconto": $scope.incDesconto
        })

        $scope.nomeProd = "";
        $scope.preencheListaProdutos();
    }

     //função para incluir produtos
     $scope.preencherProdutoModal = function(produto){
        $scope.prId = produto.id,
        $scope.prNome = produto.nome,
        $scope.prPreco = produto.preco,
        $scope.prDescon = produto.desconto    
    } 


    $scope.alterarProduto = async function(){
        await $http.put("http://localhost:8080/api/produtos", 
        {
            "id" : $scope.prId,
            "nome": $scope.prNome,
            "preco": $scope.prPreco,
            "desconto": $scope.prDesconto
        })

        console.log('foi')

        $scope.preencheListaProdutos(); 
    }

    $scope.apagar = function(produto){
        $scope.urlDel = "http://localhost:8080/api/produtos/" + produto

        $http.delete($scope.urlDel)
        .then(function(response){
            $scope.preencheListaProdutos();
        })  
    }

        
    //ao abrir já carrega todos os produtos
    $scope.preencheListaProdutos();


})
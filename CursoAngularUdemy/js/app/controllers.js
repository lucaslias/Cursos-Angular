angular.module("meuModulo")
.controller ("indexController", function($scope){ //scope é o garçon que leva as infos ao html
    $scope.titulo = "Sistema com Angular JS";
    $scope.alunos = [
        {nome: "Lucas", email:"lucas@gmail.com", nota1:10, nota2: 8, nota3:9},
        {nome: "Joao", email:"joao@gmail.com", nota1: 9, nota2: 7, nota3:4},
        {nome: "Maria", email:"maria@gmail.com", nota1: 8, nota2: 5, nota3:2},
    ]
    var init = function(){
        $scope.alunos.forEach(function(aluno){
            aluno.media = media(aluno); 
        });
        limpaForm();
        $scope.editandoAluno = false;
    };

    var media = function(aluno){
        var media = ( parseFloat(aluno.nota1)+parseFloat(aluno.nota2)+ parseFloat(aluno.nota3))/3;
        return media.toFixed(2);
    }

    $scope.addAluno = function(newAluno){
        if($scope.newAluno.nome != "") {

            newAluno.media = media(newAluno);
            $scope.alunos.push($scope.newAluno);
        
            $scope.newAluno = {nome:"", email:"", nota1:'', nota2:'', nota3:'', media:''};

            var elems = document.querySelectorAll('.modal');
            var instances = M.Modal.init(elems, { dismissible: false });
        };
    }

    var limpaForm = function(){
        $scope.newAluno = {nome:"", email:"", nota1:'', nota2:'', nota3:'', media:''};
    };

    $scope.editandoAluno = false;


    var alunoEditar;
    $scope.editarAlunoFn = function(Aluno){
        $scope.editandoAluno = true;
        angular.copy(Aluno,  $scope.newAluno)
        alunoEditar = Aluno;
    };

    $scope.salvarAluno = function(Aluno){
        alunoEditar.nome = Aluno.nome;
        alunoEditar.email = Aluno.email;
        alunoEditar.nota1 = Aluno.nota1;
        alunoEditar.nota2 = Aluno.nota2;
        alunoEditar.nota3 = Aluno.nota3;
        alunoEditar.media = media(Aluno);
    };

    $scope.deletarAluno = function(Aluno){
        for(var index in $scope.alunos){
            var aux = $scope.alunos[index];

            if(Aluno === aux){
                $scope.alunos.splice(index,1)
            }

        }
    };

    init();
})

.controller("contaoController", function($scope){
    $scope.titulo = "Contato"; 
})
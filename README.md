## LabenuSystem:

Você estuda na Labenu_ há tanto tempo que já parecem anos, não é? Então, hoje, vamos pedir para criar um sistema que represente o básico da nossa organização. 

Ele deve possuir, ao menos, as 3 entidades importantes:

1. Estudantes 

    Representa estudantes da nossa instituição. Eles devem possuir: id, nome, email, data de nascimento e os principais hobbies dele. 

2. Docente

    Representa docentes da nossa instituição. Eles devem possuir: id, nome, email, data de nascimento e todas as especialidades dele. Há 7 especialidades: React, Redux, CSS, Testes, Typescript, Programação Orientada a Objetos e Backend

3. Turma

    Toda turma é composta das seguintes características: id, nome, data de início, data de término, lista de professores responsáveis, uma lista de alunos e módulo atual em que a turma está.

    O módulo pode assumir os valores de 1 a 7 ou `undefined`, indicando que as aulas dessa turma ainda não começaram. Para esse exercício, vamos considerar que existam dois tipos de turma: integral ou noturna. Há uma restrição para o nome das turmas noturnas: tem que terminar com `-na-night`.

As funcionalidades do sistema são:

→ Criar estudante;
("/student", createStudent);

→ Criar docente;
("/teacher", createTeacher);

→ Criar turma;
("/class", createClass)

→ Adicionar estudante na turma;
('/student/edit/:studentId',addStudentToClass )

→ Adicionar docente na turma;
('/teacher/edit/:teacherId',addTeacherToClass )

→  Deletar estudante;
("/student/:id", deleteStudents)

→ Ver hobie do estudante 
("/student/:id", seeStudentHobbie);

→ Pegar a idade de algum estudante a partir do id
("/student/:id", seeStudentHobbie);

→ Exibir estudantes de uma turma;
("/student/class/:idClass", getStudentByClass);

→ Exibir docentes de uma turma;
("/teacher/class/:idClass", getTeacherByClass)

→ Exibir estudantes que possuam o mesmo hobby;
('/student/hobbie/:idHobbie', getStudentByHobbie)

→ Remover estudante de uma turma;
('/class/student/:class_id/:student_id', deleteStudentClass)

→ Remover estudante;
("/student/:id", deleteStudents)

→ Remover docente de uma turma;
('/class/teacher/:class_id/:teacher_id', deleteTeacherClass)

→ Mudar turma de módulo
('/class/:id', updateModule)


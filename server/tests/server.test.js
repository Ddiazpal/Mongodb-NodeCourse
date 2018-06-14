    const expect = require('expect');
    const request = require('supertest');
    const {ObjectID} = require('mongodb')

    const {app} = require('./../server');
    const {Todo} = require('./../models/todo');
    const {todos, populateTodos, users, populateUsers} = require('./seed/seed');
    const {User} = require('./../models/user');

    beforeEach(populateUsers);
    beforeEach(populateTodos);
  
    describe('POST /todos', () => {
      it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
          .post('/todos')
          .send({text})
          .expect(200)
          .expect((res) => {
            expect(res.body.text).toBe(text);
          })
          .end((err, res) => {
            if (err) {
              return done(err);
            }

            Todo.find({text}).then((todos) => {
              expect(todos.length).toBe(1);
              expect(todos[0].text).toBe(text);
              done();
            }).catch((e) => done(e));
          });
        });

      it('Should not create todo with invalid body data', (done) => {
         request(app)
         .post('/todos')
         .send({})
         .expect(400)
         .end((err, res) => {
           if (err) {
             return done(err);
           }

           Todo.find().then((todos) =>{
             expect(todos.length).toBe(2);
             done();
           }).catch((e) => done(e));
         });
      });
    });


    describe('GET /todos', () => {
      it('Should get all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) =>{
          expect(res.body.todos.length).toBe(2);
        })
        .end(done);
      });
    });

    describe('GET /todos/:id', () =>{
      it('Should return todo doc', (done) => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
      });

      it('Should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();
        request(app)
        .get(`/todos/${todos[0].hexIid}`)
        .expect(404)
        .end(done);
      });

      it('Should return 404 for non-object ids', (done) => {
        request(app)
        .get('/todos/123abc')
        .expect(404)
        .end(done);
      });
    });

    describe('DELETE /todos/:id', () => {
      it('Should remove a todo', (done) => {
        var hexId = todos[1]._id.toHexString();

        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.todo._id).toBe(hexId);
        })
        .end((err, res) => {
          if(err){
            return done(err);
          }

          Todo.findById(hexId).then((todo) => {
            expect(todo).toNotExist();
            done();
          }).catch((e) => done(e));
        });
      });

      it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString();
        request(app)
        .delete(`/todos/${todos[0].hexIid}`)
        .expect(404)
        .end(done);
      });

      it('Should return 404 if objecid is invalid', (done) => {
        request(app)
        .delete('/todos/123abc')
        .expect(404)
        .end(done);
      });
    });

    describe('PATCH /todos/:id', () => {
      it('Should update the todo', (done) => {
        var hexId = todos[0]._id.toHexString();
        var text = 'thos should be new'

        request(app)
        .patch(`/todos/${hexId}`)
        .send({
          completed: true,
          text
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.todo.text).toBe(text);
          expect(res.body.todo.completed).toBe(true);
        //  expect(res.body.todo.completedAt).toBe('number');
        })
        .end(done)
      });

      it('Should completedAt when todo is not comleted', (done) => {
        var hexId = todos[1]._id.toHexString();
        var text = 'thos should be newvfvdfv'

        request(app)
        .patch(`/todos/${hexId}`)
        .send({
          completed: false,
          text
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.todo.text).toBe(text);
          expect(res.body.todo.completed).toBe(false);
          expect(res.body.todo.completedAt).toNotExist();
        })
        .end(done)

      });
    });

    describe('GET /users/me', ()=> {
      it('Should return user if auth ', (done) => {
        request(app)
        .get('/users/me')
        .set('x-auth', users[0].tokens[0].token)
        .expect(200)
        .expect((res) => {
          expect(res.body._id).toBe(users[0]._id.toHexString());
          expect(res.body.email).toBe(users[0].email);
        })
        .end(done);
      });

      it('Should return 401 if not auth' , (done) => {
         request(app)
         .get('/users/me')
         .expect(401)
         .expect((res) => {
           expect(res.body).toEqual({});
         })
         .end(done);
      });
    });

    describe('POST /users', () => {
      it('Should create a user', (done) => {
        var email = 'example@example.com' ;
        var password = '123abc';

        request(app)
        .post('/users')
        .send({email,password})
        .expect(200)
        .expect((res) => {
          expect(res.headers['x-auth']).toExist();
          expect(res.body._id).toExist();
          expect(res.body.email).toBe(email);
        })
        .end((err) => {
          if(err){
            return done(err);
          }

          User.findOne({email}).then((user)=>{
            expect(user).toExist();
            expect(user.password).toNotBe(password);
            done();
          });
        });
      });
      
      it('Should return validation errors if req invalid', (done) => {
        request(app)
        .post('/users')
        .send({
          email:'and',
          password: '25'
        })
        .expect(400)
        .end(done);
      });

      it('Should not create user if email in use', (done) => {
        request(app)
        .post('/users')
        .send({
          email: users[0].email,
          password: 'password123!'
        })
        .expect(400)
        .end(done)
      });
    });

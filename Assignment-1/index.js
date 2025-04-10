const getBtn = document.getElementById('get-btn');
const postBtn = document.getElementById('post-btn');
const putBtn = document.getElementById('put-btn');
const deleteBtn = document.getElementById('delete-btn');

getBtn.addEventListener('click', getTodos);
postBtn.addEventListener('click', postTodo);
putBtn.addEventListener('click', putTodo);
deleteBtn.addEventListener('click', deleteTodo);

const BASE_URL = 'https://crudcrud.com/api/2d72254728974faeb5920225e3ffe695';
let todo_id = '';

function getTodos() {
  axios
    .get(`${BASE_URL}/axios`)
    .then((response) => {
      console.log('GET response : ', response.data);
      if (response.data.length > 0) {
        todo_id = response.data[0]._id;
        console.log('TODO id set to', todo_id);
      }
    })
    .catch((error) => {
      console.log('Error fetching todos : ', error);
    });
}

function postTodo() {
  const payload = {
    title: 'Learn Axios',
    completed: false,
  };
  axios
    .post(`${BASE_URL}/axios`, payload)
    .then((response) => {
      console.log('POST response : ', response.data);
      todo_id = response.data._id;
    })
    .catch((error) => {
      console.log('POST error : ', error);
    });
}

function putTodo() {
  if (!todo_id) {
    console.log('No todoId available. Please run getTodos or postTodo first.');
    return;
  }

  const payload = {
    title: 'Learn Axios',
    completed: true,
  };

  axios
    .put(`${BASE_URL}/axios/${todo_id}`, payload)
    .then((response) => {
      console.log('PUT successful: Todo marked as completed.');
    })
    .catch((error) => {
      console.log('Error updating todo:', error);
    });
}

function deleteTodo() {
  if (!todo_id) {
    console.log('No todoId available. Please run getTodos or postTodo first.');
    return;
  }
  axios
    .delete(`${BASE_URL}/axios/${todo_id}`)
    .then(() => {
      console.log('DELETE successful: Todo deleted.');
    })
    .catch((error) => {
      console.log('Error deleting todo:', error);
    });
}

document.addEventListener('DOMContentLoaded', getData);

function getData() {
  axios
    .get(
      'https://crudcrud.com/api/2d72254728974faeb5920225e3ffe695/appointmentData'
    )
    .then((response) => {
      const responses = response.data;
      responses.forEach((res) => {
        displayUserOnScreen(res);
      });
    })
    .catch((error) => {
      console.log('Error fetching details :', error);
    });
}

function handleFormSubmit(event) {
  event.preventDefault();
  const userDetails = {
    username: event.target.username.value,
    email: event.target.email.value,
    phone: event.target.phone.value,
  };
  axios
    .post(
      'https://crudcrud.com/api/2d72254728974faeb5920225e3ffe695/appointmentData',
      userDetails
    )
    .then((response) => displayUserOnScreen(response.data))
    .catch((error) => console.log(error));

  // Clearing the input fields
  document.getElementById('username').value = '';
  document.getElementById('email').value = '';
  document.getElementById('phone').value = '';
}

function displayUserOnScreen(userDetails) {
  const userItem = document.createElement('li');
  userItem.appendChild(
    document.createTextNode(
      `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`
    )
  );

  const deleteBtn = document.createElement('button');
  deleteBtn.appendChild(document.createTextNode('Delete'));
  userItem.appendChild(deleteBtn);

  const editBtn = document.createElement('button');
  editBtn.appendChild(document.createTextNode('Edit'));
  userItem.appendChild(editBtn);

  const userList = document.querySelector('ul');
  userList.appendChild(userItem);

  deleteBtn.addEventListener('click', (event) => {
    axios
      .delete(
        `https://crudcrud.com/api/2d72254728974faeb5920225e3ffe695/appointmentData/${userDetails._id}`
      )
      .then(() => {
        console.log('User deleted successfully');
        userList.removeChild(event.target.parentElement);
      })
      .catch(() => {
        console.log('Error in deleting data :', error);
      });
  });

  editBtn.addEventListener('click', function (event) {
    userList.removeChild(event.target.parentElement);
    localStorage.removeItem(userDetails.email);
    document.getElementById('username').value = userDetails.username;
    document.getElementById('email').value = userDetails.email;
    document.getElementById('phone').value = userDetails.phone;
  });
}

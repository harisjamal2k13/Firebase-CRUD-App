const userId = document.getElementById('id');
const name = document.getElementById('name');
const clas = document.getElementById('clas');

const database = firebase.database();
const rootRef = database.ref('users');

addBtn.addEventListener('click', (e) =>{
  e.preventDefault();
  const autoId = rootRef.push().key
  rootRef.child(autoId).set({
    StudentName: name.value,
    Class: clas.value
  });
});


updateBtn.addEventListener('click', (e) =>{
  e.preventDefault();
const newData = {
    StudentName: name.value,
    Class: clas.value
};
const updates = {};
updates['/users/'+userId.value] = newData;
updates['/super-users/'+userId.value] = newData;
database.ref().update(updates);
});


removeBtn.addEventListener('click', e =>{
  e.preventDefault();
  rootRef.child(userId.value).remove()
  .then(() => {
    window.alert('User removed from database');
  })
  .catch(error =>  {
    console.error(error);
  });
});

database.ref('/communities').orderByValue().limitToFirst(2).on('value', snapshot =>{
  console.log(snapshot.val());
});

// })
  // rootRef.on('child_removed',snapshot =>{
  //   console.log('child(s) removed');



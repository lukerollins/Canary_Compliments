


function getFiles() {
  return $.ajax('/api/compliment')
    .then(res => {
      console.log("Results from getFiles()", res);
      return res;
    })
    .fail(err => {
      console.log("Error in getFiles()", err);
      throw err;
    });
}


function refreshFileList() {
  const template = $('#list-template').html(); 
  const compiledTemplate = Handlebars.compile(template);

  getFiles()
    .then(files => {
      
      window.fileList = files;

      const data = {files: files};
      const html = compiledTemplate(data);
      $('#list-container').html(html);
    });
}


function toggleAddFileForm() {
  console.log("Baby steps...");
  setFormData({});
  toggleAddFileFormVisibility();
}

function toggleAddFileFormVisibility() {
  $('.form-container').toggleClass('hidden');
}

function submitFileForm() {
  console.log("You clicked 'submit'. Congratulations.");

  const fileData = {
    compliment: $('#file-compliment').val(),
    _id: $('#file-id').val(),
  };

  let method, url;
  if (fileData._id) {
    method = 'PUT';
    url = '/api/compliment/' + fileData._id;
  } else {
    method = 'POST';
    url = '/api/compliment';
  }

  console.log(method, url, fileData); 

  $.ajax({
    type: method,
    url: url,
    data: JSON.stringify(fileData),
    dataType: 'json',
    contentType : 'application/json',
  })
    .done(function(response) {
      console.log("We have posted the data");
      refreshFileList();

    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.log("Failures at posting, we are", jqXHR, textStatus);
    });

  console.log("Your file data", JSON.stringify(fileData));
}


function editFileClick(id) {
  const file = window.fileList.find(file => file._id === id);
  
  if (file) {
    console.log('file', file);
    setFormData(file);
    toggleAddFileFormVisibility();
    console.log(id, file);
  }
  
}


function setFormData(data) {
  console.log('Set form data', data)
  data = data || {};

  const file = {
    compliment: data.compliment || '',
    _id: data._id || '',
  };
  console.log(data);
  $('#file-compliment').val(file.compliment);
  $('#file-id').val(file._id);
  
}

function deleteFileClick(id) {
  if (confirm("Are you sure?")) {
      $.ajax({
      type: 'DELETE',
      url: '/api/compliment/' + id,
      dataType: 'json',
      contentType : 'application/json',
    })
      .done(function(response) {
        console.log("File", id, "is DOOMED!!!!!!");
        refreshFileList();
      })
      .fail(function(error) {
        console.log("I'm not dead yet!", error);
      });
  }
}




refreshFileList();

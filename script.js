document.querySelector('#zipForm').addEventListener('submit',getLocationInfo);
document.querySelector('body').addEventListener('click',deleteLocation);
function getLocationInfo(event){
     event.preventDefault();
     const zip = document.querySelector('.zip').value;
     fetch(`https://api.zippopotam.us/us/${zip}`)
     .then(response => {
          if(response.status != 200){
               showIcon("remove");
               document.querySelector('#output').innerHTML = `
                    <article class="message is-danger">
                         <div class="message-body">invalid zipcode, please try again</div>
                    </article>
               `;
               throw Error(response.statusText);
          }else{
               showIcon("check");
               return response.json();
          }
     })
     .then(data => {
          let output = "";
          data.places.forEach(place => {
               output += `
                    <article class="message is-primary">
                         <div class="message-header">
                              <p>Location Info</p>
                              <button class="delete"></button>
                         </div>
                         <div class="message-body">
                              <ul>
                                   <li><strong>City: </strong>${place["place name"]}</li>
                                   <li><strong>State: </strong>${place["state"]}</li>
                                   <li><strong>Longitude: </strong>${place["longitude"]}</li>
                                   <li><strong>Latitude: </strong>${place["latitude"]}</li>
                              </ul>
                         </div>
                    </article>
               `;
          });
          document.querySelector('#output').innerHTML = output;
     })
     .catch(error => console.log(error));
}
function showIcon(icon){
     document.querySelector('.icon-remove').style.display = 'none';
     document.querySelector('.icon-check').style.display = 'none';
     document.querySelector(`.icon-${icon}`).style.display = 'inline-flex';
}
function deleteLocation(event){
     if(event.target.className == 'delete'){
          document.querySelector('.message').remove();
          document.querySelector('.zip').value = '';
          document.querySelector('.icon-check').remove();
     }
}
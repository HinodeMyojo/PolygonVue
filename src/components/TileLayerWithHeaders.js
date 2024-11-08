import L from 'leaflet';

L.TileLayerWithHeaders = L.TileLayer.extend({
  createTile: function(coords, done) {
    const tile = document.createElement('img');
    const url = this.getTileUrl(coords);
    
    // Создайте объект для XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Authorization', `Bearer ${this.options.bearerToken}`); 
    xhr.responseType = 'blob'; 

    xhr.onload = () => {
      if (xhr.status === 200) {
        const reader = new FileReader();
        reader.onload = () => {
          tile.src = reader.result;
          done(null, tile); 
        };
        reader.readAsDataURL(xhr.response);
      } else {
        done(xhr.statusText, tile);
      }
    };

    xhr.onerror = () => {
      done(xhr.statusText, tile);
    };

    xhr.send(); 

    return tile;
  }
});

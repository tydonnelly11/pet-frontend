<template>
    <div class="WarList-container">
            <div class="title">
                WAR for 9/26 - 10/03
            </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Jacob</td>
          <td>Thornton</td>      
          <td>@twitter</td>
        </tr>
        <tr>
          <th scope="row">4</th>
          <td>Jacob</td>
          <td>Thornton</td>
                <td>@twitter</td>
        </tr>
      </tbody>
    </table>
    </div> 
    </template>
    
    <script>
    export default{
        name: 'WarList',
    
    }
    
    </script>
    
    <style scoped>
    .WarList-container{
        display: flex;
        flex-direction: column;
    }
    
    td{
        font-size: 1.1rem;
    }
    
    .title{
        font-size: 1.5rem;
    }
    
    </style>
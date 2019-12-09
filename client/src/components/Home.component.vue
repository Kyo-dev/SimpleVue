<template>
  <div class="container">
    <div class="title-container">
      <div class="title">
        <h1>Nombre de la farmacia</h1>
        <span class="horario">
          Hora de apertura
          <i>7:00</i> am
        </span>
        <span class="horario">
          Hora de cierre
          <i>7:00</i> pm
        </span>
      </div>
      <div class="logo">
        <img class="logo-img" src="../assets/logo-farma.png" alt />
      </div>
    </div>
    <div class="info-container">
      <div class="ccss">
        <ul class="info-ccss">
          <li>Hola</li>
          <li>Hola</li>
          <li>Hola</li>
        </ul>
        <!-- <table class="infoUsers">
          <thead>
            <tr>
              <th class="th">Cedula</th>
              <th class="th">Apellido</th>
              <th class="th">Nombre</th>
              <th class="th">Fecha salida</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="td">{{}}</td>
              <td class="td">{{}}</td>
              <td class="td">{{}}</td>
              <td class="td">{{}}</td>
            </tr>
          </tbody>
        </table>-->
      </div>
      <div class="news"></div>
    </div>
  </div>
</template>

<script>
</script>
<style>
/* background: #001B4A; */
.container {
  display: flex;
  flex-direction: column;
}

.title-container {
  display: flex;
  justify-content: space-between;
  background-color: red;
}
.title {
  color: #8eb632;
}
.horario {
  display: block;
  margin-top: 0.7em;
  padding-left: 1.4em;
  color: #7ba2cb;
}
.logo-img {
  width: 11em;
  height: 10em;
}
.info-container {
  background: steelblue;
  margin: 1.4em 0;
  width: 45%;
  height: 20em;
}
.ccss {
}
.news {
}
.infoUsers {
}
.info-ccss :nth-child(even){
 list-style-type:none
}
.info-ccss :nth-child(odd){
 color:blanchedalmond;
 background: red;
 list-style-type:none
}

</style>
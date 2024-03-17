<template>
  <v-app>
    <v-container id="Contenedor">

      <v-card id="ContenedorLogin" width="300"  class="mx-auto mt-5 Sombreado" align="left" justify="center" >
            <v-card-title align="center">
                 <h3 class="display-1" >Bienvenido</h3>          
            </v-card-title>
            <v-card-text>
              <v-form>

                  <v-text-field clearable
                    label="Login"
                    prepend-icon="mdi-account-circle"
                    class="mt-5 clLogin"                       
                    v-model="cLogin"
                    @focus="bAlerta=false"
                    variant="outlined"
                    
                  />
                  <v-text-field clearable
                    :type="showPassword ? 'text' : 'password'"
                    label="Password"
                    prepend-icon="mdi-lock"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                    v-model="cPassword"
                    @focus="bAlerta=false"
                    variant="outlined"
                  />
                  <v-btn id="Boton" class="mt-2" block @click="validarUsuario"> Entrar al sistema</v-btn>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>                            
        </v-card>

        <!-- Alerta de login inválido -->
        <v-alert
          color="deep-orange"
          icon="mdi-fire"
          title="Error en los datos"
          variant="outlined"
          v-if="bAlerta" 
          max-height="80"
          class="mt-5"
        >
            {{cTextoAlerta}}
        </v-alert>
        <!-- Alerta de login inválido -->          

    </v-container>
  </v-app>


</template>


<script>

import * as oGescel from "../services/gescel.js";


export default {
  name: "gLogin",
  data() {
    return {
        showPassword: false,
        bAlerta:false,
        oGescel,
        cLogin: String,
        cTextoAlerta: String,
        cPassword: String,
        mCodigoEmpresas: [String],
        mNombreEmpresas: [String],
        bMostrarInformeDiario: false,
        // data nueva
        nNumero: 24,
             cNombreCliente: String,
             cCodigoCliente: String,
             bAutenticacion: false,
             cColorError : "rgba(222, 171, 171, 0.996)",
             cColorOk: "#90DCFF",  
             cServidorAPI : "String",
             jModeloJson: {
                 "proceso":    'autenticacion',
                 "token":      ''
              },
             miInit:   {
                method: 'POST',                                 // Objeto INIT
                body: JSON.stringify(this.jModeloJson),         // data can be `string` or {object}!
                headers:{'Content-Type': 'application/json'}    // Final INIT    
            }                       
        // \data nueva

    }
  },

  created() {
    this.cLogin       = '';
    this.cPassword    = '';
  },    

  methods: {

        // Validar usuario ************************************************************
        validarUsuario() {
            if(this.cLogin=="") {
                // No indico el Login                    
                this.cTextoAlerta="Debe introducir un login";
                this.bAlerta=true;                    
                return
            }
            if (this.cPassword=="") {
                this.cTextoAlerta="Debe introducir un password";
                this.bAlerta=true;                    
                return
            }
            // Indico login y password - Validaremos                   
            this.validacionLogin(this.cLogin.trim().toLowerCase(),this.cPassword.trim().toLowerCase());     
        }, // \Validar usuario **********************************************************        
        
        validacionLogin(cLogin,cPassword) {
              this.oJson={
                  "proceso":  "autenticacion",
                  "login" : cLogin,
                  "password" : cPassword
                  };
                      
              this.miInit.body          = JSON.stringify(this.oJson);        
              this.cServidorAPI         = oGescel.cObtenerServidorAPI()
              var cUrlDescarga      =   "http://"+this.cServidorAPI+'?format=json';
              var oOrion            =   this;
              fetch(cUrlDescarga,this.miInit)
              .then(function(response) 
                    {                    
                    return response.json();
                    }) // Final primer then
                    .then(function(myJson){   
                          if(myJson.autenticacion=='aprobada'){
                            // this.mostrarMensaje("Usuario validado",this.cColorOk);
                            if(oGescel.store.bConsoleLog) console.log("Autenticación aprobada");                            
                            oOrion.cNombreCliente           =   myJson.nomcli;
                            oOrion.cCodigoCliente           =   myJson.codcli;
                            oOrion.mCodigoEmpresas          =   myJson.codemp;
                            oGescel.store.CodigoEmpresas    =   myJson.codemp;
                            oGescel.store.NombreEmpresas    =   myJson.nomemp;
                            oGescel.store.cCodigoCliente    =   myJson.codcli;
                            oGescel.store.cNombreCliente    =   myJson.nomcli;
                            oGescel.store.bUsuarioActivo    =   true;
                            oGescel.store.oGaleria          =   myJson.oGaleria;
                            oOrion.mNombreEmpresas          =   myJson.nomemp;
                            oOrion.bAutenticacion           =   true;                            
                         }
                          if(myJson.autenticacion=='rechazada'){
                              if(oGescel.store.bConsoleLog) console.log("Autenticacion: Rechazada ");
                              oOrion.cNombreCliente           =   "Cliente no Identificado";
                              oOrion.cCodigoCliente           =   "Cliente no Identificado";
                              oGescel.store.cCodigoCliente    =   "Cliente no Identificado";
                              oGescel.store.cNombreCliente    =   "Cliente no Identificado";
                              oGescel.store.bUsuarioActivo    =   false;
                              oOrion.cTextoAlerta             =   "Login o password equivocados";
                              oOrion.bAlerta                  =   true;                    
                              oOrion.bAutenticacion           =   false;                            
                          }
                        }) // Final segundo then
              .catch(error => 
                  {
                    // Manejo de errores
                    console.log("Error validando login - respuesta Json ",error);
                  });     
          },  // \Validación login *********************************************************                 

  },
  watch: {
          bAutenticacion: function (bValor) {
          if(bValor)   {
            localStorage.cLoginGescel     = this.cLogin;
            localStorage.cPasswordGescel  = this.cPassword;
          }
          this.$emit('bAutenticar',bValor,this.cNombreCliente,this.cCodigoCliente,this.mCodigoEmpresas,this.mNombreEmpresas,this.cLogin);
      }
    }   
}
</script>

<style lang="scss" scoped>
  @import '../gescel.scss';
  
  h3 {
    color:$VerdeGescel;
  }

  #Contenedor {
    position: relative;
    height:100%;
    width:100%;
    display:flex; 
    flex-direction:column; 
    align-items:center;
    //justify-content:center;
  }

  .Sombreado { 
      border-style:solid; 
      border-radius: 5%;
      border: 2px solid #DDD;
      -webkit-box-shadow: 10px 10px 5px -6px rgba(0,0,0,0.27);
      -moz-box-shadow: 10px 10px 5px -6px rgba(0,0,0,0.27);
      box-shadow: 10px 10px 5px -6px rgba(0,0,0,0.27);
   }   

   #Boton {
     background: #21a141;
     color: white;
   }

   
   #LogoGescel {
      width:140px;
      height:140px;
   } 

   .clLogin{
    width: 226px;
    text-align: left;
   }

</style>
